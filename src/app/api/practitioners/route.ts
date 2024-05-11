import { NextRequest, NextResponse } from "next/server";
import { Practitioner, PrismaClient } from "@prisma/client";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const prisma = new PrismaClient();

    const { searchParams } = new URL(request.nextUrl);

    // prettier-ignore
    const { agreement, sesamVitale, procedure, city, profession } = z
      .object({
        agreement: z.string().optional(),
        sesamVitale: z.string().optional(),
        profession: z.string().optional(),
        city: z.string().optional(),
        procedure: z.string().optional(),
      })
      .parse({
        agreement: searchParams.get("agreement") || undefined,
        sesamVitale: searchParams.get("sesamVitale") || undefined,
        profession: searchParams.get("profession") || undefined,
        city: searchParams.get("city") || undefined,
        procedure: searchParams.get("procedure") || undefined,
      });

    const practitioners = await prisma.practitioner
      .findMany({
        where: {
          agreement,
          sesamVitale,
          profession,
          city,
          procedure,
        },
      })
      .then((practitioners) => {
        return practitioners.reduce(
          (acc: Partial<Practitioner>[], practitioner) => {
            if (acc.map((p) => p.name).includes(practitioner.name)) return acc;
            return [...acc, practitioner];
          },
          [],
        );
      });

    return NextResponse.json({ practitioners });
  } catch (e: any) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues }, { status: 400 });

    return NextResponse.json(
      { error: `${e.name}: ${e.message}` },
      { status: 500 },
    );
  }
}
