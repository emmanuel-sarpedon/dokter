import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [
      professions,
      agreements,
      sesamVitales,
      procedures,
      cities,
      categories,
    ] = await Promise.all([
      prisma.libelleProfession.findMany(),
      prisma.agreement.findMany(),
      prisma.sesamVitale.findMany(),
      prisma.procedure.findMany(),
      prisma.city.findMany(),
      prisma.category.findMany(),
    ]);

    return NextResponse.json({
      professions,
      agreements,
      sesamVitales,
      procedures,
      cities,
      categories,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: `${e.name}: ${e.message}` },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
