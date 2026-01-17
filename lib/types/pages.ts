export type Page = {
    id: string
    slug: string
    title: string
    content: string
    status: "draft" | "published"
    created_at: string
    updated_at?: string
  }