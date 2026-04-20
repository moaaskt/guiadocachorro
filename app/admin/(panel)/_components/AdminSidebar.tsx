'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useAdminTheme } from './AdminThemeProvider'
import {
  LayoutDashboard, FileText, PawPrint, Home,
  Settings, LogOut, Dog, ChevronRight, Sun, Moon,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard',      href: '/admin',               icon: LayoutDashboard, exact: true  },
  { label: 'Blog / Artigos', href: '/admin/blog',          icon: FileText,        exact: false },
  { label: 'Raças',          href: '/admin/racas',         icon: PawPrint,        exact: false },
  { label: 'Home Editor',    href: '/admin/home',          icon: Home,            exact: false },
  { label: 'Configurações',  href: '/admin/configuracoes', icon: Settings,        exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useAdminTheme()
  const [collapsed, setCollapsed] = useState(false)
  const dark = theme === 'dark'

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  return (
    <aside className={cn(
      'relative flex flex-col min-h-screen border-r transition-all duration-300 ease-in-out',
      collapsed ? 'w-[68px]' : 'w-64',
      dark ? 'bg-[#0D1117] border-white/8' : 'bg-white border-gray-200'
    )}>
      {/* Logo */}
      <div className={cn(
        'flex items-center border-b h-16 px-4 gap-3 overflow-hidden',
        dark ? 'border-white/8' : 'border-gray-100'
      )}>
        <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--color-accent)]">
          <Dog className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className={cn('font-bold text-sm truncate', dark ? 'text-white' : 'text-gray-900')}>
              Guia do Cão
            </span>
            <span className={cn('text-[10px] truncate', dark ? 'text-white/40' : 'text-gray-400')}>
              Painel Admin
            </span>
          </div>
        )}
      </div>

      {/* Toggle collapse */}
      <button
        onClick={() => setCollapsed(p => !p)}
        className={cn(
          'absolute -right-3 top-[22px] z-10 flex items-center justify-center w-6 h-6 rounded-full border shadow-md transition-colors',
          dark
            ? 'bg-[#161B22] border-white/10 text-white/60 hover:text-white'
            : 'bg-white border-gray-200 text-gray-400 hover:text-gray-700'
        )}
      >
        <ChevronRight className={cn('w-3 h-3 transition-transform duration-300', collapsed ? '' : 'rotate-180')} />
      </button>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-hidden">
        {!collapsed && (
          <p className={cn('px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest', dark ? 'text-white/25' : 'text-gray-400')}>
            Menu
          </p>
        )}
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, item.exact)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 relative',
                collapsed ? 'justify-center' : '',
                active
                  ? dark ? 'bg-white/8 text-white' : 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                  : dark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[var(--color-accent)]" />
              )}
              <Icon className={cn(
                'flex-shrink-0 w-[18px] h-[18px] transition-colors',
                active ? 'text-[var(--color-accent)]' : dark ? 'text-white/40 group-hover:text-white/70' : 'text-gray-400 group-hover:text-gray-600'
              )} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--color-accent)]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: theme + logout */}
      <div className={cn('border-t px-2 py-3 space-y-0.5', dark ? 'border-white/8' : 'border-gray-100')}>
        <button
          onClick={toggleTheme}
          title={collapsed ? (dark ? 'Modo claro' : 'Modo escuro') : undefined}
          className={cn(
            'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
            collapsed ? 'justify-center' : '',
            dark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          )}
        >
          {dark
            ? <Sun className="flex-shrink-0 w-[18px] h-[18px] text-yellow-400" />
            : <Moon className="flex-shrink-0 w-[18px] h-[18px] text-indigo-400" />
          }
          {!collapsed && <span>{dark ? 'Modo claro' : 'Modo escuro'}</span>}
        </button>

        <button
          title={collapsed ? 'Sair' : undefined}
          className={cn(
            'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
            collapsed ? 'justify-center' : '',
            dark ? 'text-white/50 hover:text-red-400 hover:bg-red-400/8' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
          )}
        >
          <LogOut className="flex-shrink-0 w-[18px] h-[18px]" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  )
}
