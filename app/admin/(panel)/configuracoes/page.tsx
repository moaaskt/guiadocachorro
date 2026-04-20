export default function AdminConfiguracoes() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-1 [.admin-dark_&]:text-white text-gray-900">Configurações</h2>
      <p className="text-sm mb-6 [.admin-dark_&]:text-white/40 text-gray-500">SEO global, páginas dinâmicas e preferências</p>
      <div className="space-y-3">
        {['Páginas dinâmicas (Sobre, Termos, 404)', 'SEO global (título, descrição, OG)', 'Newsletter (integração)', 'Usuários admin'].map((item) => (
          <div key={item} className="flex items-center justify-between p-4 rounded-xl border
            [.admin-dark_&]:border-white/8 [.admin-dark_&]:text-white/70
            [.admin-light_&]:border-gray-200 [.admin-light_&]:text-gray-700">
            <span className="text-sm font-medium">{item}</span>
            <span className="text-xs px-2 py-1 rounded-md [.admin-dark_&]:bg-white/5 [.admin-dark_&]:text-white/30 [.admin-light_&]:bg-gray-100 [.admin-light_&]:text-gray-400">Em breve</span>
          </div>
        ))}
      </div>
    </div>
  )
}
