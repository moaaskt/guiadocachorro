"use client";

import { PawPrint } from "lucide-react";

export default function PawLoader() {
  // Configuração das patinhas (6 passos)
  const paws = Array.from({ length: 6 });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      {/* Definição da animação via style tag para encapsulamento */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes paw-walk {
            0% { opacity: 0; transform: scale(0.8); }
            20% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.8); }
          }
        `
      }} />

      <div className="flex items-center gap-4">
        {paws.map((_, i) => {
          const isLeftPaw = i % 2 === 0;
          return (
            <PawPrint
              key={i}
              // Alternância de rotação e leve desnivelamento vertical para efeito de "caminhada"
              className={`
                h-10 w-10 text-accent
                ${isLeftPaw ? "-rotate-12 mt-4" : "rotate-12 mb-4"}
              `}
              style={{
                opacity: 0, // Começa invisível
                animation: "paw-walk 2s ease-in-out infinite",
                animationDelay: `${i * 0.3}s` // Delay sequencial
              }}
              aria-hidden="true"
            />
          );
        })}
      </div>
      
      {/* Texto opcional de carregamento, visualmente oculto ou discreto se desejar */}
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
