import { GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import { useUserLocation } from "@/hooks/useUserLocation.ts";
import { useMap } from "react-leaflet";
import { Switch } from "@/components/ui/switch.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils.ts";
import { useContext } from "react";
import { MapContext } from "@/context/MapProvider.tsx";

export default function ActionButtons() {
  const map = useMap();
  const {
    isSatelliteMode,
    isMenuOpened,
    setIsMenuOpened,
    setIsSatelliteMode,
    setIsFiltersSheetOpened,
    setIsResultsOpen,
    tabActive,
    practitioners,
    establishments,
  } = useContext(MapContext);
  const { handleUserLocationAsk } = useUserLocation();

  const handleClick = () => {
    const userLocation = handleUserLocationAsk();
    if (userLocation) map.setView(userLocation, 15);
  };

  return (
    <menu
      className={cn(
        "font-dosis absolute right-0 top-0 w-full md:w-fit md:h-full hover:cursor-default",
        {
          "bg-blue-50 bg-opacity-50": isSatelliteMode,
        },
      )}
    >
      <Button
        className={cn("absolute top-4 right-4 md:top-8 md:right-8", {
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
        <Button
          className={"md:invisible"}
          onClick={() => setIsMenuOpened(false)}
        >
          Masquer menu
        </Button>

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
        >
          {"Filtrer les résultats"}
        </Button>

        <Button variant={"secondary"} onClick={() => setIsResultsOpen(true)}>
          {`Visualiser les ${tabActive === "practitioner" ? practitioners.length : establishments.length} résultat${tabActive === "practitioner" ? (practitioners.length > 1 ? "s" : "") : establishments.length > 1 ? "s" : ""}`}
        </Button>

        <Button variant={"ghost"} onClick={handleClick}>
          <GlobeIcon className={"mr-2 h-4 w-4"} />
          Zoomer sur ma position
        </Button>
      </section>
    </menu>
  );
}
