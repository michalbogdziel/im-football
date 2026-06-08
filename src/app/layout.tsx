import { ClerkProvider } from "@clerk/nextjs";
import { plPL } from "@clerk/localizations";
import type { Metadata } from "next";
import { Poppins, Titillium_Web } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mundial 2026 | Inter-Metal",
  description:
    "Portal pracowniczy do typowania wyników Mistrzostw Świata 2026 — Inter-Metal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={plPL}>
      <html
        lang="pl"
        className={`${titillium.variable} ${poppins.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
