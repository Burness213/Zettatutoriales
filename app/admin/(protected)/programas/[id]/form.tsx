"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, UploadCloud } from "lucide-react";
import Link from "next/link";
import { updateProgram } from "@/app/actions";
import { CldUploadWidget } from "next-cloudinary";
import { RichTextEditor } from "@/components/RichTextEditor";

export default function EditarProgramaForm({ program, categories }: { program: any, categories: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: program.name,
    slug: program.slug,
    icon: program.icon,
    version: program.version,
    categoryId: program.categoryId,
    size: program.size,
    badge: program.badge || "",
    badgeColor: program.badgeColor || "#ff2e2e",
    description: program.description,
    longDescription: program.longDescription,
    requirements: program.requirements,
    tags: program.tags,
    releaseDate: program.releaseDate,
    downloadUrl: program.downloadUrl,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProgram(program.id, formData);
      router.push("/admin/programas");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar programa.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-white">Editar Programa</h1>
          <p className="text-slate-400 mt-1">Modifica los detalles del programa</p>
        </div>
        <Link 
          href="/admin/programas" 
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1A1A2E] rounded-xl border border-white/10 p-6 md:p-8 space-y-8">
        
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
                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
