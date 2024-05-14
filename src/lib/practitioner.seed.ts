const HOSTNAME = "data.regionreunion.com";
const ENDPOINT =
  "/api/explore/v2.1/catalog/datasets/annuaire-sante-liste-localisation-et-tarifs-des-professionnels-de-sante-copie/records";
const url = new URL(ENDPOINT, `https://${HOSTNAME}`);

export async function getProfessions() {
  url.searchParams.set("group_by", "libelle_profession");
  const results = (await fetch(url.href).then(getResults)) as {
    libelle_profession: string;
  }[];

  return results
    .map((result) => result.libelle_profession)
    .filter(Boolean)
    .reduce(removeDuplicate, []);
}

export async function getAgreements() {
  url.searchParams.set("group_by", "column_14");
  const results = (await fetch(url.href).then(getResults)) as {
    column_14: string;
  }[];

  return results
    .map((result) => result.column_14)
    .filter(Boolean)
    .reduce(removeDuplicate, []);
}

export async function getSesamVitale() {
  url.searchParams.set("group_by", "column_16");
  const results = (await fetch(url.href).then(getResults)) as {
    column_16: string;
  }[];

  return results
    .map((result) => result.column_16)
    .filter(Boolean)
    .reduce(removeDuplicate, []);
}

export async function getProcedures() {
  url.searchParams.set("group_by", "nom_acte");
  const results = (await fetch(url.href).then(getResults)) as {
    nom_acte: string;
  }[];

  return results
    .map((result) => result.nom_acte)
    .filter(Boolean)
    .reduce(removeDuplicate, []);
}

export async function getCities() {
  url.searchParams.set("group_by", "commune");
  const results = (await fetch(url.href).then(getResults)) as {
    commune: string;
  }[];

  return results
      .map((result) => result.commune)
      .filter(Boolean)
      .reduce(removeDuplicate, []);

}
export async function getPractitioners() {
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

  return json.map(
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
