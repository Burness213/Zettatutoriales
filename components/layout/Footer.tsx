"use client";
import Link from "next/link";
import { Zap, Megaphone, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link className="flex items-center gap-2 mb-6 group" href="/">
              <div className="bg-primary p-1 rounded-lg group-hover:scale-110 transition-transform">
                <Zap className="text-white fill-white" size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter font-montserrat bg-clip-text text-transparent bg-linear-to-b from-white to-white/70 flex items-center gap-1.5 drop-shadow-md">
                ZETTA <span className="text-transparent bg-clip-text bg-linear-to-br from-primary via-red-500 to-orange-600 drop-shadow-[0_0_15px_rgba(255,51,51,0.4)]">TUTOS</span>
              </span>
            </Link>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Tu hub confiable para la descarga de software PC y tutoriales técnicos de alta calidad. 100% verificado y seguro.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary text-gray-400 transition-all"
                href="#"
              >
                <Megaphone size={20} />
              </a>
              <a
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary text-gray-400 transition-all"
                href="https://www.youtube.com/@ZettaTutos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={20} />
              </a>
              <a
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary text-gray-400 transition-all"
                href="#"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 font-montserrat text-sm uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/">Inicio</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/programas">Programas PC</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/categorias">Categorías Populares</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/youtube">Canal de YouTube</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 font-montserrat text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/legal/privacidad">Privacidad</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/legal/terminos">Términos de Uso</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/legal/dmca">DMCA</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/contacto">Contacto</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Zetta Tutoriales. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-[10px] text-gray-700 uppercase tracking-tighter">
            Built for Performance
          </div>
        </div>
      </div>
    </footer>
  );
}
