"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Stethoscope, Zap, Heart, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type DogSize = "small" | "medium" | "large";

interface LifeStageData {
  key: "puppy" | "adult" | "senior";
  label: string;
  emoji: string;
  message: string;
  image: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  tips: { icon: React.ReactNode; text: string }[];
  ageRangeLabel: string;
  dogYearRange: [number, number];
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const STAGES: LifeStageData[] = [
  {
    key: "puppy",
    label: "Filhote",
    emoji: "🐾",
    message: "Fase de descobertas, socialização e energia sem fim.",
    image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=900&q=85",
    textColor: "text-sky-500",
    bgColor: "bg-sky-500",
    borderColor: "border-sky-400",
    glowColor: "shadow-sky-500/20",
    tips: [
      { icon: <Shield className="w-3.5 h-3.5" />, text: "Mantenha o calendário de vacinação em dia" },
      { icon: <Zap className="w-3.5 h-3.5" />, text: "Socialize com pessoas e outros animais" },
      { icon: <Heart className="w-3.5 h-3.5" />, text: "Estabeleça rotinas desde cedo" },
    ],
    ageRangeLabel: "0 – 2 anos",
    dogYearRange: [0, 24],
  },
  {
    key: "adult",
    label: "Adulto",
    emoji: "⚡",
    message: "No auge da vitalidade, força e companheirismo.",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=900&q=85",
    textColor: "text-[var(--color-accent)]",
    bgColor: "bg-[var(--color-accent)]",
    borderColor: "border-[var(--color-accent)]",
    glowColor: "shadow-amber-500/20",
    tips: [
      { icon: <Zap className="w-3.5 h-3.5" />, text: "Exercício diário de pelo menos 30 minutos" },
      { icon: <Stethoscope className="w-3.5 h-3.5" />, text: "Consultas anuais ao veterinário" },
      { icon: <Heart className="w-3.5 h-3.5" />, text: "Atenção à higiene dental" },
    ],
    ageRangeLabel: "2 – 8 anos",
    dogYearRange: [24, 60],
  },
  {
    key: "senior",
    label: "Sênior",
    emoji: "🌟",
    message: "Um sábio que merece todo o conforto e cuidado especial.",
    image: "https://images.unsplash.com/photo-1545557286-56d1c89d43e3?w=900&q=85",
    textColor: "text-purple-500",
    bgColor: "bg-purple-500",
    borderColor: "border-purple-400",
    glowColor: "shadow-purple-500/20",
    tips: [
      { icon: <Heart className="w-3.5 h-3.5" />, text: "Consultas semestrais ao veterinário" },
      { icon: <Shield className="w-3.5 h-3.5" />, text: "Suporte para articulações e mobilidade" },
      { icon: <Stethoscope className="w-3.5 h-3.5" />, text: "Dieta adaptada para a idade" },
    ],
    ageRangeLabel: "8+ anos",
    dogYearRange: [60, 130],
  },
];

const SIZE_OPTIONS = [
  {
    id: "small" as DogSize,
    label: "Pequeno",
    sublabel: "até 10 kg",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <ellipse cx="10" cy="18" rx="2.5" ry="2.5" />
        <ellipse cx="18" cy="16" rx="2.5" ry="2.5" />
        <path d="M12.5 15.5L10 18" />
        <path d="M18 16l-2-7" />
        <path d="M20 14c1-1.5 1.5-3.5 1.5-5 0-2.5-2-4.5-4.5-4.5-1.5 0-2.8.7-3.6 1.8" />
        <path d="M10 12c0-1.1.9-2 2-2h1.5" />
        <path d="M7 13.5L9 11" />
        <path d="M5 14.5v2.5" />
      </svg>
    ),
  },
  {
    id: "medium" as DogSize,
    label: "Médio",
    sublabel: "10 – 25 kg",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 16v5" />
        <path d="M19 16v5" />
        <path d="M12 12L9 16" />
        <path d="M19 16l-3-7" />
        <path d="M22 13c1-1.5 1.5-3.5 1.5-5 0-2.5-2-4.5-4.5-4.5-1.5 0-2.8.7-3.5 1.8" />
        <path d="M11 11c0-1.1.9-2 2-2h1.5" />
        <path d="M7 14l2.5-3.5" />
        <path d="M5 15v4" />
      </svg>
    ),
  },
  {
    id: "large" as DogSize,
    label: "Grande",
    sublabel: "25+ kg",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M8 15v6" />
        <path d="M20 15v6" />
        <path d="M13 10L8 15" />
        <path d="M20 15l-4-8" />
        <path d="M24 11c1-1.5 1.5-3.5 1.5-5 0-2.5-2-4.5-4.5-4.5-1.5 0-2.8.7-3.5 1.8" />
        <path d="M12 9c0-1.1.9-2 2-2h1.5" />
        <path d="M6 13l2.5-3.5" />
        <path d="M4 14v5" />
      </svg>
    ),
  },
];

