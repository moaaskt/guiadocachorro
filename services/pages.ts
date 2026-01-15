import { supabase } from "@/lib/supabase";

export type Page = {
  id: string;
  slug: string | null;
  title: string | null;
  description: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_link: string | null;
  subtitle: string | null;
};

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getPageBySlug error:", error.message);
    return null;
  }

  return data;
}
