import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import { StyledEngineProvider } from "@mui/material";
import StyledComponentsRegistry from "./StyledComponentRegistry";
import ReduxProvider from "@/configs/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Greentrack Application",
  description: "The carbon emission tracker application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable}`}>
        <ReduxProvider>
          <StyledEngineProvider injectFirst>
            <StyledComponentsRegistry>
              <ThemeRegistry>{children}</ThemeRegistry>
            </StyledComponentsRegistry>
          </StyledEngineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
