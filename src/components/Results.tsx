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
          <SheetTitle>Recherche de professionnels de santé</SheetTitle>
          <SheetDescription>
            {"Cliquer sur un professionnel pour le localiser sur la carte"}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className={"h-96 py-10"}>
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
