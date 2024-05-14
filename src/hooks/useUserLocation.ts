import { useCallback, useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);

  const handleUserLocationAsk: () => LatLngTuple | null = useCallback(() => {
    if (userLocation) return userLocation;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);

      return [latitude, longitude];
    });

    return null;
  }, [userLocation]);

  return { handleUserLocationAsk };
};
