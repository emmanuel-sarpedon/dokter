import { useMap } from "react-leaflet";
import { useContext, useMemo } from "react";
import { MapContext } from "@/context/MapProvider.tsx";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar.tsx";
import { toast } from "sonner";

export default function ActionButtons() {
  const map = useMap();

  const {
    isSatelliteMode,
    setIsSatelliteMode,
    setIsFiltersSheetOpened,
    setIsResultsOpen,
    tabActive,
    practitioners,
    establishments,
    userLocation,
    getUserLocation,
  } = useContext(MapContext);

  const numberOfResults = useMemo(() => {
    return tabActive === "practitioner"
      ? practitioners.length
      : establishments.length;
  }, [tabActive, practitioners.length, establishments.length]);

  const isMac =
    typeof window !== "undefined" &&
    navigator.userAgent.toLowerCase().includes("mac");

  return (
    <>
      <Menubar
        className={
          "absolute bottom-2 right-4 md:top-4 md:right-1/2 md:translate-x-1/2 font-dosis"
        }
      >
        <MenubarMenu>
          <MenubarTrigger className={"font-bold"}>Recherche</MenubarTrigger>

          <MenubarContent>
            <MenubarItem
              onClick={() => setIsFiltersSheetOpened(true)}
            >{`Filter les résultats (${numberOfResults})`}</MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              onClick={() => setIsResultsOpen(true)}
            >{`Lister tous les résultats (${numberOfResults})`}</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className={"font-bold"}>Carte</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Type de carte</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarCheckboxItem
                  checked={!isSatelliteMode}
                  onCheckedChange={(bool) => setIsSatelliteMode(!bool)}
                >
                  Par défaut
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                  checked={isSatelliteMode}
                  onCheckedChange={(bool) => setIsSatelliteMode(bool)}
                >
                  Satellite
                </MenubarCheckboxItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarItem onClick={() => window.location.reload()}>
              Actualiser
              <MenubarShortcut className={"invisible md:visible"}>
                {isMac ? "⌘" : "Ctrl"}R
              </MenubarShortcut>
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem
              onClick={async () => {
                if (userLocation) {
                  map.flyTo(userLocation);
                  return;
                }

                toast("Sécurité et confidentialité", {
                  description:
                    "Nous avons besoin de votre autorisation pour accéder à votre position. Veuillez activer la géolocalisation dans les paramètres de votre navigateur.",
                });

                const location = await getUserLocation();
                location && map.flyTo(location);
              }}
            >
              Zoomer sur ma position
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
    // <menu
    //   className={cn(
    //     "font-dosis absolute right-0 top-0 w-full md:w-fit md:h-full hover:cursor-default",
    //     {
    //       "bg-blue-50 bg-opacity-50": isSatelliteMode,
    //     },
    //   )}
    // >
    //   <Button
    //     className={cn("absolute top-4 right-4 md:top-8 md:right-8", {
    //       hidden: isMenuOpened,
    //     })}
    //     onClick={() => setIsMenuOpened(true)}
    //   >
    //     Afficher menu
    //   </Button>
    //
    //   <section
    //     className={cn("p-4 md:p-8 flex flex-col gap-y-4", {
    //       hidden: !isMenuOpened,
    //     })}
    //   >
    //     <Button
    //       className={"md:invisible"}
    //       onClick={() => setIsMenuOpened(false)}
    //     >
    //       Masquer menu
    //     </Button>
    //
    //     <div className={"flex items-center gap-x-4"}>
    //       <Switch
    //         id="satellite-mode"
    //         checked={isSatelliteMode}
    //         onCheckedChange={(e) => {
    //           setIsSatelliteMode(e);
    //         }}
    //       />
    //       <Label htmlFor="satellite-mode" className={"font-bold"}>
    //         Vue Satellite
    //       </Label>
    //     </div>
    //
    //     <Button
    //       variant={"secondary"}
    //       onClick={() => setIsFiltersSheetOpened(true)}
    //     >
    //       {"Filtrer les résultats"}
    //     </Button>
    //
    //     <Button variant={"secondary"} onClick={() => setIsResultsOpen(true)}>
    //       {`Visualiser les ${tabActive === "practitioner" ? practitioners.length : establishments.length} résultat${tabActive === "practitioner" ? (practitioners.length > 1 ? "s" : "") : establishments.length > 1 ? "s" : ""}`}
    //     </Button>
    //
    //     <Button variant={"ghost"} onClick={handleClick}>
    //       <GlobeIcon className={"mr-2 h-4 w-4"} />
    //       Zoomer sur ma position
    //     </Button>
    //   </section>
    // </menu>
  );
}
