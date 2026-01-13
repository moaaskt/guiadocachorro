'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const editorials = [
  {
    tag: 'Raças Populares',
    title: 'Golden Retriever: O companheiro perfeito?',
    description:
      'Descubra por que esta é uma das raças mais amadas do Mundo e se ela combina com o seu estilo de vida.',
    image:
      'https://images.unsplash.com/photo-1558788353-f76d92427f16',
  },
  {
    tag: 'Guias Essenciais',
    title: 'Alimentação natural vs. ração',
    description:
      'Um guia completo e imparcial sobre os prós e contras das principais dietas caninas.',
    image:
      'https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg',
  },
];

export function EditorialHighlights() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Destaques Editoriais
            </h2>
            <p className="text-gray-500 mt-2">
              Leituras essenciais selecionadas por nossa equipe.
            </p>
          </div>

          <button className="text-blue-600 font-bold hover:underline flex items-center gap-1">
            Ver todos os guias →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {editorials.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-white/20">
                  {item.tag}
                </span>

                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {item.title}
                </h3>

                <p className="text-gray-200 text-sm md:text-base mb-6 max-w-lg line-clamp-2">
                  {item.description}
                </p>

                <span className="inline-flex items-center gap-2 text-white font-bold group-hover:text-blue-400 transition-colors">
                  Ler artigo completo →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
