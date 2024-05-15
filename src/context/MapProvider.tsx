import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { usePractitioners } from "@/hooks/usePractitioners.ts";
import useEstablishments from "@/hooks/useEstablishments.ts";
import { useFields } from "@/hooks/useFields.ts";
import { Establishment, Practitioner } from "@prisma/client";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LatLngTuple } from "leaflet";
import { useUserLocation } from "@/hooks/useUserLocation.ts";

// prettier-ignore
export const MapContext = createContext({
  isFiltersSheetOpened: false,
  isResultsOpen: false,
  isSatelliteMode: false,
  isFetchingPractitioner: false,
  isFetchingEstablishments: false,
  tabActive: "practitioner",
  practitioners: [] as Partial<Practitioner>[],
  establishments: [] as Partial<Establishment>[], 
  userLocation: null as null | LatLngTuple,
  practitionerProfessionFilter: [] as string[],
  establishmentCategoryFilter: [] as string[],
  
  fields: {
    professions: [],
    procedures: [],
    sesamVitales: [],
    cities: [],
    agreements: [],
    categories: [],
  } as Fields,

  setIsFiltersSheetOpened: ((_: boolean) => {}) as Dispatch<SetStateAction<boolean>>,
  setIsResultsOpen: ((_: boolean) => {}) as Dispatch<SetStateAction<boolean>>,
  setIsSatelliteMode: ((_: boolean) => {}) as Dispatch<SetStateAction<boolean>>,
  setTabActive: ((_: "practitioner" | "establishment") => {}) as Dispatch<SetStateAction<"practitioner" | "establishment">>,
  setPractitionerProfessionFilter: ((_: string[]) => {}) as Dispatch<SetStateAction<string[]>>,
  setEstablishmentCategoryFilter: ((_: string[]) => {}) as Dispatch<SetStateAction<string[]>>,

  handleFetchPractitioners: async (_: Record<string, unknown>,): Promise<void> => {},
  handleFetchEstablishments: async (_: Record<string, unknown>,): Promise<void> => {},

  formForPractitionerSearchEngine: null as null | UseFormReturn,
  formForEstablishmentSearchEngine: null as null | UseFormReturn,
  handleSubmitPractitionerSearchEngine: (_: Record<string, unknown>,): void => {},
  handleSubmitEstablishmentSearchEngine: (_: Record<string, unknown>,): void => {},

  getUserLocation: async (): Promise<LatLngTuple | void> => {},
});

// prettier-ignore
export const MapProvider = ({ children }: PropsWithChildren) => {
  const [isFiltersSheetOpened, setIsFiltersSheetOpened] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isSatelliteMode, setIsSatelliteMode] = useState(false);
  const [practitionerProfessionFilter, setPractitionerProfessionFilter] = useState<string[]>([]);
  const [establishmentCategoryFilter, setEstablishmentCategoryFilter] = useState<string[]>([]);
  const [tabActive, setTabActive] = useState<TabActive>("practitioner");

  const { isFetchingPractitioner, practitioners, handleFetchPractitioners } = usePractitioners();
  const { isFetchingEstablishments, establishments, handleFetchEstablishments } = useEstablishments();
  const { userLocation, getUserLocation } = useUserLocation();
  const fields = useFields();

  useEffect(() => {
    setPractitionerProfessionFilter(fields.professions.map(({ libelle }) => libelle));
  }, [fields.professions]);

  useEffect(() => {
    setEstablishmentCategoryFilter(fields.categories.map(({ libelle }) => libelle));
  }, [fields.categories]);

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
    defaultValues: {
      profession: "",
      procedure: "",
      sesamVitale: "",
      city: "",
      agreement: "",
    },
  });

  const formForEstablishmentSearchEngine = useForm<
    z.infer<typeof formSchemaForEstablishment>
  >({
    resolver: zodResolver(formSchemaForEstablishment),
    defaultValues: {
      category: "",
      name: "",
      city: "",
      finess: "",
      siret: "",
    },
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
        isFiltersSheetOpened,
        isResultsOpen,
        isSatelliteMode,
        isFetchingPractitioner,
        isFetchingEstablishments,
        tabActive,
        practitioners: practitioners.filter(
          ({ profession }) =>
            profession && practitionerProfessionFilter.includes(profession),
        ),
        establishments: establishments.filter(
          ({ category_libelle }) =>
            category_libelle &&
            establishmentCategoryFilter.includes(category_libelle),
        ),
        fields,
        userLocation,
        practitionerProfessionFilter,
        establishmentCategoryFilter,

        setIsFiltersSheetOpened,
        setIsResultsOpen,
        setIsSatelliteMode,
        setTabActive,
        setPractitionerProfessionFilter,
        setEstablishmentCategoryFilter,

        handleFetchPractitioners,
        handleFetchEstablishments,

        formForPractitionerSearchEngine,
        formForEstablishmentSearchEngine,
        handleSubmitPractitionerSearchEngine,
        handleSubmitEstablishmentSearchEngine,

        getUserLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

type TabActive = "practitioner" | "establishment";
