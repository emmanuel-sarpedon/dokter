import { useState } from "react";
import { LatLngTuple } from "leaflet";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);

  const getUserLocation = async (): Promise<LatLngTuple> => {
    return new Promise((resolve) => {
      if (userLocation) resolve(userLocation);

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        return resolve([latitude, longitude]);
      });
    });
  };

  return { getUserLocation, userLocation };
};
