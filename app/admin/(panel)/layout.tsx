import { AdminThemeProvider } from './_components/AdminThemeProvider'
import { AdminSidebar } from './_components/AdminSidebar'
import { AdminHeader } from './_components/AdminHeader'

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminThemeProvider>
  )
}
