import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-montserrat" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: { default: "Zetta Tutoriales — La Plataforma #1 para Descargar Programas PC", template: "%s | Zetta Tutoriales" },
  description: "Descarga los mejores programas para PC gratis y verificados. WordPress themes, HTML5 templates, kits UI y más. Canal YouTube Zetta Tutoriales.",
  keywords: "programas PC, descargar software, tutoriales, WordPress, HTML5, Zetta Tutoriales",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es" suppressHydrationWarning className={`${montserrat.variable} ${poppins.variable} antialiased`} style={{ colorScheme: "dark" }}>
        <body className="dot-grid min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
