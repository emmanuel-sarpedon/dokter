import { Dosis } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

const DosisFont = Dosis({ subsets: ["latin"], variable: "--font-dosis" });

export const metadata = {
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🇷🇪</text></svg>",
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
      <GoogleTagManager gtmId={"GTM-M8TDMF57"} />
      <GoogleAnalytics gaId={"G-6G4V712XV5"} />

      <body className={cn(DosisFont.variable, "font-dosis min-h-screen")}>
        {children}
      </body>
    </html>
  );
}
