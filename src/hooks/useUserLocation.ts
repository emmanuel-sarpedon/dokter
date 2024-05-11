import { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);
    });
  }, []);

  return userLocation;
};
