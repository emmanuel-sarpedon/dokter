import { useContext, useEffect } from "react";
import { MapContext } from "@/context/MapProvider.tsx";
import { Marker, Tooltip, useMap } from "react-leaflet";

const UserMarker = () => {
  const { userLocation } = useContext(MapContext);
  const map = useMap();

  useEffect(() => {
    if (userLocation) map.setView(userLocation, 18);
  }, [userLocation, map]);

  if (!userLocation) return null;

  return (
    <Marker position={userLocation}>
      <Tooltip
        direction="top"
        position={userLocation}
        offset={[-15, -15]}
        opacity={0.85}
        permanent
      >
        📍 Votre localisation
      </Tooltip>
    </Marker>
  );
};

export default UserMarker;
