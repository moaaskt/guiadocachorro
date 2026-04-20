import { supabase } from '@/lib/supabase'
import type { Article, ArticleFormData } from '@/lib/types/article'

export type { Article } from '@/lib/types/article'

type GetAllOptions = { includeDrafts?: boolean }

export async function getAllArticles(opts: GetAllOptions = {}): Promise<Article[]> {
  let query = supabase.from('articles').select('*').order('created_at', { ascending: false })
  if (!opts.includeDrafts) query = query.eq('status', 'published')
  const { data, error } = await query
  if (error) { console.error('[getAllArticles]', error.message); return [] }
  return data ?? []
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
  if (error) { console.error('[getFeaturedArticles]', error.message); return [] }
  return data ?? []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  if (error) { console.error('[getArticleBySlug]', error.message); return null }
  return data
}

export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) { console.error('[getArticleById]', error.message); return null }
  return data
}

export async function createArticle(data: ArticleFormData): Promise<Article | null> {
  const { data: created, error } = await supabase
    .from('articles')
    .insert([data])
    .select()
    .single()
  if (error) { console.error('[createArticle]', error.message); return null }
  return created
}

export async function updateArticle(id: string, data: Partial<ArticleFormData>): Promise<Article | null> {
  const { data: updated, error } = await supabase
    .from('articles')
    .update(data)
    .eq('id', id)
    .select()
    .single()
  if (error) { console.error('[updateArticle]', error.message); return null }
  return updated
}

export async function deleteArticle(id: string): Promise<boolean> {
  const { error } = await supabase.from('articles').delete().eq('id', id)
  if (error) { console.error('[deleteArticle]', error.message); return false }
  return true
}

export async function publishArticle(id: string): Promise<boolean> {
  const { error } = await supabase.from('articles').update({ status: 'published' }).eq('id', id)
  if (error) { console.error('[publishArticle]', error.message); return false }
  return true
}

export async function unpublishArticle(id: string): Promise<boolean> {
  const { error } = await supabase.from('articles').update({ status: 'draft' }).eq('id', id)
  if (error) { console.error('[unpublishArticle]', error.message); return false }
  return true
}

export function generateSlug(title: string): string {
  return title
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-').replace(/-+/g, '-')
}
