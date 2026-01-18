import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Clock, Quote, ArrowRight, Stethoscope } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION COM TEXTURA */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-blue-600">
        <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Amor por cachorros,<br />
            <span className="text-blue-200">baseado em ciência.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Nossa missão é simplificar os cuidados caninos através de tecnologia e conteúdo de qualidade, para que você e seu melhor amigo vivam mais e melhor.
          </p>
        </div>
      </section>

      {/* 2. NOSSA HISTÓRIA E VALORES */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Imagem Emocional */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-yellow-200 rounded-2xl rotate-3 opacity-50 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop"
                  alt="Dono abraçando seu cachorro"
                  width={800}
                  height={1000}
                  className="object-cover w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Texto e Cards */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold uppercase tracking-wider mb-6">
                Como trabalhamos
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Informação séria para tutores apaixonados
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                A internet está cheia de mitos sobre cuidados caninos. Nós nascemos para ser o porto seguro onde você encontra a verdade, validada por especialistas e veterinários.
              </p>

              {/* Grid de Valores (Cards Interativos) */}
              <div className="space-y-6">
                
                {/* Card 1 */}
                <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Stethoscope size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Pesquisa Veterinária</h3>
                    <p className="text-gray-500 text-sm">Todo nosso conteúdo é revisado e baseado em estudos atualizados.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Bem-estar Animal</h3>
                    <p className="text-gray-500 text-sm">Focamos na saúde física e mental do cão, sem métodos punitivos.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Conteúdo Sempre Atual</h3>
                    <p className="text-gray-500 text-sm">Atualizações semanais para você não perder nenhuma novidade.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A CITAÇÃO (QUOTE) */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Quote size={48} className="mx-auto text-blue-200 mb-6" />
          <blockquote className="text-3xl md:text-4xl font-serif text-gray-800 italic leading-normal mb-8">
            "O cão é o único animal que te ama mais do que a si mesmo."
          </blockquote>
          <cite className="text-gray-500 font-medium not-italic">
            — Josh Billings
          </cite>
        </div>
      </section>

      {/* 4. CTA FINAL */}
      <section className="py-20 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Faça parte da nossa matilha
          </h2>
          <p className="text-gray-600 mb-8">
            Junte-se a milhares de donos que estão aprendendo a cuidar melhor de seus companheiros.
          </p>
          <div className="flex justify-center gap-4">
             <Link 
              href="/blog" 
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-200"
            >
              Ler o Blog <ArrowRight size={18} />
            </Link>
             <Link 
              href="/racas" 
              className="px-8 py-3 rounded-full bg-white text-gray-700 font-bold border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              Conhecer Raças
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}