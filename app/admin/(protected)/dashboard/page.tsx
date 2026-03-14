import Link from "next/link";
import { Plus, TrendingUp, Download, FolderOpen, Youtube, Edit, Trash2, Package, LayoutGrid, PlaySquare, Minus } from "lucide-react";
import { getPrograms, getCategories, getYoutubeVideos } from "@/lib/data";

export const metadata = { title: "Dashboard | Admin" };

export default async function AdminDashboard() {
  const programs = await getPrograms();
  const categories = await getCategories();
  const videos = await getYoutubeVideos();
  const recent = programs.slice(0, 4);
  const topDownloads = [...programs].sort((a: any, b: any) => b.downloads - a.downloads).slice(0, 4);
  const totalDownloads = programs.reduce((acc: number, p: any) => acc + p.downloads, 0);

  const stats = [
    { icon: <Package size={20} />, label: "Total Programas", value: programs.length.toString(), trend: "Recientes", trendUp: true },
    { icon: <Download size={20} />, label: "Total Descargas", value: totalDownloads.toLocaleString(), trend: "Totales", trendUp: true },
    { icon: <LayoutGrid size={20} />, label: "Categorías Activas", value: categories.length.toString(), trend: "Nuevas", trendUp: null },
    { icon: <PlaySquare size={20} />, label: "Videos YouTube", value: videos.length.toString(), trend: "Canal", trendUp: true },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#1A1A2E] p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                {s.icon}
              </div>
              <span className={`text-xs font-bold flex items-center px-2 py-1 rounded-full ${
                s.trendUp === true ? "text-emerald-500 bg-emerald-500/10" : "text-slate-400 bg-slate-400/10"
              }`}>
                {s.trend}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium">{s.label}</p>
            <p className="font-montserrat text-3xl font-bold mt-1 text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Middle Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-montserrat font-bold text-lg text-white">Últimas Subidas</h3>
            <Link href="/admin/programas" className="text-primary text-sm font-semibold hover:underline">
              Ver Todo
            </Link>
          </div>
          <div className="bg-[#1A1A2E] rounded-xl overflow-hidden border border-primary/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/10 bg-[#0D0D1A]/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Programa</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Categoría</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Tamaño</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Descargas</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {recent.map((p: any) => (
                  <tr key={p.slug} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-primary/20 flex items-center justify-center text-xl drop-shadow">
                          {p.icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{p.name}</div>
                          <div className="text-xs text-slate-500">{p.version}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-[11px] font-bold uppercase">
                        {p.category?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{p.size}</td>
                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">{p.downloads.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1 text-slate-400 hover:text-blue-400 transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-red-400 transition-colors">
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

        {/* Activity Section / Top Downloads */}
        <div className="space-y-4">
          <h3 className="font-montserrat font-bold text-lg text-white">Top Descargas</h3>
          <div className="bg-[#1A1A2E] p-6 rounded-xl border border-primary/5 h-full">
            <div className="space-y-6">
              {topDownloads.map((p, idx) => (
                <Link href={`/programas/${p.slug}`} key={p.slug} className="flex gap-4 relative pb-6 border-l-2 border-primary/10 ml-2 pl-6 group">
                  <div className={`absolute -left-2.5 top-0 size-5 rounded-full border-4 border-[#1A1A2E] ${idx === 0 ? 'bg-yellow-500' : 'bg-primary'}`}></div>
                  <div className="group-hover:translate-x-1 transition-transform">
                    <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{p.name}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                       {p.version} <span className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[10px]">{p.category?.name}</span>
                    </p>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase mt-2">{p.downloads.toLocaleString()} Descargas Totales</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
