import { Hero } from "@/components/home/Hero";
import { AuthoritySection } from "@/components/home/AuthoritySection";
// import { PopularBreeds } from "@/components/home/PopularBreeds"; // <-- Remova ou comente essa linha
import { FeaturedBreedsHover } from "@/components/home/FeaturedBreedsHover";
import { EditorialHighlights } from "@/components/home/EditorialHighlights";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getFeaturedArticles } from "@/lib/data/articles";

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <main className="min-h-screen">
      <Hero />
      <AuthoritySection />

      {/* Nova Seção Substituindo a PopularBreeds */}
      <FeaturedBreedsHover />

      <EditorialHighlights articles={articles} />

      <FinalCTA />
    </main>
  );
}