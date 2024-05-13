import { useEffect, useState } from "react";
import { Practitioner } from "@prisma/client";
import qs from "qs";
import { LatLngBounds } from "leaflet";

export const usePractitioners = () => {
  const [isFetchingPractitioner, setIsFetchingPractitioner] =
    useState<boolean>(true);

  const [practitioners, setPractitioners] = useState<Partial<Practitioner>[]>(
    [],
  );

  useEffect(() => {
    setIsFetchingPractitioner(true);

    fetch("/api/practitioners")
      .then((res) => res.json())
      .then(({ practitioners }) => {
        setPractitioners(practitioners);
      })
      .finally(() => setIsFetchingPractitioner(false));
  }, []);

  const handleFetchPractitioners = async ({
    profession,
    agreement,
    sesamVitale,
    city,
    procedure,
    latLngBounds,
  }: {
    profession?: string;
    agreement?: string;
    sesamVitale?: string;
    city?: string;
    procedure?: string;
    latLngBounds?: LatLngBounds;
  }) => {
    const query = qs.stringify({
      profession,
      agreement,
      sesamVitale,
      city,
      procedure,
      northEastLatitude: latLngBounds?.getNorthEast().lat,
      northEastLongitude: latLngBounds?.getNorthEast().lng,
      southWestLatitude: latLngBounds?.getSouthWest().lat,
      southWestLongitude: latLngBounds?.getSouthWest().lng,
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