// ─── Lógica ───────────────────────────────────────────────────────────────────

function calculateDogAge(humanYears: number, size: DogSize): number {
  if (humanYears === 0) return 0;
  if (humanYears <= 1) return 15;
  if (humanYears <= 2) return 24;
  const extra = humanYears - 2;
  return size === "small" ? 24 + extra * 4 : size === "medium" ? 24 + extra * 5 : 24 + extra * 6;
}

function getStage(dogAge: number): LifeStageData {
  if (dogAge < 24) return STAGES[0];
  if (dogAge <= 60) return STAGES[1];
  return STAGES[2];
}

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function DogAgeCalculator() {
  const [size, setSize] = useState<DogSize>("medium");
  const [age, setAge] = useState<number>(4);

  const dogAge = useMemo(() => calculateDogAge(age, size), [age, size]);
  const stage = useMemo(() => getStage(dogAge), [dogAge]);

  // Progresso normalizado dentro da fase (0 → 1)
  const stageProgress = useMemo(() => {
    const [min, max] = stage.dogYearRange;
    return Math.min(1, Math.max(0, (dogAge - min) / (max - min)));
  }, [dogAge, stage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-stone-200)]">

        {/* ── PAINEL ESQUERDO: Imagem + Info da Fase ───────────────────────── */}
        <div className="lg:col-span-2 relative min-h-[360px] lg:min-h-0 bg-[var(--color-primary)]">
          {/* Imagem de fundo animada */}
          <AnimatePresence mode="wait">
            <motion.img
              key={stage.image}
              src={stage.image}
              alt={stage.label}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Gradiente overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Badge do porte no topo */}
          <div className="absolute top-5 left-5 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold"
              >
                <span>{stage.emoji}</span>
                {stage.label}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card inferior glassmorphism */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.key + "-info"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
              >
                <p className="text-white font-semibold text-sm mb-3 leading-snug">
                  {stage.message}
                </p>
                <ul className="space-y-1.5">
                  {stage.tips.map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-2 text-white/80 text-xs"
                    >
                      <span className="text-white/60 flex-shrink-0">{tip.icon}</span>
                      {tip.text}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── PAINEL DIREITO: Controles ─────────────────────────────────────── */}
        <div className="lg:col-span-3 bg-white flex flex-col p-6 md:p-8 gap-7">

          {/* Header */}
          <div>
            <p className="text-[10px] font-bold text-[var(--color-stone-600)] uppercase tracking-[0.15em] mb-1">
              Calculadora de Idade
            </p>
            <h2 className="text-2xl font-black text-[var(--color-primary)] tracking-tight">
              Quantos anos tem seu cão?
            </h2>
          </div>

          {/* Seletor de Porte */}
          <div>
            <p className="text-[10px] font-bold text-[var(--color-stone-600)] uppercase tracking-[0.15em] mb-3">
              Porte
            </p>
            <div className="grid grid-cols-3 gap-3">
              {SIZE_OPTIONS.map((opt) => {
                const active = size === opt.id;
                return (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSize(opt.id)}
                    className={cn(
                      "relative flex flex-col items-center justify-center py-3 px-2 rounded-2xl border-2 transition-all duration-200 gap-1",
                      active
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)] shadow-md"
                        : "border-[var(--color-stone-200)] bg-[var(--color-surface)] text-[var(--color-stone-600)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)]/40"
                    )}
                  >
                    <span className={cn("transition-colors", active ? "text-[var(--color-accent)]" : "text-[var(--color-stone-600)]")}>
                      {opt.icon}
                    </span>
                    <span className={cn("font-bold text-xs leading-none", active ? "text-[var(--color-accent)]" : "text-[var(--color-primary)]")}>
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-[var(--color-stone-600)] leading-none">{opt.sublabel}</span>
                    {active && (
                      <motion.div
                        layoutId="size-indicator"
                        className="absolute inset-0 rounded-2xl border-2 border-[var(--color-accent)] pointer-events-none"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Slider de Idade */}
          <div className="bg-[var(--color-surface)] rounded-2xl p-5 border border-[var(--color-stone-200)]">
            <div className="flex justify-between items-end mb-5">
              <p className="text-[10px] font-bold text-[var(--color-stone-600)] uppercase tracking-[0.15em]">
                Idade Real do Cão
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={age}
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-baseline gap-1"
                >
                  <span className="text-4xl font-black text-[var(--color-primary)] tabular-nums leading-none">
                    {age}
                  </span>
                  <span className="text-sm text-[var(--color-stone-600)] font-medium">
                    {age === 1 ? "ano" : "anos"}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Marcadores de marcos */}
            <div className="relative mb-2">
              <input
                id="age-slider"
                type="range"
                min="0"
                max="20"
                step="1"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className={cn(
                  "w-full h-2.5 rounded-full appearance-none cursor-pointer",
                  "bg-gradient-to-r from-sky-300 via-[var(--color-accent)] to-purple-400",
                  "focus:outline-none",
                  "[&::-webkit-slider-thumb]:appearance-none",
                  "[&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6",
                  "[&::-webkit-slider-thumb]:rounded-full",
                  "[&::-webkit-slider-thumb]:bg-white",
                  "[&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[var(--color-accent)]",
                  "[&::-webkit-slider-thumb]:shadow-lg",
                  "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150",
                  "[&::-webkit-slider-thumb]:hover:scale-110",
                  "[&::-webkit-slider-thumb]:active:scale-95",
                  "[&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6",
                  "[&::-moz-range-thumb]:rounded-full",
                  "[&::-moz-range-thumb]:bg-white",
                  "[&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[var(--color-accent)]",
                  "[&::-moz-range-thumb]:shadow-lg",
                )}
              />
            </div>

            {/* Labels milestones */}
            <div className="flex justify-between text-[10px] text-[var(--color-stone-600)] font-semibold uppercase tracking-wider px-0.5">
              <span>Recém‑nascido</span>
              <span>5 anos</span>
              <span>10 anos</span>
              <span>15 anos</span>
              <span>20 anos</span>
            </div>
          </div>

          {/* Resultado */}
          <div className="flex flex-col sm:flex-row items-center gap-5 bg-[var(--color-primary)] rounded-2xl p-5">
            {/* Número */}
            <div className="text-center sm:text-left sm:border-r sm:border-white/10 sm:pr-5 flex-shrink-0">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">
                Em anos humanos
              </p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={dogAge}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  className="block text-6xl font-black text-white tracking-tighter leading-none"
                >
                  {dogAge}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Barra de fases de vida */}
            <div className="flex-1 w-full">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
                Fase de vida
              </p>
              <div className="flex gap-1.5 mb-2">
                {STAGES.map((s) => {
                  const active = s.key === stage.key;
                  return (
                    <div
                      key={s.key}
                      className={cn(
                        "flex-1 rounded-full h-1.5 transition-all duration-500",
                        s.key === "puppy" ? "bg-sky-400" : s.key === "adult" ? "bg-[var(--color-accent)]" : "bg-purple-400",
                        !active && "opacity-30"
                      )}
                    />
                  );
                })}
              </div>
              <div className="flex gap-1.5">
                {STAGES.map((s) => {
                  const active = s.key === stage.key;
                  return (
                    <div key={s.key} className="flex-1">
                      <AnimatePresence>
                        {active && (
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-white text-xs font-bold truncate"
                          >
                            {s.emoji} {s.label}
                          </motion.p>
                        )}
                        {!active && (
                          <p className="text-white/30 text-xs font-medium truncate">{s.label}</p>
                        )}
                      </AnimatePresence>
                      <p className={cn("text-[10px] truncate", active ? "text-white/60" : "text-white/20")}>
                        {s.ageRangeLabel}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mini barra de progresso dentro da fase */}
              <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    stage.key === "puppy" ? "bg-sky-400" : stage.key === "adult" ? "bg-[var(--color-accent)]" : "bg-purple-400"
                  )}
                  animate={{ width: `${Math.round(stageProgress * 100)}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <p className="text-white/40 text-[10px] mt-1">
                {Math.round(stageProgress * 100)}% da fase {stage.label.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 text-xs text-[var(--color-stone-600)] bg-[var(--color-surface)] border border-[var(--color-stone-200)] rounded-xl p-3.5 leading-relaxed">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--color-stone-600)]" />
            <p>
              Estimativa baseada em médias veterinárias. O envelhecimento real varia conforme a raça, genética e saúde do animal.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
