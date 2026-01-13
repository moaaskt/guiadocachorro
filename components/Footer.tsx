'use client';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* MARCA */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Guia do Cachorro
          </h3>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            Conteúdo confiável sobre raças, saúde, alimentação e comportamento
            canino. Informação feita por quem ama cães de verdade.
          </p>
        </div>

        {/* NAVEGAÇÃO */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Navegação
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-gray-900 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/racas" className="hover:text-gray-900 transition">
                Raças
              </a>
            </li>
            <li>
              <a href="/guias" className="hover:text-gray-900 transition">
                Guias de Cuidados
              </a>
            </li>
          </ul>
        </div>

        {/* CONTEÚDOS */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Conteúdos
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-900 transition">
                Alimentação
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 transition">
                Saúde
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 transition">
                Comportamento
              </a>
            </li>
          </ul>
        </div>

        {/* CONTATO */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Contato
          </h4>
          <p className="mt-4 text-sm text-gray-600">
            Dúvidas, sugestões ou parcerias?
          </p>
          <a
            href="mailto:contato@guiadocachorro.com"
            className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            contato@guiadocachorro.com
          </a>
        </div>
      </div>

      {/* LINHA FINAL */}
      <div className="border-t border-gray-200 py-6">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Guia do Cachorro. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
