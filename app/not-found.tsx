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
    page = await getPageBySlug("404");
  } catch (error) {
    console.error("Erro ao carregar página 404:", error);
  }

  const title = page?.title || FALLBACK_404.title;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imagePath = page?.image_url?.trim();
  
  const fullImageUrl = (imagePath && supabaseUrl)
    ? `${supabaseUrl}/storage/v1/object/public/${imagePath}`
    : null;

  return (
    // Removi o padding horizontal (px) do main para a imagem tocar as bordas
    <main className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center bg-white pb-12">
      
      {/* 🖼️ ÁREA DA IMAGEM - FULL WIDTH (De ponta a ponta) */}
      {fullImageUrl ? (
        <div className="relative w-full mb-8">
          {/* TRUQUE DE UI/UX:
             - width/height={0} + sizes="100vw": Faz a imagem se comportar como um banner HTML nativo.
             - w-full h-auto: Garante que ela ocupe 100% da largura e a altura se ajuste proporcionalmente (sem cortes no desktop).
             - min-h-[...]: No mobile, garante que a imagem tenha uma altura mínima digna.
             - object-cover (mobile): No celular, cortamos um pouco as laterais para focar no cão.
          */}
          <Image
            src={fullImageUrl}
            alt="Página não encontrada"
            width={1920} // Referência de proporção HD
            height={1080}
            className="w-full h-auto min-h-[40vh] object-cover md:object-contain bg-gray-50"
            priority
            unoptimized
          />
        </div>
      ) : (
        // Espaço reservado caso não tenha imagem (para o layout não quebrar)
        <div className="w-full h-24"></div>
      )}

      {/* CONTEÚDO DE TEXTO - Este sim fica centralizado e contido */}
      <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center space-y-8">
        
        {/* Título Principal */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          {title}
        </h1>

        {/* Conteúdo HTML (Texto descritivo) */}
        {page?.content ? (
          <div 
            className="prose prose-lg prose-gray mx-auto text-gray-600 leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <p className="text-xl text-gray-600 leading-relaxed">
            {FALLBACK_404.description}
          </p>
        )}

        {/* Botões de Ação - Mais destacados */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
          <Link
            href="/"
            className="flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          >
            Voltar ao Início
          </Link>

          <Link
            href="/racas"
            className="flex items-center justify-center rounded-full border-2 border-gray-200 px-10 py-4 text-lg font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            Ver Raças
          </Link>
        </div>
      </div>
    </main>
  );
}