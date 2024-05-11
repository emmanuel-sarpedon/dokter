import { Dosis } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const DosisFont = Dosis({ subsets: ["latin"], variable: "--font-dosis" });

export const metadata = {
  title:
    "Dokter.re - Trouvez facilement un médecin généraliste ou un spécialiste à proximité",
  description:
    "La plateforme qui vous permet de trouver facilement un médecin généraliste ou un spécialiste à proximité de chez vous. Trouvez un professionnel de santé, récupérez son contact et prenez rendez-vous !",
};

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
