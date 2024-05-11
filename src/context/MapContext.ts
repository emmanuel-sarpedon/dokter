import { createContext, Dispatch, SetStateAction } from "react";
import { LatLngTuple } from "leaflet";
import { Practitioner } from "@prisma/client";

export const MapContext = createContext<{
  isFetchingPractitioner: boolean;
  practitioners: Partial<Practitioner>[];
  setPractitioners: Dispatch<SetStateAction<Partial<Practitioner>[]>>;
  handleFetchPractitioners?: (params: {
    profession?: string;
    agreement?: string;
    sesamVitale?: string;
    city?: string;
    procedure?: string;
  }) => void;
  userLocation: LatLngTuple | null;
}>({
  isFetchingPractitioner: false,
  practitioners: [],
  userLocation: null,
  setPractitioners: () => {},
});
