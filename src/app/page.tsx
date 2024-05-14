"use client";

import dynamic from "next/dynamic";
import { MapProvider } from "@/context/MapProvider.tsx";
import { Suspense } from "react";
import GooeyCircleLoader from "react-loaders-kit/lib/gooeyCircle/GooeyCircleLoader";

export default function Home() {
  const Map = dynamic(() => import("@/components/Map.tsx"), { ssr: false });

  return (
    <main>
      <div className={"w-screen h-screen border relative"}>
        <MapProvider>
          <Suspense
            fallback={
              <GooeyCircleLoader
                loading
                colors={["#3066ff", "#ffff00", "#ff0000"]}
              />
            }
          >
            <Map />
          </Suspense>
        </MapProvider>
      </div>
    </main>
  );
}
