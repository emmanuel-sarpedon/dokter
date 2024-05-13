import { NextRequest, NextResponse } from "next/server";
import { Practitioner, PrismaClient } from "@prisma/client";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const prisma = new PrismaClient();

    const { searchParams } = new URL(request.nextUrl);

    const {
      agreement,
      sesamVitale,
      procedure,
      city,
      profession,
      northEastLatitude,
      northEastLongitude,
      southWestLatitude,
      southWestLongitude,
    } = z
      .object({
        agreement: z.string().optional(),
        sesamVitale: z.string().optional(),
        profession: z.string().optional(),
        city: z.string().optional(),
        procedure: z.string().optional(),
        northEastLatitude: z.string().optional(),
        northEastLongitude: z.string().optional(),
        southWestLatitude: z.string().optional(),
        southWestLongitude: z.string().optional(),
      })
      .parse({
        agreement: searchParams.get("agreement") || undefined,
        sesamVitale: searchParams.get("sesamVitale") || undefined,
        profession: searchParams.get("profession") || undefined,
        city: searchParams.get("city") || undefined,
        procedure: searchParams.get("procedure") || undefined,
        northEastLatitude: searchParams.get("northEastLatitude") || undefined,
        northEastLongitude: searchParams.get("northEastLongitude") || undefined,
        southWestLatitude: searchParams.get("southWestLatitude") || undefined,
        southWestLongitude: searchParams.get("southWestLongitude") || undefined,
      });

    let query =
      'SELECT id, name, address, latitude, longitude, profession, tel FROM "Practitioner"';

    const WHERE = [];

    if (
      northEastLongitude &&
      northEastLatitude &&
      southWestLongitude &&
      southWestLatitude
    ) {
      WHERE.push(
        `ST_Within(point, ST_MakeEnvelope(${southWestLongitude}, ${southWestLatitude}, ${northEastLongitude}, ${northEastLatitude}, 4326))`,
      );
    }

    if (agreement) WHERE.push(`agreement = '${agreement}'`);
    if (sesamVitale) WHERE.push(`sesamVitale = '${sesamVitale}'`);
    if (profession) WHERE.push(`profession = '${profession}'`);
    if (city) WHERE.push(`city = '${city.replace(/'/g, "''")}'`);
    if (procedure) WHERE.push(`procedure = '${procedure}'`);

    if (WHERE.length) query += ` WHERE ${WHERE.join(" AND ")}`;

    const practitioners = await prisma.$queryRawUnsafe(query);

    if (!practitioners) return NextResponse.json({ practitioners: [] });
    if (!Array.isArray(practitioners))
      return NextResponse.json({ practitioners });

    const practitionersReduced: Partial<Practitioner>[] = practitioners.reduce(
      (acc: Partial<Practitioner>[], curr) => {
        if (acc.map((p) => p.name).includes(curr.name)) return acc;
        return [...acc, curr];
      },
      [],
    );

    const practitionersWithOffSet: typeof practitioners = [];

    practitionersReduced.forEach((c) => {
      let offset: number = 0;

      while (
        practitionersWithOffSet.filter(
          (p) =>
            p.latitude === (c.latitude as number) + offset &&
            p.longitude === (c.longitude as number) + offset,
        ).length > 0
      ) {
        offset += 0.0001;
      }

      practitionersWithOffSet.push({
        ...c,
        latitude: (c.latitude as number) + offset,
        longitude: (c.longitude as number) + offset,
      });
    });

    return NextResponse.json({ practitioners: practitionersWithOffSet });
  } catch (e: any) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues }, { status: 400 });

    return NextResponse.json(
      { error: `${e.name}: ${e.message}` },
      { status: 500 },
    );
  }
}
