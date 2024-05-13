import { useEffect, useState } from "react";
import { Practitioner } from "@prisma/client";
import qs from "qs";

export const usePractitioners = () => {
  const [isFetchingPractitioner, setIsFetchingPractitioner] =
    useState<boolean>(true);

  const [practitioners, setPractitioners] = useState<Partial<Practitioner>[]>(
    [],
  );

  useEffect(() => {
    if (practitioners.length) return;

    setIsFetchingPractitioner(true);

    fetch("/api/practitioners")
      .then((res) => res.json())
      .then(({ practitioners }: { practitioners: Partial<Practitioner>[] }) => {
        setPractitioners(practitioners);
      })
      .finally(() => setIsFetchingPractitioner(false));
  }, [practitioners]);

  const handleFetchPractitioners = async ({
    profession,
    agreement,
    sesamVitale,
    city,
    procedure,
  }: {
    profession?: string;
    agreement?: string;
    sesamVitale?: string;
    city?: string;
    procedure?: string;
  }) => {
    const query = qs.stringify({
      profession,
      agreement,
      sesamVitale,
      city,
      procedure,
    });

    setIsFetchingPractitioner(true);

    fetch(`/api/practitioners?${query}`)
      .then((res) => res.json())
      .then(({ practitioners }: { practitioners: Partial<Practitioner>[] }) => {
        setPractitioners(practitioners);
      })
      .finally(() => setIsFetchingPractitioner(false));
  };

  return {
    practitioners,
    setPractitioners,
    isFetchingPractitioner,
    handleFetchPractitioners,
  };
};
