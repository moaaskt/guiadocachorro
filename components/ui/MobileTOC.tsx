"use client";

import { useState } from "react";
import { List, X, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TOCItem } from "@/lib/toc";

interface MobileTOCProps {
  items: TOCItem[];
}

export function MobileTOC({ items }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) {
    return null;
  }

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    // Pequeno delay para garantir que o drawer fechou antes de rolar
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const elementTop = element.offsetTop - 100; // Offset para compensar header e mobile UI
        window.scrollTo({
          top: elementTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <>
      {/* BOTÃO FLUTUANTE (Trigger) */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
          "lg:hidden", // Só aparece em mobile
          "flex items-center gap-2 px-5 py-3 rounded-full",
          "bg-primary/90 backdrop-blur-md text-white",
          "shadow-lg shadow-black/20",
          "font-medium text-sm",
          "transition-all duration-300",
          "hover:bg-primary hover:scale-105",
          "active:scale-95",
          isOpen && "opacity-0 pointer-events-none"
        )}
        aria-label="Abrir índice do artigo"
      >
        <List size={18} />
        <span>Índice</span>
      </button>

      {/* OVERLAY (Fundo escuro quando aberto) */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 bg-black/40 backdrop-blur-sm z-50",
            "lg:hidden",
            "transition-opacity duration-300"
          )}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* DRAWER (Bottom Sheet) */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "lg:hidden",
          "bg-white rounded-t-2xl shadow-2xl",
          "transition-transform duration-300 ease-out",
          "max-h-[80vh] overflow-hidden flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* HEADER DO DRAWER */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Índice do Artigo</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fechar índice"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* LISTA DE LINKS (Scrollável) */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          <nav className="space-y-1">
            {items.map((item) => {
              const isLevel3 = item.level === 3;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={cn(
                    "block px-4 py-3 rounded-lg transition-all duration-200",
                    "border-l-4 border-transparent",
                    "text-gray-700 hover:bg-gray-50 hover:text-primary",
                    "font-medium text-sm",
                    isLevel3 && "ml-4 text-gray-600"
                  )}
                >
                  {item.text}
                </a>
              );
            })}
          </nav>
        </div>

        {/* FOOTER (Indicador de arrastar para fechar) */}
        <div className="flex justify-center p-3 border-t border-gray-100">
          <ChevronUp size={24} className="text-gray-400" />
        </div>
      </div>
    </>
  );
}
