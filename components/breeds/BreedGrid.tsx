"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Home, Zap, Shield, Heart, Dog, Filter, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Breed } from "@/lib/data/breeds";

// --- CONFIGURAÇÃO DOS FILTROS VISUAIS ---
const CATEGORY_CONFIG: Record<string, { icon: any; label: string; color: string }> = {
  "Todas": { icon: Filter, label: "Todas", color: "bg-stone-800" },
  "Família": { icon: Heart, label: "Família", color: "bg-rose-500" },
  "Apartamento": { icon: Home, label: "Apartamento", color: "bg-blue-500" },
  "Guarda": { icon: Shield, label: "Guarda", color: "bg-stone-600" },
  "Energia Alta": { icon: Zap, label: "Energia", color: "bg-amber-500" },
  "Companhia": { icon: Dog, label: "Companhia", color: "bg-indigo-500" },
  "default": { icon: Dog, label: "Outros", color: "bg-primary" }
};

// --- CARD DA RAÇA ---
const BreedCard = ({ breed }: { breed: Breed }) => {
  return (
    <Link href={`/racas/${breed.slug}`} className="group block h-full">
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="h-full bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 hover:-translate-y-2"
      >
        <div className="relative h-64 overflow-hidden bg-stone-100">
          <Image
            src={breed.image_url}
            alt={breed.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <span className="text-white font-bold text-lg drop-shadow-md tracking-tight">
              {breed.name}
            </span>
            <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {breed.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {breed.characteristics?.slice(0, 3).map((char) => (
              <span key={char} className="text-xs font-medium text-stone-500 bg-stone-50 border border-stone-100 px-3 py-1 rounded-full">
                {char}
              </span>
            ))}
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
            Ver detalhes <span className="text-accent">→</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

interface BreedGridProps {
  breeds: Breed[];
}

export function BreedGrid({ breeds }: BreedGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isExpanded, setIsExpanded] = useState(false); // NOVO ESTADO: Controla a expansão

  const categories = useMemo(() => {
    const cats = breeds.map((b) => b.category);
    return ["Todas", ...new Set(cats)];
  }, [breeds]);

  const filteredBreeds = useMemo(() => {
    return breeds.filter((breed) => {
      const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todas" || breed.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [breeds, searchTerm, selectedCategory]);

  // Define quais categorias mostrar (5 ou todas)
  const visibleCategories = isExpanded ? categories : categories.slice(0, 5);
  const hiddenCount = categories.length - 5;

  return (
    <div className="space-y-10">
      
      {/* COMMAND BAR */}
      <div className="bg-white rounded-[2rem] p-2 shadow-xl shadow-stone-200/40 border border-stone-100 sticky top-24 z-30 max-w-5xl mx-auto backdrop-blur-xl bg-white/80">
        <div className="flex flex-col md:flex-row gap-2">
          
          {/* Buscador */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-transparent border-none text-stone-900 placeholder:text-stone-400 focus:ring-0 sm:text-sm font-medium h-full rounded-xl hover:bg-stone-50 focus:bg-white transition-colors"
              placeholder="Qual raça você procura?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="hidden md:block w-px bg-stone-200 my-2"></div>

          {/* Filtros Inteligentes com Expansão */}
          <div className="flex-1 flex flex-wrap gap-2 items-center justify-start md:justify-end p-2 md:p-0 transition-all duration-300">
            {visibleCategories.map((cat) => {
              const config = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG["default"];
              const Icon = config.icon;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? `${config.color} text-white shadow-md transform scale-105` 
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700"
                  }`}
                >
                  <Icon size={16} />
                  <span>{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBubble"
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
            
            {/* Botão de Expandir (+X) */}
            {!isExpanded && hiddenCount > 0 && (
               <button 
                 onClick={() => setIsExpanded(true)}
                 className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-stone-400 hover:text-primary transition-colors bg-stone-50 rounded-full hover:bg-stone-100"
               >
                 + {hiddenCount}
               </button>
            )}

            {/* Botão de Recolher (Seta pra cima) */}
            {isExpanded && hiddenCount > 0 && (
               <button 
                 onClick={() => setIsExpanded(false)}
                 className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-stone-400 hover:text-primary transition-colors bg-stone-50 rounded-full hover:bg-stone-100"
                 title="Recolher filtros"
               >
                 <ChevronUp size={16} />
               </button>
            )}
          </div>
        </div>
      </div>

      {/* RESULTADOS */}
      <div className="min-h-[400px]">
        {filteredBreeds.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredBreeds.map((breed) => (
                <BreedCard key={breed.id} breed={breed} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Search className="w-10 h-10 text-stone-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Nenhum cãozinho encontrado</h3>
            <p className="text-stone-500 max-w-xs mx-auto">
              Tente mudar os filtros ou limpar a busca.
            </p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedCategory("Todas"); }}
              className="mt-8 text-accent font-bold hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}