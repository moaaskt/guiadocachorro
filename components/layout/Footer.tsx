"use client";

import Link from "next/link";
import { PawPrint, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Coluna 1: Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <PawPrint size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-gray-900">Guia do Cão</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sua fonte confiável de informações sobre raças, saúde e bem-estar canino. Feito com amor para quem ama cachorros.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Facebook size={20} />} />
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Explorar</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/racas" className="hover:text-blue-600 transition">Todas as Raças</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Comparar Cães</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Guia de Filhotes</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Calculadora de Idade</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Categorias */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Categorias</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600 transition">Comportamento</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Saúde & Nutrição</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Adestramento</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Curiosidades</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Fique por dentro</h4>
            <p className="text-sm text-gray-500 mb-4">Receba dicas semanais e novidades sobre o mundo canino.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Assinar
              </button>
            </form>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Guia do Cão. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-900">Privacidade</Link>
            <Link href="#" className="hover:text-gray-900">Termos</Link>
            <Link href="#" className="hover:text-gray-900">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Componente auxiliar pequeno para ícones sociais
function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
      {icon}
    </a>
  );
}