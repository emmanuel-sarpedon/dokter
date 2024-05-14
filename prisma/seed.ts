import { PrismaClient } from "@prisma/client";
import {
  getAgreements,
  getCities,
  getPractitioners,
  getProcedures,
  getProfessions,
  getSesamVitale,
} from "@/lib/practitioner.seed.ts";
import { getCategories, getEstablishments } from "@/lib/establishement.seed.ts";

const prisma = new PrismaClient();

async function main() {
  console.time("seed");
  const [
    professions,
    agreements,
    sesamVitale,
    practitioners,
    procedures,
    cities,
    categories,
    establishments,
  ] = await Promise.all([
    getProfessions(),
    getAgreements(),
    getSesamVitale(),
    getPractitioners(),
    getProcedures(),
    getCities(),
    getCategories(),
    getEstablishments(),
  ]);

  await prisma.$transaction([
    prisma.city.deleteMany(),
    prisma.procedure.deleteMany(),
    prisma.sesamVitale.deleteMany(),
    prisma.agreement.deleteMany(),
    prisma.libelleProfession.deleteMany(),
    prisma.practitioner.deleteMany(),
    prisma.category.deleteMany(),
    prisma.establishment.deleteMany(),

    prisma.libelleProfession.createMany({
      data: professions.map((libelle) => ({ libelle })),
      skipDuplicates: true,
    }),

    prisma.agreement.createMany({
      data: agreements.map((libelle) => ({ libelle })),
      skipDuplicates: true,
    }),

    prisma.sesamVitale.createMany({
      data: sesamVitale.map((libelle) => ({ libelle })),
      skipDuplicates: true,
    }),

    prisma.procedure.createMany({
      data: procedures.map((libelle) => ({ libelle })),
      skipDuplicates: true,
    }),

    prisma.city.createMany({
      data: cities.map((libelle) => ({ libelle })),
      skipDuplicates: true,
    }),

    prisma.practitioner.createMany({
      data: practitioners,
    }),

    prisma.$executeRawUnsafe(
      `UPDATE "Practitioner" SET "point" = ST_SetSRID(ST_MakePoint(longitude::float, latitude::float), 4326);`,
    ),

    prisma.category.createMany({
      data: categories.map((libelle) => ({ libelle })),
      skipDuplicates: true,
    }),

    prisma.establishment.createMany({
      data: establishments,
    }),

    prisma.$executeRawUnsafe(
      `UPDATE "Establishment" SET "point" = ST_SetSRID(ST_MakePoint(longitude::float, latitude::float), 4326);`,
    ),
  ]);
  console.timeEnd("seed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
