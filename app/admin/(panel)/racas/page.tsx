export default function AdminRacas() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold [.admin-dark_&]:text-white text-gray-900">Raças</h2>
          <p className="text-sm mt-0.5 [.admin-dark_&]:text-white/40 text-gray-500">Catálogo completo de raças</p>
        </div>
        <a href="/admin/racas/nova" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors">
          + Nova raça
        </a>
      </div>
      <div className="rounded-xl border p-8 text-center [.admin-dark_&]:border-white/8 [.admin-dark_&]:text-white/30 [.admin-light_&]:border-gray-200 [.admin-light_&]:text-gray-400">
        Grid/tabela de raças em breve
      </div>
    </div>
  )
}
