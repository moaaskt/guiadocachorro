import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  image_url: string;
  category: string;
  readTime: string;
}

interface EditorialHighlightsProps {
  articles: Article[];
}

export function EditorialHighlights({ articles }: EditorialHighlightsProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1C3A35] mb-4">
              Destaques Editoriais
            </h2>
            <p className="text-stone-600 max-w-xl">
              Artigos profundos baseados em ciência veterinária atualizada.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="hidden md:flex items-center gap-2 text-[#1C3A35] font-bold hover:text-amber-600 transition-colors"
          >
            Ver todos os artigos <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={article.image_url || article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#1C3A35] uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                    <Clock size={14} />
                    <span>{article.readTime} de leitura</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1C3A35] mb-3 group-hover:text-amber-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-3 mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  <span className="text-[#1C3A35] font-bold text-sm flex items-center gap-2 mt-auto">
                    Ler artigo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}