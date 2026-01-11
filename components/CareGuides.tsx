import { Heart, Bone, Activity, ShieldPlus } from "lucide-react";

const guides = [
  {
    title: "Alimentação",
    description: "Dicas essenciais para manter seu cão saudável e bem nutrido.",
    icon: Bone,
  },
  {
    title: "Saúde",
    description: "Cuidados veterinários, vacinas e prevenção de doenças.",
    icon: ShieldPlus,
  },
  {
    title: "Comportamento",
    description: "Entenda melhor seu cão e fortaleça o vínculo.",
    icon: Activity,
  },
  {
    title: "Bem-estar",
    description: "Qualidade de vida, rotina e felicidade para seu pet.",
    icon: Heart,
  },
];

export function CareGuides() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Guias de Cuidados
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Tudo o que você precisa saber para cuidar bem do seu melhor amigo.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-gray-200 p-6 transition hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-orange-100 mb-6 group-hover:scale-105 transition">
                <guide.icon className="w-7 h-7 text-orange-500" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {guide.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {guide.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
