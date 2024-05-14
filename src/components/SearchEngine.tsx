"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchEngineFormForPractitioners from "@/components/SearchEngineFormForPractitioners.tsx";
import SearchEngineFormForEstablishments from "@/components/SearchEngineFormForEstablishments.tsx";
import { P } from "@/components/Typography.tsx";
import { MapContext } from "@/context/MapProvider.tsx";
import { useContext } from "react";

const SearchEngine = () => {
  const {
    tabActive,
    setTabActive,
    setIsFiltersSheetOpened,
    isFiltersSheetOpened,
  } = useContext(MapContext);

  return (
    <Sheet open={isFiltersSheetOpened} onOpenChange={setIsFiltersSheetOpened}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {"Recherche de praticiens et d'établissements"}
          </SheetTitle>
          <SheetDescription className={"hidden md:block"}>
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
          <P bold={true}>Je recherche...</P>

          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="practitioner">...un praticien</TabsTrigger>
            <TabsTrigger value="establishment">...un établissement</TabsTrigger>
          </TabsList>
          <TabsContent value={"practitioner"}>
            <SearchEngineFormForPractitioners />
          </TabsContent>

          <TabsContent value={"establishment"}>
            <SearchEngineFormForEstablishments />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default SearchEngine;
