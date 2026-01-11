export function Header() {
    return (
      <header className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Guia do Cachorro
          </h1>
  
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600">Raças</a>
            <a href="#" className="hover:text-blue-600">Saúde</a>
            <a href="#" className="hover:text-blue-600">Alimentação</a>
            <a href="#" className="hover:text-blue-600">Blog</a>
          </nav>
        </div>
      </header>
    );
  }
  