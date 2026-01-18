import Image from "next/image";

type Breed = {
  id: number;
  name: string;
  traits: string;
  image: string;
};

const breeds: Breed[] = [
  {
    id: 1,
    name: "Labrador",
    traits: "Amigável • Inteligente",
    image: "https://images.dog.ceo/breeds/labrador/n02099712_5643.jpg",
  },
  {
    id: 2,
    name: "Pug",
    traits: "Carinhoso • Brincalhão",
    image: "https://images.dog.ceo/breeds/pug/n02110958_15626.jpg",
  },
  {
    id: 3,
    name: "Golden Retriever",
    traits: "Leal • Sociável",
    image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg",
  },
  {
    id: 4,
    name: "Bulldog",
    traits: "Calmo • Companheiro",
    image: "https://images.dog.ceo/breeds/bulldog-english/mami.jpg",
  },
];

export function PopularBreeds() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Raças Populares
        </h2>

        <a
          href="/racas"
          className="text-sm font-semibold text-accent hover:underline"
        >
          Ver todas →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {breeds.map((breed) => (
          <article
            key={breed.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <div className="relative h-48">
              <Image
                src={breed.image}
                alt={breed.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {breed.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {breed.traits}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
