"use client";

import dynamic from "next/dynamic";
import { MapProvider } from "@/context/MapProvider.tsx";

export default function Home() {
  const Map = dynamic(() => import("@/components/Map.tsx"), { ssr: false });

  return (
    <main>
      <div className={"w-screen h-screen border relative"}>
        <MapProvider>
          <Map />
        </MapProvider>
      </div>
    </main>
  );
}
