'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type AdminTheme = 'dark' | 'light'

interface AdminThemeContextType {
  theme: AdminTheme
  toggleTheme: () => void
}

const AdminThemeContext = createContext<AdminThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AdminTheme>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('admin-theme') as AdminTheme | null
    if (stored) setTheme(stored)
  }, [])

  function toggleTheme() {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('admin-theme', next)
      return next
    })
  }

  return (
    <AdminThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={cn('min-h-screen', theme === 'dark' ? 'admin-dark' : 'admin-light')}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  )
}

export function useAdminTheme() {
  return useContext(AdminThemeContext)
}
