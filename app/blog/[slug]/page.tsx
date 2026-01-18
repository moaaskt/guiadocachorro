import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Share2 } from "lucide-react";
import { getArticleBySlug } from "@/lib/data/articles";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { processContent } from "@/lib/toc";
import { TableOfContents } from "@/components/ui/TableOfContents";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const date = new Date(article.created_at).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Calculando tempo de leitura baseado no tamanho do texto (simples)
  const readingTime = Math.ceil((article.content?.length || 0) / 1000) || 5;

  // Processa o conteúdo HTML para extrair TOC e injetar IDs nos cabeçalhos
  const { content: contentWithIds, toc } = processContent(article.content || "");

  return (
    <article className="min-h-screen bg-white pb-20 pt-24">
      {/* CABEÇALHO */}
      <header className="mx-auto max-w-3xl px-6 text-center mb-10">
        {/* Breadcrumb */}
        <div className="flex justify-center mb-8">
          <Breadcrumb currentPageName={article.title} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            {article.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex items-center justify-center gap-6 text-gray-500 text-sm border-t border-b border-gray-100 py-4 mt-8">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {date}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            {readingTime} min de leitura
          </div>
          <button className="flex items-center gap-2 hover:text-accent transition">
            <Share2 size={16} />
            Compartilhar
          </button>
        </div>
      </header>

      {/* IMAGEM */}
      <div className="mx-auto max-w-5xl px-6 mb-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl shadow-gray-200/50">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* CONTEÚDO RICO (HTML) COM SIDEBAR */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* SIDEBAR - Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <TableOfContents 
              items={toc} 
              backLink="/blog" 
              backLabel="Voltar para o Blog" 
            />
          </aside>

          {/* CONTEÚDO PRINCIPAL */}
          <div className="lg:col-span-9">
            <div 
              className="prose prose-lg prose-blue prose-headings:font-bold prose-img:rounded-xl text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />
            
            {/* Sessão de Comentários (Futuro) */}
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-center border border-gray-100">
              <p className="text-gray-500 mb-2">Gostou do artigo?</p>
              <p className="font-semibold text-gray-900">Em breve você poderá comentar aqui!</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}