import Link from "next/link";
import { Dog, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUNA 1: MARCA */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <Dog size={20} />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Guia do Cachorro
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Sua fonte confiável de informações sobre raças, cuidados e saúde canina. Feito com amor por quem ama cachorros.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* COLUNA 2: MAPA DO SITE */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Explorar</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/racas" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Todas as Raças
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Blog & Dicas
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3: CATEGORIAS (Links rápidos pro Blog) */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Conteúdos</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Saúde Canina
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Adestramento
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Nutrição
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 4: LEGAL */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-100 pt-8 text-center md:text-left">
          <p className="text-gray-400 text-xs">
            © {currentYear} Guia do Cachorro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}