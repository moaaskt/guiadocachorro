// lib/pages.ts
import { supabase } from "./supabase";

/**
 * Tipo base da página (espelho da tabela pages)
 */
export type Page = {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  image_url: string | null;
  status: "draft" | "published";
  created_at: string;
};

/**
 * Buscar UMA página pelo slug
 * Usado em rotas dinâmicas (/sobre, /contato, etc)
 */
export async function getPageBySlug(slug: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Erro ao buscar página:", error.message);
    return null;
  }

  return data as Page;
}

/**
 * Buscar TODAS as páginas publicadas
 * Usado para navbar, sitemap, footer etc
 */
export async function getAllPages() {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao listar páginas:", error.message);
    return [];
  }

  return data as Page[];
}
