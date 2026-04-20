import { getAllBreeds } from "@/lib/data/breeds";
import { BreedGrid } from "@/components/breeds/BreedGrid";

export default async function RacasPage() {
  const breeds = await getAllBreeds();

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 md:text-6xl mb-4 tracking-tight">
            Descubra sua <br />
            <span className="text-blue-600">companhia perfeita.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore nosso banco de dados oficial conectado em tempo real.
          </p>
        </div>

        {/* Passamos os dados puros */}
        <BreedGrid breeds={breeds} />
      </div>
    </main>
  );
}