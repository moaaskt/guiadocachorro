"use client";

import { motion } from "framer-motion";

interface StatProps {
  label: string;
  value: number; // De 0 a 5 (ou 0 a 100)
  color?: string;
}

const statsData = [
  { label: "Nível de Energia", value: 5, color: "bg-red-500" },
  { label: "Amigável com Crianças", value: 5, color: "bg-green-500" },
  { label: "Inteligência", value: 4, color: "bg-blue-500" },
  { label: "Guarda / Proteção", value: 2, color: "bg-orange-500" },
  { label: "Necessidade de Exercício", value: 5, color: "bg-purple-500" },
];

export function BreedStats() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Personalidade</h3>
      
      <div className="space-y-6">
        {statsData.map((stat, index) => (
          <div key={stat.label}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              <span className="text-sm font-bold text-gray-900">{stat.value}/5</span>
            </div>
            
            {/* A Barra de Fundo (Cinza) */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              {/* A Barra Colorida (Animada) */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(stat.value / 5) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }} // Só anima quando aparecer na tela
                className={`h-full rounded-full ${stat.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}