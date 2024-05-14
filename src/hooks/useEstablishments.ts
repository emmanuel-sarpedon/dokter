import { useEffect, useState } from "react";
import { Establishment } from "@prisma/client";
import qs from "qs";

const useEstablishments = () => {
  const [isFetchingEstablishments, setIsFetchingEstablishments] =
    useState<boolean>(true);

  const [establishments, setEstablishments] = useState<
    Partial<Establishment>[]
  >([]);

  useEffect(() => {
    setIsFetchingEstablishments(true);

    fetch("/api/establishments")
      .then((res) => res.json())
      .then(({ establishments }) => {
        setEstablishments(establishments);
      })
      .finally(() => setIsFetchingEstablishments(false));
  }, []);

  const handleFetchEstablishments = async ({
    category,
    name,
    city,
    finess,
    siret,
  }: {
    category?: string;
    name?: string;
    city?: string;
    finess?: string;
    siret?: string;
  }) => {
    const query = qs.stringify({
      category,
      name,
      city,
      finess,
      siret,
    });

    setIsFetchingEstablishments(true);

    fetch(`/api/establishments?${query}`)
      .then((res) => res.json())
      .then(
        ({ establishments }: { establishments: Partial<Establishment>[] }) => {
          setEstablishments(establishments);
        },
      )
      .finally(() => setIsFetchingEstablishments(false));
  };

  return {
    establishments,
    setEstablishments,
    isFetchingEstablishments,
    handleFetchEstablishments,
  };
};

export default useEstablishments;
