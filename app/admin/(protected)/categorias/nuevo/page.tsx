"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus, Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { createCategory } from "@/app/actions";

export default function NuevaCategoriaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "📁",
    color: "#ff2e2e",
    description: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCategory(formData);
      router.push("/admin/categorias");
    } catch (error) {
      console.error(error);
      alert("Error al crear categoría. Posible slug duplicado.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-white">Nueva Categoría</h1>
          <p className="text-slate-400 mt-1">Crea una nueva clasificación para los programas</p>
        </div>
        <Link 
          href="/admin/categorias" 
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#1A1A2E] rounded-xl border border-white/10 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nombre de la Categoría</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={handleNameChange}
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              placeholder="Ej: Edición de Video"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Slug (URL)</label>
            <input 
              required
              type="text" 
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              placeholder="ej: edicion-de-video"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Emoji / Icono (1 caracter preferible)</label>
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#0f0f0f] border border-white/10 flex items-center justify-center text-2xl shrink-0">
                {formData.icon || <ImageIcon size={20} className="text-slate-500" />}
              </div>
              <input 
                required
                type="text" 
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="Ej: 🎬"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Color Temático (Hex)</label>
            <div className="flex gap-3">
              <input 
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
              />
              <input 
                required
                type="text" 
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="Ej: #ff2e2e"
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-2">Descripción (Breve)</label>
          <textarea 
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 h-24 resize-none"
            placeholder="Describe qué tipo de programas contiene esta categoría..."
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
          <Link 
            href="/admin/categorias"
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
            Guardar Categoría
          </button>
        </div>
      </form>
    </div>
  );
}
