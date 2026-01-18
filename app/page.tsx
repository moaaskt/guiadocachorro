import { getFeaturedArticles } from "@/lib/data/articles";
import { Hero } from "@/components/home/Hero";
import { AuthoritySection } from "@/components/home/AuthoritySection";
import { PopularBreeds } from "@/components/home/PopularBreeds";
import { CareGuides } from "@/components/home/CareGuides";
import { EditorialHighlights } from "@/components/home/EditorialHighlights";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default async function Home() {
  // Buscamos os artigos em destaque
  const articles = await getFeaturedArticles();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. Hero Section - Apresentação Inicial */}
      <Hero />

      {/* 2. Authority Section - Confiabilidade e Autoridade */}
      <AuthoritySection />

      {/* 3. Popular Breeds - Preview de Raças Populares */}
      <PopularBreeds />

      {/* 4. Care Guides - Guias de Cuidados com Ícones */}
      <CareGuides />

      {/* 5. Editorial Highlights - Artigos em Destaque */}
      <EditorialHighlights articles={articles} />

      {/* 6. FAQ - Perguntas Frequentes */}
      <FAQ />

      {/* 7. Final CTA - Chamada Final antes do Rodapé */}
      <FinalCTA />
    </main>
  );
}
