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

  return (
    <main className="prose mx-auto py-10">
      <h1>{page.title}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  )
}