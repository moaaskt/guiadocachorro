"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TOCItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TOCItem[];
  backLink: string;
  backLabel: string;
}

export function TableOfContents({ items, backLink, backLabel }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const offset = 100; // Offset para ativar antes do topo exato

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      // Encontra o último heading que passou do topo
      let currentId = "";
      
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            currentId = item.id;
          } else {
            break;
          }
        }
      }

      // Se não encontrou nenhum (ainda está antes do primeiro), deixa vazio ou ativa o primeiro
      if (!currentId && items.length > 0) {
        const firstElement = document.getElementById(items[0].id);
        if (firstElement && scrollPosition < firstElement.offsetTop) {
          // Ainda não chegou no primeiro elemento, não ativa nenhum
          currentId = "";
        } else {
          // Fallback: ativa o primeiro se todos falharem
          currentId = items[0].id;
        }
      }

      setActiveId(currentId);
    };

    // Executa imediatamente para definir o estado inicial
    handleScroll();

    // Adiciona listener de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items, offset]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(() => {
        // Fallback: copiar para clipboard
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <aside
      className={cn(
        "sticky top-24",
        "max-h-[80vh] overflow-y-auto",
        "bg-white/70 backdrop-blur-lg",
        "border border-white/40 shadow-xl shadow-black/5",
        "rounded-2xl p-6",
        "hidden lg:block" // Oculto no mobile, visível no desktop
      )}
    >
      {/* Cabeçalho - Botão Voltar */}
      <div className="mb-6 pb-4 border-b border-gray-200/50">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
      </div>

      {/* Lista de Links */}
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isLevel3 = item.level === 3;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  const elementTop = element.offsetTop - 80; // Offset para compensar header fixo
                  window.scrollTo({
                    top: elementTop,
                    behavior: "smooth",
                  });
                }
              }}
              className={cn(
                "block px-3 py-2 rounded-lg transition-all duration-200",
                "border-l-4",
                isActive
                  ? "border-blue-600 bg-blue-50/50 text-blue-900 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50",
                isLevel3 && "ml-4"
              )}
            >
              {item.text}
            </a>
          );
        })}
      </nav>

      {/* Rodapé - Botão Compartilhar */}
      <div className="mt-6 pt-4 border-t border-gray-200/50">
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-accent hover:bg-gray-50/50 transition-colors"
        >
          <Share2 size={16} />
          Compartilhar
        </button>
      </div>
    </aside>
  );
}
