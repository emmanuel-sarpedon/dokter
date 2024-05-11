"use client";

import SearchEngine from "@/components/SearchEngine.tsx";
import { MapContext } from "@/context/MapContext.ts";
import { usePractitioners } from "@/hooks/usePractitioners.ts";
import { useUserLocation } from "@/hooks/useUserLocation.ts";
import Map from "@/components/Map.tsx";

export default function Home() {
  const {
    isFetchingPractitioner,
    practitioners,
    setPractitioners,
    handleFetchPractitioners,
  } = usePractitioners();
  const userLocation = useUserLocation();

  return (
    <MapContext.Provider
      value={{
        isFetchingPractitioner,
        practitioners,
        setPractitioners,
        handleFetchPractitioners,
        userLocation,
      }}
    >
      <main>
        <div className={"w-screen h-screen border relative"}>
          <Map>
            <SearchEngine />
          </Map>
        </div>
      </main>
    </MapContext.Provider>
  );
}
