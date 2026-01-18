// lib/data/articles.ts

export interface Article {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  image_url: string; // Alias para compatibilidade
  category: string;
  author: string;
  date: string;
  created_at: string; // Para compatibilidade com componentes
  readTime: string;
  content?: string; // Conteúdo HTML do artigo
}

// Simulação de banco de dados
const articles: Article[] = [
  {
    id: 1,
    slug: "ansiedade-separacao",
    title: "Ansiedade de Separação: Como Ajudar seu Cão",
    excerpt: "Seu cachorro destrói a casa quando você sai? Entenda os sinais e como tratar.",
    image: "https://images.unsplash.com/photo-1554692998-69684048d212?q=80&w=800",
    image_url: "https://images.unsplash.com/photo-1554692998-69684048d212?q=80&w=800",
    category: "Comportamento",
    author: "Dra. Ana Vet",
    date: "12 Jan 2024",
    created_at: "2024-01-12T10:00:00Z",
    readTime: "5 min",
    content: "<p>Seu cachorro destrói a casa quando você sai? Isso pode ser um sinal de ansiedade de separação.</p><p>A ansiedade de separação é um problema comportamental comum em cães, especialmente em filhotes ou cães que foram adotados recentemente.</p><h2>Sinais de Ansiedade de Separação</h2><ul><li>Destruição de móveis e objetos</li><li>Latidos excessivos</li><li>Urina e fezes em lugares inapropriados</li><li>Comportamento ansioso antes da sua saída</li></ul><h2>Como Tratar</h2><p>O tratamento envolve treinamento gradual e paciência. Consulte sempre um veterinário ou adestrador qualificado.</p>"
  },
  {
    id: 2,
    slug: "alimentacao-natural-vs-racao",
    title: "Alimentação Natural vs Ração: O Veredito",
    excerpt: "Descubra o que a ciência diz sobre a dieta do seu melhor amigo.",
    image: "https://images.unsplash.com/photo-1589924691195-41432c84c161?q=80&w=800",
    image_url: "https://images.unsplash.com/photo-1589924691195-41432c84c161?q=80&w=800",
    category: "Nutrição",
    author: "Dr. Pedro Silva",
    date: "15 Jan 2024",
    created_at: "2024-01-15T10:00:00Z",
    readTime: "8 min",
    content: "<p>A escolha entre alimentação natural e ração é uma das decisões mais importantes para a saúde do seu cão.</p><h2>Alimentação Natural</h2><p>A alimentação natural oferece controle total sobre os ingredientes, mas requer conhecimento nutricional adequado.</p><h2>Ração Industrializada</h2><p>As rações comerciais são formuladas por especialistas e oferecem praticidade e segurança nutricional.</p><p>Consulte sempre um veterinário antes de fazer mudanças na dieta do seu pet.</p>"
  },
  {
    id: 3,
    slug: "guia-vacinacao-2024",
    title: "Calendário de Vacinação 2024",
    excerpt: "Todas as vacinas essenciais para filhotes e adultos.",
    image: "https://images.unsplash.com/photo-1628009368231-76033527212e?q=80&w=800",
    image_url: "https://images.unsplash.com/photo-1628009368231-76033527212e?q=80&w=800",
    category: "Saúde",
    author: "Dra. Ana Vet",
    date: "10 Jan 2024",
    created_at: "2024-01-10T10:00:00Z",
    readTime: "4 min",
    content: "<p>Manter a carteirinha de vacinação do seu cão em dia é fundamental para sua saúde e bem-estar.</p><h2>Vacinas Essenciais para Filhotes</h2><ul><li>6-8 semanas: Primeira dose da polivalente (V8 ou V10)</li><li>12 semanas: Segunda dose da polivalente</li><li>16 semanas: Terceira dose da polivalente + antirrábica</li></ul><h2>Vacinas de Reforço para Adultos</h2><p>Adultos devem receber reforços anuais da polivalente e antirrábica. Consulte seu veterinário para um calendário personalizado.</p>"
  }
];

// Função para obter artigos em destaque (usada na página inicial)
export async function getFeaturedArticles(): Promise<Article[]> {
  // Simula um delay de rede
  return new Promise((resolve) => {
    setTimeout(() => resolve(articles), 100);
  });
}

// Função para obter todos os artigos (usada na página do blog)
export async function getAllArticles(): Promise<Article[]> {
  // Simula um delay de rede
  return new Promise((resolve) => {
    setTimeout(() => resolve(articles), 100);
  });
}

// Função para obter um artigo específico pelo slug
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(articles.find(a => a.slug === slug)), 100);
  });
}