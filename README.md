<div align="center">

# 🐶 Guia do Cachorro

> **"O cão é o único ser que te ama mais do que a si mesmo."**
> 
> Uma plataforma moderna e completa para tutores que buscam informação de qualidade sobre cuidados com seus cães

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.90.1-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

[![License](https://img.shields.io/badge/license-Private-red?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.2.0-blue?style=for-the-badge)](package.json)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Rotas](#-rotas)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contribuindo](#-contribuindo)
- [Documentação](#-documentação)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **Guia do Cachorro** é uma aplicação web moderna construída com Next.js 16, oferecendo um guia completo sobre raças de cães, cuidados, saúde e comportamento. A plataforma utiliza o App Router do Next.js para gerenciamento de rotas, Supabase como backend (PostgreSQL), e TailwindCSS para estilização.

### 🌟 Objetivo

Simplificar a vida de tutores de cães através de informação de qualidade, traduzindo a ciência veterinária e comportamental para uma linguagem acessível e cheia de amor.

### 💡 Diferenciais

- ✅ **Performance**: Carregamento rápido com Server Components e otimizações do Next.js
- ✅ **Conteúdo Dinâmico**: Sistema CMS-like com Supabase
- ✅ **SEO Otimizado**: Renderização no servidor para melhor indexação
- ✅ **Design Moderno**: Interface limpa e intuitiva focada na experiência do usuário
- ✅ **Totalmente Responsivo**: Adaptado para todos os dispositivos

---

## ✨ Características

### 🏠 Página Inicial
- Hero section impactante
- Destaques editoriais com artigos em destaque
- Raças populares
- Seção de autoridade
- Call-to-action final

### 🐕 Raças
- **Listagem Completa**: Grid com todas as raças cadastradas
- **Busca Inteligente**: Busca em tempo real por nome da raça
- **Filtros por Categoria**: Filtre raças por categoria
- **Detalhes Completos**: Páginas individuais com informações detalhadas
- **Estatísticas Visuais**: Gráficos de personalidade e características

### 📝 Blog & Artigos
- **Central de Conteúdo**: Listagem de artigos sobre cuidados, saúde e comportamento
- **Categorias**: Organização por categorias (Comportamento, Nutrição, Saúde)
- **Artigos Detalhados**: Páginas completas com conteúdo HTML rico
- **Tempo de Leitura**: Cálculo automático do tempo de leitura
- **Design Responsivo**: Cards modernos com hover effects

### 🗂️ Sistema de Páginas Dinâmicas
- **CMS-like**: Gerenciamento de conteúdo via Supabase
- **Páginas Dinâmicas**: Criação de páginas através do admin
- **Status de Publicação**: Controle de draft/published

---

## 🛠️ Tecnologias

### Core
- **[Next.js 16.1.1](https://nextjs.org/)** - Framework React com App Router, Server Components e Turbopack
- **[React 19.2.3](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática

### Estilização
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first (nova versão mais leve)
- **[Framer Motion 12.26.2](https://www.framer.com/motion/)** - Biblioteca de animações para React
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e leves

### Backend & Dados
- **[Supabase 2.90.1](https://supabase.com/)** - Backend-as-a-Service (PostgreSQL, autenticação, storage)
- **PostgreSQL** - Banco de dados relacional via Supabase

### Utilitários
- **[clsx](https://github.com/lukeed/clsx)** - Utilitário para classes CSS condicionais
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge inteligente de classes Tailwind

### Desenvolvimento
- **[ESLint 9](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint)** - Configuração ESLint para Next.js

---

## 📁 Estrutura do Projeto

```
guia-do-cachorro/
├── app/                          # Next.js App Router
│   ├── [slug]/                  # Páginas dinâmicas
│   │   └── page.tsx
│   ├── blog/                    # Módulo de Blog
│   │   ├── [slug]/              # Detalhes do artigo
│   │   │   └── page.tsx
│   │   └── page.tsx             # Listagem de artigos
│   ├── racas/                   # Módulo de Raças
│   │   ├── [slug]/              # Detalhes da raça
│   │   │   └── page.tsx
│   │   └── page.tsx             # Listagem de raças
│   ├── sobre/                   # Página Sobre
│   │   └── page.tsx
│   ├── layout.tsx               # Layout global
│   ├── page.tsx                 # Home page
│   ├── not-found.tsx            # Página 404
│   └── globals.css              # Estilos globais
│
├── components/                   # Componentes React
│   ├── blog/                    # Componentes do Blog
│   │   └── ArticleCard.tsx
│   ├── breeds/                  # Componentes de Raças
│   │   ├── BreedCard.tsx
│   │   ├── BreedGrid.tsx
│   │   ├── BreedStats.tsx
│   │   └── CategoryFilter.tsx
│   ├── home/                    # Componentes da Home
│   │   ├── AuthoritySection.tsx
│   │   ├── CareGuides.tsx
│   │   ├── EditorialHighlights.tsx
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Hero.tsx
│   │   └── PopularBreeds.tsx
│   └── layout/                  # Componentes de Layout
│       ├── Header.tsx
│       └── Footer.tsx
│
├── lib/                         # Utilitários e configurações
│   ├── data/                    # Camada de acesso a dados
│   │   ├── articles.ts          # Funções de artigos
│   │   ├── breeds.ts            # Funções de raças
│   │   └── pages.ts             # Funções de páginas
│   ├── types/                   # Tipos TypeScript
│   │   └── pages.ts
│   └── supabase.ts              # Cliente Supabase
│
├── public/                      # Arquivos estáticos
├── DOCUMENTACAO_TECNICA.md      # Documentação técnica completa
├── next.config.ts               # Configuração Next.js
├── package.json                 # Dependências e scripts
├── tailwind.config.ts           # Configuração Tailwind
└── tsconfig.json                # Configuração TypeScript
```

---

## 🚀 Instalação

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)** ou **[pnpm](https://pnpm.io/)**
- Conta no **[Supabase](https://supabase.com/)** (para backend)

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/guia-do-cachorro.git
cd guia-do-cachorro
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

> 💡 **Dica**: Você pode obter essas credenciais no painel do Supabase, em Settings > API.

4. **Configure o banco de dados**

Configure as tabelas no Supabase:
- `pages` - Para páginas dinâmicas
- `breeds` - Para raças de cães

> 📚 Veja a documentação técnica para detalhes sobre o schema do banco de dados.

5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

6. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 💻 Uso

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento na porta 3000 com hot-reload.

### Build para Produção

```bash
npm run build
```

Cria uma versão otimizada da aplicação na pasta `.next`.

### Executar Build de Produção

```bash
npm run start
```

Inicia o servidor de produção (após fazer o build).

### Linting

```bash
npm run lint
```

Executa o ESLint para verificar problemas no código.

---

## 🗺️ Rotas

A aplicação possui as seguintes rotas:

| Rota | Descrição | Componente |
|------|-----------|------------|
| `/` | Página inicial com hero, destaques e raças populares | `app/page.tsx` |
| `/blog` | Listagem de todos os artigos do blog | `app/blog/page.tsx` |
| `/blog/[slug]` | Detalhes de um artigo específico | `app/blog/[slug]/page.tsx` |
| `/racas` | Listagem de todas as raças com busca e filtros | `app/racas/page.tsx` |
| `/racas/[slug]` | Detalhes completos de uma raça | `app/racas/[slug]/page.tsx` |
| `/sobre` | Página sobre o projeto | `app/sobre/page.tsx` |
| `/[slug]` | Páginas dinâmicas criadas via CMS | `app/[slug]/page.tsx` |
| `/404` | Página não encontrada | `app/not-found.tsx` |

---

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento na porta 3000 |
| `npm run build` | Cria build otimizado para produção |
| `npm run start` | Inicia servidor de produção (após build) |
| `npm run lint` | Executa ESLint para verificar código |

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você tem uma ideia que pode melhorar o projeto, sinta-se à vontade para:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'feat: Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. **Abra** um Pull Request

### Padrões de Commit

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, ponto e vírgula faltando, etc
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Mudanças em build ou ferramentas auxiliares

---

## 📚 Documentação

Para documentação técnica completa, consulte:

- **[DOCUMENTACAO_TECNICA.md](./DOCUMENTACAO_TECNICA.md)** - Documentação técnica detalhada incluindo:
  - Arquitetura do projeto
  - Estrutura completa de pastas
  - Mapeamento de rotas e componentes
  - Funções e módulos
  - Tipos e interfaces
  - Configuração do Supabase
  - Análise de segurança
  - Problemas identificados
  - Pendências e melhorias

---

## 🐛 Problemas Conhecidos

- ⚠️ Blog usa dados estáticos (migração para Supabase planejada)
- ⚠️ Vulnerabilidade XSS no conteúdo HTML (sanitização necessária)
- ⚠️ Inconsistência no cliente Supabase (`lib/data/breeds.ts`)

Para mais detalhes, consulte a [Documentação Técnica](./DOCUMENTACAO_TECNICA.md).

---

## 📊 Status do Projeto

### ✅ Implementado
- [x] Sistema de blog com artigos
- [x] Listagem e detalhes de raças
- [x] Sistema de páginas dinâmicas
- [x] Busca e filtros de raças
- [x] Design responsivo
- [x] Animações com Framer Motion
- [x] SEO básico

### 🚧 Em Desenvolvimento
- [ ] Migração do blog para Supabase
- [ ] Sanitização de HTML (DOMPurify)
- [ ] Sistema de busca avançada
- [ ] Comparador de raças

### 📋 Planejado
- [ ] Sistema de comentários
- [ ] Autenticação de usuários
- [ ] Favoritos de raças
- [ ] Calculadora de necessidades
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)

---

## 📄 Licença

Este projeto é privado e não possui licença de código aberto.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ e dedicação para a comunidade de tutores de cães.

---

## 🙏 Agradecimentos

- Comunidade Next.js pelo excelente framework
- Supabase pelo backend poderoso e fácil de usar
- Todos os tutores de cães que inspiram este projeto

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela! ⭐**

Made with ❤️ by the Guia do Cachorro Team

</div>