import { supabase } from "@/lib/supabase";
import type { Page } from "@/lib/types/pages";

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle(); 

  if (error) {
    // Erros reais de conexão ainda serão mostrados, o que é bom
    console.error("Erro ao buscar página:", error.message);
    return null;
  }

  return data;
}