"use client";

import GooeyCircleLoader from "react-loaders-kit/lib/gooeyCircle/GooeyCircleLoader";
import { H1 } from "@/components/Typography.tsx";

const Loading = () => {
  return (
    <main className={"w-screen h-screen flex items-center justify-center"}>
      <H1>Dokter.myapp.re</H1>
      <GooeyCircleLoader loading colors={["#3066ff", "#ffff00", "#ff0000"]} />
    </main>
  );
};

export default Loading;
