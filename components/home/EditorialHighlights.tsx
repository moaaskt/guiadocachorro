"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Article } from "@/lib/data/articles";

interface EditorialHighlightsProps {
  articles: Article[];
}

export function EditorialHighlights({ articles }: EditorialHighlightsProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">
              Blog & Dicas
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Destaques Editoriais
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Conteúdo profundo e baseado em ciência para você cuidar melhor do seu melhor amigo.
            </p>
          </div>
          
          <Link 
            href="/blog" 
            className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            Ver todos os artigos <ArrowRight size={20} />
          </Link>
        </div>

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              {/* Imagem com Zoom no Hover */}
              <Link href={`/blog/${article.slug}`} className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold bg-white/90 backdrop-blur text-gray-900 rounded-full shadow-sm">
                    {article.category}
                  </span>
                </div>
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Conteúdo */}
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                  {article.excerpt}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center text-sm font-medium text-blue-600">
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                    Ler artigo completo <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Botão Mobile */}
        <div className="mt-8 md:hidden text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-blue-600 font-semibold"
          >
            Ver todos os artigos <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
}