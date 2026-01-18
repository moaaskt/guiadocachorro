import { createClient } from "@supabase/supabase-js";

// Definição do Tipo Article
export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string; // Adicionamos content aqui
  image_url: string;
  featured: boolean;
  created_at: string;
}

// Criação do Cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// 1. Função para buscar os destaques (Usada na Home)
export async function getFeaturedArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Erro ao buscar artigos:", error);
    return [];
  }

  return data as Article[];
}

// 2. Função para buscar UM artigo pelo slug (Usada na Página do Blog)
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar artigo individual:", error);
    return null;
  }

  return data as Article;
}

export async function getAllArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false }); 

  if (error) {
    console.error("Erro ao buscar todos os artigos:", error);
    return [];
  }

  return data as Article[];
}