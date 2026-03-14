"use client";
import { useTransition } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { deleteCategory } from "@/app/actions";

export default function AdminCategoriasClient({ initialCategories }: { initialCategories: any[] }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-montserrat text-3xl font-bold text-white">Categorías</h1>
          <p className="text-sm mt-1 text-slate-400">
            Gestiona las categorías de software
          </p>
        </div>
        <Link href="/admin/categorias/nuevo" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
          <Plus size={16} /> Nueva Categoría
        </Link>
      </div>

      {initialCategories.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-[#1A1A2E] rounded-xl border border-primary/5">
          No hay categorías creadas.
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialCategories.map((cat) => (
          <div key={cat.slug} className="bg-[#1A1A2E] p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl drop-shadow"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
              >
                {cat.icon}
              </div>
              <div className="flex items-center gap-1">
                <Link href={`/categorias/${cat.slug}`}
                  className="p-1.5 text-slate-400 hover:text-green-400 transition-colors">
                  <ExternalLink size={18} />
                </Link>
                <Link href={`/admin/categorias/${cat.id}`} className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                  <Edit size={18} />
                </Link>
                <button 
                  onClick={() => {
                    if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${cat.name}"? Los programas asociados también serán eliminados.`)) {
                      startTransition(() => deleteCategory(cat.slug));
                    }
                  }}
                  disabled={isPending}
                  className="p-1.5 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="font-montserrat font-bold text-lg text-white mb-1">{cat.name}</h3>
            <p className="text-sm text-slate-400 mb-4">{cat.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full uppercase"
                style={{ background: `${cat.color}15`, color: cat.color }}>
                {cat.count} programas
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">/{cat.slug}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
