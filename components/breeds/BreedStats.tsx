"use client";

import { motion } from "framer-motion";

// Interface define o formato do dado
interface StatItem {
  label: string;
  value: number;
  color: string;
}

interface BreedStatsProps {
  stats: StatItem[];
}

export function BreedStats({ stats }: BreedStatsProps) {
  // Se não tiver stats, não mostra nada pra não quebrar
  if (!stats) return null;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Personalidade</h3>
      
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={stat.label}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              <span className="text-sm font-bold text-gray-900">{stat.value}/5</span>
            </div>
            
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(stat.value / 5) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
                // Agora a cor vem do banco (classe do Tailwind)
                className={`h-full rounded-full ${stat.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}