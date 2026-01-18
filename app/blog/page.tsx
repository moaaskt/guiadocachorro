import { getAllArticles } from "@/lib/data/articles";
import { ArticleCard } from "@/components/blog/ArticleCard";

// Metadados para o Google achar sua página
export const metadata = {
  title: "Blog & Dicas | Guia do Cachorro",
  description: "Artigos, dicas de saúde e curiosidades sobre o mundo canino.",
};

export default async function BlogPage() {
  // Buscamos TODOS os artigos do banco
  const articles = await getAllArticles();

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-24">
      {/* CABEÇALHO DO BLOG */}
      <div className="bg-white border-b border-gray-200 pb-16 pt-8 mb-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
            Central de Conteúdo
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl mb-4 tracking-tight">
            Blog & Dicas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Informação de qualidade, baseada em ciência e amor, para você cuidar melhor do seu melhor amigo.
          </p>
        </div>
      </div>

      {/* LISTA DE ARTIGOS (GRID) */}
      <div className="mx-auto max-w-7xl px-6">
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          // Caso não tenha artigos no banco ainda
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg mb-2">Nenhum artigo encontrado.</p>
            <p className="text-sm text-gray-400">Volte em breve para novidades!</p>
          </div>
        )}
      </div>
    </main>
  );
}