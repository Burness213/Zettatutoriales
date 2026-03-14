import Link from "next/link";
import { Play, Youtube, ExternalLink, Calendar, Eye } from "lucide-react";
import { getYoutubeVideos } from "@/lib/data";

export const metadata = { title: "Videos YouTube" };
export const dynamic = "force-dynamic";

export default async function YouTubePage() {
  const videos = await getYoutubeVideos();

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 lg:py-20">
      {/* Breadcrumb */}
      <div className="text-sm mb-8 flex items-center gap-2 text-white/40 font-medium">
        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-white/80">YouTube</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-[0_0_20px_rgba(255,51,51,0.15)]">
            <Youtube size={14} /> Canal Oficial
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Tutoriales <span className="gradient-text-accent">Zetta</span>
          </h1>
          <p className="text-lg text-white/50 leading-relaxed">
            Aprende a instalar, configurar y dominar las herramientas y plantillas que ofrecemos. Nuevos videos cada semana.
          </p>
        </div>
        <a
          href="https://www.youtube.com/@ZettaTutos"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary shrink-0"
        >
          <Youtube size={18} />
          Suscribirse al Canal
        </a>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {videos.map((v: any) => (
          <a
            key={v.videoId}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card group block overflow-hidden hover:border-[#ff3333]/30"
          >
            <div className="h-48 relative flex items-center justify-center border-b border-white/5 bg-linear-to-b from-white/3 to-[#0f0f0f] p-6 group-hover:from-[#ff0000]/10 transition-colors">
              <img src={v.thumbnail} alt={v.title} className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-500 ease-out opacity-40 group-hover:opacity-60" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                <div className="w-14 h-14 rounded-full bg-[#ff0000] flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.6)]">
                  <Play size={24} fill="white" className="ml-1" />
                </div>
              </div>

              <span className="absolute bottom-3 right-3 text-xs font-bold text-white px-2 py-1 rounded bg-black/80 backdrop-blur-md">
                {v.duration}
              </span>
            </div>

            <div className="p-5 flex flex-col h-[130px]">
              <p className="text-[15px] font-bold text-white leading-snug line-clamp-2 group-hover:text-[#ff3333] transition-colors mb-auto">
                {v.title}
              </p>
              <div className="flex items-center gap-4 text-xs font-medium text-white/40 mt-4">
                <span className="flex items-center gap-1.5"><Eye size={14} /> {v.views}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {v.publishedAt}</span>
              </div>
            </div>
          </a>
        ))}
        {videos.length === 0 && (
          <div className="col-span-1 md:col-span-4 text-center py-20 text-slate-500 border border-white/5 rounded-2xl bg-[#1A1A2E]/50">
            Aún no hay videos publicados. Vuelve pronto para ver nuevos tutoriales.
          </div>
        )}
      </div>

      {/* Channel banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 lg:p-12 mb-16 border border-white/10 bg-[#0f0f0f]">
        <div className="absolute -top-32 -right-32 w-96 h-96 opacity-10 blur-[80px] rounded-full pointer-events-none bg-[#ff0000]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-20 h-20 rounded-2xl bg-[#ff0000] flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(255,0,0,0.3)] shrink-0">
              ⚡
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Zetta Tutoriales Oficial</h2>
              <p className="text-white/50 text-base max-w-xl leading-relaxed">
                Forma parte de nuestra comunidad en YouTube. Únete a otros creadores aprendiendo desarrollo web, ciberseguridad y creación de contenido.
              </p>
            </div>
          </div>

          <a
            href="https://www.youtube.com/@ZettaTutos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary whitespace-nowrap hidden md:inline-flex"
          >
            Explorar todo el canal <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
