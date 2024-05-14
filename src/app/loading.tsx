"use client";

import { H1 } from "@/components/Typography.tsx";
import { MutatingDots } from "react-loader-spinner";
const Loading = () => {
  return (
    <main className={"w-screen h-screen flex items-center justify-center"}>
      <H1>Dokter.myapp.re</H1>
      <MutatingDots color={"#3066ff"} secondaryColor={"#ff0000"} />
    </main>
  );
};

export default Loading;
