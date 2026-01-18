import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/data/articles";

export function ArticleCard({ article }: { article: Article }) {
  // Formata data
  const date = new Date(article.created_at).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link 
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1"
    >
      {/* Imagem */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <Image
          src={article.image_url}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge de Categoria */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wide">
          {article.category}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Calendar size={14} />
          {date}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mt-auto">
          Ler artigo completo <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}