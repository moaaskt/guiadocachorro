import { FileText, PawPrint, Eye, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const STATS = [
  { label: 'Artigos publicados', value: '3',  icon: FileText,   trend: '+1 este mês',        color: 'text-blue-400'   },
  { label: 'Raças cadastradas',  value: '24', icon: PawPrint,   trend: '+3 este mês',        color: 'text-amber-400'  },
  { label: 'Visitas (30d)',      value: '—',  icon: Eye,        trend: 'Analytics em breve', color: 'text-green-400'  },
  { label: 'Posts em rascunho',  value: '0',  icon: TrendingUp, trend: 'Tudo publicado',     color: 'text-purple-400' },
]

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight [.admin-dark_&]:text-white text-gray-900">Bom dia 👋</h2>
        <p className="mt-1 text-sm [.admin-dark_&]:text-white/40 text-gray-500">Aqui está um resumo do seu conteúdo.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="rounded-xl border p-5 space-y-3
              [.admin-dark_&]:bg-white/3 [.admin-dark_&]:border-white/8
              [.admin-light_&]:bg-white [.admin-light_&]:border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium [.admin-dark_&]:text-white/40 [.admin-light_&]:text-gray-500">{stat.label}</p>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold tracking-tight [.admin-dark_&]:text-white [.admin-light_&]:text-gray-900">{stat.value}</p>
              <p className="text-xs [.admin-dark_&]:text-white/30 [.admin-light_&]:text-gray-400">{stat.trend}</p>
            </div>
          )
        })}
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 [.admin-dark_&]:text-white/60 [.admin-light_&]:text-gray-600">Ações rápidas</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/blog/novo" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors">
            <Plus className="w-4 h-4" /> Novo artigo
          </Link>
          <Link href="/admin/racas/nova" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors">
            <Plus className="w-4 h-4" /> Nova raça
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 [.admin-dark_&]:text-white/60 [.admin-light_&]:text-gray-600">Módulos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Gerenciar artigos do blog', href: '/admin/blog',          desc: 'Criar, editar e publicar posts' },
            { label: 'Catálogo de raças',         href: '/admin/racas',         desc: 'CRUD completo com stats e imagens' },
            { label: 'Editor da Home',            href: '/admin/home',          desc: 'Personalizar seções da página inicial' },
            { label: 'Configurações',             href: '/admin/configuracoes', desc: 'Páginas, SEO, newsletter' },
          ].map((mod) => (
            <Link key={mod.href} href={mod.href} className="group flex items-center justify-between p-4 rounded-xl border transition-all duration-150
              [.admin-dark_&]:border-white/8 [.admin-dark_&]:hover:border-white/15 [.admin-dark_&]:hover:bg-white/3
              [.admin-light_&]:border-gray-200 [.admin-light_&]:hover:border-gray-300 [.admin-light_&]:hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium [.admin-dark_&]:text-white [.admin-light_&]:text-gray-900">{mod.label}</p>
                <p className="text-xs mt-0.5 [.admin-dark_&]:text-white/35 [.admin-light_&]:text-gray-500">{mod.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 opacity-30 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all [.admin-dark_&]:text-white [.admin-light_&]:text-gray-700" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
