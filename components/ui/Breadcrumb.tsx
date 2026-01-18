"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";

// Mapeamento de rotas para nomes amigáveis
const routeNames: Record<string, string> = {
  racas: "Guia de Raças",
  blog: "Blog",
  sobre: "Sobre",
  contato: "Contato",
};

// Formata o slug para exibição (remove hífens, capitaliza)
function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface BreadcrumbProps {
  /** Nome personalizado para a página atual (útil para títulos de artigos/raças) */
  currentPageName?: string;
  /** Classes CSS adicionais */
  className?: string;
}

export function Breadcrumb({ currentPageName, className = "" }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Divide o path e remove strings vazias
  const segments = pathname.split("/").filter(Boolean);
  
  // Se estiver na home, não mostra breadcrumb
  if (segments.length === 0) return null;

  // Gera os items do breadcrumb com links acumulativos
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    
    // Nome para exibição
    let name: string;
    if (isLast && currentPageName) {
      name = currentPageName;
    } else if (routeNames[segment]) {
      name = routeNames[segment];
    } else {
      name = formatSlug(segment);
    }

    return { href, name, isLast };
  });

  return (
    <nav 
      aria-label="Breadcrumb"
      className={`inline-flex items-center ${className}`}
    >
      {/* Container Cápsula com Glassmorphism */}
      <ol className="flex items-center gap-1 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 px-4 py-2 shadow-sm overflow-x-auto scrollbar-hide">
        {/* Home */}
        <li className="flex items-center shrink-0">
          <Link
            href="/"
            className="flex items-center justify-center text-gray-500 hover:text-accent transition-colors duration-200"
            aria-label="Página inicial"
          >
            <Home size={16} />
          </Link>
        </li>

        {/* Separador após Home */}
        <li className="flex items-center shrink-0 text-gray-300" aria-hidden="true">
          <ChevronRight size={14} />
        </li>

        {/* Segments */}
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center min-w-0">
            {item.isLast ? (
              // Página atual (sem link, cor de destaque)
              <span 
                className="text-sm font-medium text-gray-900 max-w-[200px] truncate"
                aria-current="page"
                title={item.name}
              >
                {item.name}
              </span>
            ) : (
              // Link para página intermediária
              <>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-500 hover:text-accent transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </Link>
                <span className="mx-1 text-gray-300 shrink-0" aria-hidden="true">
                  <ChevronRight size={14} />
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
