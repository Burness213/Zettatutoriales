"use client";
import { useState } from "react";
import Link from "next/link";
import { Download, Search, ChevronRight, Filter, ChevronLeft, Folder, HardDrive, SortAsc, LayoutGrid, X, Star } from "lucide-react";
import { formatDownloads } from "@/lib/data";

const sizes = ["Todos", "< 100 MB", "100 MB – 1 GB", "> 1 GB"];
const sorts = ["Más recientes", "Más descargados", "Mejor valorados"];

export default function ProgramasClient({ programs, categories }: { programs: any[], categories: any[] }) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("todos");
  const [activeSize, setActiveSize] = useState("Todos");
  const [sort, setSort] = useState("Más recientes");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = programs
    .filter((p) => activeCat === "todos" || p.categorySlug === activeCat || p.category.toLowerCase() === activeCat.toLowerCase())
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      // Dummy logic for sorts
      if (sort === "Más descargados") return b.downloads - a.downloads;
      if (sort === "Mejor valorados") return b.rating - a.rating;
      return a.name.localeCompare(b.name); // Using alphabetical for "Más recientes" as fallback
    });

  return (
    <div className="pt-24 pb-20 max-w-[1440px] mx-auto px-6 font-display text-slate-900 dark:text-slate-100 antialiased">
      <nav className="flex items-center gap-2 py-6 text-sm text-slate-500 dark:text-slate-400">
        <Link className="hover:text-primary transition-colors" href="/">Inicio</Link>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white font-medium">Programas</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-5xl font-black mb-3 tracking-tight font-montserrat">Todos los <span className="text-primary">Programas</span></h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">Explora nuestra biblioteca completa de software optimizado y herramientas esenciales para potenciar tu PC.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        <aside className="w-full lg:w-[280px] shrink-0 space-y-8 hidden lg:block">
          <div className="bg-[#1A1A2E] p-6 rounded-xl border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-montserrat text-white">
              <Folder className="text-primary" size={20} />
              Categorías
            </h3>
            <div className="space-y-1">
              <label 
                onClick={() => setActiveCat("todos")}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeCat === "todos" ? "bg-primary/20 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                <LayoutGrid size={18} />
                <span className="text-sm font-medium">Todas</span>
              </label>
              {categories.map(c => (
                <label 
                  key={c.slug}
                  onClick={() => setActiveCat(c.slug)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeCat === c.slug ? "bg-primary/20 text-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                >
                  <span className="text-lg opacity-80 grayscale">{c.icon}</span>
                  <span className="text-sm font-medium">{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1A2E] p-6 rounded-xl border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-montserrat text-white">
              <HardDrive className="text-primary" size={20} />
              Tamaño de Archivo
            </h3>
            <div className="space-y-3">
              {sizes.map(s => (
                <label key={s} className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="size"
                    checked={activeSize === s}
                    onChange={() => setActiveSize(s)}
                    className="rounded-full border-slate-300 dark:border-white/10 text-primary focus:ring-primary bg-transparent" 
                  />
                  <span className="text-sm text-gray-300">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1A2E] p-6 rounded-xl border border-white/5 shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-montserrat text-white">
              <SortAsc className="text-primary" size={20} />
              Ordenar por
            </h3>
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg text-sm px-4 py-2.5 focus:ring-primary focus:border-primary outline-none text-white"
            >
              {sorts.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
        </aside>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center w-full gap-3">
              <button className="lg:hidden bg-primary/10 text-primary p-4 rounded-xl" onClick={() => setSidebarOpen(true)}>
                <Filter size={20} />
              </button>
              <div className="relative w-full md:max-w-md">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar programas..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#1A1A2E] border border-white/10 rounded-xl pl-12 pr-4 py-4 focus:ring-primary focus:border-primary outline-none text-white placeholder-gray-500" 
                />
              </div>
            </div>
            
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden md:block w-auto shrink-0">
               Mostrando <span className="text-primary font-bold">{filtered.length} programas</span>
            </div>
          </div>

          {(activeCat !== "todos" || search) && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm text-slate-400">Filtros activos:</span>
              {activeCat !== "todos" && <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">{categories.find(c => c.slug === activeCat)?.name}</span>}
              {search && <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">"{search}"</span>}
              <button 
                onClick={() => { setActiveCat("todos"); setSearch(""); }}
                className="text-xs font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1 ml-2"
              >
                <X size={12} /> Limpiar
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.slug} className="bg-[#1A1A2E] border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/30 transition-all flex flex-col">
                {p.imageUrl ? (
                  <div className="w-full h-32 relative group-hover:opacity-90 transition-opacity">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    {p.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg">{p.badge}</span>
                    )}
                  </div>
                ) : (
                  <div className="p-5 pb-0 flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
                      <span className="text-3xl drop-shadow-md">{p.icon}</span>
                    </div>
                    {p.badge && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-full">{p.badge}</span>
                    )}
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col pt-4">
                  <h3 className="text-lg font-bold mb-1 leading-tight group-hover:text-primary transition-colors font-montserrat">{p.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                   {p.category}
                </p>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 flex-1">
                  {p.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#0A0A0F] border border-white/5 p-2 rounded-lg text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Tamaño</p>
                    <p className="text-sm font-bold text-primary">{p.size || "~ 500 MB"}</p>
                  </div>
                  <div className="bg-[#0A0A0F] border border-white/5 p-2 rounded-lg text-center">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Descargas</p>
                    <p className="text-sm font-bold text-white">{formatDownloads(p.downloads)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-6 text-yellow-500">
                  <Star size={14} className="fill-current" />
                  <span className="text-xs text-slate-400 ml-1 font-bold">({p.rating})</span>
                </div>

                <div className="space-y-3 mt-auto">
                  <Link href={`/programas/${p.slug}`} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                    <Download size={16} /> Descargar
                  </Link>
                  <Link href={`/programas/${p.slug}`} className="block text-center text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
            ))}
          </div>

          {filtered.length === 0 && (
             <div className="text-center py-20 border border-white/5 rounded-2xl bg-[#1A1A2E] shadow-xl">
               <h3 className="text-xl font-bold mb-2 font-montserrat tracking-tight text-white">No hay resultados</h3>
               <p className="text-gray-400">Intenta con otros filtros o términos de búsqueda.</p>
             </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 text-sm font-bold">
                <ChevronLeft size={16} /> Anterior
              </button>
              <div className="flex gap-1">
                <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold text-sm">1</button>
                <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-sm">2</button>
                <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-sm">3</button>
              </div>
              <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 text-sm font-bold">
                Siguiente <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-60 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-full max-w-xs h-full bg-white dark:bg-card-dark border-r border-slate-200 dark:border-white/10 p-6 flex flex-col overflow-y-auto">
             <div className="flex items-center justify-between mb-8">
               <span className="font-bold text-lg font-montserrat tracking-tight text-slate-900 dark:text-white">Filtros</span>
               <button onClick={() => setSidebarOpen(false)} className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-500 dark:text-white/70 hover:text-primary">
                 <X size={18} />
               </button>
             </div>
             
             <div className="space-y-6">
               <div>
                  <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-slate-400">Categorías</h3>
                  <div className="space-y-1">
                    <label 
                      onClick={() => { setActiveCat("todos"); setSidebarOpen(false); }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeCat === "todos" ? "bg-primary/10 text-primary" : "hover:bg-slate-100 dark:hover:bg-white/5"}`}
                    >
                      <LayoutGrid size={18} />
                      <span className="text-sm font-medium text-white">Todas</span>
                    </label>
                    {categories.map(c => (
                      <label 
                        key={c.slug}
                        onClick={() => { setActiveCat(c.slug); setSidebarOpen(false); }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${activeCat === c.slug ? "bg-primary/10 text-primary" : "hover:bg-slate-100 dark:hover:bg-white/5"}`}
                      >
                        <span className="text-lg opacity-80 grayscale">{c.icon}</span>
                        <span className="text-sm font-medium text-white">{c.name}</span>
                      </label>
                    ))}
                  </div>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
