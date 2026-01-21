import Link from "next/link";
import { Dog, Instagram, Facebook, Mail, Heart, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUNA 1: MARCA */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="bg-white/10 p-2.5 rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Dog size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Guia do Cão
              </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80">
              Transformando donos em tutores extraordinários através de informação veterinária de qualidade e amor pelos animais.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={Instagram} label="Instagram" />
              <SocialLink href="#" icon={Facebook} label="Facebook" />
              <SocialLink href="mailto:contato@guiadocao.com.br" icon={Mail} label="Email" />
            </div>
          </div>

          {/* COLUNA 2: EXPLORAR */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              Explorar
              <span className="h-1 w-12 bg-accent rounded-full block" />
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/racas">Raças</FooterLink>
              <FooterLink href="/saude">Saúde</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/ferramentas">Ferramentas</FooterLink>
            </ul>
          </div>

          {/* COLUNA 3: INSTITUCIONAL */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              Institucional
              <span className="h-1 w-12 bg-accent rounded-full block" />
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/sobre">Sobre nós</FooterLink>
              <FooterLink href="/contato">Contato</FooterLink>
              <FooterLink href="/termos">Termos de Uso</FooterLink>
              <FooterLink href="/privacidade">Privacidade</FooterLink>
            </ul>
          </div>

          {/* COLUNA 4: NEWSLETTER */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <h4 className="text-white font-bold mb-2">Matilha VIP</h4>
            <p className="text-xs mb-4 opacity-70">
              Junte-se a +10.000 tutores e receba dicas semanais.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="bg-primary border border-white/10 rounded-lg px-4 py-2.5 text-sm w-full text-white placeholder:text-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
              <button 
                type="button"
                className="bg-accent text-white px-4 py-2.5 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-900/20"
              >
                Inscrever
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <p>© 2026 Guia do Cão. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart size={12} className="text-accent fill-accent" />
            <span>para cachorros.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Componentes auxiliares para manter o código limpo

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-sm hover:text-accent hover:pl-2 transition-all duration-300 block"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <a 
      href={href} 
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 group"
    >
      <Icon size={18} className="group-hover:scale-110 transition-transform" />
    </a>
  );
}
