import Link from 'next/link'
import { getAllArticles } from '@/lib/data/articles'
import { ArticleTableClient } from './_components/ArticleTableClient'
import { Plus } from 'lucide-react'

export const metadata = { title: 'Blog — Admin Guia do Cão' }

export default async function AdminBlogPage() {
  const articles = await getAllArticles({ includeDrafts: true })
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold [.admin-dark_&]:text-white text-gray-900">Artigos</h2>
          <p className="text-sm mt-0.5 [.admin-dark_&]:text-white/40 text-gray-500">
            {articles.length} artigo{articles.length !== 1 ? 's' : ''} no total
          </p>
        </div>
        <Link href="/admin/blog/novo" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors">
          <Plus className="w-4 h-4" /> Novo artigo
        </Link>
      </div>
      <ArticleTableClient articles={articles} />
    </div>
  )
}
