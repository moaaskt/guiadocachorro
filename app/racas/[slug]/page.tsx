import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BreedStats } from "@/components/breeds/BreedStats";

// MOCK DATA (Simulando o que virá do banco)
// No futuro, usaremos params.slug para buscar no Supabase
const BREED_DATA = {
  name: "Golden Retriever",
  category: "Família",
  description: "O Golden Retriever é um dos cães mais populares do mundo. Conhecido por sua inteligência, natureza devota e pelagem dourada deslumbrante, ele é o companheiro perfeito para famílias.",
  heroImage: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=1920&auto=format&fit=crop",
  characteristics: [
    "Ideal para apartamentos grandes ou casas",
    "Pelagem exige escovação semanal",
    "Não gosta de ficar sozinho por muito tempo"
  ]
};

export default function BreedDetailsPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      
      {/* 1. HERO SECTION (Imersiva) */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={BREED_DATA.heroImage}
          alt={BREED_DATA.name}
          fill
          className="object-cover"
          priority
        />
        {/* Gradiente para o texto aparecer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Botão Voltar Flutuante */}
        <Link 
          href="/racas"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        {/* Título Gigante */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <span className="mb-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              {BREED_DATA.category}
            </span>
            <h1 className="text-5xl font-extrabold text-white md:text-7xl tracking-tight">
              {BREED_DATA.name}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. CONTEÚDO PRINCIPAL (Grid) */}
      <div className="mx-auto max-w-7xl px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          
          {/* Coluna Esquerda: Texto Rico */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Raça</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {BREED_DATA.description}
              </p>
              
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                 {BREED_DATA.characteristics.map((char, i) => (
                   <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                     <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                     <span className="text-sm font-medium text-gray-700">{char}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Placeholder para mais conteúdo (História, Saúde, etc) */}
            <div className="rounded-3xl bg-gray-50 p-8 border border-dashed border-gray-300 text-center">
              <p className="text-gray-500">Aqui entrará o conteúdo detalhado do Supabase (HTML rico).</p>
            </div>
          </div>

          {/* Coluna Direita: Stats & Info Rápida */}
          <div className="space-y-6">
            <BreedStats />
            
            {/* Card de CTA (Call to Action) */}
            <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl shadow-blue-600/20">
              <h3 className="text-xl font-bold mb-2">Gostou do {BREED_DATA.name}?</h3>
              <p className="text-blue-100 mb-6 text-sm">
                Encontre canis responsáveis ou grupos de adoção próximos a você.
              </p>
              <button className="w-full rounded-xl bg-white py-3 font-bold text-blue-600 hover:bg-blue-50 transition">
                Buscar Canis Parceiros
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}