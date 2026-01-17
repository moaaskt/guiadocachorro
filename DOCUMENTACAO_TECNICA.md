# 📋 Documentação Técnica - Guia do Cachorro

**Versão:** 2.0 (Atualizada)  
**Data:** Análise Técnica Completa - Atualização Pós-Refatoração  
**Framework:** Next.js 16.1.1 (App Router)  
**Stack:** TypeScript, Supabase, TailwindCSS, React 19

---

## 🔄 Mudanças Recentes (Versão 2.0)

### ✅ Refatoração Completa do Service Layer

**Data:** Atualização pós-refatoração

**Principais Alterações:**

1. **Nova Organização de Arquivos:**
   - ✅ Criado `lib/data/pages.ts` - Função `getPageBySlug` refatorada
   - ✅ Criado `lib/types/pages.ts` - Tipo `Page` unificado
   - ⚠️ `services/pages.ts` ainda existe mas está obsoleto (deve ser removido)

2. **Tipo `Page` Unificado:**
   - **Antes:** Dois tipos diferentes com campos incompatíveis
   - **Agora:** Tipo único em `lib/types/pages.ts` com:
     - `content: string` (HTML) substituindo `description`, `subtitle`, etc.
     - `status: "draft" | "published"` obrigatório
     - Campos não-nullable (`slug`, `title`)

3. **Verificação de Status:**
   - **Antes:** Filtro na query SQL
   - **Agora:** Verificação no componente (`app/[slug]/page.tsx`)
   - **Benefício:** Permite flexibilidade futura para preview de drafts

4. **Renderização de Conteúdo:**
   - **Antes:** Campos separados (`title`, `subtitle`, `description`, `image_url`)
   - **Agora:** `dangerouslySetInnerHTML` com `page.content` (HTML rico)
   - **Layout:** Classe `prose` do Tailwind para estilização tipográfica

5. **Atualização do Next.js 16:**
   - `params` agora é `Promise<{ slug: string }>` (não mais objeto direto)
   - Necessário usar `await params` antes de acessar propriedades

### ⚠️ Pendências

- `app/not-found.tsx` ainda usa `@/services/pages` (deve ser atualizado)
- Arquivo `services/pages.ts` ainda existe (deve ser removido)

---

## 📑 Sumário

