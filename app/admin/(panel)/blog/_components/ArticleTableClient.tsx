'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useAdminTheme } from '@/app/admin/(panel)/_components/AdminThemeProvider'
import { deleteArticle, publishArticle, unpublishArticle } from '@/lib/data/articles'
import type { Article } from '@/lib/types/article'
import { Edit2, Trash2, Star, ExternalLink } from 'lucide-react'

export function ArticleTableClient({ articles: initial }: { articles: Article[] }) {
  const router = useRouter()
  const { theme } = useAdminTheme()
  const dark = theme === 'dark'
  const [articles, setArticles] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Deletar "${title}"? Esta ação não pode ser desfeita.`)) return
    setDeleting(id)
    const ok = await deleteArticle(id)
    if (ok) {
      setArticles(a => a.filter(x => x.id !== id))
      router.refresh()
    }
    setDeleting(null)
  }

  async function handleToggleStatus(article: Article) {
    const ok = article.status === 'published' ? await unpublishArticle(article.id) : await publishArticle(article.id)
    if (ok) {
      setArticles(a => a.map(x => x.id === article.id ? { ...x, status: x.status === 'published' ? 'draft' : 'published' } : x))
      router.refresh()
    }
  }

  if (articles.length === 0) {
    return (
      <div className={cn('rounded-xl border p-16 text-center', dark ? 'border-white/8' : 'border-gray-200')}>
        <p className={cn('text-sm', dark ? 'text-white/30' : 'text-gray-400')}>
          Nenhum artigo ainda.{' '}
          <Link href="/admin/blog/novo" className="text-[var(--color-accent)] hover:underline">Criar o primeiro →</Link>
        </p>
      </div>
    )
  }

  return (
    <div className={cn('rounded-xl border overflow-hidden', dark ? 'border-white/8' : 'border-gray-200')}>
      <table className="w-full text-sm">
        <thead>
          <tr className={cn('border-b text-left', dark ? 'border-white/8 bg-white/3' : 'border-gray-200 bg-gray-50')}>
            {['Artigo', 'Categoria', 'Data', 'Status', 'Ações'].map((h, i) => (
              <th key={h} className={cn('px-4 py-3 text-xs font-semibold uppercase tracking-wider', dark ? 'text-white/30' : 'text-gray-400', i === 1 ? 'hidden md:table-cell' : '', i === 2 ? 'hidden lg:table-cell' : '', i === 4 ? 'text-right' : '')}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className={cn('border-b last:border-0 transition-colors', dark ? 'border-white/5 hover:bg-white/3' : 'border-gray-100 hover:bg-gray-50')}>
              <td className="px-4 py-3">
                <div className="flex items-start gap-2.5">
                  {article.featured && <Star className="w-3.5 h-3.5 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />}
                  <div>
                    <p className={cn('font-medium leading-tight', dark ? 'text-white' : 'text-gray-900')}>{article.title}</p>
                    <p className={cn('text-xs mt-0.5 truncate max-w-xs', dark ? 'text-white/30' : 'text-gray-400')}>/blog/{article.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                <span className={cn('inline-flex px-2 py-0.5 rounded-full text-xs font-medium', dark ? 'bg-white/8 text-white/60' : 'bg-gray-100 text-gray-600')}>{article.category}</span>
              </td>
              <td className={cn('px-4 py-3 text-xs hidden lg:table-cell', dark ? 'text-white/30' : 'text-gray-400')}>
                {new Date(article.created_at).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-4 py-3">
                <button onClick={() => handleToggleStatus(article)} className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors', article.status === 'published' ? 'bg-green-500/15 text-green-500 hover:bg-green-500/25' : dark ? 'bg-white/8 text-white/40 hover:bg-white/12' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', article.status === 'published' ? 'bg-green-500' : 'bg-gray-400')} />
                  {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link href={`/admin/blog/${article.id}`} className={cn('flex items-center justify-center w-8 h-8 rounded-lg transition-colors', dark ? 'text-white/30 hover:text-white hover:bg-white/8' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100')} title="Editar"><Edit2 className="w-3.5 h-3.5" /></Link>
                  {article.status === 'published' && (
                    <a href={`/blog/${article.slug}`} target="_blank" rel="noopener noreferrer" className={cn('flex items-center justify-center w-8 h-8 rounded-lg transition-colors', dark ? 'text-white/30 hover:text-white hover:bg-white/8' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100')} title="Ver no site"><ExternalLink className="w-3.5 h-3.5" /></a>
                  )}
                  <button onClick={() => handleDelete(article.id, article.title)} disabled={deleting === article.id} className={cn('flex items-center justify-center w-8 h-8 rounded-lg transition-colors', dark ? 'text-white/20 hover:text-red-400 hover:bg-red-400/10' : 'text-gray-300 hover:text-red-500 hover:bg-red-50')} title="Deletar"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
