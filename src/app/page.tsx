"use client";

import dynamic from "next/dynamic";

export default function Home() {
  const Map = dynamic(() => import("@/components/Map.tsx"), { ssr: false });

  return (
    <main>
      <div className={"w-screen h-screen border relative"}>
        <Map />
      </div>
    </main>
  );
}
