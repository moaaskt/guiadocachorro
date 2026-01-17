"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { BreedCard } from "@/components/breeds/BreedCard";
import { Breed } from "@/lib/data/breeds";
import { CategoryFilter } from "@/components/breeds/CategoryFilter";

export function BreedGrid({ breeds }: { breeds: Breed[] }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = useMemo(() => {
    const cats = new Set(breeds.map((b) => b.category));
    return ["Todos", ...Array.from(cats)];
  }, [breeds]);

  const filteredBreeds = useMemo(() => {
    return breeds.filter((breed: Breed) => {
      const matchesCategory = activeCategory === "Todos" || breed.category === activeCategory;
      const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [breeds, activeCategory, searchTerm]);

  return (
    <div className="space-y-8">
      
      {/* CONTROLES (Busca + Filtros) */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Barra de Busca Estilo "Apple" */}
        <div className="relative w-full md:w-96">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Buscar raça (ex: Husky)..."
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Componente de Filtro que já criamos */}
        <div className="w-full md:w-auto overflow-x-auto">
           <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onSelect={setActiveCategory} 
            />
        </div>
      </div>

      {/* RESULTADOS */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredBreeds.map((breed) => (
            <BreedCard key={breed.id} breed={breed} index={0} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State (Bonito) */}
      {filteredBreeds.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-4xl">🐶❓</div>
          <h3 className="text-lg font-semibold text-gray-900">Nenhum cãozinho encontrado</h3>
          <p className="text-gray-500">Tente mudar a categoria ou o termo da busca.</p>
          <button 
            onClick={() => {setActiveCategory("Todos"); setSearchTerm("");}}
            className="mt-4 text-blue-600 hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}