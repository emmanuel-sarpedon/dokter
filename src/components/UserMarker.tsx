import { useContext, useEffect } from "react";
import { MapContext } from "@/context/MapProvider.tsx";
import { Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";

const UserMarker = () => {
  const { userLocation } = useContext(MapContext);
  const map = useMap();

  useEffect(() => {
    if (userLocation) map.setView(userLocation, 18);
  }, [userLocation, map]);

  if (!userLocation) return null;

  return (
    <Marker
      position={userLocation}
      icon={L.icon({
        iconUrl: "/map-pin.svg",
        iconSize: [30, 30],
      })}
    >
      <Tooltip
        direction="top"
        position={userLocation}
        className={"font-bold"}
        permanent
        offset={[0, -20]}
      >
        📍 Votre localisation
      </Tooltip>
    </Marker>
  );
};

export default UserMarker;
