'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAdminTheme } from '@/app/admin/(panel)/_components/AdminThemeProvider'
import { RichEditor } from '@/components/admin/RichEditor'
import { createArticle, updateArticle, publishArticle, unpublishArticle, generateSlug } from '@/lib/data/articles'
import type { Article, ArticleFormData } from '@/lib/types/article'
import { Save, Globe, EyeOff, Loader2, ArrowLeft, Star } from 'lucide-react'

const CATEGORIES = ['Comportamento', 'Alimentação', 'Nutrição', 'Saúde', 'Treinamento', 'Raças', 'Cuidados', 'Geral']

interface ArticleFormProps {
  article?: Article
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const { theme } = useAdminTheme()
  const dark = theme === 'dark'
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [slugEdited, setSlugEdited] = useState(false)

  const [form, setForm] = useState<ArticleFormData>({
    slug: article?.slug ?? '',
    title: article?.title ?? '',
    excerpt: article?.excerpt ?? '',
    content: article?.content ?? '',
    image_url: article?.image_url ?? '',
    category: article?.category ?? 'Geral',
    author: article?.author ?? 'Equipe Guia do Cachorro',
    read_time: article?.read_time ?? 5,
    featured: article?.featured ?? false,
    status: article?.status ?? 'draft',
  })

  useEffect(() => {
    if (!article && !slugEdited && form.title) {
      setForm(f => ({ ...f, slug: generateSlug(form.title) }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title])

  function set<K extends keyof ArticleFormData>(key: K, val: ArticleFormData[K]) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSave() {
    if (!form.title || !form.slug) return alert('Título e slug são obrigatórios.')
    setSaving(true)
    try {
      if (article) {
        const updated = await updateArticle(article.id, form)
        if (updated) router.refresh()
      } else {
        const created = await createArticle(form)
        if (created) router.push(`/admin/blog/${created.id}`)
      }
    } finally { setSaving(false) }
  }

  async function handleTogglePublish() {
    if (!article) return
    setPublishing(true)
    try {
      if (article.status === 'published') await unpublishArticle(article.id)
      else await publishArticle(article.id)
      setForm(f => ({ ...f, status: f.status === 'published' ? 'draft' : 'published' }))
      router.refresh()
    } finally { setPublishing(false) }
  }

  const inputClass = cn(
    'w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors',
    dark
      ? 'bg-white/5 border-white/8 text-white placeholder-white/25 focus:border-[var(--color-accent)]'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[var(--color-accent)]'
  )
  const labelClass = cn('block text-xs font-medium mb-1.5', dark ? 'text-white/50' : 'text-gray-500')

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button onClick={() => router.push('/admin/blog')} className={cn('flex items-center gap-1.5 text-sm transition-colors', dark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-700')}>
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <div className="flex items-center gap-2">
          <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium',
            form.status === 'published' ? 'bg-green-500/15 text-green-500' : dark ? 'bg-white/8 text-white/40' : 'bg-gray-100 text-gray-500'
          )}>
            {form.status === 'published' ? 'Publicado' : 'Rascunho'}
          </span>
          <button onClick={handleSave} disabled={saving} className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors', dark ? 'bg-white/8 text-white hover:bg-white/12 border border-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200')}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Salvar
          </button>
          {article && (
            <button onClick={handleTogglePublish} disabled={publishing} className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors', article.status === 'published' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]')}>
              {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : article.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              {article.status === 'published' ? 'Despublicar' : 'Publicar'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-5">
          <div>
            <label className={labelClass}>Título *</label>
            <input type="text" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Título do artigo" className={cn(inputClass, 'text-base font-semibold')} />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <div className="flex items-center gap-2">
              <span className={cn('text-sm shrink-0', dark ? 'text-white/30' : 'text-gray-400')}>/blog/</span>
              <input type="text" value={form.slug} onChange={e => { setSlugEdited(true); set('slug', e.target.value) }} placeholder="url-do-artigo" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Resumo / Excerpt</label>
            <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={3} placeholder="Breve descrição para listagem e SEO..." className={cn(inputClass, 'resize-none')} />
          </div>
          <div>
            <label className={labelClass}>Conteúdo</label>
            <RichEditor value={form.content} onChange={v => set('content', v)} />
          </div>
        </div>

        <div className="space-y-4">
          <div className={cn('rounded-xl border p-4 space-y-3', dark ? 'border-white/8' : 'border-gray-200')}>
            <label className={labelClass}>Imagem de capa</label>
            {form.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image_url} alt="Capa" className="w-full aspect-video object-cover rounded-lg" />
            )}
            <input type="text" value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://... ou URL do Supabase Storage" className={inputClass} />
          </div>

          <div className={cn('rounded-xl border p-4 space-y-4', dark ? 'border-white/8' : 'border-gray-200')}>
            <p className={cn('text-xs font-semibold uppercase tracking-wider', dark ? 'text-white/30' : 'text-gray-400')}>Metadados</p>
            <div>
              <label className={labelClass}>Categoria</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputClass}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Autor</label>
              <input type="text" value={form.author} onChange={e => set('author', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tempo de leitura (min)</label>
              <input type="number" min={1} max={60} value={form.read_time} onChange={e => set('read_time', Number(e.target.value))} className={inputClass} />
            </div>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div onClick={() => set('featured', !form.featured)} className={cn('flex items-center justify-center w-8 h-8 rounded-lg border transition-colors', form.featured ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white' : dark ? 'border-white/10 text-white/20 hover:border-white/20' : 'border-gray-200 text-gray-300 hover:border-gray-300')}>
                <Star className="w-4 h-4" />
              </div>
              <span className={cn('text-sm', dark ? 'text-white/70' : 'text-gray-600')}>Artigo em destaque</span>
            </label>
          </div>

          {article?.status === 'published' && (
            <a href={`/blog/${article.slug}`} target="_blank" rel="noopener noreferrer" className={cn('flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium border transition-colors', dark ? 'border-white/10 text-white/50 hover:text-white hover:border-white/20' : 'border-gray-200 text-gray-500 hover:text-gray-800')}>
              <Globe className="w-4 h-4" /> Ver no site
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
