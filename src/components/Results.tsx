import { Practitioner } from "@prisma/client";
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

export default function Results({
  isOpen,
  setIsOpen,
  practitioners,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  practitioners: Partial<Practitioner>[];
}) {
  const map = useMap();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side={"bottom"}>
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

        <ScrollArea className={"h-96 py-10"}>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2"
            }
          >
            {practitioners.map(
              ({ id, name, address, tel, profession, longitude, latitude }) => {
                return (
                  <div
                    key={id}
                    className={"p-3 hover:cursor-pointer"}
                    onClick={() => {
                      if (!map) return;
                      if (!latitude || !longitude) return;

                      setIsOpen(false);
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
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
