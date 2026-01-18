'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, HeartHandshake } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Conteúdo Confiável',
    description:
      'Todos os nossos guias são baseados em fontes veterinárias e estudos atualizados.',
  },
  {
    icon: BookOpen,
    title: 'Curadoria Especializada',
    description:
      'Selecionamos e organizamos informações para facilitar decisões conscientes.',
  },
  {
    icon: HeartHandshake,
    title: 'Amor e Responsabilidade',
    description:
      'Criado por quem ama cães e acredita em cuidado responsável e bem-estar animal.',
  },
];

export function AuthoritySection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Informação de qualidade para quem leva o cuidado a sério
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Aqui você encontra conteúdo confiável, acessível e feito com
            responsabilidade — porque seu cachorro merece o melhor.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
