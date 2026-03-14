"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Wand2, Globe, UploadCloud } from "lucide-react";
import Link from "next/link";
import { createProgram } from "@/app/actions";
import { CldUploadWidget } from "next-cloudinary";
import { RichTextEditor } from "@/components/RichTextEditor";

export default function NuevoProgramaForm({ categories }: { categories: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "📦",
    version: "1.0",
    categoryId: categories[0]?.id || "",
    size: "100 MB",
    badge: "",
    badgeColor: "#ff2e2e",
    description: "",
    longDescription: "",
    requirements: "Windows 10/11, 4GB RAM",
    tags: "utilidad, software",
    releaseDate: new Date().toISOString().split('T')[0],
    downloadUrl: "https://mega.nz/...",
    imageUrl: "",
    youtubeUrl: "",
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };

  const handleScrape = async () => {
    if (!scrapeUrl || !scrapeUrl.startsWith("http")) return alert("Ingresa una URL válida (http/https)");
    setScraping(true);
    try {
      const res = await fetch("/api/admin/scrape", { 
        method: "POST", 
        body: JSON.stringify({ url: scrapeUrl }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setFormData({
        ...formData,
        name: data.title || formData.name,
        slug: data.title ? generateSlug(data.title) : formData.slug,
        description: data.description || formData.description,
        downloadUrl: scrapeUrl
      });
      alert("✅ ¡Información extraída con éxito!");
    } catch (e: any) {
      alert("❌ Falló la extracción: " + e.message);
    } finally {
      setScraping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProgram(formData);
      router.push("/admin/programas");
    } catch (error) {
      console.error(error);
      alert("Error al crear programa. Revisa los campos y prueba de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-white">Nuevo Programa</h1>
          <p className="text-slate-400 mt-1">Añade un nuevo programa al catálogo</p>
        </div>
        <Link 
          href="/admin/programas" 
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1A1A2E] rounded-xl border border-white/10 p-6 md:p-8 space-y-8">
        
        {/* Magic Scraper */}
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Wand2 size={24} />
            <h3 className="text-xl font-bold font-montserrat">Autocompletado Mágico</h3>
          </div>
          <p className="text-sm text-slate-400 mb-4">Pega el link de la página oficial del programa. Extraeremos el título, la descripción y el enlace automáticamente.</p>
          <div className="flex gap-3">
             <div className="flex-1 relative">
               <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
               <input 
                 type="url"
                 value={scrapeUrl}
                 onChange={(e) => setScrapeUrl(e.target.value)}
                 className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary/50"
                 placeholder="https://ejemplo.com/descarga..."
               />
             </div>
             <button
               type="button"
               onClick={handleScrape}
               disabled={scraping || !scrapeUrl}
               className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 transition-colors shrink-0"
             >
               {scraping ? "Extrayendo..." : "Extraer Datos"}
             </button>
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <h3 className="text-xl font-bold text-white font-montserrat mb-4 pb-2 border-b border-white/10">Información Básica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nombre del Programa *</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={handleNameChange}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Slug (URL) *</label>
              <input 
                required
                type="text" 
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Categoría *</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Icono (1 caracter/emoji) *</label>
              <input 
                required
                type="text" 
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Logo o Banner del Programa (Opcional)</label>
            <div className="bg-[#0f0f0f] border border-white/10 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center">
              {formData.imageUrl ? (
                <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-white/10 group">
                  <img src={formData.imageUrl} alt="Banner subido" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, imageUrl: ""})}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      Remover Imagen
                    </button>
                  </div>
                </div>
              ) : (
                <CldUploadWidget 
                  uploadPreset="zetta_preset"
                  onSuccess={(result: any) => {
                    setFormData({...formData, imageUrl: result.info.secure_url});
                  }}
                >
                  {({ open }) => (
                    <button 
                      type="button" 
                      onClick={() => open()}
                      className="flex flex-col items-center gap-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                        <UploadCloud size={24} />
                      </div>
                      <span className="font-medium text-sm">Haz clic aquí para subir una imagen</span>
                      <span className="text-xs text-slate-500">JPG, PNG, WEBP (Se optimizará sola)</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <h3 className="text-xl font-bold text-white font-montserrat mb-4 pb-2 border-b border-white/10">Detalles Técnicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Versión *</label>
              <input 
                required
                type="text" 
                value={formData.version}
                onChange={(e) => setFormData({...formData, version: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tamaño *</label>
              <input 
                required
                type="text" 
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Fecha de Lanzamiento *</label>
              <input 
                required
                type="date" 
                value={formData.releaseDate}
                onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Badges and descriptions */}
        <div>
          <h3 className="text-xl font-bold text-white font-montserrat mb-4 pb-2 border-b border-white/10">Contenido y Etiqueta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Etiqueta (Opcional, ej: NUEVO, PRO)</label>
              <input 
                type="text" 
                value={formData.badge}
                onChange={(e) => setFormData({...formData, badge: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Color de la etiqueta (Hex)</label>
              <div className="flex gap-3">
                <input 
                  type="color"
                  value={formData.badgeColor}
                  onChange={(e) => setFormData({...formData, badgeColor: e.target.value})}
                  className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                />
                <input 
                  type="text" 
                  value={formData.badgeColor}
                  onChange={(e) => setFormData({...formData, badgeColor: e.target.value})}
                  className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Descripción Corta *</label>
            <textarea 
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 h-24 resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Descripción Larga (Soporta Colores y Formato) *</label>
            <RichTextEditor 
              content={formData.longDescription} 
              onChange={(html) => setFormData({...formData, longDescription: html})} 
            />
          </div>
        </div>

        {/* Links and Metadata */}
        <div>
          <h3 className="text-xl font-bold text-white font-montserrat mb-4 pb-2 border-b border-white/10">Links y Metadata</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">URL de Descarga *</label>
              <input 
                required
                type="url" 
                value={formData.downloadUrl}
                onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Video de YouTube (Opcional)</label>
              <input 
                type="url" 
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Requisitos del Sistema (Separados por comas) *</label>
              <input 
                required
                type="text" 
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tags (Separados por comas) *</label>
              <input 
                required
                type="text" 
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
          <Link 
            href="/admin/programas"
            className="px-6 py-3 font-medium text-slate-300 hover:text-white transition-colors"
          >
            Cancelar
          </Link>
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
            Crear Programa
          </button>
        </div>
      </form>
    </div>
  );
}
