export default function AdminBlog() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold [.admin-dark_&]:text-white text-gray-900">Artigos</h2>
          <p className="text-sm mt-0.5 [.admin-dark_&]:text-white/40 text-gray-500">Gerencie os posts do blog</p>
        </div>
        <a href="/admin/blog/novo" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors">
          + Novo artigo
        </a>
      </div>
      <div className="rounded-xl border p-8 text-center [.admin-dark_&]:border-white/8 [.admin-dark_&]:text-white/30 [.admin-light_&]:border-gray-200 [.admin-light_&]:text-gray-400">
        Tabela de artigos em breve — integração com Supabase
      </div>
    </div>
  )
}
