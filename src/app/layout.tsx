import { Dosis } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const DosisFont = Dosis({ subsets: ["latin"], variable: "--font-dosis" });

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body className={cn(DosisFont.variable, "font-dosis min-h-screen")}>
        {children}
      </body>
    </html>
  );
}
