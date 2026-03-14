"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Youtube, Search } from "lucide-react";
import Link from "next/link";
import { createYoutubeVideo } from "@/app/actions";

export default function NuevoYoutubeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    videoId: "",
    thumbnail: "",
    duration: "10:00",
    views: "1K",
    publishedAt: "Hace 1 día",
    url: "",
  });

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : null;
  };

  const handleFetchInfo = async () => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      alert("Por favor, introduce una URL de YouTube válida.");
      return;
    }

    setFetching(true);
    try {
      // Usamos el oEmbed endpoint de YouTube
      const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (!res.ok) throw new Error("No se pudo obtener la info");
      const data = await res.json();
      
      setFormData({
        ...formData,
        title: data.title,
        videoId: videoId,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`
      });
    } catch (error) {
      console.error(error);
      alert("Error al extraer información del video. Puedes rellenar los datos manualmente.");
      // Set basic data anyway
      setFormData({
        ...formData,
        videoId,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`
      });
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createYoutubeVideo(formData);
      router.push("/admin/youtube");
    } catch (error) {
      console.error(error);
      alert("Error al añadir video. Verifica que no exista ya.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-white">Añadir Video</h1>
          <p className="text-slate-400 mt-1">Sincroniza un nuevo tutorial desde YouTube</p>
        </div>
        <Link 
          href="/admin/youtube" 
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>

      <div className="bg-[#1A1A2E] rounded-xl border border-white/10 p-6 md:p-8 space-y-8">
        {/* URL Input Form */}
        <div>
          <h3 className="text-xl font-bold text-white font-montserrat mb-4 pb-2 border-b border-white/10">1. Extraer Información</h3>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={20} />
              <input 
                type="url" 
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-red-500/50"
              />
            </div>
            <button 
              type="button"
              onClick={handleFetchInfo}
              disabled={fetching || !url}
              className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {fetching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={18} />}
              Autocompletar
            </button>
          </div>
        </div>

        {/* Manual Data Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-bold text-white font-montserrat mb-4 pb-2 border-b border-white/10">2. Verificar Detalles</h3>
          
          {formData.thumbnail && (
            <div className="mb-6 rounded-xl overflow-hidden aspect-video relative max-w-sm border border-white/10 bg-[#0f0f0f]">
              <img src={formData.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Título del Video *</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            
            <div className="hidden">
              <input type="text" value={formData.videoId} readOnly />
              <input type="text" value={formData.url} readOnly />
              <input type="text" value={formData.thumbnail} readOnly />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duración (Opcional, ej: 10:24)</label>
              <input 
                type="text" 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Vistas (Opcional, ej: 1.5K)</label>
              <input 
                type="text" 
                value={formData.views}
                onChange={(e) => setFormData({...formData, views: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Publicado (Ej: Hace 2 días)</label>
              <input 
                type="text" 
                value={formData.publishedAt}
                onChange={(e) => setFormData({...formData, publishedAt: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
            <button 
              type="submit"
              disabled={loading || !formData.videoId}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
              Guardar Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
