import Link from "next/link";
import Image from "next/image";
import { getPageBySlug } from "@/lib/data/pages";
import type { Page } from "@/lib/types/pages";

const FALLBACK_404 = {
  title: "Página não encontrada",
  description: "O conteúdo que você procura não existe ou foi movido.",
};

export default async function NotFound() {
  let page: Page | null = null;
  
  try {
    // Tenta buscar o conteúdo da página 404 no banco
    // Usando slug '404' conforme definimos no banco
    page = await getPageBySlug("404");
  } catch (error) {
    console.error("Erro ao carregar página 404:", error);
  }

  const title = page?.title || FALLBACK_404.title;
  
  // Tratamento da URL da imagem
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imagePath = page?.image_url?.trim();
  
  // Monta a URL apenas se tivermos os dois pedaços
  const fullImageUrl = (imagePath && supabaseUrl)
    ? `${supabaseUrl}/storage/v1/object/public/${imagePath}`
    : null;

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-gray-50 text-center px-6 py-12">
      
      <div className="z-10 max-w-lg w-full flex flex-col items-center space-y-8">
        
        {/* 🖼️ IMAGEM */}
        {fullImageUrl && (
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 drop-shadow-xl">
            {/* ATENÇÃO: Adicionei 'unoptimized'. 
                Isso resolve o erro 400 pois o Next para de tentar processar a imagem no servidor
                e deixa o navegador carregar direto do Supabase.
            */}
            <Image
              src={fullImageUrl}
              alt="Página não encontrada"
              fill
              className="object-contain"
              priority
              unoptimized 
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>

          {page?.content ? (
            <div 
              className="prose prose-gray mx-auto text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <p className="text-lg text-gray-600 leading-relaxed">
              {FALLBACK_404.description}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-6">
          <Link
            href="/"
            className="flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition-transform active:scale-95 hover:bg-blue-700"
          >
            Voltar ao Início
          </Link>

          <Link
            href="/racas"
            className="flex items-center justify-center rounded-xl border-2 border-gray-200 px-8 py-4 font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100"
          >
            Ver Raças
          </Link>
        </div>
      </div>
    </main>
  );
}