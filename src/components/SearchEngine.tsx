"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet.tsx";
import { Establishment, Practitioner } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchEngineFormForPractitioners from "@/components/SearchEngineFormForPractitioners.tsx";
import SearchEngineFormForEstablishments from "@/components/SearchEngineFormForEstablishments.tsx";

const SearchEngine = ({
  ...props
}: {
  isOpened: boolean;
  setIsOpened: (isOpen: boolean) => void;
  tabActive: "practitioner" | "establishment";
  setTabActive: (tab: "practitioner" | "establishment") => void;
  setIsMenuOpened: (isMenuOpened: boolean) => void;
  setIsResultsOpen: (isOpen: boolean) => void;
  fieldsRecords: Fields;
  isFetchingPractitioner: boolean;
  practitioners: Partial<Practitioner>[];
  isFetchingEstablishment: boolean;
  establishments: Partial<Establishment>[];
  handleFetchPractitioners: (filters: Record<string, unknown>) => Promise<void>;
  handleFetchEstablishments: (
    filters: Record<string, unknown>,
  ) => Promise<void>;
}) => {
  const { isOpened, setIsOpened, tabActive, setTabActive } = props;

  return (
    <Sheet open={isOpened} onOpenChange={setIsOpened}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {"Recherche de praticiens et d'établissements"}
          </SheetTitle>
          <SheetDescription>
            {
              "Filter profession, type d'acte pratiqué, commune, établissements, etc."
            }
          </SheetDescription>
        </SheetHeader>

        <Tabs
          className={"mt-4"}
          value={tabActive}
          onValueChange={(value) =>
            setTabActive(value as "practitioner" | "establishment")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="practitioner">
              Je cherche un praticien
            </TabsTrigger>
            <TabsTrigger value="establishment">
              Je cherche un établissement
            </TabsTrigger>
          </TabsList>
          <TabsContent value={"practitioner"}>
            <SearchEngineFormForPractitioners {...props} />
          </TabsContent>

          <TabsContent value={"establishment"}>
            <SearchEngineFormForEstablishments {...props} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default SearchEngine;
