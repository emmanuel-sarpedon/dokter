import { Dosis } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
const DosisFont = Dosis({ subsets: ["latin"], variable: "--font-dosis" });

export const metadata = {
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🇷🇪</text></svg>",
  title:
    "Dokter | Trouvez facilement un médecin généraliste, un dentiste ou un établissement de santé",
  description:
    "La plateforme qui vous permet de trouver facilement un praticien ou un établissement de santé à La Réunion. Localisez, contactez et prenez rendez-vous !",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <GoogleTagManager gtmId={"GTM-M8TDMF57"} />
      <GoogleAnalytics gaId={"G-6G4V712XV5"} />

      <body className={cn(DosisFont.variable, "font-dosis min-h-dvh")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
