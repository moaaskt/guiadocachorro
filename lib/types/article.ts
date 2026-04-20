export type ArticleStatus = 'draft' | 'published'

export type Article = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  author: string
  read_time: number
  featured: boolean
  status: ArticleStatus
  created_at: string
  updated_at: string
}

export type ArticleFormData = Omit<Article, 'id' | 'created_at' | 'updated_at'>
