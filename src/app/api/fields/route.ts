import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const professions = await prisma.libelleProfession.findMany();
    const agreements = await prisma.agreement.findMany();
    const sesamVitales = await prisma.sesamVitale.findMany();
    const procedures = await prisma.procedure.findMany();
    const cities = await prisma.city.findMany();

    return NextResponse.json({
      professions,
      agreements,
      sesamVitales,
      procedures,
      cities,
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
