import { useContext } from "react";
import { MapContext } from "@/context/MapProvider.tsx";
import PractitionerMarkers from "@/components/PractitionerMarkers.tsx";
import EstablishmentMarkers from "@/components/EstablishmentMarkers.tsx";
import UserMarker from "@/components/UserMarker.tsx";

const Markers = () => {
  const { tabActive } = useContext(MapContext);

  if (tabActive === "practitioner") {
    return (
      <>
        <PractitionerMarkers />
        <UserMarker />
      </>
    );
  }

  if (tabActive === "establishment") {
    return (
      <>
        <EstablishmentMarkers />
        <UserMarker />
      </>
    );
  }

  return null;
};

export default Markers;
