"use client";

import { HoverCard } from "@/components/ui/HoverCard"; // Certifique-se que o HoverCard está aqui

export function FeaturedBreedsHover() {

    const highlights = [
      {
        title: "Golden Retriever",
        description: "O companheiro dourado perfeito. Inteligente, devoto e o melhor amigo que você poderia pedir.",
        staticImage: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80",
        hoverImage: "https://ppvkpgrjsrftzdqkbgmi.supabase.co/storage/v1/object/public/public-images/pages/goldenRetriever.gif", 
        link: "/racas/golden-retriever"
      },
      {
        title: "Husky Siberiano",
        description: "Drama, uivos e muita energia. Um companheiro para quem ama aventuras e boas conversas.",
        staticImage: "https://ppvkpgrjsrftzdqkbgmi.supabase.co/storage/v1/object/public/public-images/pages/husksiberianoIMG.jpeg",
        hoverImage: "https://ppvkpgrjsrftzdqkbgmi.supabase.co/storage/v1/object/public/public-images/pages/huskysiberianoGIF.gif",
        link: "/racas/husky-siberiano"
      },
      {
        title: "Bulldog Francês",
        description: "O rei do sofá. Pequeno no tamanho, gigante na personalidade e nos roncos.",
        staticImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
        hoverImage: "https://ppvkpgrjsrftzdqkbgmi.supabase.co/storage/v1/object/public/public-images/pages/bullgodsfreench.gif", 
        link: "/racas/bulldog-frances"
      }
    ];
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
            Raças em Destaque
          </h2>
          <p className="text-stone-600 text-lg">
            Conheça as raças que estão conquistando corações. Passe o mouse para ver a personalidade real delas.
          </p>
        </div>

        {/* Grid dos Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((breed, index) => (
            <HoverCard
              key={index}
              {...breed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}