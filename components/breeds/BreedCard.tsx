"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
// IMPORTANTE: Importamos o tipo oficial do nosso arquivo de dados
import { Breed } from "@/lib/data/breeds"; 

interface BreedCardProps {
  breed: Breed;
  index: number;
}

export function BreedCard({ breed, index }: BreedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[400px] w-full overflow-hidden rounded-3xl cursor-pointer"
    >
      <Link href={`/racas/${breed.slug}`} className="block h-full w-full">
        
        <div className="absolute inset-0 h-full w-full">
          {/* AQUI ESTÁ A MUDANÇA: Usamos image_url direto */}
          <Image
            src={breed.image_url} 
            alt={breed.name}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="mb-3 flex items-start">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {breed.category}
            </span>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white leading-tight">
                {breed.name}
              </h3>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:-rotate-45 group-hover:scale-110">
              <ArrowUpRight size={20} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}