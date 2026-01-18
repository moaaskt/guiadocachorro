import Link from "next/link";
import { Dog, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-stone-200">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl text-white group-hover:bg-accent transition-colors duration-300">
            <Dog size={24} />
          </div>
          <span className="text-xl font-black tracking-tight text-primary">
            Guia do Cão
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {["Raças", "Saúde", "Blog", "Sobre"].map((item) => (
            <Link 
              key={item} 
              href={
                item === "Sobre" ? "/sobre" : 
                item === "Blog" ? "/blog" :
                `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`
              }
              className="text-stone-600 font-medium hover:text-primary transition-colors text-sm uppercase tracking-wide"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="flex items-center gap-4">
          <Link 
            href="/racas" 
            className="hidden md:flex bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary-hover hover:shadow-lg transition-all"
          >
            Explorar Raças
          </Link>

          {/* MENU MOBILE TOGGLE */}
          <button className="md:hidden text-primary p-2">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}