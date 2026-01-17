"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BreedCard, Breed } from "@/components/breeds/BreedCard";
import { CategoryFilter } from "@/components/breeds/CategoryFilter";

// DADOS MOCKADOS (Com imagens Unsplash em HD que não quebram)
const MOCK_BREEDS: Breed[] = [
  {
    id: "1",
    name: "Golden Retriever",
    slug: "golden-retriever",
    category: "Família",
    // Imagem Unsplash real
    imageUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=800&auto=format&fit=crop",
    temperament: ["Inteligente", "Amigável", "Devoto"],
  },
  {
    id: "2",
    name: "Husky Siberiano",
    slug: "husky-siberiano",
    category: "Energia Alta",
    imageUrl: "https://images.unsplash.com/photo-1547407139-4c925a5c1a85?q=80&w=800&auto=format&fit=crop",
    temperament: ["Energético", "Independente"],
  },
  {
    id: "3",
    name: "Bulldog Francês",
    slug: "bulldog-frances",
    category: "Apartamento",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop",
    temperament: ["Afetuoso", "Calmo"],
  },
  {
    id: "4",
    name: "Border Collie",
    slug: "border-collie",
    category: "Trabalho",
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=800&auto=format&fit=crop",
    temperament: ["Gênio", "Atlético"],
  },
  {
    id: "5",
    name: "Pug",
    slug: "pug",
    category: "Apartamento",
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop",
    temperament: ["Charmoso", "Teimoso"],
  },
   {
    id: "6",
    name: "Pastor Alemão",
    slug: "pastor-alemao",
    category: "Guarda",
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=800&auto=format&fit=crop",
    temperament: ["Corajoso", "Leal"],
  },
];

// Extrair categorias únicas + "Todos"
const CATEGORIES = ["Todos", ...Array.from(new Set(MOCK_BREEDS.map((b) => b.category)))];

export default function RacasPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Lógica de filtragem
  const filteredBreeds = MOCK_BREEDS.filter((breed) => 
    activeCategory === "Todos" ? true : breed.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-24 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* CABEÇALHO */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-6xl mb-4 tracking-tight">
            Descubra sua <br />
            <span className="text-blue-600">companhia perfeita.</span>
          </h1>
          
          {/* BARRA DE FILTROS */}
          <div className="mt-8">
            <CategoryFilter 
              categories={CATEGORIES} 
              activeCategory={activeCategory} 
              onSelect={setActiveCategory} 
            />
          </div>
        </div>

        {/* GRADE INTELIGENTE (Masonry / Grid) */}
        <motion.div 
          layout 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} index={0} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Estado Vazio (caso filtro não ache nada) */}
        {filteredBreeds.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            Nenhum cãozinho encontrado nessa categoria. 🐶
          </div>
        )}

      </div>
    </main>
  );
}