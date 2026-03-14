import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles, Gift, LayoutGrid } from "lucide-react";
import { getCategories } from "@/lib/data";

export const metadata = { title: "Categorías" };

// Map the color from the mock data to specific Tailwind color classes for the UI glow effects
const getColorClasses = (color: string) => {
  switch (color) {
    case "#3b82f6": return { shadow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]", text: "text-blue-500", bg: "bg-blue-500/20", border: "border-blue-500/20", badge: "bg-blue-500/10" };
    case "#f97316": return { shadow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]", text: "text-orange-500", bg: "bg-orange-500/20", border: "border-orange-500/20", badge: "bg-orange-500/10" };
    case "#a855f7": return { shadow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]", text: "text-purple-500", bg: "bg-purple-500/20", border: "border-purple-500/20", badge: "bg-purple-500/10" };
    case "#ec4899": return { shadow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]", text: "text-pink-500", bg: "bg-pink-500/20", border: "border-pink-500/20", badge: "bg-pink-500/10" };
    case "#f59e0b": return { shadow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]", text: "text-amber-500", bg: "bg-amber-500/20", border: "border-amber-500/20", badge: "bg-amber-500/10" };
    case "#22c55e": return { shadow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]", text: "text-green-500", bg: "bg-green-500/20", border: "border-green-500/20", badge: "bg-green-500/10" };
    default:        return { shadow: "shadow-[0_0_20px_rgba(255,46,46,0.15)]", text: "text-primary", bg: "bg-primary/20", border: "border-primary/20", badge: "bg-primary/10" };
  }
}

export default async function CategoriasPage() {
  const categories = await getCategories();
  
  const special = [
    { icon: <TrendingUp size={28} />, name: "Más Descargados", desc: "Lo más popular de la comunidad", href: "/programas?sort=descargas" },
    { icon: <Sparkles size={28} />, name: "Nuevos Esta Semana", desc: "Últimas adiciones al catálogo", href: "/programas?sort=recientes" },
    { icon: <Gift size={28} />, name: "Software Gratuito", desc: "Herramientas sin costo", href: "/programas?filter=gratis" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center mb-16 relative py-20 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent opacity-50"></div>
        <div className="relative z-10 space-y-4">
          <h1 className="font-montserrat text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Explorar <span className="text-primary">Categorías</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Encuentra el software que necesitas por categoría. Recursos premium listos para potenciar tus proyectos.
          </p>
          <div className="flex justify-center pt-4">
            <div className="h-1 w-24 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {categories.map((cat: any) => {
          const c = getColorClasses(cat.color);
          return (
            <div key={cat.slug} className={`group relative flex flex-col h-[380px] rounded-2xl bg-[#1A1A2E]/60 backdrop-blur-md border border-white/5 p-8 transition-all hover:-translate-y-2 ${c.shadow}`}>
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-2xl ${c.bg} flex items-center justify-center ${c.text}`}>
                  <span className="text-4xl drop-shadow-md grayscale-0">{cat.icon}</span>
                </div>
              </div>
              <div className="grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-montserrat text-2xl font-bold text-white">{cat.name}</h3>
                  <span className={`${c.badge} ${c.text} text-[10px] font-bold px-2 py-1 rounded border ${c.border} uppercase`}>Software</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{cat.description}</p>
                <div className={`flex items-center gap-2 ${c.text} opacity-80 text-xs font-semibold`}>
                  <LayoutGrid size={16} />
                  {cat.count} programas
                </div>
              </div>
              <Link href={`/categorias/${cat.slug}`} className="w-full mt-6 bg-primary py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 opacity-90 hover:opacity-100 transition-all">
                Explorar <ArrowRight size={16} />
              </Link>
            </div>
          );
        })}
      </section>

      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-montserrat text-3xl font-bold text-slate-900 dark:text-white">Categorías Especiales</h2>
          <div className="grow h-px bg-white/10"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {special.map((s) => (
            <Link key={s.name} href={s.href} className="bg-[#1A1A2E]/60 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex items-center gap-5 group hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,46,46,0.1)]">
                {s.icon}
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-lg text-white">{s.name}</h4>
                <p className="text-slate-400 text-xs">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
