"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const BODY_PARTS = [
  { id: "ears", label: "Orelhas", x: 35, y: 18, symptoms: ["Coceira", "Cheiro forte", "Vermelhidão"] },
  { id: "eyes", label: "Olhos", x: 45, y: 28, symptoms: ["Lacrimejamento", "Olhos vermelhos", "Secreção"] },
  { id: "mouth", label: "Boca", x: 42, y: 42, symptoms: ["Mau hálito", "Gengiva sangrando", "Salivação"] },
  { id: "chest", label: "Peito", x: 38, y: 60, symptoms: ["Tosse seca", "Cansaço fácil", "Respiração ruidosa"] },
  { id: "paws", label: "Patas", x: 38, y: 90, symptoms: ["Mancar", "Lamber patas", "Unhas grandes"] },
  { id: "tail", label: "Cauda", x: 80, y: 55, symptoms: ["Perseguir cauda", "Cauda baixa", "Mordiscar base"] },
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
      {/* Container Principal */}
      <div 
        ref={containerRef}
        className="relative w-full bg-slate-50 rounded-[2rem] border-4 border-slate-200 shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row"
      >
        {/* === ÁREA DO HUSKY (ESQUERDA) === */}
        <div className="relative z-10 w-full md:w-1/2 h-[500px] flex items-center justify-center bg-blue-50/30">
            {/* Wrapper Relativo para posicionar bolinhas */}
            <div className="relative w-[350px] h-[450px]">
                {/* USANDO IMG NATIVA PARA EVITAR ERROS DE BUILD */}
                <img
                    src="/husky-cartoon.png"
                    alt="Paciente Husky"
                    className="w-full h-full object-contain drop-shadow-xl"
                    style={{ display: 'block' }} // Garante que não é hidden
                />
                
                {/* Fallback de texto se a imagem quebrar */}
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 text-xs text-slate-400 -z-10 text-center">
                  Se não ver o Husky,<br/>verifique a pasta public
                </p>

                {/* HOTSPOTS */}
                {BODY_PARTS.map((part) => (
                    <button
                        key={part.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedPart(part); }}
                        style={{ left: `${part.x}%`, top: `${part.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 cursor-pointer z-30 group focus:outline-none"
                    >
                        <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping group-hover:opacity-100" />
                        <span className={cn(
                            "relative flex items-center justify-center w-full h-full rounded-full border-4 shadow-lg transition-all duration-300",
                            selectedPart?.id === part.id ? "bg-amber-500 border-white scale-125" : "bg-white border-amber-500"
                        )}>
                            <Activity size={20} className={selectedPart?.id === part.id ? "text-white" : "text-amber-500"} />
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* === ÁREA DO VETERINÁRIO (DIREITA) === */}
        <div className="relative z-10 w-full md:w-1/2 h-[500px] flex items-end justify-center bg-white">
            
            {/* Container Relativo do Vet */}
            <div className="relative w-[300px] h-[400px]">
                
                {/* BALÃO (POSICIONADO ABSOLUTAMENTE EM RELAÇÃO AO VET) */}
                <div className="absolute bottom-[90%] left-1/2 -translate-x-1/2 w-[280px] z-40 mb-2">
                    <AnimatePresence mode="wait">
                        {selectedPart ? (
                            <motion.div
                                key={selectedPart.id}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                className="bg-white rounded-3xl p-5 shadow-2xl border-4 border-slate-900 relative"
                            >
                                {/* Seta do Balão */}
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-slate-900 transform rotate-45"></div>

                                <h3 className="text-lg font-black text-slate-800 uppercase mb-2 border-b pb-1">
                                    {selectedPart.label}
                                </h3>
                                <ul className="space-y-1 mb-4">
                                    {selectedPart.symptoms.map((s, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                                            <span className="text-amber-500">●</span> {s}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => setSelectedPart(null)} className="text-xs text-slate-400 underline w-full text-center">Fechar</button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="bg-white px-4 py-2 rounded-full border-2 border-slate-800 shadow-md text-center"
                            >
                                <p className="text-xs font-bold text-slate-800">Clique no Husky! 👇</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* IMAGEM DO VET (IMG NATIVA) */}
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