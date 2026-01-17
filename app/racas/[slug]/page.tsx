import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBreedBySlug } from "@/lib/data/breeds";
import { BreedStats } from "@/components/breeds/BreedStats";

// ⚠️ MUDANÇA CRÍTICA AQUI: Definimos params como uma Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BreedDetailsPage({ params }: Props) {
  // 1. Desembrulhar os parametros (AWAIT) - Exigência do Next.js 15
  const { slug } = await params;

  // 2. Buscamos a raça no banco
  const breed = await getBreedBySlug(slug);

  // 3. Se não achar, 404
  if (!breed) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      
      {/* HERO SECTION */}
      <div className="relative h-[60vh] w-full">
        {/* Adicionado unoptimized para evitar erro 400 em imagens externas instáveis */}
        <Image
          src={breed.image_url}
          alt={breed.name}
          fill
          className="object-cover"
          priority
          unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <Link 
          href="/racas"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <span className="mb-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              {breed.category}
            </span>
            <h1 className="text-5xl font-extrabold text-white md:text-7xl tracking-tight">
              {breed.name}
            </h1>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="mx-auto max-w-7xl px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Raça</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {breed.description}
              </p>
              
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                 {breed.characteristics?.map((char, i) => (
                   <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                     <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                     <span className="text-sm font-medium text-gray-700">{char}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <BreedStats stats={breed.stats} />
            
            <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl shadow-blue-600/20">
              <h3 className="text-xl font-bold mb-2">Gostou do {breed.name}?</h3>
              <p className="text-blue-100 mb-6 text-sm">
                Encontre canis responsáveis ou grupos de adoção.
              </p>
              <button className="w-full rounded-xl bg-white py-3 font-bold text-blue-600 hover:bg-blue-50 transition">
                Buscar Parceiros
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}