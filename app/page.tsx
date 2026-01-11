import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PopularBreeds } from "@/components/PopularBreeds";
import { CareGuides } from "@/components/CareGuides"; 
import { FAQ } from "@/components/FAQ";
import { LatestPosts } from "@/components/LatestPosts";
import { EditorialHighlights } from "@/components/EditorialHighlights";
import { AuthoritySection } from "@/components/AuthoritySection";




export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AuthoritySection />
      <EditorialHighlights />
      <FAQ />
      <PopularBreeds />
      <CareGuides />
      <LatestPosts />
    </>
  );
}
