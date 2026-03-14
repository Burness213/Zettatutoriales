import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Download, Star, ShieldCheck } from "lucide-react";
import { getCategoryBySlug, getProgramsByCategory, formatDownloads } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) return {};
  return { title: cat.name };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();

  const progs = await getProgramsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 lg:py-20">
      {/* Breadcrumb */}
      <div className="text-sm mb-8 flex items-center gap-2 text-white/40 font-medium">
        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/categorias" className="hover:text-white transition-colors">Categorías</Link>
        <span>/</span>
        <span className="text-white/80">{cat.name}</span>
      </div>

      {/* Category header */}
      <div className="relative overflow-hidden rounded-3xl p-8 lg:p-12 mb-16 border border-white/10 bg-[#0f0f0f]">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 opacity-10 blur-[80px] rounded-full pointer-events-none"
          style={{ background: cat.color }}
        />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shrink-0 bg-white/5 border border-white/10 shadow-2xl shadow-black/50">
            <span className="grayscale">{cat.icon}</span>
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">{cat.name}</h1>
            <p className="text-lg text-white/50 max-w-2xl mb-4 leading-relaxed">{cat.description}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white/70">
              {progs.length} programas verificados
            </div>
          </div>
        </div>
      </div>

      {/* Programs grid */}
      {progs.length === 0 ? (
        <div className="text-center py-32 border border-white/5 rounded-2xl bg-[#0f0f0f]">
          <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 text-4xl grayscale opacity-50">
            {cat.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No se encontraron programas</h3>
          <p className="text-white/50 mb-6">Estamos trabajando para añadir herramientas a esta categoría.</p>
          <Link href="/programas" className="btn-secondary">Explorar catálogo general</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {progs.map((p: any) => (
            <Link key={p.slug} href={`/programas/${p.slug}`} className="card group flex flex-col h-full hover:border-[#ff3333]/30">
              <div className="h-40 relative flex items-center justify-center border-b border-white/5 bg-linear-to-b from-white/3 to-transparent rounded-t-2xl overflow-hidden p-6 group-hover:from-[#ff3333]/10 transition-colors">
                <span className="text-6xl drop-shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-500 ease-out">{p.icon}</span>
                {p.badge && (
                  <span className="absolute top-4 right-4 badge-accent shadow-lg bg-black/50 backdrop-blur-md">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className="badge">{p.category?.name}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md">
                    <Star size={12} fill="currentColor" /> {p.rating}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-[#ff3333] transition-colors">{p.name}</h3>
                <p className="text-sm text-white/50 line-clamp-2 mb-6 flex-1">{p.description}</p>

                <div className="flex items-center justify-between text-xs text-white/40 mb-4 font-medium">
                  <div className="flex items-center gap-1.5"><Download size={12} /> {formatDownloads(p.downloads)} desc.</div>
                  <div className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald-500" /> Verificado</div>
                </div>

                <div className="w-full bg-white/5 group-hover:bg-[#ff3333] text-white text-sm font-semibold rounded-lg h-10 flex items-center justify-center gap-2 transition-all duration-300">
                  <Download size={16} /> Ver Detalles
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {progs.length > 0 && (
        <div className="mt-16 text-center border-t border-white/10 pt-16">
          <Link href="/programas" className="btn-secondary">
            Explorar todas las categorías <ChevronRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
