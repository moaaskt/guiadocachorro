import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { getArticleBySlug } from "@/lib/data/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: Props) {
  // 1. Dedo-duro: Ver se o parametro chegou
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  console.log("🔍 TENTANDO ABRIR O SLUG:", slug);

  // 2. Dedo-duro: Ver se achou no banco
  const article = await getArticleBySlug(slug);
  console.log("📦 RESULTADO DO BANCO:", article ? "ACHOU!" : "NÃO ACHOU (NULL)");

  if (!article) {
    console.log("❌ Artigo não encontrado, indo para 404...");
    notFound();
  }

  // Se chegou aqui, é sucesso
  const date = new Date(article.created_at).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="min-h-screen bg-white pb-20 pt-24">
      {/* CABEÇALHO */}
      <header className="mx-auto max-w-3xl px-6 text-center mb-10">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Voltar para o Blog
        </Link>

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

      {/* CONTEÚDO */}
      <div className="mx-auto max-w-3xl px-6">
        <div 
          className="prose prose-lg prose-blue prose-headings:font-bold prose-img:rounded-xl text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content || "<p>Conteúdo em breve...</p>" }}
        />
      </div>
    </article>
  );
}