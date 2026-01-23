"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

// --- Constantes de Imagem ---
const DOG_IMAGES = {
  puppy: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=800&q=80",
  adult: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80",
  senior: "https://images.unsplash.com/photo-1545557286-56d1c89d43e3?w=800&q=80",
};

// --- Tipos & Interfaces ---
type DogSize = "small" | "medium" | "large";

interface LifeStage {
  label: string;
  emoji: string;
  message: string;
  color: string;
  image: string; // Adicionado para controlar a imagem
}

// --- Ícones SVG Inline para os Portes ---
const DogIconSmall = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path d="M17 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path d="M13 8.5L10 16" />
    <path d="M17 14l-2.5-6.5" />
    <path d="M19 13c.6-1 1-2.5 1-4 0-2.2-1.8-4-4-4-1.5 0-2.8.8-3.5 2" />
    <path d="M9 10c0-1.1.9-2 2-2h1" />
    <path d="M7 13l2-3" />
    <path d="M5 14v2" />
  </svg>
);

const DogIconMedium = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 14v4" />
    <path d="M16 14v4" />
    <path d="M11 10.5L8 14" />
    <path d="M16 14l-2.5-6.5" />
    <path d="M19 11c.6-1 1-2.5 1-4 0-2.2-1.8-4-4-4-1.5 0-2.8.8-3.5 2" />
    <path d="M10 9c0-1.1.9-2 2-2h1" />
    <path d="M6 12l2-3" />
    <path d="M4 13v3" />
  </svg>
);

const DogIconLarge = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 13v5" />
    <path d="M17 13v5" />
    <path d="M12 9.5L7 13" />
    <path d="M17 13l-3-6.5" />
    <path d="M21 10c.6-1 1-2.5 1-4 0-2.2-1.8-4-4-4-1.5 0-2.8.8-3.5 2" />
    <path d="M11 8c0-1.1.9-2 2-2h1" />
    <path d="M5 11l2-3" />
    <path d="M3 12v4" />
  </svg>
);

// --- Lógica de Negócio ---
const calculateDogAge = (humanYears: number, size: DogSize): number => {
  if (humanYears === 0) return 0;
  
  if (humanYears <= 1) return 15;
  if (humanYears <= 2) return 24;

  const yearsAfterTwo = humanYears - 2;

  switch (size) {
    case "small":
      return 24 + yearsAfterTwo * 4;
    case "medium":
      return 24 + yearsAfterTwo * 5;
    case "large":
      return 24 + yearsAfterTwo * 6;
    default:
      return 0;
  }
};

const getLifeStage = (dogAge: number): LifeStage => {
  if (dogAge < 20) {
    return { 
      label: "Fase Filhote", 
      emoji: "🍼", 
      message: "Descobrindo o mundo com energia infinita!", 
      color: "text-blue-500",
      image: DOG_IMAGES.puppy
    };
  }
  if (dogAge <= 60) {
    return { 
      label: "Fase Adulta", 
      emoji: "🏃", 
      message: "No auge da vitalidade e companheirismo.", 
      color: "text-amber-500",
      image: DOG_IMAGES.adult
    };
  }
  return { 
    label: "Fase Sênior", 
    emoji: "👴", 
    message: "Um sábio que merece todo conforto e carinho.", 
    color: "text-purple-500",
    image: DOG_IMAGES.senior
  };
};

