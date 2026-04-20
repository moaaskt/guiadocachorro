'use client'

import { usePathname } from 'next/navigation'
import { useAdminTheme } from './AdminThemeProvider'
import { Bell, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const PAGE_TITLES: Record<string, string> = {
  '/admin':               'Dashboard',
  '/admin/blog':          'Blog / Artigos',
  '/admin/racas':         'Raças',
  '/admin/home':          'Home Editor',
  '/admin/configuracoes': 'Configurações',
}

function getTitle(pathname: string) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  const parent = Object.keys(PAGE_TITLES).find(k => k !== '/admin' && pathname.startsWith(k))
  return parent ? PAGE_TITLES[parent] : 'Admin'
}

export function AdminHeader() {
  const pathname = usePathname()
  const { theme } = useAdminTheme()
  const dark = theme === 'dark'

  return (
    <header className={cn(
      'h-16 border-b flex items-center justify-between px-6 flex-shrink-0',
      dark ? 'bg-[#0D1117] border-white/8' : 'bg-white border-gray-200'
    )}>
      <h1 className={cn('text-base font-semibold tracking-tight', dark ? 'text-white' : 'text-gray-900')}>
        {getTitle(pathname)}
      </h1>
      <div className="flex items-center gap-2">
        <button className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors',
          dark ? 'border-white/8 text-white/40 hover:text-white/70 bg-white/3' : 'border-gray-200 text-gray-400 hover:text-gray-600 bg-gray-50'
        )}>
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Buscar...</span>
          <kbd className={cn('hidden sm:inline text-[10px] px-1.5 py-0.5 rounded border', dark ? 'border-white/10 text-white/30' : 'border-gray-200 text-gray-400')}>⌘K</kbd>
        </button>
        <button className={cn(
          'relative flex items-center justify-center w-9 h-9 rounded-lg border transition-colors',
          dark ? 'border-white/8 text-white/40 hover:text-white/70' : 'border-gray-200 text-gray-400 hover:text-gray-600'
        )}>
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
        </button>
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-accent)] text-white text-sm font-bold">
          A
        </div>
      </div>
    </header>
  )
}
