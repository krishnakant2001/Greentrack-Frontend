import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
