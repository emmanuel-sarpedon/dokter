import { GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import { useUserLocation } from "@/hooks/useUserLocation.ts";
import { useMap } from "react-leaflet";
import { Practitioner } from "@prisma/client";
import { Switch } from "@/components/ui/switch.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils.ts";

export default function ActionButtons({
  isMenuOpened,
  setIsMenuOpened,
  isSatelliteMode,
  setIsSatelliteMode,
  setIsFiltersSheetOpened,
  setIsResultsOpen,
  practitioners,
}: {
  isMenuOpened: boolean;
  setIsMenuOpened: (isMenuOpened: boolean) => void;
  isSatelliteMode: boolean;
  setIsSatelliteMode: (isSatelliteMode: boolean) => void;
  setIsFiltersSheetOpened: (isOpen: boolean) => void;
  setIsResultsOpen: (isOpen: boolean) => void;
  practitioners: Partial<Practitioner>[];
}) {
  const map = useMap();
  const userLocation = useUserLocation();

  return (
    <menu
      className={cn(
        "font-dosis absolute right-0 top-0 h-full w-full md:w-fit",
        {
          "bg-blue-50 bg-opacity-50": isSatelliteMode,
        },
      )}
    >
      <Button
        className={cn("absolute top-8 right-8", {
          hidden: isMenuOpened,
        })}
        onClick={() => setIsMenuOpened(true)}
      >
        Afficher menu
      </Button>

      <section
        className={cn("p-4 md:p-8 flex flex-col gap-y-4", {
          hidden: !isMenuOpened,
        })}
      >
        <Button onClick={() => setIsMenuOpened(false)}>Masquer menu</Button>

        <div className={"flex items-center gap-x-4"}>
          <Switch
            id="satellite-mode"
            checked={isSatelliteMode}
            onCheckedChange={(e) => {
              setIsSatelliteMode(e);
            }}
          />
          <Label htmlFor="satellite-mode" className={"font-bold"}>
            Vue Satellite
          </Label>
        </div>

        <Button
          variant={"secondary"}
          onClick={() => setIsFiltersSheetOpened(true)}
        >{`Filtrer les résultats`}</Button>

        <Button variant={"secondary"} onClick={() => setIsResultsOpen(true)}>
          {`Voir les résultats (${practitioners.length})`}
        </Button>

        <Button
          disabled={!userLocation}
          variant={"ghost"}
          onClick={() => userLocation && map.setView(userLocation, 15)}
          className={cn({ invisible: !userLocation })}
        >
          <GlobeIcon className={"mr-2 h-4 w-4"} />
          Zoomer sur ma position
        </Button>
      </section>
    </menu>
  );
}
