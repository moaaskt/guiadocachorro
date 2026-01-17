"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, PawPrint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efeito para detectar scroll e adicionar sombra/fundo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Raças", href: "/racas" },
    { name: "Saúde", href: "#" }, // Placeholder
    { name: "Curiosidades", href: "#" }, // Placeholder
    { name: "Sobre", href: "#" }, // Placeholder
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl transition-transform group-hover:rotate-12">
              <PawPrint size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Guia do Cão
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
            <Link
              href="/racas"
              className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-gray-900/10"
            >
              Explorar Raças
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg font-medium text-gray-900">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-gray-100 pb-4"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/racas"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white text-center py-4 rounded-xl font-bold mt-4"
              >
                Explorar Raças
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}