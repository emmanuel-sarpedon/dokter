import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// prettier-ignore
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.nextUrl);

    const { category, name, city, finess, siret } = Z_QUERY.parse({
      category: searchParams.get("category") || undefined,
      name: searchParams.get("name") || undefined,
      city: searchParams.get("city") || undefined,
      finess: searchParams.get("finess") || undefined,
      siret: searchParams.get("siret") || undefined,
    });

    const SELECT: string[] = [
      "id",
      "finess_et",
      "name_short",
      "name_long",
      "address",
      "category_libelle",
      "siret",
      "tel",
      "fax",
      "city",
      "latitude",
      "longitude",
    ];

    const WHERE: string[] = [];

    if (category) WHERE.push(`"category_libelle" = '${category.replace(/'/g, "''")}'`);
    if (name)     WHERE.push(`("name_short" ILIKE '%${name.replace(/'/g, "''")}%' OR "name_long" LIKE '%${name.replace(/'/g, "''")}%')`);
    if (city)     WHERE.push(`"city" = '${city.replace(/'/g, "''")}'`);
    if (finess)   WHERE.push(`("finess_et" = '${finess}' OR "finess_ej" = '${finess}')`);
    if (siret)    WHERE.push(`"siret" = '${siret}'`);

    let query = `SELECT ${SELECT.join(", ")} FROM "Establishment"`;
    if (WHERE.length) query += ` WHERE ${WHERE.join(" AND ")}`;

    const establishments = await prisma.$queryRawUnsafe(query);

    if (!establishments) return NextResponse.json({ establishments: [] });
    if (!Array.isArray(establishments)) return NextResponse.json({ establishments });

    return NextResponse.json({ establishments });
  } catch (e: any) {
    if (e instanceof z.ZodError)
      return NextResponse.json({ error: e.issues }, { status: 400 });

    return NextResponse.json(
      { error: `${e.name}: ${e.message}` },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

const Z_QUERY = z.object({
  category: z.string().optional(),
  name: z.string().optional(),
  city: z.string().optional(),
  finess: z.string().optional(),
  siret: z.string().optional(),
});
