# 📋 Documentação Técnica - Guia do Cachorro

**Versão:** 5.0 (Atualização Completa — Estado Real do Projeto)  
**Última Atualização:** Fevereiro 2026  
**Framework:** Next.js 16.1.1 (App Router)  
**Stack:** TypeScript, Supabase, TailwindCSS v4, React 19, Framer Motion

---

## 📑 Sumário

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Design System & Estilização](#design-system--estilização)
5. [Arquitetura de Layout & Navegação](#arquitetura-de-layout--navegação)
6. [Camada de Dados (Data Layer)](#camada-de-dados-data-layer)
7. [Módulo Home (Página Inicial)](#módulo-home-página-inicial)
8. [Módulo de Raças](#módulo-de-raças)
9. [Módulo de Blog](#módulo-de-blog)
10. [Módulo de Saúde & Ferramentas](#módulo-de-saúde--ferramentas)
11. [Página Sobre](#página-sobre)
12. [Componentes de UI Reutilizáveis](#componentes-de-ui-reutilizáveis)
13. [Utilitários & Libs](#utilitários--libs)
14. [Sistema de Rotas Dinâmicas](#sistema-de-rotas-dinâmicas)
15. [Mapeamento Completo de Rotas](#mapeamento-completo-de-rotas)
16. [Configuração do Next.js](#configuração-do-nextjs)
17. [Configuração do Supabase](#configuração-do-supabase)
18. [Status do Projeto e Roadmap](#status-do-projeto-e-roadmap)

---

## 🎯 Visão Geral

O **Guia do Cachorro** é uma aplicação web moderna construída com Next.js 16, focada em entregar conteúdo de alta qualidade para tutores de cães. O projeto adota uma estética editorial premium ("Revista Especializada") com uma arquitetura robusta baseada em Server Components.

### Características Principais

- ✅ **Dados Híbridos**: Raças e páginas via Supabase (PostgreSQL); artigos via dados locais (mock)
- ✅ **Design System Premium**: Paleta Deep Navy/Amber com variáveis CSS nativas
- ✅ **Navegação Contextual**: Table of Contents (TOC) inteligente — Desktop (Sidebar) e Mobile (Cápsula Flutuante)
- ✅ **SSR/SSG**: Renderização no servidor para máxima performance e SEO
- ✅ **TypeScript**: Tipagem estática rigorosa em todo o projeto
- ✅ **Animações**: Framer Motion e transições CSS fluidas
- ✅ **Ferramentas Interativas**: Calculadora de Idade Canina e Mapa de Sintomas Anatômico
- ✅ **Página Sobre**: Manifesto institucional com Bento Grid editorial

---

## 💻 Stack Tecnológico

### Dependências Principais

| Pacote | Versão | Propósito |
|--------|--------|-----------| 
| `next` | 16.1.1 | Framework React com App Router |
| `react` | 19.2.3 | Biblioteca UI |
| `react-dom` | 19.2.3 | Renderização React DOM |
| `@supabase/supabase-js` | ^2.90.1 | Cliente Supabase (PostgreSQL) |
| `tailwindcss` | ^4 | Framework CSS (Config via CSS Variables, `@theme inline`) |
| `framer-motion` | ^12.29.0 | Biblioteca de animações |
| `lucide-react` | ^0.562.0 | Biblioteca de ícones |
| `clsx` | ^2.1.1 | Composição condicional de classes CSS |
| `tailwind-merge` | ^3.4.0 | Merge inteligente de classes Tailwind (evita conflitos) |
| `tailwindcss-animate` | ^1.0.7 | Plugin de animações para Tailwind CSS |

### Dependências de Desenvolvimento

| Pacote | Versão | Propósito |
|--------|--------|-----------| 
| `@tailwindcss/postcss` | ^4 | Integração Tailwind v4 via PostCSS |
| `typescript` | ^5 | Superset tipado do JavaScript |
| `eslint` | ^9 | Linter de código |
| `eslint-config-next` | 16.1.1 | Regras ESLint específicas do Next.js |
| `@types/node` | ^20 | Tipagens Node.js |
| `@types/react` / `@types/react-dom` | ^19 | Tipagens React |

---

## 📂 Estrutura de Diretórios

```
guia-do-cachorro/
├── app/                          # App Router (Next.js 16)
│   ├── layout.tsx                # Layout raiz (Header + Footer + Fontes)
│   ├── page.tsx                  # Página inicial (Home)
│   ├── globals.css               # Design System (variáveis CSS + @theme)
│   ├── loading.tsx               # Loading global (PawLoader)
│   ├── not-found.tsx             # Página 404 customizada
│   ├── favicon.ico
│   ├── [slug]/
│   │   └── page.tsx              # Páginas dinâmicas (Supabase: /sobre, /termos, etc.)
│   ├── blog/
│   │   ├── page.tsx              # Listagem de artigos
│   │   └── [slug]/
│   │       └── page.tsx          # Leitura de artigo individual
│   ├── racas/
│   │   ├── page.tsx              # Catálogo de raças
│   │   └── [slug]/
│   │       └── page.tsx          # Detalhes da raça
│   ├── saude/
│   │   └── page.tsx              # Hub de Saúde (Ferramentas interativas)
│   └── sobre/
│       └── page.tsx              # Página Sobre (estática, editorial)
│
├── components/
│   ├── home/                     # Componentes da página inicial
│   │   ├── Hero.tsx              # Seção hero com imagem e CTA
│   │   ├── AuthoritySection.tsx  # Seção de autoridade/confiança
│   │   ├── FeaturedBreedsHover.tsx # Raças em destaque com hover animado
│   │   ├── EditorialHighlights.tsx # Destaques editoriais (artigos)
│   │   ├── FinalCTA.tsx          # Call-to-action final
│   │   ├── PopularBreeds.tsx     # (Desativado — substituído por FeaturedBreedsHover)
│   │   ├── CareGuides.tsx        # Guias de cuidados
│   │   └── FAQ.tsx               # Perguntas frequentes
│   │
│   ├── breeds/                   # Componentes do módulo de raças
│   │   ├── BreedCard.tsx         # Card individual de raça
│   │   ├── BreedGrid.tsx         # Grid de raças com busca e filtros
│   │   ├── BreedStats.tsx        # Barras de estatísticas da raça
│   │   └── CategoryFilter.tsx    # Filtro por categoria
│   │
│   ├── blog/                     # Componentes do módulo de blog
│   │   └── ArticleCard.tsx       # Card de artigo para listagem
│   │
│   ├── tools/                    # Ferramentas interativas (Saúde)
│   │   ├── DogAgeCalculator.tsx  # Calculadora de idade canina
│   │   └── SymptomChecker.tsx    # Mapa anatômico de sintomas
│   │
│   ├── layout/                   # Componentes estruturais globais
│   │   ├── Header.tsx            # Barra de navegação superior fixa
│   │   └── Footer.tsx            # Rodapé completo (4 colunas)
│   │
│   └── ui/                       # Componentes de UI reutilizáveis
│       ├── Breadcrumb.tsx        # Navegação de migalhas de pão
│       ├── HoverCard.tsx         # Card com troca de imagem no hover
│       ├── MobileTOC.tsx         # TOC flutuante para mobile (Drawer)
│       ├── PawLoader.tsx         # Loader animado com pegadas
│       └── TableOfContents.tsx   # TOC lateral para desktop (Sticky)
│
├── lib/
│   ├── supabase.ts               # Cliente Supabase singleton
│   ├── utils.ts                  # Função utilitária cn() (clsx + tailwind-merge)
│   ├── toc.ts                    # Processamento de TOC (slugify + processContent)
│   ├── data/
│   │   ├── articles.ts           # Dados de artigos (mock local, não Supabase)
│   │   ├── breeds.ts             # Dados de raças (Supabase)
│   │   └── pages.ts              # Dados de páginas (Supabase)
│   └── types/
│       └── pages.ts              # Tipagem da entidade Page
│
├── public/
│   ├── husky-cartoon.png         # Ilustração cartoon de Husky
│   ├── vet-cartoon.png           # Ilustração cartoon veterinária
│   ├── file.svg / globe.svg / window.svg  # SVGs padrão Next.js
│   ├── next.svg / vercel.svg     # Logos padrão
│   └── favicon.ico               # (via app/)
│
├── services/                     # (Diretório vazio — reservado para futuro)
│
├── next.config.ts                # Configurações do Next.js (Remote Images)
├── tsconfig.json                 # Configuração TypeScript
├── postcss.config.mjs            # PostCSS com @tailwindcss/postcss
├── eslint.config.mjs             # Configuração ESLint v9
├── package.json
└── .env.local                    # Variáveis de ambiente (Supabase keys)
```

---

## 🎨 Design System & Estilização

O projeto utiliza **Tailwind CSS v4** com configuração baseada em variáveis CSS nativas, definidas em `app/globals.css` com a diretiva `@theme inline`. A identidade visual transmite autoridade, confiança e acolhimento.

### Paleta de Cores

| Token | Variável CSS | Cor (Hex) | Uso Principal |
|-------|--------------|-----------|---------------|
| **Primary** | `--color-primary` | `#0F172A` (Slate-900) | Textos principais, Headers, Footer |
| **Primary Hover** | `--color-primary-hover` | `#1E293B` (Slate-800) | Hover de botões primary |
| **Primary Foreground** | `--color-primary-foreground` | `#FFFFFF` | Texto sobre fundo primary |
| **Surface** | `--color-surface` | `#F8FAFC` (Slate-50) | Fundo da página, Header, Cards |
| **Surface Hover** | `--color-surface-hover` | `#F1F5F9` (Slate-100) | Hover de superfícies |
| **Accent** | `--color-accent` | `#D97706` (Amber-600) | Botões CTA, Links, Destaques |
| **Accent Hover** | `--color-accent-hover` | `#B45309` (Amber-700) | Hover de accent |
| **Accent Light** | `--color-accent-light` | `#FEF3C7` (Amber-100) | Fundos de destaque suave, Badges |
| **Stone** | `--color-stone-*` | 50, 100, 200, 600 | Bordas, textos secundários, neutros |

### Tipografia

- **Fontes**: Geist Sans (Principal, `--font-geist-sans`) e Geist Mono (Código, `--font-geist-mono`), carregadas via `next/font/google`.
- **Estilo Global**: Todos os headings `h1`-`h6` usam `letter-spacing: -0.02em` para aparência compacta e elegante.
- **Body**: `antialiased`, `text-gray-900`, `bg-white`.

### Composição de Classes

O projeto usa a função utilitária `cn()` (`lib/utils.ts`) que combina `clsx` + `tailwind-merge` para composição segura de classes Tailwind sem conflitos.

---

## 🏗️ Arquitetura de Layout & Navegação

### 1. Layout Raiz (`app/layout.tsx`)

O layout global envolve toda a aplicação com:
- **`<html lang="pt-BR" className="scroll-smooth">`**: Scroll suave e idioma.
- **Header fixo** (`components/layout/Header.tsx`): Navegação principal.
- **`{children}`**: Área de conteúdo dinâmico.
- **Footer** (`components/layout/Footer.tsx`): Rodapé completo.
- **Metadata Global**: `title: "Guia do Cão | Tudo sobre seu melhor amigo"`.

### 2. Header (`components/layout/Header.tsx`)

Barra de navegação superior **fixa** com `backdrop-blur-md`:
- **Logo**: Ícone `Dog` (Lucide) + texto "Guia do Cão", com hover de cor.
- **Menu Desktop**: Links para Raças, Saúde, Blog e Sobre (com normalização de acentos para URLs).
- **CTA**: Botão "Explorar Raças" (`rounded-full`, `bg-primary`).
- **Menu Mobile**: Botão hambúrguer (`Menu` icon) — visível em `md:hidden`.

### 3. Footer (`components/layout/Footer.tsx`)

Rodapé sobre fundo `bg-primary` (Deep Navy), estruturado em 4 colunas:
1. **Marca**: Logo, missão e redes sociais (Instagram, Facebook, Email).
2. **Explorar**: Links rápidos (Raças, Saúde, Blog, Ferramentas).
3. **Institucional**: Sobre nós, Contato, Termos de Uso, Privacidade.
4. **Newsletter "Matilha VIP"**: Formulário de captura de email com botão "Inscrever".

Inclui componentes auxiliares internos: `FooterLink` e `SocialLink`.

### 4. Loading Global (`app/loading.tsx`)

Usa o componente `PawLoader` como fallback de loading para transições de rota.

### 5. Navegação de Conteúdo (TOC)

Nas páginas de conteúdo rico (Artigos e Detalhes de Raças):

**Desktop — Sidebar Lateral (Sticky)**:
- **Componente**: `components/ui/TableOfContents.tsx`
- Posicionamento `sticky` na lateral, com lista hierárquica de tópicos (H2, H3).
- Indicação visual do tópico ativo durante o scroll.
- Aceita props `items`, `backLink` e `backLabel`.

**Mobile — Cápsula Flutuante (Bottom Sheet)**:
- **Componente**: `components/ui/MobileTOC.tsx`
- Botão flutuante `fixed bottom-6` em formato de pílula.
- Ao clicar, abre *Drawer* com índice do conteúdo (backdrop blur + animações).
- Fecha automaticamente ao selecionar um item.

---

## 🗄️ Camada de Dados (Data Layer)

### `lib/supabase.ts` — Cliente Singleton

```typescript
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### `lib/data/breeds.ts` — Raças (Supabase)

- **Interface**: `Breed` — campos: `id`, `name`, `slug`, `category`, `image_url`, `description?`, `stats[]` (`{ label, value, color }`), `characteristics[]`.
- **Funções**:
  - `getAllBreeds()`: Retorna todas as raças ordenadas por nome via Supabase.
  - `getBreedBySlug(slug)`: Retorna uma raça específica pelo slug.

> ⚠️ **Nota**: Este arquivo cria seu próprio `createClient` ao invés de usar o singleton de `lib/supabase.ts`.

### `lib/data/articles.ts` — Artigos (**Dados Locais / Mock**)

- **Interface**: `Article` — campos: `id?`, `slug`, `title`, `excerpt`, `image`, `image_url`, `category`, `author`, `date`, `created_at`, `readTime`, `content?`.
- **Dados**: Array local com 3 artigos (Ansiedade de Separação, Alimentação Natural vs Ração, Calendário de Vacinação 2024).
- **Funções** (simulam delay de rede com `setTimeout`):
  - `getFeaturedArticles()`: Retorna artigos em destaque (todos).
  - `getAllArticles()`: Retorna todos os artigos.
  - `getArticleBySlug(slug)`: Retorna artigo específico pelo slug.

> ⚠️ **Importante**: Os artigos **NÃO** estão no Supabase. Usam dados mockados localmente. Migração futura para Supabase é recomendada.

### `lib/data/pages.ts` — Páginas Dinâmicas (Supabase)

- Usa o singleton `lib/supabase.ts`.
- **Função**: `getPageBySlug(slug)` — Retorna página da tabela `pages` pelo slug.

### `lib/types/pages.ts` — Tipo Page

```typescript
type Page = {
  id: string;
  slug: string;
  title: string;
  content: string;
  status: "draft" | "published";
  image_url?: string | null;
  created_at: string;
  updated_at?: string;
}
```

---

## 🏠 Módulo Home (Página Inicial)

**Rota**: `/` — **Arquivo**: `app/page.tsx`  
**Tipo**: Server Component (async — busca artigos no servidor).

### Composição da Página

A Home é composta por 5 seções, renderizadas em sequência:

| Ordem | Componente | Arquivo | Descrição |
|-------|------------|---------|-----------|
| 1 | `Hero` | `components/home/Hero.tsx` | Hero com título, subtítulo, CTAs (Explorar Raças / Ler Guias) e imagem com animação `framer-motion` (fade-in + scale) e glow effect. Componente `'use client'`. |
| 2 | `AuthoritySection` | `components/home/AuthoritySection.tsx` | Seção de autoridade/credibilidade. |
| 3 | `FeaturedBreedsHover` | `components/home/FeaturedBreedsHover.tsx` | Grid de 3 raças em destaque (Golden Retriever, Husky Siberiano, Bulldog Francês) com `HoverCard` que troca entre imagem estática e GIF no hover. Imagens em Supabase Storage. Componente `'use client'`. |
| 4 | `EditorialHighlights` | `components/home/EditorialHighlights.tsx` | Destaques editoriais — recebe `articles` do servidor. |
| 5 | `FinalCTA` | `components/home/FinalCTA.tsx` | Call-to-action final. |

> **Nota**: `PopularBreeds.tsx` existe no projeto mas está **comentado/desativado** — substituído por `FeaturedBreedsHover`.

### Componentes Adicionais (Não utilizados na Home)

- `CareGuides.tsx`: Guias de cuidados (componente criado, não montado na Home).
- `FAQ.tsx`: Perguntas frequentes (componente criado, não montado na Home).

---

## 🐕 Módulo de Raças

### Listagem (`/racas`)

**Arquivo**: `app/racas/page.tsx` — Server Component.

- Busca todas as raças via `getAllBreeds()` (Supabase).
- Renderiza o componente `BreedGrid` passando os dados.

#### Componentes:

| Componente | Arquivo | Descrição |
|------------|---------|-----------|
| `BreedGrid` | `components/breeds/BreedGrid.tsx` | Grid responsivo com busca textual e filtros por categoria. Componente Client (`'use client'`). 9.5KB — componente robusto. |
| `BreedCard` | `components/breeds/BreedCard.tsx` | Card individual da raça com imagem, nome e categoria. |
| `CategoryFilter` | `components/breeds/CategoryFilter.tsx` | Filtros selecionáveis por categoria (ex: Esportivo, Trabalho). |

### Detalhes da Raça (`/racas/[slug]`)

**Arquivo**: `app/racas/[slug]/page.tsx` — Server Component.

- `params` é uma `Promise<{ slug }>` (Next.js 16).
- Busca raça via `getBreedBySlug(slug)`.
- Se não encontrar, chama `notFound()`.

**Layout de 3 colunas (Desktop XL)**:
1. **Sidebar Esquerda**: `TableOfContents` com itens manuais (ex: "Sobre a Raça") + link "Voltar para Raças".
2. **Conteúdo Principal**: Descrição da raça + grid de `characteristics`.
3. **Sidebar Direita**: `BreedStats` (barras de estatísticas) + CTA "Buscar Parceiros".

#### `BreedStats` (`components/breeds/BreedStats.tsx`)
- Recebe `stats: { label, value, color }[]`.
- Exibe barras de progresso coloridas para cada atributo.

**Hero**: Imagem full-width com `60vh`, gradient overlay, badge de categoria e nome da raça. Inclui `Breadcrumb` posicionado absolutamente. Usa `unoptimized` para imagens externas.

---

## 📝 Módulo de Blog

### Listagem (`/blog`)

**Arquivo**: `app/blog/page.tsx` — Server Component.

- Busca artigos via `getAllArticles()` (dados locais).
- Grid responsivo (`1 → 2 → 3 colunas`) de `ArticleCard`.
- Metadata: `"Blog & Dicas | Guia do Cachorro"`.
- Trata caso vazio (zero artigos) com mensagem amigável.

#### `ArticleCard` (`components/blog/ArticleCard.tsx`)
- Card de artigo para listagem com imagem, categoria, título, excerpt e metadata.

### Leitura do Artigo (`/blog/[slug]`)

**Arquivo**: `app/blog/[slug]/page.tsx` — Server Component.

- Busca artigo via `getArticleBySlug(slug)`.
- Processa HTML via `processContent()` (`lib/toc.ts`): injeta IDs nos headings e extrai TOC.
- Calcula tempo de leitura baseado no tamanho do texto.
- Renderiza data formatada em `pt-BR`.

**Layout**:
- **Header**: `Breadcrumb`, badge de categoria, título, metadata (data, tempo de leitura, botão compartilhar com ícones Lucide).
- **Imagem**: Banner `aspect-video` com `rounded-2xl`.
- **Grid 12 colunas**: Sidebar TOC (3 cols) + Conteúdo principal (9 cols) renderizado via `dangerouslySetInnerHTML`.
- **Mobile TOC**: Barra flutuante via `MobileTOC`.
- **Seção "Em breve"**: Placeholder para futuro sistema de comentários.

---

## 🏥 Módulo de Saúde & Ferramentas

**Rota**: `/saude` — **Arquivo**: `app/saude/page.tsx`  
**Tipo**: Server Component (estática).

### Estrutura da Página

| Seção | Descrição |
|-------|-----------|
| **Hero Section** | Fundo `bg-primary` (Deep Navy) com círculos decorativos blur, badge "Hub Veterinário", título com destaque em `accent`, subtítulo. |
| **Calculadora de Idade** | Seção com ícone `HeartPulse`, título, e componente `DogAgeCalculator`. |
| **Mapa de Sintomas** | Seção com ícone `Stethoscope`, título, e componente `SymptomChecker` dentro de card com glassmorphism. |
| **Em Breve** | 2 cards `ComingSoonCard` (componente local): "Guia de Vacinação" (ícone `Syringe`) e "Calculadora Nutricional" (ícone `Utensils`). Estilo grayscale com hover colorido. |

### `DogAgeCalculator` (`components/tools/DogAgeCalculator.tsx`)

- **Função**: Calcula a "idade humana" equivalente com base na idade real e porte (Pequeno, Médio, Grande).
- **Tipo**: Client Component (`'use client'`). ~13KB.
- **Tecnologias**: `framer-motion` para transições, Tailwind CSS v4.
- **Lógica de Cálculo**:
  - 0 anos → 0 humano
  - ≤ 1 ano → 15 humanos
  - ≤ 2 anos → 24 humanos
  - Após 2 anos: Pequeno: 24 + (anos − 2) × 4 | Médio: × 5 | Grande: × 6
- **Interface**: Controle de porte por botões com ícones, slider de idade (0–20), badge de fase de vida, animação do valor calculado.

### `SymptomChecker` (`components/tools/SymptomChecker.tsx`)

- **Função**: Mapa anatômico interativo com hotspots clicáveis que revelam painel de detalhes com sintomas.
- **Tipo**: Client Component (`'use client'`). ~8KB.
- **Tecnologias**: SVG com silhueta do cão (`viewBox="0 0 200 150"`), hotspots com `animate-ping`, `framer-motion` para painel, glassmorphism.
- **Lógica**:
  - Estrutura `BODY_PARTS`: id, label, coordenadas x/y (%), lista de sintomas.
  - Hotspots posicionados absolutamente sobre container SVG.
  - Estado `selectedPart` para controlar painel de detalhes.
- **UX Mobile**: `useEffect` monitora `selectedPart` e faz scroll automático em telas < 1024px via `scrollIntoView`.

---

## ℹ️ Página Sobre

**Rota**: `/sobre` — **Arquivo**: `app/sobre/page.tsx`  
**Tipo**: Server Component (estática).

Página institucional com design editorial premium, composta por:

| Seção | Descrição |
|-------|-----------|
| **Hero "Manifesto"** | Badge animada "Manifesto Guia do Cão", título `"Menos mitos. Mais lambeijos."` com `font-black`, underline SVG decorativo em amber, subtítulo em `font-serif`. Background com mancha orgânica blur. |
| **Bento Grid** | Layout `12 cols × 2 rows` com 3 blocos: (1) Foto Unsplash com overlay e texto, (2) Bloco estatística "100% Revisado" (fundo verde floresta `#1C3A35`), (3) Bloco comunidade "+12k Tutores" (fundo amber) com CTA "Explorar o Blog". |
| **Rodapé de Credibilidade** | Card estilo "Carta" com citação de Josh Billings, ícone coração pulsante (`animate-pulse`), badges "Feito com amor", "Baseado em ciência", "Foco no bem-estar". |

---

## 🧩 Componentes de UI Reutilizáveis

### `PawLoader` (`components/ui/PawLoader.tsx`)
- Loader personalizado com animação de pegadas de cachorro.
- Usa 6 ícones `PawPrint` sequenciais com delays e opacidade variável.
- Animação via `@keyframes` injetado localmente.
- Usado em `app/loading.tsx` para transições de rota.

### `Breadcrumb` (`components/ui/Breadcrumb.tsx`)
- Navegação de migalhas de pão para orientar o usuário.
- Mapeia rotas (`/racas`, `/blog`) para nomes amigáveis ("Guia de Raças", "Blog").
- Usado em páginas de detalhe (Raças e Artigos).

### `HoverCard` (`components/ui/HoverCard.tsx`)
- Card com troca de imagem no hover (estática → GIF/animação).
- Props: `title`, `description`, `staticImage`, `hoverImage`, `link`.
- Usado pelo `FeaturedBreedsHover` na Home.

### `TableOfContents` (`components/ui/TableOfContents.tsx`)
- Sidebar sticky para navegação interna em desktop.
- Lista hierárquica de tópicos (H2, H3) com indicação de tópico ativo.
- Props: `items: TOCItem[]`, `backLink`, `backLabel`.

### `MobileTOC` (`components/ui/MobileTOC.tsx`)
- Navegação flutuante em formato pílula para mobile.
- Abre Drawer (Bottom Sheet) com backdrop blur e animações.
- Fecha automaticamente ao selecionar um item.
- Props: `items: TOCItem[]`.

---

## 🔧 Utilitários & Libs

### `lib/utils.ts` — Função `cn()`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Combina `clsx` (composição condicional) com `tailwind-merge` (resolução de conflitos Tailwind).

### `lib/toc.ts` — Processamento de Table of Contents

**Interfaces**: `TOCItem` (`{ id, text, level: 2 | 3 }`) e `ProcessedContent` (`{ content, toc }`).

**Funções**:
- `slugify(text)`: Converte texto em slug URL-friendly. Remove acentos (NFD), caracteres especiais, normaliza espaços e hífens.
- `processContent(html)`: Processa HTML bruto — injeta IDs nos headings `<h2>` e `<h3>` via regex, extrai estrutura de TOC. Garante unicidade de IDs. Retorna HTML modificado + array de TOC.

---

## 🛣️ Sistema de Rotas Dinâmicas

### Rota Genérica `/[slug]`
**Arquivo**: `app/[slug]/page.tsx`

Renderiza páginas institucionais ou genéricas (ex: `/sobre`, `/termos`) cadastradas na tabela `pages` do Supabase.

**Fluxo**:
1. Resolução do slug (via `params` Promise).
2. Fetch via `getPageBySlug(slug)`.
3. Se `null` ou status ≠ `published` → `notFound()`.
4. Renderiza conteúdo HTML via `dangerouslySetInnerHTML` com classes `prose`.

### Página 404 (`app/not-found.tsx`)

1. Tenta buscar página com slug `"404"` no Supabase (conteúdo customizável).
2. Se falhar, usa fallback local ("Página não encontrada").
3. Constrói URL da imagem a partir de `NEXT_PUBLIC_SUPABASE_URL` + `image_url` do registro.
4. Exibe imagem full-width + título + conteúdo HTML + botões "Voltar ao Início" e "Ver Raças".

---

## 🗺️ Mapeamento Completo de Rotas

| Rota | Arquivo | Tipo | Data Source | Descrição |
|------|---------|------|-------------|-----------|
| `/` | `app/page.tsx` | Server (async) | Mock local (artigos) | Home com Hero, Raças em Destaque, Destaques Editoriais. |
| `/[slug]` | `app/[slug]/page.tsx` | Server (async) | Supabase (pages) | Páginas dinâmicas (Sobre, Termos, etc.). |
| `/blog` | `app/blog/page.tsx` | Server (async) | Mock local (articles) | Listagem de artigos com grid responsivo. |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Server (async) | Mock local (articles) | Leitura de artigo com TOC Desktop/Mobile. |
| `/racas` | `app/racas/page.tsx` | Server (async) | Supabase (breeds) | Catálogo de raças com busca e filtros. |
| `/racas/[slug]` | `app/racas/[slug]/page.tsx` | Server (async) | Supabase (breeds) | Detalhes da raça com Stats e TOC. |
| `/saude` | `app/saude/page.tsx` | Server (estática) | Nenhum (componentes client) | Hub de Saúde com ferramentas interativas. |
| `/sobre` | `app/sobre/page.tsx` | Server (estática) | Nenhum | Página Sobre — manifesto editorial. |

---

## ⚙️ Configuração do Next.js

**Arquivo**: `next.config.ts`

### Remote Image Patterns

Domínios de imagem autorizados no `next/image`:

| Hostname | Propósito |
|----------|-----------|
| `images.unsplash.com` | Imagens editoriais (Hero, Sobre) |
| `drive.google.com` | Possíveis imagens via Google Drive |
| `randomuser.me` | Avatares de usuários |
| `images.dog.ceo` | API Dog CEO para imagens de raças |
| `ppvkpgrjsrftzdqkbgmi.supabase.co` | Supabase Storage — imagens de raças, artigos, GIFs, páginas. Pattern: `/storage/v1/object/public/**` |

---

## 🔐 Configuração do Supabase

### Variáveis de Ambiente (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=<sua-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-chave>
```

### Tabelas Utilizadas

| Tabela | Uso | Campos Conhecidos |
|--------|-----|-------------------|
| `breeds` | Catálogo de raças | `id`, `name`, `slug`, `category`, `image_url`, `description`, `stats` (JSONB), `characteristics` (JSONB) |
| `pages` | Páginas dinâmicas (Sobre, Termos, 404) | `id`, `slug`, `title`, `content` (HTML), `status`, `image_url`, `created_at`, `updated_at` |

### Supabase Storage

- **Bucket**: `public-images`
- **Base URL**: `{SUPABASE_URL}/storage/v1/object/public/public-images/pages/`
- **Uso**: Imagens de artigos, GIFs de raças para HoverCard, imagem 404.

---

## 🚀 Status do Projeto e Roadmap

### ✅ Funcionalidades Implementadas

- [x] **Configuração Base** (Next.js 16, TypeScript, Tailwind v4, PostCSS)
- [x] **Design System** (Variáveis CSS, `@theme inline`, Paleta Deep Navy/Amber, Geist Fonts)
- [x] **Utilitários** (`cn()`, TOC processador com `slugify` e `processContent`)
- [x] **Integração Supabase** (Cliente Singleton, Data Functions para Breeds e Pages)
- [x] **Layout Global** (Header fixo com backdrop-blur, Footer 4 colunas, Loading com PawLoader)
- [x] **Página Inicial** (Hero animado, AuthoritySection, FeaturedBreedsHover, EditorialHighlights, FinalCTA)
- [x] **Módulo de Raças** (`/racas` com busca/filtros, `/racas/[slug]` com Stats e TOC)
- [x] **Módulo de Blog** (`/blog` com grid, `/blog/[slug]` com TOC Desktop/Mobile)
- [x] **Páginas Dinâmicas** (`/[slug]` via Supabase, 404 customizado)
- [x] **Página Sobre** (`/sobre` com Bento Grid editorial e manifesto)
- [x] **Hub de Saúde** (`/saude` com DogAgeCalculator e SymptomChecker)
- [x] **Componentes de UI** (Breadcrumb, HoverCard, MobileTOC, PawLoader, TableOfContents)
- [x] **Assets** (husky-cartoon.png, vet-cartoon.png)

### 🔮 Em Breve (Ferramentas de Saúde)

- [ ] **Guia de Vacinação**: Cronograma personalizado de vacinas baseado na idade e estilo de vida (Teaser já presente em `/saude`).
- [ ] **Calculadora Nutricional**: Calorias e quantidade de ração por porte do cão (Teaser já presente em `/saude`).

### 🔄 Melhorias Pendentes

- [ ] **Migração de Artigos para Supabase**: Atualmente os artigos são mock local (`lib/data/articles.ts`). Migrar para tabela `articles` no Supabase.
- [ ] **Sanitização de HTML**: Implementar `dompurify` para renderização segura de conteúdo rico (`dangerouslySetInnerHTML`).
- [ ] **Otimização de Imagens**: Revisar uso de `unoptimized` em `next/image` e configurar loader do Supabase.
- [ ] **SEO Avançado**: Implementar JSON-LD (Schema.org) para Artigos e Raças.
- [ ] **Menu Mobile**: O toggle de menu mobile (`Menu` icon) não possui drawer/painel implementado.
- [ ] **Consistência do Cliente Supabase**: `lib/data/breeds.ts` cria seu próprio `createClient` — unificar com o singleton de `lib/supabase.ts`.
- [ ] **Componentes inativos**: Ativar ou remover `PopularBreeds.tsx`, `CareGuides.tsx`, `FAQ.tsx`.
- [ ] **Sistema de Comentários**: Placeholder no blog para futuro sistema.
- [ ] **Newsletter funcional**: Formulário no Footer e Sobre sem backend integrado.

---
