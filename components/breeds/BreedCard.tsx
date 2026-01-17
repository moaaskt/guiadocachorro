"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Definição do Tipo (Interface)
export interface Breed {
  id: string;
  name: string;
  slug: string;
  category: string;
  imageUrl: string;
  temperament?: string[]; // Opcional por enquanto
}

interface BreedCardProps {
  breed: Breed;
  index: number; // Para a animação em cascata
}

export function BreedCard({ breed, index }: BreedCardProps) {
  return (
    <motion.div
      // 1. Animação de Entrada (Fade Up em cascata)
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[400px] w-full overflow-hidden rounded-3xl cursor-pointer"
    >
      <Link href={`/racas/${breed.slug}`} className="block h-full w-full">
        
        {/* 2. A IMAGEM (Com Zoom no Hover) */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={breed.imageUrl}
            alt={breed.name}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay Escuro (Gradiente) para ler o texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
        </div>

        {/* 3. CONTEÚDO FLUTUANTE */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          
          {/* Badge de Vidro (Glassmorphism) */}
          <div className="mb-3 flex items-start">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {breed.category}
            </span>
          </div>

          {/* Título e Ícone */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white leading-tight">
                {breed.name}
              </h3>
              {/* Temperamento (se existir) - Escondido no mobile, aparece no desktop */}
              {breed.temperament && (
                <p className="mt-2 hidden md:block text-sm text-gray-300 line-clamp-1">
                  {breed.temperament.join(" • ")}
                </p>
              )}
            </div>

            {/* Botão Circular que gira no hover */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:-rotate-45 group-hover:scale-110">
              <ArrowUpRight size={20} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}