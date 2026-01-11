import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PopularBreeds } from "@/components/PopularBreeds";
import { CareGuides } from "@/components/CareGuides"; 
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <PopularBreeds />
      <CareGuides />
      <FAQ />
    </>
  );
}
