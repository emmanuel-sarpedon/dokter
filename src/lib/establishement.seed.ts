import { handleResults, removeDuplicate } from "@/lib/utils.ts";

const HOSTNAME = "data.regionreunion.com";
const ENDPOINT =
  "/api/explore/v2.1/catalog/datasets/etablissements-du-domaine-sanitaire-et-social-a-la-reunion/records";
const url = new URL(ENDPOINT, `https://${HOSTNAME}`);

export async function getCategories() {
  url.searchParams.set("group_by", "libcategetab");
  const results = (await fetch(url.href).then(handleResults)) as {
    libcategetab: string;
  }[];

  return results
    .map((result) => result.libcategetab)
    .filter(Boolean)
    .reduce(removeDuplicate, []);
}

export async function getEstablishments() {
  const url = new URL(
    ENDPOINT.replace("records", "exports/json"),
    `https://${HOSTNAME}`,
  );

  url.searchParams.set(
    "select",
    [
      "nofinesset",
      "nofinessej",
      "rs",
      "rslongue",
      "numvoie",
      "typvoie",
      "voie",
      "compvoie",
      "libcategetab",
      "lieuditbp",
      "ligneacheminement",
      "siret",
      "telephone",
      "telecopie",
      "dateouv",
      "com_name",
      "coord",
    ].join(","),
  );

  const response = await fetch(url.href);
  const blob = await response.blob();
  const content = await blob.text();
  const json = JSON.parse(content) as Record<string, any>[];

  return json
    .filter(({ coord }) => coord)
    .map(
      ({
        nofinesset,
        nofinessej,
        rs,
        rslongue,
        numvoie,
        typvoie,
        voie,
        compvoie,
        lieuditbp,
        ligneacheminement,
        libcategetab,
        siret,
        telephone,
        telecopie,
        dateouv,
        com_name,
        coord,
      }) => {
        return {
          finess_et: nofinesset,
          finess_ej: nofinessej,
          name_short: rs,
          name_long: rslongue,
          address: [
            numvoie,
            typvoie,
            voie,
            compvoie,
            lieuditbp,
            ligneacheminement,
          ]
            .filter(Boolean)
            .join(" "),
          category_libelle: libcategetab,
          siret: siret,
          tel: telephone,
          fax: telecopie,
          date_open: new Date(dateouv).toISOString(),
          city: com_name,
          latitude: coord.lat,
          longitude: coord.lon,
        };
      },
    );
}
