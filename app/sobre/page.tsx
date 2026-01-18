import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck, Users, PawPrint, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#FDFCF8] min-h-screen pb-20 selection:bg-amber-200">
      
      {/* 1. HERO: Acolhedor e Editorial */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Elemento decorativo de fundo (mancha orgânica) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 shadow-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-bold tracking-wide text-stone-600 uppercase">Manifesto Guia do Cão</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-stone-900 mb-8 leading-[1.1]">
            Menos mitos. <br className="hidden md:block" />
            <span className="relative inline-block">
              Mais lambeijos.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-400 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-serif">
            Traduzimos a ciência veterinária para a linguagem do amor. Porque cuidar bem é a melhor forma de dizer "eu te amo".
          </p>
        </div>
      </section>

      {/* 2. BENTO GRID "Lifestyle" (Tons Terrosos e Naturais) */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 h-auto md:h-[750px]">
            
            {/* BLOCO 1: FOTO PRINCIPAL (Ocupa metade esquerda) */}
            <div className="md:col-span-7 md:row-span-2 relative group rounded-[2rem] overflow-hidden border border-stone-200 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000&auto=format&fit=crop"
                alt="Dois cachorros brincando na natureza"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <PawPrint className="w-10 h-10 text-amber-400 mb-4" />
                <h3 className="text-3xl font-bold mb-3 leading-tight">Nossa matilha é movida a verdade.</h3>
                <p className="text-stone-200 text-lg leading-relaxed">
                  Em um mundo cheio de fake news, somos o porto seguro. Cada artigo passa por revisão veterinária antes de chegar até você.
                </p>
              </div>
            </div>

            {/* BLOCO 2: ESTATÍSTICA (Verde Floresta - Confiança) */}
            <div className="md:col-span-5 bg-[#1C3A35] rounded-[2rem] p-8 flex flex-col justify-between text-white shadow-lg border border-[#2A524B] group">
              <div className="flex justify-between items-start">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
                  <ShieldCheck className="w-8 h-8 text-green-300" />
                </div>
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
              </div>
              
              <div className="mt-8">
                <div className="flex items-baseline gap-2">
                   <h3 className="text-6xl font-bold text-white tracking-tighter">100%</h3>
                   <span className="text-green-300 font-medium">Revisado</span>
                </div>
                <p className="text-stone-300 mt-2 text-lg">
                  Conteúdo livre de achismos. Aqui, a saúde do seu pet é tratada com a seriedade que ele merece.
                </p>
              </div>
            </div>

            {/* BLOCO 3: COMUNIDADE (Âmbar/Laranja - Calor) */}
            <div className="md:col-span-5 bg-amber-500 rounded-[2rem] p-8 flex flex-col justify-between text-stone-900 shadow-lg relative overflow-hidden group">
              {/* Círculo decorativo animado */}
              <div className="absolute -right-12 -top-12 bg-white/20 w-48 h-48 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <Users className="w-10 h-10 text-stone-900 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Junte-se a +12k Tutores</h3>
                <p className="text-stone-800 font-medium mb-6">Receba nossa newsletter semanal. Zero spam, muito conteúdo.</p>
              </div>
              
              <Link href="/blog" className="relative z-10 inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition-all w-full md:w-auto">
                Explorar o Blog <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 3. RODAPÉ DE CREDIBILIDADE - Estilo "Carta" */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDFCF8] p-4 rounded-full border border-stone-100 shadow-sm">
             <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 mt-4">
            "O cão é o único ser que te ama mais do que a si mesmo."
          </h2>
          <p className="text-stone-500 italic mb-8">— Josh Billings</p>

          <div className="flex flex-wrap justify-center gap-4">
             <div className="bg-stone-50 px-6 py-3 rounded-full border border-stone-200 text-stone-600 font-medium text-sm">
                ❤️ Feito com amor
             </div>
             <div className="bg-stone-50 px-6 py-3 rounded-full border border-stone-200 text-stone-600 font-medium text-sm">
                🔬 Baseado em ciência
             </div>
             <div className="bg-stone-50 px-6 py-3 rounded-full border border-stone-200 text-stone-600 font-medium text-sm">
                🐕 Foco no bem-estar
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}