"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Dados dos Sintomas (Hardcoded por enquanto)
const BODY_PARTS = [
  {
    id: "ears",
    label: "Orelhas",
    x: 22,
    y: 18,
    symptoms: ["Coceira excessiva", "Cheiro forte", "Vermelhidão", "Sacudir a cabeça"],
  },
  {
    id: "eyes",
    label: "Olhos",
    x: 32,
    y: 22,
    symptoms: ["Lacrimejamento", "Olhos vermelhos", "Manchas ou névoa", "Secreção amarelada"],
  },
  {
    id: "mouth",
    label: "Boca & Dentes",
    x: 38,
    y: 30,
    symptoms: ["Mau hálito", "Gengiva inchada/sangrando", "Dificuldade para comer", "Baba excessiva"],
  },
  {
    id: "skin",
    label: "Pele & Pelo",
    x: 55,
    y: 45,
    symptoms: ["Queda de pelo (falhas)", "Feridas ou crostas", "Carrapatos/Pulgas", "Caroços"],
  },
  {
    id: "stomach",
    label: "Estômago & Digestão",
    x: 62,
    y: 58,
    symptoms: ["Vômitos frequentes", "Diarreia", "Falta de apetite", "Barriga inchada"],
  },
  {
    id: "legs",
    label: "Patas & Articulações",
    x: 45,
    y: 85,
    symptoms: ["Mancar ao andar", "Lamber as patas compulsivamente", "Dificuldade para levantar", "Unhas grandes"],
  },
  {
    id: "tail",
    label: "Cauda",
    x: 88,
    y: 45,
    symptoms: ["Perseguir a cauda", "Cauda baixa/entre as pernas (medo/dor)", "Mordiscar a base"],
  },
];

export default function SymptomChecker() {
  const [selectedPart, setSelectedPart] = useState<typeof BODY_PARTS[0] | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="isolate w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
    >
      {/* 1. ÁREA DO MAPA (ESQUERDA) */}
      <div className="relative aspect-[4/3] w-full max-w-md mx-auto lg:max-w-none">
        
        {/* SVG DO CÃO (CAMADA 0 - FUNDO) */}
        {/* Usando pointer-events-none para o desenho não bloquear os cliques */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet" 
          className="absolute inset-0 w-full h-full text-slate-200 z-0 pointer-events-none"
        >
            {/* Silhueta Simplificada de um Cão (Estilo Vetorial Abstrato) */}
            <path
              fill="currentColor"
              d="M20,40 Q25,10 40,20 Q45,25 50,25 Q60,20 80,30 Q95,35 90,50 Q85,60 88,70 Q80,80 70,70 L65,90 L55,90 L58,70 Q50,75 45,70 L40,90 L30,90 L35,60 Q25,65 20,50 Z" 
              className="opacity-50"
            />
            {/* Outline para dar acabamento */}
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              d="M20,40 Q25,10 40,20 Q45,25 50,25 Q60,20 80,30 Q95,35 90,50 Q85,60 88,70 Q80,80 70,70 L65,90 L55,90 L58,70 Q50,75 45,70 L40,90 L30,90 L35,60 Q25,65 20,50 Z" 
            />
        </svg>

        {/* HOTSPOTS (CAMADA 10 - CLICÁVEIS) */}
        {BODY_PARTS.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedPart(part)}
            style={{ left: `${part.x}%`, top: `${part.y}%` }}
            className={cn(
              "group absolute -translate-x-1/2 -translate-y-1/2 z-10 focus:outline-none",
              "transition-transform duration-300 hover:scale-125"
            )}
            aria-label={`Ver sintomas de ${part.label}`}
          >
            {/* Anel de Pulso */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 duration-1000"></span>
            
            {/* Ponto Central */}
            <span className={cn(
              "relative inline-flex h-4 w-4 rounded-full border-2 border-white shadow-md transition-colors",
              selectedPart?.id === part.id ? "bg-white border-accent scale-110" : "bg-accent"
            )}></span>

            {/* Tooltip Hover (Opcional) */}
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {part.label}
            </span>
          </button>
        ))}
      </div>

      {/* 2. PAINEL DE DETALHES (DIREITA/BAIXO) */}
      <div className="relative z-20 min-h-[300px] w-full">
        <AnimatePresence mode="wait">
          {selectedPart ? (
            <motion.div
              key={selectedPart.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative z-20 bg-white/90 backdrop-blur-lg border border-white/40 shadow-xl shadow-black/5 rounded-2xl p-6 md:p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    {selectedPart.label}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Sinais de alerta comuns nesta região</p>
                </div>
                <button 
                  onClick={() => setSelectedPart(null)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="space-y-3">
                {selectedPart.symptoms.map((symptom, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-slate-700"
                  >
                    <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{symptom}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <a href="/blog" className="flex items-center gap-2 text-sm font-bold text-accent hover:text-amber-700 transition-colors group">
                  Ver artigos relacionados <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ) : (
            // ESTADO VAZIO (Placeholder)
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <ChevronRight size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-400">Selecione uma área</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2">
                Toque nos pontos pulsantes no mapa para ver os sintomas associados.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}