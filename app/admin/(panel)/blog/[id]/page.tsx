import { getArticleById } from '@/lib/data/articles'
import { ArticleForm } from '@/components/admin/ArticleForm'
import { notFound } from 'next/navigation'

export const metadata = { title: 'Editar Artigo — Admin' }

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await getArticleById(id)
  if (!article) notFound()
  return <ArticleForm article={article} />
}
