"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PawPrint } from "lucide-react"; // Ícones novos

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Raças", href: "/racas" }, // Vai para o seu 404 bonito por enquanto
  { label: "Sobre", href: "/sobre" }, 
  { label: "Termos", href: "/termos-de-uso" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        
        {/* LOGO */}
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={closeMenu}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <PawPrint size={18} strokeWidth={3} />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Guia do Cão
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-blue-600 font-semibold" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* BOTÃO MOBILE (O que faltava!) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENU MOBILE EXPANDIDO */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-64px)] bg-white px-6 py-8 shadow-xl animate-in slide-in-from-top-5">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => {
               const isActive = pathname === item.href;
               return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex w-full items-center rounded-xl px-4 py-4 text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}