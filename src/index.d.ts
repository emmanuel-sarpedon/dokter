type Fields = {
  cities: { id: number; libelle: string }[];

  // Practitioner
  professions: { id: number; libelle: string }[];
  agreements: { id: number; libelle: string }[];
  sesamVitales: { id: number; libelle: string }[];
  procedures: { id: number; libelle: string }[];

  // Establishment
  categories: { id: number; libelle: string }[];
};
