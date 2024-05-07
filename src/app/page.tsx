"use client";

import dynamic from "next/dynamic";
// import Map from "@/components/Map"
export default function Home() {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });

  return (
    <main>
      <div className={"w-screen h-screen border"}>
        <Map />
      </div>
    </main>
  );
}
