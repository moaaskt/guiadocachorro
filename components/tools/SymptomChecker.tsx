"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Stethoscope, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type BodyPart = {
  id: string;
  label: string;
  emoji: string;
  x: number;
  y: number;
  color: string;
  ringColor: string;
  bgColor: string;
  description: string;
  symptoms: string[];
  whenToVet: string;
};

const BODY_PARTS: BodyPart[] = [
  {
    id: "ears",
    label: "Orelhas",
    emoji: "👂",
    x: 44, y: 17,
    color: "text-violet-600",
    ringColor: "border-violet-400",
    bgColor: "bg-violet-500",
    description: "Região sensível a infecções e ácaros. Requer limpeza regular.",
    symptoms: ["Coceira intensa nas orelhas", "Cheiro forte ou azedo", "Secreção escura ou amarelada", "Balanço frequente da cabeça"],
    whenToVet: "Coceira por mais de 2 dias ou secreção escura.",
  },
  {
    id: "eyes",
    label: "Olhos",
    emoji: "👁️",
    x: 44, y: 34,
    color: "text-sky-600",
    ringColor: "border-sky-400",
    bgColor: "bg-sky-500",
    description: "Olhos saudáveis são brilhantes e sem secreção excessiva.",
    symptoms: ["Lacrimejamento excessivo", "Olhos vermelhos ou irritados", "Secreção amarela ou verde", "Olho semicerrado ou piscando muito"],
    whenToVet: "Secreção colorida ou olho fechado por mais de 24h.",
  },
  {
    id: "nose",
    label: "Focinho",
    emoji: "🐽",
    x: 44, y: 44,
    color: "text-rose-600",
    ringColor: "border-rose-400",
    bgColor: "bg-rose-500",
    description: "O focinho frio e úmido é sinal de saúde. Seco pode indicar febre.",
    symptoms: ["Focinho seco ou rachado", "Corrimento nasal", "Espirros frequentes", "Sangramento pelo nariz"],
    whenToVet: "Sangramento ou corrimento por mais de 1 dia.",
  },
  {
    id: "belly",
    label: "Peito & Barriga",
    emoji: "🫀",
    x: 43, y: 63,
    color: "text-emerald-600",
    ringColor: "border-emerald-400",
    bgColor: "bg-emerald-500",
    description: "A barriga revela sinais de digestão, parasitas e órgãos internos.",
    symptoms: ["Barriga estufada ou dura", "Vômitos ou diarreia", "Perda de apetite", "Dor ao ser tocado na barriga"],
    whenToVet: "Barriga muito estufada é emergência. Vá imediatamente ao vet.",
  },
  {
    id: "paws",
    label: "Patas",
    emoji: "🐾",
    x: 42, y: 82,
    color: "text-amber-600",
    ringColor: "border-amber-400",
    bgColor: "bg-amber-500",
    description: "Patas suportam todo o peso do animal e são expostas ao ambiente.",
    symptoms: ["Mancar ou evitar apoiar", "Lamber as patas excessivamente", "Unhas muito longas", "Cortes ou calos nas almofadas"],
    whenToVet: "Mancar por mais de 1 dia ou ferida aberta visível.",
  },
  {
    id: "tail",
    label: "Cauda",
    emoji: "🌀",
    x: 72, y: 30,
    color: "text-orange-600",
    ringColor: "border-orange-400",
    bgColor: "bg-orange-500",
    description: "A cauda expressa emoções e pode indicar problemas na região anal.",
    symptoms: ["Perseguir a própria cauda", "Cauda sempre baixa ou tucada", "Mordiscar a base da cauda", "Inchaço ou ferida na cauda"],
    whenToVet: "Ferida aberta ou inchaço visível na região.",
  },
];

export default function SymptomChecker() {
  const [selected, setSelected] = useState<BodyPart | null>(null);

  return (
    <section className="w-full max-w-5xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-3">
          <Stethoscope size={14} className="text-amber-600" />
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Verificador de Sintomas</span>
        </div>
        <p className="text-slate-500 text-sm">Clique em uma parte do corpo para ver os sintomas associados</p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Left: Dog Map */}
          <div className="relative md:w-1/2 bg-gradient-to-br from-slate-50 to-blue-50/40 flex items-center justify-center p-8 min-h-[420px]">
            {/* Hint */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-1 shadow-sm z-20">
              <MapPin size={12} className="text-amber-500" />
              <span className="text-[11px] font-medium text-slate-600">Toque em um ponto</span>
            </div>

            {/* Dog Image + Hotspots */}
            <div className="relative w-[280px] h-[360px]">
              <img
                src="/husky-cartoon.png"
                alt="Husky Paciente"
                className="w-full h-full object-contain drop-shadow-lg"
              />

              {BODY_PARTS.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelected(selected?.id === part.id ? null : part)}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group focus:outline-none"
                  aria-label={part.label}
                >
                  {/* Ping ring */}
                  {selected?.id !== part.id && (
                    <span className={cn("absolute inset-0 rounded-full opacity-50 animate-ping", part.bgColor)} />
                  )}
                  {/* Button */}
                  <span className={cn(
                    "relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 shadow-md transition-all duration-200",
                    selected?.id === part.id
                      ? cn("scale-125 text-white shadow-lg", part.bgColor, "border-white")
                      : cn("bg-white hover:scale-110", part.ringColor)
                  )}>
                    <span className="text-sm leading-none">{part.emoji}</span>
                  </span>
                  {/* Tooltip label */}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-slate-700 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {part.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info Panel */}
          <div className="md:w-1/2 flex items-stretch">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 p-6 flex flex-col"
                >
                  {/* Panel Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm", selected.bgColor + "/10")}>
                        {selected.emoji}
                      </div>
                      <div>
                        <h3 className={cn("text-xl font-black", selected.color)}>{selected.label}</h3>
                        <p className="text-xs text-slate-500 leading-tight max-w-[200px]">{selected.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="p-1.5 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
                    >
                      <X size={16} className="text-slate-400" />
                    </button>
                  </div>

                  {/* Symptoms */}
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Sintomas comuns</p>
                    <ul className="space-y-2">
                      {selected.symptoms.map((s, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-center gap-2.5 text-sm text-slate-700"
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", selected.bgColor)} />
                          {s}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* When to vet */}
                  <div className={cn("mt-auto rounded-2xl p-3.5 flex items-start gap-2.5", selected.bgColor + "/10")}>
                    <AlertTriangle size={15} className={cn("flex-shrink-0 mt-0.5", selected.color)} />
                    <div>
                      <p className={cn("text-[11px] font-bold uppercase tracking-wide mb-0.5", selected.color)}>Quando ir ao veterinário</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{selected.whenToVet}</p>
                    </div>
                  </div>

                  {/* Vet image small */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                    <img src="/vet-cartoon.png" alt="Vet" className="w-10 h-10 object-contain" />
                    <p className="text-xs text-slate-400 italic">Sempre consulte um veterinário para diagnóstico preciso.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4"
                >
                  <img src="/vet-cartoon.png" alt="Veterinário" className="w-32 h-32 object-contain drop-shadow-md" />
                  <div>
                    <p className="text-lg font-black text-slate-800 mb-1">Olá! Sou o Dr. Rex 🐕</p>
                    <p className="text-sm text-slate-500 max-w-[220px] mx-auto leading-relaxed">
                      Clique em qualquer parte do corpo do Husky para ver os sintomas associados.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {BODY_PARTS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelected(p)}
                        className={cn("text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:scale-105", p.ringColor, p.color, "bg-white hover:shadow-sm")}
                      >
                        {p.emoji} {p.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
