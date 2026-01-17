import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Usando Inter padrão (ou Geist se preferir)
import "./globals.css";
import { Header } from "@/components/Header"; // 👈 IMPORTANTE: Importando o componente

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guia do Cachorro",
  description: "Tudo o que você precisa saber para cuidar bem do seu cachorro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased`}>
        
       
        <Header />

        {children}
      </body>
    </html>
  );
}