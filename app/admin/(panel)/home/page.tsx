export default function AdminHomeEditor() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-1 [.admin-dark_&]:text-white text-gray-900">Home Editor</h2>
      <p className="text-sm mb-6 [.admin-dark_&]:text-white/40 text-gray-500">Personalize as seções da página inicial</p>
      <div className="grid gap-4">
        {['Hero (título, subtítulo, CTA)', 'Raças em destaque', 'Destaques editoriais', 'Seções visíveis / ocultas'].map((section) => (
          <div key={section} className="flex items-center justify-between p-4 rounded-xl border
            [.admin-dark_&]:border-white/8 [.admin-dark_&]:text-white/70
            [.admin-light_&]:border-gray-200 [.admin-light_&]:text-gray-700">
            <span className="text-sm font-medium">{section}</span>
            <span className="text-xs px-2 py-1 rounded-md [.admin-dark_&]:bg-white/5 [.admin-dark_&]:text-white/30 [.admin-light_&]:bg-gray-100 [.admin-light_&]:text-gray-400">Em breve</span>
          </div>
        ))}
      </div>
    </div>
  )
}
