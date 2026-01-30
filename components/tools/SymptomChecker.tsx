"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mapeamento dos pontos no Husky Cartoon
// Ajustei as porcentagens (x, y) baseado na imagem do Husky sentado que você mandou
const BODY_PARTS = [
  {
    id: "ears",
    label: "Orelhas",
    x: 35, // Posição horizontal %
    y: 15, // Posição vertical %
    symptoms: ["Coceira frequente", "Cheiro forte", "Vermelhidão", "Sacudir a cabeça"],
  },
  {
    id: "eyes",
    label: "Olhos",
    x: 50,
    y: 25,
    symptoms: ["Lacrimejamento", "Olhos vermelhos", "Manchas/Névoa", "Secreção"],
  },
  {
    id: "mouth",
    label: "Boca",
    x: 50,
    y: 38,
    symptoms: ["Mau hálito", "Gengiva sangrando", "Dificuldade ao comer", "Salivação"],
  },
  {
    id: "skin",
    label: "Pele/Pelo",
    x: 30,
    y: 55,
    symptoms: ["Falhas no pelo", "Feridas/Crostas", "Pulgas/Carrapatos", "Coceira"],
  },
  {
    id: "paws",
    label: "Patas",
    x: 45,
    y: 85,
    symptoms: ["Mancar", "Lamber as patas", "Unhas grandes", "Dificuldade ao levantar"],
  },
  {
    id: "tail",
    label: "Cauda",
    x: 85,
    y: 55,
    symptoms: ["Perseguir a cauda", "Cauda baixa (medo)", "Mordiscar a base"],
  },
];

export default function SymptomChecker() {
  const [selectedPart, setSelectedPart] = useState<typeof BODY_PARTS[0] | null>(null);
  const vetRef = useRef<HTMLDivElement>(null);

  // Scroll automático no mobile para mostrar o veterinário quando clicar
  useEffect(() => {
    if (selectedPart && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        vetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  }, [selectedPart]);

  return (
    <section className="w-full max-w-5xl mx-auto py-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-end">
        
        {/* =======================================================
            COLUNA 1: O PACIENTE (HUSKY) 
           ======================================================= */}
        <div className="relative w-full aspect-square max-w-[500px] mx-auto">
           {/* Imagem do Husky */}
           <Image
             src="/husky-cartoon.png" // Certifique-se que a imagem está na pasta public
             alt="Husky Cartoon"
             fill
             className="object-contain drop-shadow-xl z-0"
             priority
           />

           {/* Hotspots (Bolinhas) */}
           {BODY_PARTS.map((part) => (
             <button
               key={part.id}
               onClick={() => setSelectedPart(part)}
               style={{ left: `${part.x}%`, top: `${part.y}%` }}
               className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
             >
                {/* Efeito de "Sonar" (Onda expandindo) */}
               <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping"></span>
               
               {/* A Bolinha clicável */}
               <span className={cn(
                 "relative flex items-center justify-center w-8 h-8 rounded-full border-4 shadow-lg transition-all duration-300",
                 selectedPart?.id === part.id 
                   ? "bg-amber-500 border-white scale-125" 
                   : "bg-white border-amber-500 hover:scale-110"
               )}>
                 {selectedPart?.id === part.id && (
                   <span className="w-2 h-2 bg-white rounded-full" />
                 )}
               </span>
             </button>
           ))}
        </div>

        {/* =======================================================
            COLUNA 2: O DOUTOR (VETERINÁRIO)
           ======================================================= */}
        <div ref={vetRef} className="relative w-full h-[400px] lg:h-[500px] flex items-end justify-center">
            
            {/* O Balão de Fala (Aparece dinamicamente) */}
            <AnimatePresence mode="wait">
                {selectedPart ? (
                    <motion.div
                        key={selectedPart.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute top-0 lg:top-10 left-0 right-0 z-20 mx-4 lg:mx-0"
                    >
                        {/* Container do Balão (Estilo Comic Book) */}
                        <div className="bg-white border-4 border-slate-800 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.2)] relative">
                            
                            {/* O "Bico" do balão apontando para o Vet */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-b-4 border-r-4 border-slate-800 transform rotate-45"></div>

                            {/* Conteúdo do Balão */}
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-black text-slate-800 uppercase tracking-wide">
                                    {selectedPart.label}
                                </h3>
                                <button onClick={() => setSelectedPart(null)} className="text-slate-400 hover:text-red-500">
                                    <X size={20} strokeWidth={3} />
                                </button>
                            </div>

                            <p className="text-slate-500 font-medium text-sm mb-3">
                                Fique atento a estes sinais:
                            </p>

                            <ul className="space-y-2">
                                {selectedPart.symptoms.map((symptom, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-slate-800 font-bold bg-slate-100 px-3 py-2 rounded-lg">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                        {symptom}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 pt-4 border-t-2 border-slate-100 flex justify-end">
                                <a href="/saude" className="text-sm font-black text-amber-600 flex items-center gap-1 hover:underline">
                                    GUIA COMPLETO <ArrowRight size={16} strokeWidth={3} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    // Balão de "Olá" quando nada está selecionado
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-20 lg:top-32 z-20"
                    >
                        <div className="bg-white border-4 border-slate-800 rounded-2xl px-6 py-4 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.2)] relative">
                             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-4 border-r-4 border-slate-800 transform rotate-45"></div>
                             <p className="font-bold text-slate-800">Onde dói? Clique no Husky! 👇</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Imagem do Veterinário */}
            <div className="relative w-[280px] h-[350px] lg:w-[320px] lg:h-[400px]">
                <Image 
                    src="/vet-cartoon.png" // Certifique-se que a imagem está na pasta public
                    alt="Veterinário Cartoon"
                    fill
                    className="object-contain z-10 drop-shadow-2xl"
                    priority
                />
            </div>

        </div>
      </div>
    </section>
  );
}