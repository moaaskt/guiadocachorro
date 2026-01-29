"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type BodyPart = {
  id: string;
  label: string;
  x: number;
  y: number;
  symptoms: string[];
};

const BODY_PARTS: BodyPart[] = [
  { id: "ears", label: "Orelhas", x: 23, y: 20, symptoms: ["Coçar excessivo", "Cheiro forte", "Vermelhidão"] },
  { id: "eyes", label: "Olhos", x: 30, y: 25, symptoms: ["Lacrimejar", "Vermelhidão", "Manchas"] },
  { id: "mouth", label: "Boca", x: 35, y: 35, symptoms: ["Mau hálito", "Gengiva inchada", "Dificuldade a comer"] },
  { id: "skin", label: "Pele/Pelo", x: 50, y: 45, symptoms: ["Queda de pelo", "Feridas", "Carraças/Pulgas"] },
  { id: "stomach", label: "Barriga", x: 58, y: 60, symptoms: ["Vómitos", "Diarreia", "Falta de apetite"] },
  { id: "legs", label: "Patas/Articulações", x: 45, y: 85, symptoms: ["Mancar", "Lamber as patas", "Dificuldade a levantar"] },
  { id: "tail", label: "Cauda", x: 90, y: 45, symptoms: ["Perseguir a cauda", "Cauda baixa/entre pernas"] },
];

export default function SymptomChecker() {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const panelKey = useMemo(() => selectedPart?.id ?? "none", [selectedPart]);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedPart && typeof window !== "undefined" && window.innerWidth < 1024) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedPart]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="isolate w-full max-w-5xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="relative rounded-3xl border border-gray-200/60 bg-white/70 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="p-5 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Mapa Anatómico Interativo</h2>
            <p className="text-sm text-gray-600">Clique nos pontos para ver sintomas e cuidados comuns.</p>
          </div>
          <div className="px-5 md:px-6 pb-6">
            <div className="relative aspect-[4/3] rounded-2xl bg-slate-50 overflow-hidden">
              <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full text-slate-200 pointer-events-none z-0">
                <path
                  d="M48,50 C45,40 50,25 65,20 C75,17 85,25 90,40 C100,42 130,42 150,35 C160,32 175,25 185,45 C190,55 180,65 175,60 C175,70 180,80 185,75 C185,85 180,95 175,90 L170,110 L155,110 L160,90 C150,95 130,95 120,90 L115,110 L100,110 L105,85 C95,90 75,90 65,80 L60,110 L45,110 L50,80 C40,75 35,70 35,60 C30,65 20,60 20,50 Z"
                  fill="currentColor"
                />
              </svg>
              {BODY_PARTS.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  aria-label={part.label}
                  onClick={() => setSelectedPart(part)}
                  className={cn("group absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer focus:outline-none")}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                >
                  <span className="relative flex h-6 w-6 md:h-8 md:w-8">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-40 animate-ping" />
                    <span className="relative inline-flex rounded-full h-full w-full bg-accent border-2 border-white shadow-md" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            {selectedPart && (
              <motion.div
                key={panelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-20 bg-white/90 backdrop-blur-lg border border-white/40 shadow-xl shadow-black/5 rounded-2xl p-6"
                ref={detailsRef}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedPart.label}</h3>
                    <p className="text-sm text-gray-500">Sintomas e cuidados comuns</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPart(null)}
                    className="rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1.5 text-sm font-bold"
                  >
                    Fechar
                  </button>
                </div>
                <ul className="mt-6 space-y-2">
                  {selectedPart.symptoms.map((s) => (
                    <li key={s} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 text-gray-700">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
                      <span className="text-sm font-medium">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="/saude" className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition">
                    Ver guias de saúde
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

