"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

// === COORDENADAS RECALIBRADAS (AJUSTE FINO MESTRE) ===
// x = Horizontal (0 esq -> 100 dir)
// y = Vertical (0 topo -> 100 baixo)
const BODY_PARTS = [
  // Orelhas (Ok)
  { id: "ears", label: "Orelhas", x: 38, y: 15, symptoms: ["Coceira", "Cheiro forte", "Vermelhidão"] },
  // Olhos (Ok)
  { id: "eyes", label: "Olhos", x: 43, y: 26, symptoms: ["Lacrimejamento", "Olhos vermelhos", "Secreção"] },
  // Boca (CORRIGIDO: Descido para a região do focinho)
  { id: "mouth", label: "Boca", x: 41, y: 53, symptoms: ["Mau hálito", "Gengiva sangrando", "Salivação"] },
  // Peito (Ok)
  { id: "chest", label: "Peito", x: 40, y: 58, symptoms: ["Tosse seca", "Cansaço fácil", "Respiração ruidosa"] },
  // Patas (Ok)
  { id: "paws", label: "Patas", x: 32, y: 88, symptoms: ["Mancar", "Lamber patas", "Unhas grandes"] },
  // Cauda (CORRIGIDO: Trazido para mais perto do corpo e para cima na curva)
  { id: "tail", label: "Cauda", x: 78, y: 65, symptoms: ["Perseguir cauda", "Cauda baixa", "Mordiscar base"] },
];

export default function SymptomChecker() {
  const [selectedPart, setSelectedPart] = useState<typeof BODY_PARTS[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section className="w-full max-w-6xl mx-auto py-8 px-4">
      <div 
        ref={containerRef}
        className="relative w-full bg-slate-50 rounded-[2rem] border-4 border-slate-200 shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row"
      >
        {/* === ÁREA DO HUSKY (ESQUERDA) === */}
        <div className="relative z-10 w-full md:w-1/2 h-[500px] flex items-center justify-center bg-blue-50/30">
            <div className="relative w-[350px] h-[450px]">
                <img
                    src="/husky-cartoon.png"
                    alt="Paciente Husky"
                    className="w-full h-full object-contain drop-shadow-xl"
                    style={{ display: 'block' }}
                />
                
                {/* HOTSPOTS (BOTOES) */}
                {BODY_PARTS.map((part) => (
                    <button
                        key={part.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedPart(part); }}
                        style={{ left: `${part.x}%`, top: `${part.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 cursor-pointer z-30 group focus:outline-none"
                    >
                        <span className="absolute inset-0 rounded-full bg-amber-400 opacity-60 animate-ping group-hover:opacity-100" />
                        <span className={cn(
                            "relative flex items-center justify-center w-full h-full rounded-full border-4 shadow-lg transition-all duration-300",
                            selectedPart?.id === part.id 
                                ? "bg-amber-500 border-white scale-125 rotate-12" 
                                : "bg-white border-amber-500 hover:scale-110"
                        )}>
                            <Activity size={18} className={selectedPart?.id === part.id ? "text-white" : "text-amber-500"} />
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* === ÁREA DO VETERINÁRIO (DIREITA) === */}
        <div className="relative z-10 w-full md:w-1/2 h-[500px] flex items-end justify-center bg-white pt-10 md:pt-0">
            
            {/* Container Relativo do Vet */}
            <div className="relative w-[300px] h-[400px]">
                
                {/* BALÃO - CORREÇÃO CRÍTICA DE POSICIONAMENTO 
                    Mudado para bottom-[130%]. Isso empurra o balão MUITO para cima,
                    garantindo que ele não encoste na cabeça do veterinário.
                */}
                <div className="absolute bottom-[130%] left-1/2 -translate-x-1/2 w-[280px] z-50">
                    <AnimatePresence mode="wait">
                        {selectedPart ? (
                            <motion.div
                                key={selectedPart.id}
                                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                className="bg-white rounded-3xl p-5 shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.2)] border-2 border-slate-900 relative"
                            >
                                {/* Triângulo do Balão (Apontando para baixo) */}
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-2 border-r-2 border-slate-900 transform rotate-45"></div>

                                <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-2">
                                    <h3 className="text-lg font-black text-slate-800 uppercase">
                                        {selectedPart.label}
                                    </h3>
                                    <button 
                                        onClick={() => setSelectedPart(null)}
                                        className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                                    >
                                        <X size={16} className="text-slate-400" />
                                    </button>
                                </div>

                                <ul className="space-y-1.5 mb-3">
                                    {selectedPart.symptoms.map((s, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-bold">
                                            <span className="text-amber-500 text-[10px] mt-1">●</span> 
                                            <span className="leading-tight">{s}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <div className="text-center">
                                    <span className="text-[10px] text-slate-400 font-medium">Toque fora para fechar</span>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full border-2 border-slate-800 shadow-lg text-center mx-auto w-max"
                            >
                                <p className="text-xs font-black text-slate-800 flex items-center gap-2">
                                    <span>👋</span> Onde dói? Clique no Husky!
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* IMAGEM DO VET */}
                <img
                    src="/vet-cartoon.png"
                    alt="Veterinário"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{ display: 'block' }}
                />
            </div>
        </div>
      </div>
    </section>
  );
}