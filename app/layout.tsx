import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header"; 
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guia do Cão | Tudo sobre seu melhor amigo",
  description: "Guia completo de raças, saúde e cuidados para cachorros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 bg-white`}>
        
        <Header />

        {children}

        <Footer />
        
      </body>
    </html>
  );
}