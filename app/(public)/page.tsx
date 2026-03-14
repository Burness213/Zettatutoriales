import Link from "next/link";
import { Download, Play, PlayCircle, ShieldCheck, Grid, ArrowRight, ExternalLink } from "lucide-react";
import { getFeaturedPrograms, getCategories, getPrograms, formatDownloads, getYoutubeVideos } from "@/lib/data";

export const metadata = { title: "Inicio — La Plataforma #1 para Descargar Programas PC" };

export default async function HomePage() {
  const featured = await getFeaturedPrograms();
  const categories = await getCategories();
  const allPrograms = await getPrograms();
  const totalDownloads = allPrograms.reduce((acc: number, p: any) => acc + p.downloads, 0);
  const videos = await getYoutubeVideos();

  return (
    <>

      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <ShieldCheck size={16} />
            Software Seguro & Verificado
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight max-w-4xl mx-auto">
            La Plataforma #1 para Descargar <span className="text-primary">Programas PC</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Accede a la colección más completa de software profesional, herramientas de sistema y utilidades. Instaladores limpios, rápidos y con tutoriales paso a paso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/programas" className="w-full sm:w-auto bg-primary hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-2xl shadow-primary/30">
              <Grid size={24} />
              Ver Programas
            </Link>
            <a href="https://www.youtube.com/@ZettaTutos" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto border border-white/20 hover:border-primary hover:bg-primary/5 px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
              <PlayCircle size={24} />
              Ver Canal YouTube
            </a>
          </div>
        </div>
      </header>

      <section className="py-12 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 font-montserrat">{allPrograms.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Programas</div>
            </div>
            <div className="text-center md:border-l border-white/5">
              <div className="text-3xl font-bold text-white mb-1 font-montserrat">{totalDownloads > 0 ? formatDownloads(totalDownloads) : "0"}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Descargas</div>
            </div>
            <div className="text-center md:border-l border-white/5">
              <div className="text-3xl font-bold text-white mb-1 font-montserrat">Nuevo</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Canal YouTube</div>
            </div>
            <div className="text-center md:border-l border-white/5">
              <div className="text-3xl font-bold text-primary mb-1 font-montserrat">100%</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Verificado</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4 tracking-tight font-montserrat">Programas <span className="text-primary">Destacados</span></h2>
            <p className="text-gray-400">Las herramientas más descargadas por nuestra comunidad esta semana.</p>
          </div>
          <Link className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all" href="/programas">
            Ver todos <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p: any) => (
            <div key={p.slug} className="group bg-[#1A1A2E] border border-white/5 rounded-2xl p-6 transition-all hover:bg-[#252545] hover:border-primary/30 flex flex-col">
              <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl drop-shadow-lg">{p.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-montserrat text-white group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-1 line-clamp-3">{p.description}</p>
              <Link href={`/programas/${p.slug}`} className="w-full bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white py-3 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 mt-auto">
                <Download size={18} />
                Descargar
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="relative rounded-3xl overflow-hidden p-12 lg:p-16 border border-white/5">
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-[#1A1A2E] to-[#1A1A2E] z-0"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 font-montserrat text-white">¿Buscas algo específico?</h2>
              <p className="text-gray-300 text-lg mb-8">Navega por nuestras categorías organizadas para encontrar exactamente el software que necesitas para tu proyecto.</p>
              <div className="flex flex-wrap gap-3">
                {categories.slice(0, 4).map((c: any) => (
                  <span key={c.slug} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">{c.name}</span>
                ))}
              </div>
            </div>
            <div className="flex lg:justify-end">
              <Link href="/categorias" className="bg-white text-dark font-black px-12 py-5 rounded-2xl text-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105 inline-block text-center">
                Explorar Categorías
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4 text-primary font-bold uppercase tracking-[0.2em] text-sm">
              <PlayCircle size={20} />
              Aprende con nosotros
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-montserrat text-white">Tutoriales en YouTube</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.slice(0, 3).map((v: any) => (
              <a key={v.videoId} href={v.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 border border-white/10">
                  <img alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={v.thumbnail} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary p-4 rounded-full">
                      <Play className="text-white fill-white" size={24} />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold font-montserrat group-hover:text-primary transition-colors text-white line-clamp-2">{v.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{v.views} vistas • {v.publishedAt}</p>
              </a>
            ))}
            
            {videos.length === 0 && (
              <div className="col-span-1 md:col-span-3 text-center py-12 text-slate-500 border border-white/5 rounded-2xl bg-[#1A1A2E]/50">
                Aún no hay videos publicados. Vuelve pronto para ver nuevos tutoriales.
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <a href="https://www.youtube.com/@ZettaTutos" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold inline-flex items-center gap-2 pb-1 border-b border-white/10 hover:border-primary transition-all">
              Visitar canal oficial
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
