import type { Metadata } from "next";
import { Syringe, Utensils, ArrowRight } from "lucide-react";
import DogAgeCalculator from "@/components/tools/DogAgeCalculator";

export const metadata: Metadata = {
  title: "Saúde Canina | Guia do Cão",
  description: "Ferramentas interativas e guias veterinários para garantir a saúde e bem-estar do seu cachorro.",
};

export default function SaudePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Cuide da Saúde do seu Melhor Amigo
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Ferramentas interativas e guias veterinários para garantir uma vida longa e feliz ao seu cão.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          
          {/* Destaque: Calculadora de Idade (Ocupa 2 colunas em LG ou linha inteira dependendo do design) 
              Optei por col-span-full em MD para destaque total como sugerido, 
              ou lg:col-span-2 para dividir espaço com um card de destaque lateral se houvesse.
              Seguindo a ideia de "Destaque Total", vou fazê-la ocupar o topo do grid.
          */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-center mb-4">
            <DogAgeCalculator />
          </div>

          {/* Card: Guia de Vacinação */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 flex flex-col items-center text-center h-full transition-transform hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <Syringe className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Guia de Vacinação
            </h3>
            <p className="text-slate-500 mb-6 flex-grow">
              Calendário personalizado e lembretes para todas as vacinas essenciais.
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
              Em Breve
            </span>
          </div>

          {/* Card: Calculadora de Nutrição */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 flex flex-col items-center text-center h-full transition-transform hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
              <Utensils className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Calculadora de Nutrição
            </h3>
            <p className="text-slate-500 mb-6 flex-grow">
              Descubra a quantidade ideal de ração baseada no peso e atividade.
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
              Em Breve
            </span>
          </div>

          {/* Card Extra para preencher o Grid de 3 colunas (Opcional, mas melhora o visual) 
              Como o grid é de 3, e temos 2 cards pequenos, ficaria um buraco se não centralizarmos.
              Vou adicionar um card de "Check-up" ou deixar os 2 centralizados.
              Para centralizar os cards na última linha se sobrarem, podemos usar classes flex no pai ou col-start.
              Mas para simplificar, vou deixar os 2 cards ocupando seu espaço natural.
              Se quiser preencher:
          */}
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 flex flex-col items-center text-center h-full transition-transform hover:-translate-y-1 duration-300 md:col-span-2 lg:col-span-1">
             <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-6">
              <ArrowRight className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Mais Ferramentas
            </h3>
            <p className="text-slate-500 mb-6 flex-grow">
              Novas funcionalidades veterinárias estão sendo desenvolvidas.
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
              Aguarde
            </span>
          </div>

        </div>
      </div>
    </main>
  );
}
