import { P } from "@/components/Typography.tsx";
import { useMap } from "react-leaflet";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet.tsx";
import {MapContext} from "@/context/MapProvider.tsx";
import {useContext} from "react";

export default function Results() {
  const map = useMap();
  const {isResultsOpen, setIsResultsOpen, tabActive, practitioners, establishments} = useContext(MapContext);

  return (
    <Sheet open={isResultsOpen} onOpenChange={setIsResultsOpen}>
      <SheetContent side={"bottom"}>
        {tabActive === "practitioner" ? (
          <SheetHeader>
            <SheetTitle>
              {practitioners.length
                ? `${practitioners.length} résultats`
                : "Aucun résultat"}
            </SheetTitle>
            <SheetDescription>
              {practitioners.length
                ? "Cliquer sur un professionnel pour le localiser sur la carte"
                : "Aucun professionnel trouvé. Élargissez vos critères de recherche."}
            </SheetDescription>
          </SheetHeader>
        ) : (
          <SheetHeader>
            <SheetTitle>
              {establishments.length
                ? `${establishments.length} résultats`
                : "Aucun résultat"}
            </SheetTitle>
            <SheetDescription>
              {establishments.length
                ? "Cliquer sur un établissement pour le localiser sur la carte"
                : "Aucun établissement trouvé. Élargissez vos critères de recherche."}
            </SheetDescription>
          </SheetHeader>
        )}

        <ScrollArea className={"h-96 py-10"}>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2"
            }
          >
            {tabActive === "practitioner"
              ? practitioners.map(
                  ({ id, name, profession, longitude, latitude }) => {
                    return (
                      <div
                        key={id}
                        className={"md:p-3 hover:cursor-pointer"}
                        onClick={() => {
                          if (!map) return;
                          if (!latitude || !longitude) return;

                          setIsResultsOpen(false);
                          map.setView([latitude, longitude], 28);
                        }}
                      >
                        <P
                          bold
                          className={"truncate"}
                        >{`DR ${name} - ${profession}`}</P>
                      </div>
                    );
                  },
                )
              : establishments.map(
                  ({ id, name_short, category_libelle, longitude, latitude }) => {
                    return (
                      <div
                        key={id}
                        className={"p-3 hover:cursor-pointer"}
                        onClick={() => {
                          if (!map) return;
                          if (!latitude || !longitude) return;

                          setIsResultsOpen(false);
                          map.setView([latitude, longitude], 28);
                        }}
                      >
                        <P
                          bold
                          className={"truncate"}
                        >{`${name_short} - ${category_libelle}`}</P>
                      </div>
                    );
                  },
                )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
