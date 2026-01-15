import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guia do Cachorro",
  description: "Guia do Cachorro - Tudo o que você precisa saber para cuidar bem do seu cachorro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {/* NAVBAR FIXA DO SITE */}
        <header className="h-16 border-b">
          <div className="mx-auto max-w-7xl px-6 h-full flex items-center font-bold">
            Guia do Cachorro
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
