const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const HOSTNAME = "data.regionreunion.com";
const ENDPOINT =
  "/api/explore/v2.1/catalog/datasets/annuaire-sante-liste-localisation-et-tarifs-des-professionnels-de-sante-copie/records";
const url = new URL(ENDPOINT, `https://${HOSTNAME}`);
url.searchParams.set("limit", "100");

async function main() {
  // drop tables
  await prisma.practitioner.deleteMany();
  await prisma.city.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.sesamVitale.deleteMany();
  await prisma.agreement.deleteMany();
  await prisma.libelleProfession.deleteMany();

  handleProfession().then();
  handleAgreement().then();
  handleSesamVitale().then();
  handleProcedure().then();
  handleCity().then();
  handlePractitioner().then();
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

// == HELPER FUNCTIONS ==

async function handleProfession() {
  url.searchParams.set("group_by", "libelle_profession");
  const results = (await fetch(url.href).then(getResults)) as {
    libelle_profession: string;
  }[];

  const professionTags = results
    .map((result) => result.libelle_profession)
    .filter(Boolean)
    .reduce(removeDuplicate, []);

  await prisma.libelleProfession.createMany({
    data: professionTags.map((libelle) => ({ libelle })),
    skipDuplicates: true,
  });
}

async function handleAgreement() {
  url.searchParams.set("group_by", "column_14");
  const results = (await fetch(url.href).then(getResults)) as {
    column_14: string;
  }[];

  const tags = results
    .map((result) => result.column_14)
    .filter(Boolean)
    .reduce(removeDuplicate, []);

  await prisma.agreement.createMany({
    data: tags.map((libelle) => ({ libelle })),
    skipDuplicates: true,
  });
}

async function handleSesamVitale() {
  url.searchParams.set("group_by", "column_16");
  const results = (await fetch(url.href).then(getResults)) as {
    column_16: string;
  }[];

  const tags = results
    .map((result) => result.column_16)
    .filter(Boolean)
    .reduce(removeDuplicate, []);

  await prisma.sesamVitale.createMany({
    data: tags.map((libelle) => ({ libelle })),
    skipDuplicates: true,
  });
}

async function handleProcedure() {
  url.searchParams.set("group_by", "nom_acte");
  const results = (await fetch(url.href).then(getResults)) as {
    nom_acte: string;
  }[];

  const tags = results
    .map((result) => result.nom_acte)
    .filter(Boolean)
    .reduce(removeDuplicate, []);

  await prisma.procedure.createMany({
    data: tags.map((libelle) => ({ libelle })),
    skipDuplicates: true,
  });
}

async function handleCity() {
  url.searchParams.set("group_by", "commune");
  const results = (await fetch(url.href).then(getResults)) as {
    commune: string;
  }[];

  const tags = results
    .map((result) => result.commune)
    .filter(Boolean)
    .reduce(removeDuplicate, []);

  await prisma.city.createMany({
    data: tags.map((libelle) => ({ libelle })),
    skipDuplicates: true,
  });
}

async function handlePractitioner() {
  const url = new URL(
    ENDPOINT.replace("records", "exports/json"),
    `https://${HOSTNAME}`,
  );

  url.searchParams.set(
    "select",
    [
      "civilite",
      "column_10",
      "column_14",
      "column_16",
      "nom",
      "adresse",
      "libelle_profession",
      "coordonnees",
      "commune",
      "remboursement",
      "nom_acte",
    ].join(","),
  );

  const response = await fetch(url.href);
  const blob = await response.blob();
  const content = await blob.text();
  const json = JSON.parse(content) as Record<string, any>[];

  const practitioners = json.map(
    ({
      civilite,
      column_10,
      column_14,
      column_16,
      nom,
      adresse,
      libelle_profession,
      coordonnees,
      commune,
      remboursement,
      nom_acte,
    }) => {
      return {
        civility: civilite,
        tel: column_10,
        agreement: column_14,
        sesamVitale: column_16,
        name: nom,
        address: adresse,
        profession: libelle_profession,
        latitude: coordonnees.lat,
        longitude: coordonnees.lon,
        city: commune,
        reimbursement: remboursement,
        procedure: nom_acte,
      };
    },
  );

  await prisma.practitioner.createMany({
    data: practitioners,
  });

  await prisma.$executeRawUnsafe(
      `UPDATE "Practitioner" SET "point" = ST_SetSRID(ST_MakePoint(longitude::float, latitude::float), 4326);`
  );
}

async function getResults(res: Response) {
  if (!res.ok) throw new Error();
  const { results } = await res.json();

  return results;
}

function removeDuplicate(acc: string[], curr: string) {
  if (!curr) return acc;
  if (acc.includes(curr)) return acc;
  return [...acc, curr];
}
