import { createClient } from "@supabase/supabase-js";

export interface Breed {
  id: string;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  description?: string;
  stats: { label: string; value: number; color: string }[];
  characteristics: string[];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getBreedBySlug(slug: string): Promise<Breed | null> {
    const { data, error } = await supabase
      .from("breeds")
      .select("*")
      .eq("slug", slug)
      .maybeSingle(); 
  
    if (error) {
      console.error("Erro ao buscar raça:", error);
      return null;
    }
  
    return data as Breed;
  }

  export async function getAllBreeds() {
    const { data, error } = await supabase
      .from("breeds")
    .select("id, name, slug, category, image_url, description, stats, characteristics")
      .order("name");
  
    if (error) {
      console.error("Erro ao buscar raças:", error);
      return [];
    }
  
    return data as Breed[];
  }