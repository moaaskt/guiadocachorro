import Link from "next/link";
import { Dog, Instagram, Facebook, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-stone-200 pt-20 pb-10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">
          
          {/* COLUNA 1: BRANDING */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-surface p-2 rounded-xl text-primary">
                <Dog size={24} />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Guia do Cão
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Sua fonte confiável de informações veterinárias. Transformando donos em tutores extraordinários.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUNA 2: MAPA DO SITE */}
          <div>
            <h4 className="text-white font-bold mb-6">Explorar</h4>
            <ul className="space-y-4 text-sm">
              {['Todas as Raças', 'Comparar Cães', 'Guia de Filhotes', 'Calculadora de Idade'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-accent transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 3: CONTEÚDO */}
          <div>
            <h4 className="text-white font-bold mb-6">Aprenda</h4>
            <ul className="space-y-4 text-sm">
              {['Comportamento', 'Saúde & Nutrição', 'Adestramento Positivo', 'Mitos Veterinários'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-accent transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 4: NEWSLETTER */}
          <div>
            <h4 className="text-white font-bold mb-6">Matilha VIP</h4>
            <p className="text-stone-400 text-sm mb-4">Dicas de ouro direto no seu e-mail.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm w-full text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-accent text-primary px-4 py-2 rounded-lg font-bold hover:bg-accent-hover transition-colors">
                Ir
              </button>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <p>© 2026 Guia do Cão.</p>
            <span className="hidden md:inline">•</span>
            <p className="flex items-center gap-1">Feito com <Heart size={10} className="text-red-500 fill-red-500" /> para cachorros.</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}