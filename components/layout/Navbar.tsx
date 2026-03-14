"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X } from "lucide-react";
import { MagicSearch } from "@/components/MagicSearch";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Programas", href: "/programas" },
  { label: "Categorías", href: "/categorias" },
  { label: "YouTube", href: "/youtube" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:scale-110 transition-transform flex items-center justify-center">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter font-montserrat bg-clip-text text-transparent bg-linear-to-b from-white to-white/70 flex items-center gap-1.5 drop-shadow-md">
              ZETTA <span className="text-transparent bg-clip-text bg-linear-to-br from-primary via-red-500 to-orange-600 drop-shadow-[0_0_15px_rgba(255,51,51,0.4)] relative">
                TUTOS
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-primary/0 via-primary to-primary/0 blur-xs opacity-50"></span>
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide text-gray-300">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors ${
                  pathname === l.href ? "text-primary" : "hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MagicSearch />

          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0F] border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-medium ${
                pathname === l.href ? "text-primary" : "text-gray-300 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
