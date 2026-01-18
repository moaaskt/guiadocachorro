"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Dog } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Raças", href: "/racas" },
    { name: "Blog", href: "/blog" },
    { name: "Sobre Nós", href: "/sobre" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Dog size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Guia do <span className="text-blue-600">Cachorro</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Botão de Destaque */}
            <Link
              href="/racas"
              className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Explorar Raças
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV (Expandable) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-gray-600 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-100 my-2" />
            <Link
              href="/racas"
              onClick={() => setIsMenuOpen(false)}
              className="text-center w-full px-5 py-3 rounded-xl bg-blue-600 text-white font-bold"
            >
              Explorar Raças
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}