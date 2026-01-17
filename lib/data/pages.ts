import { supabase } from "@/lib/supabase"
import { Page } from "@/lib/types/pages"

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single()

  if (error) {
    console.error("getPageBySlug error:", error.message)
    return null
  }

  return data
}