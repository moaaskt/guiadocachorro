"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HoverCardProps {
  title: string;
  description: string;
  staticImage: string; // URL da foto parada
  hoverImage: string;  // URL do GIF ou foto de ação
  link: string;
  className?: string;
}

export function HoverCard({ title, description, staticImage, hoverImage, link, className }: HoverCardProps) {
  return (
    <Link href={link} className={cn("block w-full max-w-xs mx-auto", className)}>
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative h-96 rounded-2xl shadow-xl flex flex-col justify-end p-6 border border-stone-200",
          "bg-cover bg-center transition-all duration-500",
          // Foto estática (Padrão)
          "bg-stone-900" 
        )}
        style={{ backgroundImage: `url(${staticImage})` }}
      >
        {/* O truque do Hover (Pseudo-elementos não funcionam bem com URLs dinâmicas em inline styles, 
            então usamos uma div absoluta para a imagem de hover) */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{ backgroundImage: `url(${hoverImage})` }}
        />
        
        {/* Overlay Escuro no Hover para ler o texto */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Conteúdo */}
        <div className="relative z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-black text-2xl text-white drop-shadow-md group-hover:text-amber-400 transition-colors">
            {title}
          </h3>
          <p className="font-medium text-stone-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}