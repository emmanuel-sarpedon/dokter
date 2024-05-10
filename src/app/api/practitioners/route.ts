import { NextRequest, NextResponse } from "next/server";
import { Practitioner, PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const prisma = new PrismaClient();

    const practitioners = await prisma.practitioner
      .findMany({
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
          address: true,
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

    console.log(practitioners.length);

    return NextResponse.json({ practitioners });
  } catch (e: any) {
    return NextResponse.json(
      { error: `${e.name}: ${e.message}` },
      { status: 500 },
    );
  }
}
