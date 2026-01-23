# 📋 Documentação Técnica - Guia do Cachorro

**Versão:** 4.1 (Atualização Visual e Estrutural)  
**Data:** Janeiro 2026  
**Framework:** Next.js 16.1.1 (App Router)  
**Stack:** TypeScript, Supabase, TailwindCSS v4, React 19, Framer Motion

---

## 📑 Sumário

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Design System & Estilização](#design-system--estilização)
4. [Arquitetura de Layout & Navegação](#arquitetura-de-layout--navegação)
5. [Componentes de UI](#componentes-de-ui)
6. [Sistema de Rotas Dinâmicas](#sistema-de-rotas-dinâmicas)
7. [Mapeamento de Rotas](#mapeamento-de-rotas)
8. [Configuração do Supabase](#configuração-do-supabase)
9. [Status do Projeto e Roadmap](#status-do-projeto-e-roadmap)

---

## 🎯 Visão Geral

O **Guia do Cachorro** é uma aplicação web moderna construída com Next.js 16, focada em entregar conteúdo de alta qualidade para tutores de cães. O projeto passou por um rebranding completo, adotando uma estética editorial premium ("Revista Especializada") e uma arquitetura robusta baseada em Server Components.

### Características Principais

- ✅ **CMS-like**: Conteúdo gerenciado via Supabase (PostgreSQL)
- ✅ **Design System Premium**: Paleta de cores sofisticada (Deep Navy/Amber)
- ✅ **Navegação Contextual**: Table of Contents (TOC) inteligente e adaptativa
- ✅ **SSR/SSG**: Renderização no servidor para máxima performance e SEO
- ✅ **TypeScript**: Tipagem estática rigorosa
- ✅ **Animações**: Framer Motion e transições CSS fluidas

---

## 💻 Stack Tecnológico

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| `next` | 16.1.1 | Framework React com App Router |
| `react` | 19.2.3 | Biblioteca UI |
| `react-dom` | 19.2.3 | Renderização React DOM |
| `@supabase/supabase-js` | 2.90.1 | Cliente Supabase (PostgreSQL) |
| `tailwindcss` | 4.0 | Framework CSS (Configuração via CSS Variables) |
| `framer-motion` | 12.26.2 | Biblioteca de animações |
| `lucide-react` | Latest | Biblioteca de ícones |

---

## 🎨 Design System & Estilização

O projeto utiliza **Tailwind CSS v4** com configuração baseada em variáveis CSS nativas, definidas em `app/globals.css`. A identidade visual busca transmitir autoridade, confiança e acolhimento.

### Paleta de Cores

A paleta é centrada em tons de azul profundo (confiança/profissionalismo) e âmbar (energia/destaque), sobre um fundo off-white suave.

| Token | Variável CSS | Cor (Hex) | Uso Principal |
|-------|--------------|-----------|---------------|
| **Primary** | `--color-primary` | `#0F172A` (Slate-900) | Textos principais, Headers, Elementos de autoridade |
| **Surface** | `--color-surface` | `#F8FAFC` (Slate-50) | Fundo da página, Cards, Seções claras |
| **Accent** | `--color-accent` | `#D97706` (Amber-600) | Botões CTA, Links, Destaques visuais |
| **Accent Light**| `--color-accent-light`| `#FEF3C7` (Amber-100) | Fundos de destaque suave, Badges |
| **Stone** | `--color-stone-*` | Variados | Bordas, textos secundários, elementos neutros |

### Tipografia

- **Fontes**: Geist Sans (Principal) e Geist Mono (Código/Técnico).
- **Estilo**: Títulos com `letter-spacing: -0.02em` para um visual mais compacto e elegante.

---

## 🏗️ Arquitetura de Layout & Navegação

A navegação foi reestruturada para oferecer experiências otimizadas tanto em desktop quanto em dispositivos móveis, com foco na leitura de conteúdo longo (artigos e guias de raças).

### 1. Layout Raiz (`app/layout.tsx`)
O layout global define a estrutura base da aplicação:
- **Header Fixo**: Navegação principal.
- **Main Content**: Área de conteúdo dinâmico.
- **Footer**: Rodapé completo com links institucionais.

### 2. Navegação Desktop (Sidebar de Conteúdo)
Nas páginas de conteúdo rico (Artigos e Detalhes de Raças), utilizamos uma **Sidebar Lateral** dedicada à navegação interna.

- **Componente**: `components/ui/TableOfContents.tsx`
- **Comportamento**: 
  - Posicionamento `sticky` na lateral esquerda (ou direita, dependendo do layout).
  - Lista hierárquica de tópicos (H2, H3).
  - Indicação visual do tópico ativo durante o scroll.

### 3. Navegação Mobile (Cápsula Flutuante)
Em dispositivos móveis, a sidebar é substituída por uma **Navegação Flutuante em Cápsula**, maximizando o espaço de leitura.

- **Componente**: `components/ui/MobileTOC.tsx`
- **Aparência**: Botão flutuante (`fixed bottom-6`) em formato de pílula.
- **Interação**: 
  - Ao clicar, abre um *Drawer* (Bottom Sheet) com o índice do conteúdo.
  - Possui backdrop blur e animações de entrada/saída.
  - Fecha automaticamente ao selecionar um item.

### 4. Header & Footer
- **Header (`components/layout/Header.tsx`)**: Barra de navegação superior fixa. Contém logo, links principais (Raças, Saúde, Blog, Sobre) e botão de ação.
- **Footer (`components/layout/Footer.tsx`)**: Rodapé estruturado em 4 colunas:
  1. **Marca**: Logo e missão.
  2. **Explorar**: Links rápidos para seções do site.
  3. **Institucional**: Sobre, Contato, Termos.
  4. **Newsletter**: Formulário de captura de leads ("Matilha VIP").

---

## 🧩 Componentes de UI

### Componentes de Feedback/Estado

#### `PawLoader`
- **Arquivo**: `components/ui/PawLoader.tsx`
- **Descrição**: Loader personalizado com animação de pegadas de cachorro.
- **Uso**: Exibido durante transições de rota ou carregamento de dados.
- **Lógica**: Utiliza 6 ícones `PawPrint` que aparecem sequencialmente com delays e opacidade variável, simulando uma caminhada. A animação é definida via `@keyframes` injetado localmente.

### Componentes Estruturais

#### `Breadcrumb`
- **Arquivo**: `components/ui/Breadcrumb.tsx`
- **Descrição**: Navegação estrutural (migalhas de pão) para orientar o usuário na hierarquia do site.
- **Funcionalidade**: Mapeia rotas (`/racas`, `/blog`) para nomes amigáveis ("Guia de Raças", "Blog").

---

## 🛣️ Sistema de Rotas Dinâmicas

A aplicação utiliza rotas dinâmicas do Next.js para renderizar páginas de conteúdo gerenciadas pelo Supabase.

### Rota Genérica `/[slug]`
**Arquivo**: `app/[slug]/page.tsx`

Esta rota é responsável por renderizar páginas institucionais ou de conteúdo genérico (ex: `/sobre`, `/termos`) cadastradas na tabela `pages` do Supabase.

#### Fluxo de Execução:
1. **Resolução do Slug**: O componente recebe `params` (Promise) e extrai o `slug`.
2. **Data Fetching**: Chama `getPageBySlug(slug)` (`lib/data/pages.ts`).
3. **Validação**:
   - Se a página não retornar dados (`null`) OU
   - Se o status não for `published`:
   - ➡️ Executa `notFound()` (redireciona para 404).
4. **Renderização**:
   - Injeta o conteúdo HTML recebido do banco usando `dangerouslySetInnerHTML`.
   - Aplica classes de tipografia (`prose`) para formatação automática.

### Tratamento de Erro 404
**Arquivo**: `app/not-found.tsx`

Quando uma rota não é encontrada:
1. Tenta buscar uma página com slug `"404"` no Supabase (para conteúdo customizável).
2. Se falhar, utiliza um fallback local ("Página não encontrada").
3. Exibe uma interface amigável com imagem de fundo (full width) e botões para retornar à Home ou explorar Raças.

---

## 🗺️ Mapeamento de Rotas

| Rota | Arquivo | Tipo | Descrição |
|------|---------|------|-----------|
| `/` | `app/page.tsx` | Estática | Página inicial com destaques e raças populares. |
| `/[slug]` | `app/[slug]/page.tsx` | Dinâmica | Páginas gerais (Sobre, Termos) via Supabase. |
| `/blog` | `app/blog/page.tsx` | Estática | Listagem de artigos do blog. |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Dinâmica | Leitura de artigo com TOC e conteúdo rico. |
| `/racas` | `app/racas/page.tsx` | Estática | Catálogo de raças com busca e filtros. |
| `/racas/[slug]` | `app/racas/[slug]/page.tsx` | Dinâmica | Detalhes completos da raça. |
| `/saude` | *(Pendente)* | - | Futura seção de saúde. |

---

## 🚀 Status do Projeto e Roadmap

### Funcionalidades Implementadas (Checklist)

- [x] **Configuração Inicial** (Next.js 16, TypeScript, Tailwind v4) ✅
- [x] **Integração Supabase** (Cliente Singleton, Funções de Data) ✅
- [x] **Sistema de Design** (Variáveis CSS, Paleta Deep Navy/Amber) ✅
- [x] **Arquitetura de Layout** (Header, Footer Redesenhado) ✅
- [x] **Módulo de Raças** (`/racas`, `/racas/[slug]`) ✅
  - [x] Grid com busca e filtros ✅
  - [x] Página de detalhes com estatísticas ✅
- [x] **Módulo de Blog** (`/blog`, `/blog/[slug]`) ✅
  - [x] Listagem de artigos ✅
  - [x] Leitura com Table of Contents (Desktop/Mobile) ✅
- [x] **Páginas Dinâmicas** (`/[slug]`) ✅
  - [x] Fetching do Supabase ✅
  - [x] Tratamento de 404 ✅

### Roadmap e Próximos Passos

#### 🟡 Sessão Saúde (Pendente / Próximo Passo)
- **Objetivo**: Criar um hub de conteúdo focado em saúde veterinária.
- **Escopo**:
  - Listagem de artigos categorizados por "Saúde".
  - Guias de sintomas e prevenção.
  - Calculadoras de saúde (IMC canino, idade real).

#### 🔄 Melhorias em Andamento
- [ ] **Sanitização de HTML**: Implementar `dompurify` para renderização segura de conteúdo rico.
- [ ] **Otimização de Imagens**: Revisar uso de `unoptimized` e configurar loader do Supabase.
- [ ] **SEO Avançado**: Implementar JSON-LD (Schema.org) para Artigos e Raças.

---
