import { notFound } from "next/navigation"
import { getPageBySlug } from "@/lib/data/pages"  

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params

  const page = await getPageBySlug(slug)

  if (!page || page.status !== "published") {
    notFound()
  }

  // Garante que content seja sempre uma string válida
  const content = page.content || ""

  return (
    <main className="prose mx-auto py-10">
      <h1>{page.title}</h1>

      {content && (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </main>
  )
}