// --- Componente Principal ---
const DogAgeCalculator: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<DogSize>("medium");
  const [age, setAge] = useState<number>(4); // Começar com 4 para mostrar adulto por padrão

  const dogAge = useMemo(() => calculateDogAge(age, selectedSize), [age, selectedSize]);
  const lifeStage = useMemo(() => getLifeStage(dogAge), [dogAge]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md md:max-w-2xl mx-auto"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-2xl">
        
        {/* Background Decorativo Suave */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="p-6 md:p-8 relative z-10">
          
          {/* Cabeçalho */}
          <header className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
              Calculadora de Idade Canina
            </h2>
            <p className="text-sm text-gray-500">
              Descubra a "idade humana" do seu melhor amigo
            </p>
          </header>

          {/* --- ÁREA DE IMAGEM DINÂMICA (MORPHING) --- */}
          <div className="relative w-full h-48 md:h-64 mb-8 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
             <AnimatePresence mode="popLayout">
               <motion.img
                 key={lifeStage.image} // A chave muda com a imagem, ativando a transição
                 src={lifeStage.image}
                 alt={lifeStage.label}
                 className="absolute inset-0 w-full h-full object-cover"
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
               />
             </AnimatePresence>
             
             {/* Overlay Gradiente para texto legível se necessário, ou apenas estético */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
             
             {/* Badge da Fase sobre a imagem */}
             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
               <span>{lifeStage.emoji}</span>
               {lifeStage.label}
             </div>
          </div>

          <div className="space-y-8">
            
            {/* Seletor de Porte */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-3 text-center uppercase tracking-widest">
                Porte do Cão
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "small", label: "Pequeno", icon: DogIconSmall },
                  { id: "medium", label: "Médio", icon: DogIconMedium },
                  { id: "large", label: "Grande", icon: DogIconLarge },
                ].map((size) => (
                  <motion.button
                    key={size.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSize(size.id as DogSize)}
                    className={`
                      relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300
                      ${selectedSize === size.id 
                        ? "border-accent bg-accent text-white shadow-md shadow-accent/20" 
                        : "border-gray-100 bg-white text-gray-500 hover:border-accent/30 hover:bg-accent/5"
                      }
                    `}
                  >
                    <size.icon className={`w-6 h-6 mb-1 ${selectedSize === size.id ? "stroke-[2.5px]" : "stroke-2"}`} />
                    <span className="font-bold text-xs">{size.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Slider de Idade (Upgrade Visual) */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex justify-between items-end mb-4">
                <label htmlFor="age-slider" className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Idade Real
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-800 tabular-nums">
                    {age}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {age === 1 ? "ano" : "anos"}
                  </span>
                </div>
              </div>
              
              <div className="relative h-8 flex items-center group">
                {/* Custom Track Background Gradient */}
                <input
                  id="age-slider"
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="
                    w-full h-3 rounded-full appearance-none cursor-pointer z-10 relative
                    bg-gradient-to-r from-amber-200 via-amber-400 to-amber-700
                    focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2
                    
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-7
                    [&::-webkit-slider-thumb]:h-7
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:border-[3px]
                    [&::-webkit-slider-thumb]:border-accent
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:transition-all
                    [&::-webkit-slider-thumb]:duration-150
                    [&::-webkit-slider-thumb]:ease-out
                    
                    [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-webkit-slider-thumb]:active:scale-95
                    [&::-webkit-slider-thumb]:active:shadow-[0_0_0_4px_rgba(217,119,6,0.3)]
                    
                    [&::-moz-range-thumb]:w-7
                    [&::-moz-range-thumb]:h-7
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:border-[3px]
                    [&::-moz-range-thumb]:border-accent
                    [&::-moz-range-thumb]:shadow-lg
                    [&::-moz-range-thumb]:transition-all
                    
                    [&::-moz-range-thumb]:hover:scale-110
                    [&::-moz-range-thumb]:active:scale-95
                    [&::-moz-range-thumb]:active:shadow-[0_0_0_4px_rgba(217,119,6,0.3)]
                  "
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider px-1">
                <span>Recém-nascido</span>
                <span>Vida Longa</span>
              </div>
            </div>

            {/* Resultado Final */}
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">
                Idade Humana Equivalente
              </p>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={dogAge}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none drop-shadow-sm">
                    {dogAge}
                  </span>
                </motion.div>
              </AnimatePresence>

              <motion.div 
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={lifeStage.message} // Re-animate text on change
              >
                <p className={`text-sm font-medium ${lifeStage.color}`}>
                  {lifeStage.message}
                </p>
              </motion.div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50/50 rounded-lg p-3 flex items-start gap-2 text-xs text-blue-700/80 border border-blue-100/50 leading-relaxed">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" />
              <p>
                Estimativa baseada em médias veterinárias. O envelhecimento real varia conforme a raça e saúde.
              </p>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DogAgeCalculator;
