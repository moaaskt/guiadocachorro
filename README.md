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

## 📄 Licença

Este projeto é privado e não possui licença de código aberto.

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela! ⭐**

Made with ❤️ by the Guia do Cachorro Team

</div>