1. [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Análise de Roteamento](#análise-de-roteamento)
4. [Configuração do Supabase](#configuração-do-supabase)
5. [Service Layer - Duplicação Crítica](#service-layer---duplicação-crítica)
6. [Integração Next.js + Supabase](#integração-nextjs--supabase)
7. [Layout e Componentes](#layout-e-componentes)
8. [Problemas Identificados](#problemas-identificados)
9. [Hipóteses para o Erro 404 em `/[slug]`](#hipóteses-para-o-erro-404-em-slug)
10. [Checklist Técnico](#checklist-técnico)

---

## 🏗️ Visão Geral da Arquitetura

O projeto **Guia do Cachorro** é uma aplicação Next.js moderna que utiliza o **App Router** para gerenciar rotas e renderização. A arquitetura segue o padrão de **CMS-like**, onde conteúdo dinâmico é gerenciado via Supabase e renderizado através de rotas dinâmicas.

### Stack Tecnológico

- **Next.js 16.1.1** - App Router (React Server Components)
- **React 19.3** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Supabase 2.90.1** - Backend as a Service (PostgreSQL)
- **TailwindCSS 4** - Framework CSS utility-first
- **Framer Motion 12.25** - Animações (presente nas dependências)

### Padrão Arquitetural

```
┌─────────────────────────────────────────┐
│         Next.js App Router              │
│  ┌──────────┐  ┌──────────┐            │
│  │  Home    │  │ [slug]   │            │
│  │  /       │  │ /sobre   │            │
│  └────┬─────┘  └────┬─────┘            │
│       │             │                   │
│       └──────┬──────┘                   │
│              │                          │
│       ┌──────▼──────┐                   │
│       │  lib/data/  │                   │
│       │  pages.ts   │                   │
│       └──────┬──────┘                   │
│              │                          │
│       ┌──────▼──────┐                   │
│       │   Supabase  │                   │
│       │   Client    │                   │
│       └──────┬──────┘                   │
│              │                          │
│       ┌──────▼──────┐                   │
│       │  Database   │                   │
│       │  (pages)    │                   │
│       └─────────────┘                   │
└─────────────────────────────────────────┘
```

---

## 📁 Estrutura do Projeto

### Árvore de Diretórios

```
guia-do-cachorro/
├── app/                        # Next.js App Router
│   ├── [slug]/                # Rota dinâmica (catch-all para páginas)
│   │   └── page.tsx           # Componente Server Component para /[slug]
│   ├── layout.tsx             # Layout global da aplicação
│   ├── page.tsx               # Home page (/)
│   ├── not-found.tsx          # Página 404 customizada
│   ├── globals.css            # Estilos globais
│   └── favicon.ico            # Ícone do site
│
├── components/                 # Componentes React reutilizáveis
│   ├── Header.tsx             # ⚠️ Componente NÃO utilizado
│   ├── Hero.tsx
│   ├── PopularBreeds.tsx
│   ├── CareGuides.tsx
│   ├── FAQ.tsx
│   ├── LatestPosts.tsx
│   ├── EditorialHighlights.tsx
│   ├── AuthoritySection.tsx
│   ├── FinalCTA.tsx
│   └── Footer.tsx
│
├── lib/                        # Utilitários e configurações
│   ├── supabase.ts            # Cliente Supabase (singleton)
│   ├── data/                  # Camada de acesso a dados
│   │   └── pages.ts           # ✅ getPageBySlug (em uso)
│   └── types/                 # Tipos TypeScript
│       └── pages.ts           # ✅ Tipo Page unificado
│
├── services/                   # ⚠️ Legacy - não utilizado
│   └── pages.ts               # ❌ Versão antiga (obsoleta)
│
├── public/                     # Arquivos estáticos
├── next.config.ts             # Configuração do Next.js
├── tsconfig.json              # Configuração TypeScript
└── package.json               # Dependências do projeto
```

### Análise por Diretório

#### `app/`
- **Propósito:** Contém todas as rotas da aplicação via App Router
- **Observação:** Não há uso de grupos de rotas `(pages)` ou layouts aninhados
- **Arquitetura:** Estrutura simples com layout global único

#### `components/`
- **Propósito:** Componentes React reutilizáveis (Client ou Server Components)
- **⚠️ Problema:** O arquivo `Header.tsx` existe mas não é utilizado
- **Padrão:** Componentes modulares separados por responsabilidade

#### `lib/`
- **Propósito:** Utilitários compartilhados e configurações
- **⚠️ Problema Crítico:** Duplicação de lógica de busca de páginas (ver seção específica)

#### `services/`
- **Propósito:** Camada de abstração para comunicação com APIs/externals
- **Uso Atual:** Contém a função `getPageBySlug` que está sendo utilizada

---

## 🗺️ Análise de Roteamento

### Estrutura de Rotas no App Router

O Next.js 16 App Router funciona através da estrutura de arquivos. Cada arquivo `page.tsx` dentro de uma pasta representa uma rota.

#### Rotas Identificadas

| Rota | Arquivo | Tipo | Status |
|------|---------|------|--------|
| `/` | `app/page.tsx` | Estática | ✅ Funcionando |
| `/[slug]` | `app/[slug]/page.tsx` | Dinâmica | ⚠️ **Problema: 404** |
| `/404` | `app/not-found.tsx` | Especial | ✅ Funcionando |

### 1. Rota Home (`/`)

**Arquivo:** `app/page.tsx`

**Características:**
- ✅ Server Component (default no App Router)
- ✅ Importa múltiplos componentes da pasta `components/`
- ✅ Layout simples, sem dados externos

**Fluxo de Renderização:**
```
Usuário acessa / 
→ Next.js carrega app/page.tsx 
→ Renderiza componentes (Hero, FAQ, etc.)
→ Envia HTML completo ao cliente
```

**Código:**
```12:29:app/page.tsx
export default function Home() {
  return (
    <>
     
      <Hero />
      <AuthoritySection />
      <EditorialHighlights />
      <FAQ />
      <PopularBreeds />
      <CareGuides />
      <LatestPosts />
      <FinalCTA />
      <Footer />
    </>
  );
}
```

### 2. Rota Dinâmica `/[slug]` (PROBLEMA CRÍTICO)

**Arquivo:** `app/[slug]/page.tsx`

**Características:**
- ✅ Server Component assíncrono
- ✅ Recebe `params` via props tipadas
- ✅ Busca dados do Supabase via `getPageBySlug`
- ⚠️ **Chama `notFound()` se página não existir**

**Fluxo de Renderização:**
```
Usuário acessa /sobre
→ Next.js identifica [slug] = "sobre"
→ Carrega app/[slug]/page.tsx
→ Chama getPageBySlug("sobre")
→ Se retornar null → notFound() → renderiza not-found.tsx
→ Se retornar dados → renderiza página
```

**Código Completo:**
```8:25:app/[slug]/page.tsx
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params

  const page = await getPageBySlug(slug)

  if (!page || page.status !== "published") {
    notFound()
  }

  return (
    <main className="prose mx-auto py-10">
      <h1>{page.title}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </main>
  )
}
```

**⚠️ Pontos Críticos:**

1. **Uso de `notFound()`:** Quando `getPageBySlug` retorna `null`, o componente chama `notFound()`. Isso é **correto**, mas o problema está na **causa do `null`** (ver seção de hipóteses).

2. **Tipagem de `params`:** O tipo `PageProps` está atualizado para Next.js 16 (params é Promise):
   ```typescript
   type PageProps = {
     params: Promise<{ slug: string }>
   }
   ```
   **⚠️ Mudança Importante:** No Next.js 16, `params` é uma Promise que precisa ser `await` antes de usar.

3. **Verificação de Status:** Agora verifica `page.status !== "published"` explicitamente no componente, permitindo flexibilidade na query.

4. **Renderização de Conteúdo:** Usa `dangerouslySetInnerHTML` para renderizar HTML armazenado em `page.content`, indicando que o conteúdo é rico em HTML.

5. **Async/Await:** O componente é `async`, o que está **correto** para Server Components que fazem fetch de dados. Agora também faz `await params` para acessar o slug.

### 3. Página 404 (`not-found.tsx`)

**Arquivo:** `app/not-found.tsx`

**Características:**
- ✅ Server Component assíncrono
- ✅ Busca uma página com slug "404" no Supabase
- ✅ Renderiza fallback se não encontrar a página "404"

**Observação:** A página `not-found.tsx` também busca dados do Supabase, o que pode causar **recursão** se o Supabase estiver fora do ar.

**Código:**
```6:59:app/not-found.tsx
export default async function NotFound() {
  const page = await getPageBySlug("404");

  const imageUrl = page?.image_url?.trim();

  return (
    <>
      

      <main className="relative min-h-[calc(100vh-64px)] w-full">
        {/* IMAGEM FULL */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={page?.title ?? "Página não encontrada"}
            fill
            priority
            className="object-cover"
          />
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTEÚDO */}
        <div className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center text-center px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {page?.title ?? "Página não encontrada"}
          </h1>

          <p className="max-w-xl text-lg opacity-90 mb-8">
            {page?.description ??
              "Você chegou até aqui, mas essa página não existe ou foi movida."}
          </p>

          <div className="flex gap-4">
            <Link
              href="/"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90 transition"
            >
              Voltar para Home
            </Link>

            <Link
              href="/racas"
              className="rounded-xl border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition"
            >
              Ver Raças
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
```

---

## 🗄️ Configuração do Supabase

### Cliente Supabase

**Arquivo:** `lib/supabase.ts`

**Código:**
```1:6:lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Análise:**

1. **✅ Singleton Pattern:** A instância do cliente é criada uma vez e exportada, evitando múltiplas conexões.

2. **⚠️ Variáveis de Ambiente:**
   - Usa `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - O prefixo `NEXT_PUBLIC_` significa que essas variáveis são **expostas ao cliente**
   - ⚠️ **Não há verificação se as variáveis existem** (usa `!` para forçar non-null)

3. **⚠️ Segurança:**
   - O `ANON_KEY` é exposto no cliente, o que é **correto** para uso público do Supabase
   - Para operações sensíveis, seria necessário usar `SERVICE_ROLE_KEY` no servidor (não presente)

### Estrutura da Tabela `pages`

**✅ REFATORADO:** O tipo `Page` foi unificado em `lib/types/pages.ts`.

**Tipo Unificado (Atual):**
```1:9:lib/types/pages.ts
export type Page = {
    id: string
    slug: string
    title: string
    content: string
    status: "draft" | "published"
    created_at: string
    updated_at?: string
  }
```

**✅ Mudanças Importantes:**

1. **Campo `content`:** Substitui `description`, `subtitle`, `image_url`, `cta_label`, `cta_link`. Agora o conteúdo é HTML armazenado em um único campo.
2. **Campo `status`:** Obrigatório, permite controlar publicação.
3. **Campos de Timestamp:** `created_at` obrigatório, `updated_at` opcional.
4. **Tipos Não-Nullable:** `slug` e `title` são obrigatórios (não podem ser `null`).

### Campos da Tabela (Atual)

| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| `id` | `string` | ✅ Sim | UUID/Primary Key |
| `slug` | `string` | ✅ Sim | URL-friendly identifier |
| `title` | `string` | ✅ Sim | Título da página |
| `content` | `string` | ✅ Sim | HTML completo do conteúdo |
| `status` | `"draft" \| "published"` | ✅ Sim | Estado de publicação |
| `created_at` | `string` | ✅ Sim | Data de criação (ISO string) |
| `updated_at` | `string` | ❌ Opcional | Data de atualização |

**⚠️ Observação:** O tipo antigo em `services/pages.ts` ainda existe mas não é mais utilizado. Deve ser removido para evitar confusão.

---

## 🔄 Service Layer - Arquitetura Atualizada

### ✅ REFATORAÇÃO COMPLETA: Nova Organização

**ANTES:** Duplicação de código entre `services/pages.ts` e `lib/pages.ts`  
**AGORA:** Organização clara com separação de responsabilidades:

#### 1. `lib/data/pages.ts` (✅ EM USO)

**Usado em:**
- `app/[slug]/page.tsx` ✅

**Código:**
```4:18:lib/data/pages.ts
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
```

**Características:**
- ✅ **NÃO filtra por status na query** (permite flexibilidade)
- ✅ Usa `.limit(1)` antes de `.single()` (melhor prática)
- ✅ Importa tipo `Page` de `lib/types/pages.ts`
- ✅ Retorna `null` em caso de erro
- ⚠️ Log de erro no console

**Estratégia de Filtro:**
A verificação de `status = "published"` foi **movida para o componente** (`app/[slug]/page.tsx`), permitindo:
- Buscar páginas draft para preview (futuro)
- Controle mais granular no nível da rota
- Maior flexibilidade de uso

#### 2. `lib/types/pages.ts` (✅ EM USO)

**Usado em:**
- `lib/data/pages.ts` (retorno da função)
- `app/[slug]/page.tsx` (tipagem implícita)

**Código:**
```1:9:lib/types/pages.ts
export type Page = {
    id: string
    slug: string
    title: string
    content: string
    status: "draft" | "published"
    created_at: string
    updated_at?: string
  }
```

**Benefícios:**
- ✅ **Tipo único e centralizado**
- ✅ Separação clara: tipos vs. lógica
- ✅ Facilita manutenção e evolução

#### 3. `services/pages.ts` (❌ LEGACY - OBSOLETO)

**Status:** Não utilizado, deve ser removido.

**Problemas:**
- ❌ Tipo `Page` antigo (campos diferentes)
- ❌ Não está sendo importado em nenhum lugar ativo
- ⚠️ Pode causar confusão se não for removido

**⚠️ Observação:** `app/not-found.tsx` ainda importa de `@/services/pages`, o que pode causar incompatibilidade de tipos. Deve ser atualizado.

### Nova Arquitetura

```
app/[slug]/page.tsx
  └─→ lib/data/pages.ts (getPageBySlug)
        └─→ lib/types/pages.ts (Page type)
        └─→ lib/supabase.ts (cliente)
```

**Vantagens:**
1. ✅ **Separação de responsabilidades:** Dados, tipos e configuração separados
2. ✅ **Tipo unificado:** Uma única fonte de verdade para `Page`
3. ✅ **Flexibilidade:** Filtro de status no componente permite reutilização
4. ✅ **Manutenibilidade:** Estrutura clara e organizada

---

## 🔌 Integração Next.js + Supabase

### Fluxo de Dados Completo

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Usuário acessa /sobre                                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Next.js App Router identifica [slug] = "sobre"          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Carrega app/[slug]/page.tsx (Server Component)          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Chama getPageBySlug("sobre")                             │
│    Arquivo: lib/data/pages.ts                               │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Supabase Client (lib/supabase.ts)                        │
│    - Lê NEXT_PUBLIC_SUPABASE_URL                            │
│    - Lê NEXT_PUBLIC_SUPABASE_ANON_KEY                       │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. Query SQL executada:                                     │
│    SELECT * FROM pages WHERE slug = 'sobre' LIMIT 1         │
│    ⚠️ SEM FILTRO DE STATUS (verificação no componente)      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. Resposta do Supabase:                                    │
│    - Se encontrar: retorna Page | null                      │
│    - Se erro: console.error() + retorna null                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. app/[slug]/page.tsx verifica:                            │
│    if (!page || page.status !== "published") { notFound(); }│
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 9. Se page === null:                                        │
│    → notFound() → renderiza app/not-found.tsx               │
│    Se page existe:                                          │
│    → renderiza página com dados                             │
└─────────────────────────────────────────────────────────────┘
```

### Pontos de Falha Potenciais

1. **Variáveis de Ambiente Ausentes:**
   - Se `NEXT_PUBLIC_SUPABASE_URL` não existir → `undefined` → erro no Supabase
   - Se `NEXT_PUBLIC_SUPABASE_ANON_KEY` não existir → `undefined` → erro no Supabase

2. **Erro na Query Supabase:**
   - Qualquer erro (tabela não existe, conexão, permissões) → `error` preenchido → retorna `null` → `notFound()`

3. **Slug Inexistente:**
   - Se slug "sobre" não existir na tabela → `data === null` → retorna `null` → `notFound()`

4. **Slug com Status "draft":**
   - ⚠️ **A função atual não filtra por status**, então se existir uma página "sobre" com `status = "draft"`, ela será exibida (ou não, dependendo das políticas RLS do Supabase)

### Server Components vs Client Components

**Todos os componentes analisados são Server Components:**

- ✅ `app/page.tsx` - Server Component
- ✅ `app/[slug]/page.tsx` - Server Component assíncrono
- ✅ `app/not-found.tsx` - Server Component assíncrono
- ✅ `app/layout.tsx` - Server Component

**Vantagens:**
- Dados são buscados no servidor
- HTML gerado no servidor (melhor SEO)
- Sem JavaScript desnecessário no cliente

**Desvantagens:**
- Se houver erro na busca, não há fallback no cliente
- Erros podem causar 500 ou 404

---

## 🎨 Layout e Componentes

### Layout Global

**Arquivo:** `app/layout.tsx`

**Características:**
- ✅ Define `<html>` e `<body>`
- ✅ Importa fontes Google (Geist Sans e Geist Mono)
- ✅ Importa estilos globais (`globals.css`)
- ✅ Define metadata padrão
- ✅ **Renderiza header fixo inline** (não usa componente `Header.tsx`)

**Código do Header:**
```28:33:app/layout.tsx
        {/* NAVBAR FIXA DO SITE */}
        <header className="h-16 border-b">
          <div className="mx-auto max-w-7xl px-6 h-full flex items-center font-bold">
            Guia do Cachorro
          </div>
        </header>
```

**⚠️ Observação:**
- Existe um componente `components/Header.tsx` que **não está sendo usado**
- O header está implementado diretamente no layout global
- Ambos renderizam conteúdo similar mas com estilos diferentes

### Componente Header.tsx (Não Utilizado)

**Arquivo:** `components/Header.tsx`

**Código:**
```1:18:components/Header.tsx
export function Header() {
    return (
      <header className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Guia do Cachorro
          </h1>
  
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600">Raças</a>
            <a href="#" className="hover:text-blue-600">Saúde</a>
            <a href="#" className="hover:text-blue-600">Alimentação</a>
            <a href="#" className="hover:text-blue-600">Blog</a>
          </nav>
        </div>
      </header>
    );
  }
```

**Diferenças:**
- `Header.tsx` tem navegação (links Raças, Saúde, etc.)
- Layout inline não tem navegação
- Estilos diferentes (altura, espaçamento)

### Herança de Layout

No Next.js App Router, o `app/layout.tsx` é aplicado a **todas as rotas** por padrão, incluindo:

- ✅ `/` (home)
- ✅ `/[slug]` (páginas dinâmicas)
- ✅ Páginas 404 (quando `notFound()` é chamado)

Isso significa que o header fixo aparece em todas as páginas, o que é **correto**.

---

## 🐛 Problemas Identificados

### 🔴 Problemas Críticos

#### 1. **Arquivo Legacy `services/pages.ts` Não Removido** ✅ RESOLVIDO PARCIALMENTE
- **Severidade:** MÉDIA
- **Status:** Refatoração realizada, mas arquivo antigo ainda existe
- **Arquivo:** `services/pages.ts`
- **Impacto:** Confusão sobre qual arquivo usar, possível importação acidental
- **Solução Recomendada:** Remover `services/pages.ts` após confirmar que não é mais usado

#### 2. **`app/not-found.tsx` Usa Importação Legacy** ⚠️ PENDENTE
- **Severidade:** MÉDIA
- **Arquivo:** `app/not-found.tsx`
- **Impacto:** Incompatibilidade de tipos (`Page` antigo vs. novo), possíveis erros em runtime
- **Solução Recomendada:** Atualizar para importar de `@/lib/data/pages` e ajustar código para novo tipo `Page`

#### 3. **Filtro de Status no Componente** ✅ IMPLEMENTADO
- **Severidade:** ✅ RESOLVIDO
- **Status:** Verificação de `status !== "published"` agora ocorre no componente `app/[slug]/page.tsx`
- **Observação:** Decisão arquitetural - permite flexibilidade futura para preview de drafts

#### 4. **Variáveis de Ambiente Sem Validação**
- **Severidade:** MÉDIA
- **Arquivo:** `lib/supabase.ts`
- **Impacto:** Se variáveis não existirem, a aplicação quebra silenciosamente
- **Solução Recomendada:** Validar variáveis no início da aplicação

#### 5. **Tipo `Page` Unificado** ✅ RESOLVIDO
- **Severidade:** ✅ RESOLVIDO
- **Status:** Tipo centralizado em `lib/types/pages.ts`
- **Benefício:** Uma única fonte de verdade, tipagem consistente

### 🟡 Problemas Menores

#### 6. **Componente `Header.tsx` Não Utilizado**
- **Severidade:** BAIXA
- **Impacto:** Código morto, confusão sobre qual header usar
- **Solução Recomendada:** Remover ou migrar para uso no layout

#### 7. **Logs de Erro no Console (Produção)**
- **Severidade:** BAIXA
- **Arquivo:** `lib/data/pages.ts`
- **Impacto:** Poluição de logs, possível exposição de informações sensíveis
- **Solução Recomendada:** Usar sistema de logging adequado (ex: Sentry, LogRocket)

#### 8. **Tratamento de Erro Genérico**
- **Severidade:** MÉDIA
- **Arquivo:** `lib/data/pages.ts`
- **Impacto:** Qualquer erro do Supabase retorna `null`, tornando debugging difícil
- **Solução Recomendada:** Diferenciar entre "página não encontrada" e "erro de conexão"

#### 9. **Página `not-found.tsx` Depende do Supabase**
- **Severidade:** MÉDIA
- **Arquivo:** `app/not-found.tsx`
- **Impacto:** Se o Supabase estiver offline, a página 404 pode não funcionar
- **Solução Recomendada:** Fallback local caso a busca falhe

---

## 🔍 Hipóteses para o Erro 404 em `/[slug]`

Quando você acessa `/sobre` e recebe um 404, o fluxo é:

```
/sobre → app/[slug]/page.tsx → getPageBySlug("sobre") → null → notFound() → not-found.tsx
```

### Hipóteses (Ordenadas por Probabilidade)

#### 🎯 **Hipótese 1: Slug "sobre" Não Existe no Banco de Dados**
**Probabilidade:** 80%

**Cenário:**
- A tabela `pages` no Supabase não possui uma linha com `slug = "sobre"`
- A query retorna `data = null`
- A função retorna `null`
- O componente chama `notFound()`

**Como Verificar:**
```sql
SELECT * FROM pages WHERE slug = 'sobre';
```

**Solução:**
- Criar a página "sobre" no Supabase
- Verificar se o slug está correto (case-sensitive)

#### 🎯 **Hipótese 2: Variáveis de Ambiente Não Configuradas**
**Probabilidade:** 60%

**Cenário:**
- `NEXT_PUBLIC_SUPABASE_URL` está ausente ou incorreto
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` está ausente ou incorreto
- O cliente Supabase não consegue conectar
- Qualquer query retorna erro → `null`

**Como Verificar:**
- Verificar se existe arquivo `.env.local` ou `.env`
- Verificar se as variáveis estão definidas:
  ```bash
  echo $NEXT_PUBLIC_SUPABASE_URL
  echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
  ```

**Solução:**
- Criar arquivo `.env.local` na raiz do projeto:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
  ```

#### 🎯 **Hipótese 3: Problemas de Row Level Security (RLS)**
**Probabilidade:** 50%

**Cenário:**
- O Supabase tem RLS habilitado na tabela `pages`
- A `ANON_KEY` não tem permissão para ler a tabela
- A query retorna erro de permissão → `null`

**Como Verificar:**
- Verificar políticas RLS no Supabase Dashboard
- Verificar logs de erro no console do navegador (DevTools)
- Verificar logs do Supabase

**Solução:**
- Criar política RLS para permitir SELECT público:
  ```sql
  CREATE POLICY "Allow public read access" ON pages
  FOR SELECT USING (true);
  ```

#### 🎯 **Hipótese 4: Página Existe Mas com Status "draft"**
**Probabilidade:** 40%

**Cenário:**
- A página "sobre" existe mas tem `status = "draft"`
- ⚠️ **Se RLS bloquear rascunhos**, a query não retorna nada
- Se RLS permitir, a página seria exibida mesmo sendo rascunho

**Como Verificar:**
```sql
SELECT slug, status FROM pages WHERE slug = 'sobre';
```

**Solução:**
- Alterar status para "published"
- ⚠️ **Nota:** A verificação de status agora ocorre no componente `app/[slug]/page.tsx` (linha 13)

#### 🎯 **Hipótese 5: Erro de Conexão/Tempo Limite**
**Probabilidade:** 20%

**Cenário:**
- Supabase está temporariamente offline
- Timeout na requisição
- Erro não tratado → `null`

**Como Verificar:**
- Verificar status do Supabase
- Verificar logs do servidor Next.js
- Testar conexão manual com o Supabase

**Solução:**
- Implementar retry logic
- Melhorar tratamento de erros

#### 🎯 **Hipótese 6: Tabela "pages" Não Existe**
**Probabilidade:** 10%

**Cenário:**
- A tabela `pages` não foi criada no Supabase
- Query retorna erro "relation does not exist"
- Função retorna `null`

**Como Verificar:**
- Verificar tabelas no Supabase Dashboard
- Verificar SQL Editor

**Solução:**
- Criar tabela `pages` com a estrutura correta

---

## ✅ Checklist Técnico

### 🔴 Urgente (Fazer Primeiro)

- [ ] **Verificar se o slug "sobre" existe no Supabase**
  - [ ] Abrir Supabase Dashboard
  - [ ] Verificar tabela `pages`
  - [ ] Buscar linha com `slug = "sobre"`
  - [ ] Se não existir, criar a página

- [ ] **Verificar variáveis de ambiente**
  - [ ] Verificar se `.env.local` existe
  - [ ] Verificar se `NEXT_PUBLIC_SUPABASE_URL` está definido
  - [ ] Verificar se `NEXT_PUBLIC_SUPABASE_ANON_KEY` está definido
  - [ ] Testar valores manualmente

- [ ] **Verificar políticas RLS no Supabase**
  - [ ] Abrir Supabase Dashboard → Authentication → Policies
  - [ ] Verificar se há política de SELECT na tabela `pages`
  - [ ] Se não houver, criar política pública de leitura

### 🟡 Importante (Resolver Depois)

- [x] ~~**Unificar função `getPageBySlug`**~~ ✅ **RESOLVIDO**
  - [x] ✅ Arquivo mantido: `lib/data/pages.ts`
  - [x] ✅ Filtro de status movido para componente (flexibilidade)
  - [ ] ⚠️ Remover arquivo legacy `services/pages.ts`

- [x] ~~**Unificar tipo `Page`**~~ ✅ **RESOLVIDO**
  - [x] ✅ Tipo centralizado em `lib/types/pages.ts`
  - [x] ✅ Baseado no novo schema do Supabase
  - [ ] ⚠️ Atualizar `app/not-found.tsx` para usar novo tipo

- [ ] **Adicionar validação de variáveis de ambiente**
  - [ ] Criar função `validateEnv()` em `lib/env.ts`
  - [ ] Chamar no início de `lib/supabase.ts`
  - [ ] Lançar erro claro se variáveis estiverem faltando

- [ ] **Melhorar tratamento de erros**
  - [ ] Diferenciar "página não encontrada" de "erro de conexão"
  - [ ] Retornar tipos específicos de erro
  - [ ] Logs adequados (não apenas console.error)

### 🟢 Opcional (Melhorias)

- [ ] **Resolver componente `Header.tsx` não utilizado**
  - [ ] Decidir: usar componente ou manter inline
  - [ ] Se manter inline, remover `components/Header.tsx`
  - [ ] Se usar componente, substituir no layout

- [ ] **Adicionar fallback na página `not-found.tsx`**
  - [ ] Se busca do Supabase falhar, usar conteúdo local
  - [ ] Evitar dependência total do Supabase para 404

- [ ] **Adicionar testes**
  - [ ] Testes unitários para `getPageBySlug`
  - [ ] Testes de integração para rotas dinâmicas
  - [ ] Testes E2E para fluxo completo

- [ ] **Adicionar documentação de API**
  - [ ] Documentar estrutura da tabela `pages`
  - [ ] Documentar endpoints/funções de serviço
  - [ ] Criar guia de contribuição

---

## 📊 Resumo Executivo

### Estado Atual do Projeto

- ✅ **Estrutura básica:** Bem organizada, segue padrões do Next.js App Router
- ⚠️ **Roteamento dinâmico:** Implementado e refatorado (verificar se ainda retorna 404)
- ⚠️ **Integração Supabase:** Configurada, mas sem validações robustas
- ✅ **Service Layer:** ✅ **REFATORADO** - Organização clara em `lib/data/` e `lib/types/`
- ✅ **Tipagem:** ✅ **RESOLVIDO** - Tipo `Page` unificado em `lib/types/pages.ts`

### Causa Mais Provável do 404

**A página com slug "sobre" não existe no banco de dados Supabase**, ou as variáveis de ambiente não estão configuradas corretamente.

### Próximos Passos Recomendados

1. **Imediato:** Verificar existência da página "sobre" no Supabase
2. **Imediato:** Verificar/Configurar variáveis de ambiente
3. **Curto Prazo:** ✅ **RESOLVIDO** - Refatoração do service layer concluída
4. **Pendente:** Atualizar `app/not-found.tsx` para usar novo tipo `Page`
5. **Pendente:** Remover arquivo legacy `services/pages.ts`
6. **Médio Prazo:** Adicionar validações e melhorar tratamento de erros

---

## 📝 Notas Finais

Esta documentação foi gerada através de análise estática do código. Para diagnóstico completo, recomenda-se:

1. **Verificar logs do servidor Next.js** durante requisições a `/sobre`
2. **Verificar console do navegador** (DevTools → Network) para ver requisições ao Supabase
3. **Verificar logs do Supabase** no Dashboard para ver queries executadas
4. **Testar conexão manual** ao Supabase usando a mesma `ANON_KEY`

---

**Documentação gerada por:** Analyzer Técnico Sênior  
**Última atualização:** Análise completa do projeto  
**Versão do Projeto:** 0.1.0
