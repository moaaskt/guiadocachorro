import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">{data.title}</h1>

        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-auto rounded-xl mb-8"
          />
        )}

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </section>
    </main>
  );
}
