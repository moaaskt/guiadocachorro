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
    <main className="min-h-screen bg-[var(--color-surface)]">

      {/* HERO */}
      <div className="bg-primary pt-28 pb-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-accent text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md border border-white/20">
            <Activity size={16} /> Hub Veterinário
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Longevidade é uma <span className="text-accent">escolha diária.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Use nossas ferramentas interativas para monitorar sinais vitais,
            calcular a idade real e entender os sinais que seu cão dá.
          </p>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col gap-20">

          {/* FERRAMENTA 01: CALCULADORA DE IDADE */}
          <section id="calculadora-idade" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-accent p-3 rounded-2xl text-white shadow-lg shadow-accent/20">
                <HeartPulse size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Calculadora de Idade Real</h2>
                <p className="text-[var(--color-stone-600)]">Descubra em que fase da vida seu cão realmente está.</p>
              </div>
            </div>
            <DogAgeCalculator />
          </section>

          {/* FERRAMENTA 02: MAPA DE SINTOMAS */}
          <section id="sintomas" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary p-3 rounded-2xl text-white shadow-lg">
                <Stethoscope size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-primary)]">Mapa de Sintomas</h2>
                <p className="text-[var(--color-stone-600)]">Onde dói? Toque nos pontos para ver sinais de alerta comuns.</p>
              </div>
            </div>
            <SymptomChecker />
          </section>

          {/* SEÇÃO: EM BREVE */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">Em Breve</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-stone-100)] text-[var(--color-stone-600)] text-xs font-semibold">
                Estamos trabalhando nisso
              </span>
            </div>
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

function ComingSoonCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="relative p-8 rounded-2xl bg-[var(--color-surface)] border border-dashed border-[var(--color-stone-200)] flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 hover:border-accent/50 hover:bg-[var(--color-accent-light)]/30 transition-all duration-300 cursor-not-allowed group">
      <div className="absolute top-4 right-4 px-2 py-1 bg-[var(--color-stone-100)] rounded-full text-xs text-[var(--color-stone-600)] font-medium">
        Em breve
      </div>
      <div className="bg-[var(--color-stone-100)] p-4 rounded-2xl text-[var(--color-stone-600)] group-hover:text-accent group-hover:bg-white transition-colors shadow-sm flex-shrink-0">
        <Icon size={32} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-[var(--color-primary)] mb-1">{title}</h3>
        <p className="text-[var(--color-stone-600)] text-sm">{desc}</p>
      </div>
    </div>
  );
}
