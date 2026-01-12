import Image from "next/image";

type Post = {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: "Como escolher a ração ideal para seu cachorro",
    category: "Alimentação",
    image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_200.jpg",
    date: "10 Jan 2026",
  },
  {
    id: 2,
    title: "5 sinais de que seu cachorro está estressado",
    category: "Saúde",
    image: "https://images.dog.ceo/breeds/pug/n02110958_15626.jpg",
    date: "08 Jan 2026",
  },
  {
    id: 3,
    title: "Guia completo de vacinação canina",
    category: "Cuidados",
    image: "https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg",
    date: "05 Jan 2026",
  },
];

export function LatestPosts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Últimas do Blog
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <span className="text-sm text-blue-600 font-medium">
                  {post.category}
                </span>

                <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  {post.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {post.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
