"use client";
import { useState, useTransition } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { deleteProgram } from "@/app/actions";

export default function AdminProgramasClient({ initialPrograms }: { initialPrograms: any[] }) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = initialPrograms.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-montserrat text-3xl font-bold text-white">Programas</h1>
          <p className="text-sm mt-1 text-slate-400">
            Gestiona todos los programas disponibles
          </p>
        </div>
        <Link href="/admin/programas/nuevo" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
          <Plus size={16} /> Nuevo Programa
        </Link>
      </div>

      {/* Search */}
      <div className="bg-[#1A1A2E] p-6 rounded-xl border border-primary/5">
        <div className="relative max-w-sm">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar programas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg pl-11 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1A1A2E] rounded-xl overflow-hidden border border-primary/5">
        <div className="p-5 border-b border-primary/10 flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            {filtered.length} programas
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary/10 bg-[#0D0D1A]/50">
                {["Programa", "Categoría", "Versión", "Tamaño", "Descargas", "Rating", "Acciones"].map((h) => (
                  <th key={h} className="px-6 py-4 text-xs font-bold uppercase text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No hay programas disponibles.
                  </td>
                </tr>
              ) : null}
              {filtered.map((p) => (
                <tr
                  key={p.slug}
                  className="hover:bg-primary/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-primary/20 flex items-center justify-center text-xl drop-shadow">
                        {p.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-[11px] font-bold uppercase">
                      {p.category?.name || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{p.version}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{p.size}</td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-medium">{p.downloads.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">⭐ {p.rating}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Link href={`/programas/${p.slug}`}
                        className="p-1.5 text-slate-400 hover:text-green-400 transition-colors">
                        <Eye size={18} />
                      </Link>
                      <Link href={`/admin/programas/${p.id}`} className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => {
                          if (confirm(`¿Estás seguro de que deseas eliminar el programa "${p.name}"?`)) {
                            startTransition(() => deleteProgram(p.slug));
                          }
                        }}
                        disabled={isPending}
                        className="p-1.5 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
