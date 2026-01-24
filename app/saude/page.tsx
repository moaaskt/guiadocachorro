import { Metadata } from "next";
import DogAgeCalculator from "@/components/tools/DogAgeCalculator";
import SymptomChecker from "@/components/tools/SymptomChecker";
import { Stethoscope, Activity, Syringe, Utensils, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "Saúde Canina & Ferramentas | Guia do Cão",
  description: "Ferramentas interativas, calculadoras de idade e verificador de sintomas para a longevidade do seu cão.",
};

export default function SaudePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* 1. HERO SECTION (Navy & Amber) */}
      <div className="bg-primary pt-28 pb-40 text-center text-white relative overflow-hidden">
        {/* Background Decorativo Suave */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-[100px]"></div>
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md border border-white/10 shadow-lg">
            <Activity size={16} /> Hub Veterinário
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Longevidade é uma <span className="text-accent">escolha diária.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Use nossas ferramentas interativas para monitorar sinais vitais, 
            calcular a idade real e entender os sinais que seu cão dá.
          </p>
        </div>
      </div>

      {/* 2. CONTEÚDO PRINCIPAL (Grid de Ferramentas) */}
      <div className="container mx-auto px-4 md:px-6 -mt-24 relative z-20 pb-20">
        <div className="flex flex-col gap-20">
          
          {/* FERRAMENTA 01: CALCULADORA DE IDADE */}
          <section id="calculadora-idade" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8 pl-2">
               <div className="bg-accent p-3 rounded-2xl text-white shadow-lg shadow-accent/20">
                 <HeartPulse size={28} />
               </div>
               <div>
                 <h2 className="text-3xl font-bold text-slate-900">Calculadora de Idade Real</h2>
                 <p className="text-slate-500">Descubra em que fase da vida seu cão realmente está.</p>
               </div>
            </div>
            
            {/* O Componente da Calculadora */}
            <DogAgeCalculator />
          </section>

          {/* FERRAMENTA 02: VERIFICADOR DE SINTOMAS (NOVO) */}
          <section id="sintomas" className="scroll-mt-32">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pl-2">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-primary/20">
                    <Stethoscope size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">Mapa de Sintomas</h2>
                    <p className="text-slate-500 mt-1">Onde dói? Toque nos pontos para ver sinais de alerta comuns.</p>
                  </div>
                </div>
             </div>
             
             {/* O Componente do Mapa Anatômico */}
             <div className="bg-white rounded-3xl p-4 md:p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Stethoscope size={120} />
                </div>
                <SymptomChecker />
             </div>
          </section>

          {/* SEÇÃO 3: O QUE VEM POR AÍ (TEASER) */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 pl-2 flex items-center gap-2">
                Em Breve <span className="text-xs font-normal bg-slate-100 px-2 py-1 rounded text-slate-500">Estamos trabalhando nisso</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComingSoonCard 
                  icon={Syringe} 
                  title="Guia de Vacinação" 
                  desc="Cronograma personalizado de vacinas baseado na idade e estilo de vida." 
                />
                <ComingSoonCard 
                  icon={Utensils} 
                  title="Calculadora Nutricional" 
                  desc="Saiba a quantidade exata de calorias e ração para o porte do seu cão." 
                />
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

// Componente visual simples para "Em Breve"
function ComingSoonCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-300 flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 hover:border-accent/50 hover:bg-amber-50/30 transition-all duration-300 cursor-not-allowed group">
      <div className="bg-slate-100 p-4 rounded-2xl text-slate-400 group-hover:text-accent group-hover:bg-white transition-colors shadow-sm">
        <Icon size={32} />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-slate-700 group-hover:text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}