import { createContext, PropsWithChildren, useState } from "react";
import { usePractitioners } from "@/hooks/usePractitioners.ts";
import useEstablishments from "@/hooks/useEstablishments.ts";
import { useFields } from "@/hooks/useFields.ts";
import { Establishment, Practitioner } from "@prisma/client";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// prettier-ignore
export const MapContext = createContext({
  isMenuOpened: false,
  isFiltersSheetOpened: false,
  isResultsOpen: false,
  isSatelliteMode: false,
  isFetchingPractitioner: false,
  isFetchingEstablishments: false,
  tabActive: "practitioner",
  practitioners: [] as Partial<Practitioner>[],
  establishments: [] as Partial<Establishment>[],

  fields: {
    professions: [],
    procedures: [],
    sesamVitales: [],
    cities: [],
    agreements: [],
    categories: [],
  } as Fields,

  setIsMenuOpened: (_: boolean) => {},
  setIsFiltersSheetOpened: (_: boolean) => {},
  setIsResultsOpen: (_: boolean) => {},
  setIsSatelliteMode: (_: boolean) => {},
  setTabActive: (_: "practitioner" | "establishment") => {},

  handleFetchPractitioners: async (_: Record<string, unknown>,): Promise<void> => {},
  handleFetchEstablishments: async (_: Record<string, unknown>,): Promise<void> => {},

  formForPractitionerSearchEngine: null as null | UseFormReturn,
  formForEstablishmentSearchEngine: null as null | UseFormReturn,
  handleSubmitPractitionerSearchEngine: (_: Record<string, unknown>,): void => {},
  handleSubmitEstablishmentSearchEngine: (_: Record<string, unknown>,): void => {},

});

export const MapProvider = ({ children }: PropsWithChildren) => {
  const [isMenuOpened, setIsMenuOpened] = useState(true);
  const [isFiltersSheetOpened, setIsFiltersSheetOpened] = useState(true);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isSatelliteMode, setIsSatelliteMode] = useState(false);

  const [tabActive, setTabActive] = useState<"practitioner" | "establishment">(
    "practitioner",
  );

  const { isFetchingPractitioner, practitioners, handleFetchPractitioners } =
    usePractitioners();

  const {
    isFetchingEstablishments,
    establishments,
    handleFetchEstablishments,
  } = useEstablishments();

  const fields = useFields();

  const formSchemaForPractitioner = z.object({
    profession: z.string().optional(),
    procedure: z.string().optional(),
    sesamVitale: z.string().optional(),
    city: z.string().optional(),
    agreement: z.string().optional(),
  });

  const formSchemaForEstablishment = z.object({
    category: z.string().optional(),
    name: z.string().optional(),
    city: z.string().optional(),
    finess: z.string().optional(),
    siret: z.string().optional(),
  });

  const formForPractitionerSearchEngine = useForm<
    z.infer<typeof formSchemaForPractitioner>
  >({
    resolver: zodResolver(formSchemaForPractitioner),
  });

  const formForEstablishmentSearchEngine = useForm<
    z.infer<typeof formSchemaForEstablishment>
  >({
    resolver: zodResolver(formSchemaForEstablishment),
  });

  function handleSubmitPractitionerSearchEngine(
    values: z.infer<typeof formSchemaForPractitioner>,
  ) {
    handleFetchPractitioners({ ...values }).then(() => {
      setIsFiltersSheetOpened(false);
      setIsResultsOpen(true);
    });
  }

  function handleSubmitEstablishmentSearchEngine(
    values: z.infer<typeof formSchemaForEstablishment>,
  ) {
    handleFetchEstablishments({ ...values }).then(() => {
      setIsFiltersSheetOpened(false);
      setIsResultsOpen(true);
    });
  }

  return (
    <MapContext.Provider
      value={{
        isMenuOpened,
        isFiltersSheetOpened,
        isResultsOpen,
        isSatelliteMode,
        isFetchingPractitioner,
        isFetchingEstablishments,
        tabActive,
        practitioners,
        establishments,
        fields,

        setIsMenuOpened,
        setIsFiltersSheetOpened,
        setIsResultsOpen,
        setIsSatelliteMode,
        setTabActive,

        handleFetchPractitioners,
        handleFetchEstablishments,

        formForPractitionerSearchEngine,
        formForEstablishmentSearchEngine,
        handleSubmitPractitionerSearchEngine,
        handleSubmitEstablishmentSearchEngine,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
