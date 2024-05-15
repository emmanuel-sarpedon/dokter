"use client";

import dynamic from "next/dynamic";
import { MapProvider } from "@/context/MapProvider.tsx";
import { MutatingDots } from "react-loader-spinner";
import { H1 } from "@/components/Typography.tsx";

export default function Home() {
  const Map = dynamic(() => import("@/components/Map.tsx"), {
    ssr: false,
    loading: () => (
      <section className={"w-screen h-dvh flex items-center justify-center"}>
        <H1>Dokter.myapp.re</H1>
        <MutatingDots color={"#3066ff"} secondaryColor={"#ff0000"} />
      </section>
    ),
  });

  return (
    <main>
      <div className={"w-screen h-dvh border relative"}>
        <MapProvider>
          <Map />
        </MapProvider>
      </div>
    </main>
  );
}
