import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Star, ShieldCheck, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import { getProgramBySlug, getRelatedPrograms, formatDownloads, getCategoryBySlug } from "@/lib/data";
import { StarRating } from "@/components/StarRating";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p: any = await getProgramBySlug(slug);
  if (!p) return {};
  
  return { 
    title: p.name, 
    description: p.description,
    openGraph: {
      title: `${p.name} - Descarga Gratis | Zetta Tutoriales`,
      description: p.description,
      images: [p.imageUrl || '/default-banner.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} - Descarga Gratis | Zetta Tutoriales`,
      description: p.description,
      images: [p.imageUrl || '/default-banner.jpg'],
    }
  };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p: any = await getProgramBySlug(slug);
  if (!p) notFound();

  const cat = await getCategoryBySlug(p.category?.slug || "");
  const related = await getRelatedPrograms(p.slug, p.category?.slug || "");

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : null;
  };
  const videoId = getYouTubeId(p.youtubeUrl || "");

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 lg:py-20">
      {/* Breadcrumb */}
      <div className="text-sm mb-8 flex items-center gap-2 flex-wrap text-white/40 font-medium">
        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
        <ChevronRight size={14} />
        <Link href="/programas" className="hover:text-white transition-colors">Programas</Link>
        <ChevronRight size={14} />
        <span className="text-white/80">{p.name}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info */}
          <div>
            {p.imageUrl && (
              <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-8 shadow-2xl border border-white/10 relative">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-[#050505] to-transparent opacity-80" />
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
              {!p.imageUrl && (
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shrink-0 bg-[#0f0f0f] border border-white/10 shadow-2xl">
                  {p.icon}
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="badge">{p.category?.name}</span>
                  <span className="bg-white/5 border border-white/10 text-white/60 text-xs px-2.5 py-1 rounded-md font-semibold font-mono">
                    v{p.version}
                  </span>
                  {p.badge && (
                    <span className="badge-accent">{p.badge}</span>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">{p.name}</h1>
                <p className="text-lg text-white/60 leading-relaxed mb-6">{p.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/40">
                  <span className="flex items-center gap-1.5"><Star size={16} className="text-yellow-500" fill="currentColor" /> {p.rating} / 5</span>
                  <span className="flex items-center gap-1.5"><Download size={16} /> {formatDownloads(p.downloads)} descargas</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10 w-full mb-8" />

            <div className="prose prose-invert prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-lg max-w-none mb-10">
              <p>{p.longDescription}</p>
            </div>

            {videoId && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Star size={24} className="text-primary" />
                  Video Tutorial
                </h3>
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                    title="YouTube video player"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {p.tags.split(',').map((tag: string) => (
                <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10 w-full" />

          {/* Requirements */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck size={24} className="text-[#ff3333]" />
              Requisitos del sistema
            </h2>
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6">
              <ul className="space-y-4">
                {p.requirements.split(',').map((r: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-white/60 font-medium">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/programas" className="btn-secondary mt-8">
            <ArrowLeft size={16} /> Volver al catálogo
          </Link>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div>
          {/* Download card */}
          <div className="card p-8 sticky top-28 border-[#ff3333]/20 bg-linear-to-b from-[#0f0f0f] to-[#0a0a0a] shadow-[0_0_40px_rgba(255,51,51,0.05)]">
            <div className="text-center mb-8">
              <div className="text-5xl font-extrabold text-white mb-2 font-mono tracking-tighter">{p.size}</div>
              <div className="text-sm font-medium text-white/40 uppercase tracking-widest">Tamaño del archivo</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-center">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xl font-bold text-white mb-1">{formatDownloads(p.downloads)}</div>
                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Descargas</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xl font-bold text-white flex items-center justify-center gap-1.5 mb-1">
                  <Star size={18} className="text-yellow-500" fill="currentColor" />{p.rating}
                </div>
                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Rating</div>
              </div>
            </div>

            <a
              href={p.downloadUrl}
              className="btn-primary w-full h-14 flex items-center justify-center gap-3 text-base font-bold shadow-[0_0_30px_rgba(255,51,51,0.3)] mb-4"
            >
              <Download size={20} />
              Descargar Gratis
            </a>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
              <ShieldCheck size={16} />
              Archivo analizado por VirusTotal
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <h4 className="text-sm font-bold text-white mb-4">¿Te funcionó el programa?</h4>
              <StarRating programId={p.id} initialRating={p.rating} ratingCount={p.ratingCount} />
            </div>

            {cat && (
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <Link href={`/categorias/${cat.slug}`} className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
                  Ver más en {cat.name} <ChevronRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related programs */}
      {related.length > 0 && (
        <div className="mt-24 border-t border-white/10 pt-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              También podría <span className="gradient-text-accent">interesarte</span>
            </h2>
            <Link href={`/categorias/${p.category?.slug}`} className="btn-secondary hidden sm:flex">
              Ver todos en {p.category?.name}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((r: any) => (
              <Link key={r.slug} href={`/programas/${r.slug}`} className="card group p-5 hover:border-white/20">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {r.icon}
                  </div>
                  <h3 className="font-bold text-white group-hover:text-red-400 transition-colors mb-1">{r.name}</h3>
                  <p className="text-xs text-white/40 font-medium">{(r.downloads / 1000).toFixed(1)}K descargas</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
