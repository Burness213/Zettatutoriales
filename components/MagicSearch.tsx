"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Folder, Package, Youtube, HardDrive } from "lucide-react";
import { useTheme } from "next-themes";
import { getPrograms, getCategories } from "@/lib/data";

export function MagicSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  
  // Dummy State for available programs to search instantly
  const [programs, setPrograms] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Fetch generic client search data (we can pre-load this or statically generate)
    const load = async () => {
      const p = await getPrograms();
      const c = await getCategories();
      setPrograms(p);
      setCategories(c);
    };
    load();
  }, []);

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-slate-400 font-medium transition-colors"
      >
        <Search size={14} />
        <span>Buscar programas...</span>
        <kbd className="ml-2 px-1.5 py-0.5 bg-white/10 rounded font-mono text-[10px] text-slate-300">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <button onClick={() => setOpen(true)} className="md:hidden text-slate-400 hover:text-white">
        <Search size={20} />
      </button>

      <Command.Dialog 
        open={open} 
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0D0D1A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-100"
      >
        <div className="flex items-center border-b border-white/10 px-4">
          <Search size={18} className="text-slate-400 shrink-0" />
          <Command.Input 
            placeholder="¿Qué estás buscando?..." 
            className="w-full bg-transparent border-none text-white px-4 py-4 text-lg focus:outline-none focus:ring-0"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
            ESC para salir
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
          <Command.Empty className="py-12 text-center text-sm text-slate-400 font-medium">No se encontraron resultados para tu búsqueda.</Command.Empty>

          <Command.Group heading="Programas Destacados" className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-3">
            {programs.map((p) => (
              <Command.Item 
                key={p.slug}
                onSelect={() => handleSelect(`/programas/${p.slug}`)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-primary/20 hover:text-white text-slate-300 transition-colors my-1 aria-selected:bg-primary aria-selected:text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">{p.icon}</div>
                <div className="flex-1">
                  <p className="font-bold font-montserrat">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.category?.name || "Software"}</p>
                </div>
                <div className="text-xs font-mono text-slate-500">{p.size}</div>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Categorías" className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-3 mt-2 border-t border-white/5">
            {categories.map((c) => (
              <Command.Item 
                key={c.slug}
                onSelect={() => handleSelect(`/categorias/${c.slug}`)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-white/10 text-slate-300 transition-colors my-1 aria-selected:bg-white/10"
              >
                <span className="text-lg grayscale opacity-70">{c.icon}</span>
                <span className="font-medium">{c.name}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Navegación Rápida" className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 py-3 mt-2 border-t border-white/5">
            <Command.Item onSelect={() => handleSelect('/youtube')} className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-white/10 text-slate-300 transition-colors my-1 aria-selected:bg-white/10">
              <Youtube size={16} className="text-red-500" /> Tutoriales YouTube
            </Command.Item>
            <Command.Item onSelect={() => handleSelect('/admin')} className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer hover:bg-white/10 text-slate-300 transition-colors my-1 aria-selected:bg-white/10">
              <HardDrive size={16} className="text-emerald-500" /> Panel de Administración
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
