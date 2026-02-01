"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

// Mapeamento Anatômico (Ajustado para o Husky Sentado)
const BODY_PARTS = [
  { id: "ears", label: "Orelhas", x: 35, y: 16, symptoms: ["Coceira frequente", "Cheiro forte", "Vermelhidão", "Sacudir a cabeça"] },
  { id: "eyes", label: "Olhos", x: 48, y: 26, symptoms: ["Lacrimejamento", "Olhos vermelhos", "Manchas/Névoa", "Secreção"] },
  { id: "mouth", label: "Boca", x: 46, y: 38, symptoms: ["Mau hálito", "Gengiva sangrando", "Dificuldade ao comer", "Salivação"] },
  { id: "chest", label: "Peito/Respiração", x: 42, y: 55, symptoms: ["Tosse seca", "Cansaço fácil", "Respiração ruidosa", "Engasgos"] },
  { id: "paws", label: "Patas", x: 42, y: 88, symptoms: ["Mancar", "Lamber as patas", "Unhas grandes", "Dificuldade ao levantar"] },
  { id: "tail", label: "Cauda", x: 85, y: 58, symptoms: ["Perseguir a cauda", "Cauda baixa (medo)", "Mordiscar a base"] },
];

export default function SymptomChecker() {
  const [selectedPart, setSelectedPart] = useState<typeof BODY_PARTS[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o balão se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedPart(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4">
      
      {/* Container Principal com altura mínima forçada */}
      <div 
        ref={containerRef}
        className="relative w-full bg-white rounded-[2.5rem] border-4 border-slate-100 shadow-xl overflow-hidden min-h-[600px]"
      >
        {/* Fundo sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white z-0" />

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-end justify-center md:justify-between px-4 md:px-16 pb-0 md:pb-6 pt-8 md:pt-0 gap-8 md:gap-0">

            {/* ------------------------------------------------
                 PERSONAGEM 1: O PACIENTE (HUSKY) 
               ------------------------------------------------ */}
            {/* ADICIONEI bg-slate-200 PARA VER SE O CONTAINER EXISTE SE A IMAGEM FALHAR */}
            <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] shrink-0 bg-slate-100/50 rounded-t-3xl md:rounded-none">
                
                <Image
                    src="/husky.png" // NOME SIMPLIFICADO. Certifique-se que está na pasta public
                    alt="Paciente Husky"
                    fill
                    className="object-contain drop-shadow-xl z-10"
                    priority
                />

                {/* HOTSPOTS */}
                {BODY_PARTS.map((part) => (
                    <button
                        key={part.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedPart(part); }}
                        style={{ left: `${part.x}%`, top: `${part.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 cursor-pointer z-20 focus:outline-none group"
                    >
                        <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping group-hover:opacity-100" />
                        <span className={cn(
                            "relative flex items-center justify-center w-full h-full rounded-full border-4 shadow-lg transition-all duration-300",
                            selectedPart?.id === part.id 
                                ? "bg-amber-500 border-white scale-110 rotate-12" 
                                : "bg-white/90 border-amber-500 hover:scale-110 hover:bg-amber-50"
                        )}>
                            {selectedPart?.id === part.id ? <Activity size={20} className="text-white" /> : null}
                        </span>
                    </button>
                ))}
            </div>

            {/* ------------------------------------------------
                 PERSONAGEM 2: O DOUTOR (VET) 
               ------------------------------------------------ */}
            <div className="relative w-[220px] h-[300px] md:w-[320px] md:h-[450px] shrink-0 flex justify-center">
                
                {/* BALÃO DE FALA */}
                <div className="absolute bottom-[95%] w-[280px] md:w-[350px] z-30 mb-2 md:-translate-x-12">
                    <AnimatePresence mode="wait">
                        {selectedPart && (
                            <motion.div
                                key={selectedPart.id}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                transition={{ type: "spring", bounce: 0.4 }}
                                className="bg-white rounded-3xl p-5 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.15)] border-4 border-slate-800 relative"
                            >
                                {/* Bico do Balão */}
                                <div className="absolute -bottom-5 right-16 w-0 h-0 border-l-[15px] border-l-transparent border-t-[20px] border-t-slate-800 border-r-[15px] border-r-transparent"></div>
                                <div className="absolute -bottom-[16px] right-[67px] w-0 h-0 border-l-[12px] border-l-transparent border-t-[17px] border-t-white border-r-[12px] border-r-transparent z-10"></div>

                                <div className="flex justify-between items-start mb-3 border-b pb-2">
                                    <h3 className="text-lg font-black text-slate-800 uppercase">{selectedPart.label}</h3>
                                    <button onClick={(e) => { e.stopPropagation(); setSelectedPart(null); }}>
                                        <X size={20} className="text-slate-400 hover:text-red-500" />
                                    </button>
                                </div>
                                <ul className="space-y-1.5 mb-4">
                                    {selectedPart.symptoms.map((s, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                                            <span className="text-amber-500">●</span> {s}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!selectedPart && (
                         <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full border-2 border-slate-800 shadow-md animate-bounce">
                            <p className="text-xs font-bold text-slate-800">Clique no Husky! 👇</p>
                        </div>
                    )}
                </div>

                {/* ADICIONEI bg-slate-200 PARA VER SE O CONTAINER EXISTE SE A IMAGEM FALHAR */}
                <Image
                    src="/vet.png" // NOME SIMPLIFICADO
                    alt="Veterinário Cartoon"
                    fill
                    className="object-contain drop-shadow-2xl z-20"
                    priority
                />
            </div>
        </div>
      </div>
    </section>
  );
}