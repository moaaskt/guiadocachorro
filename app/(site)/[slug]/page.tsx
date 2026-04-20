import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/data/pages";
import type { Page } from "@/lib/types/pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || page.status !== "published") {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">{page.title}</h1>
      <div 
        className="prose prose-lg max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: page.content }} 
      />
    </main>
  );
}
