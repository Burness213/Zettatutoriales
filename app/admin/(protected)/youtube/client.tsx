"use client";
import { useTransition } from "react";
import Link from "next/link";
import { Plus, Trash2, ExternalLink, Play } from "lucide-react";
import { deleteYoutubeVideo } from "@/app/actions";

export default function AdminYoutubeClient({ initialVideos }: { initialVideos: any[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-montserrat text-3xl font-bold text-white">Videos de YouTube</h1>
          <p className="text-sm mt-1 text-slate-400">
            Gestiona los videos que aparecen en la sección de tutoriales
          </p>
        </div>
        <Link href="/admin/youtube/nuevo" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
          <Plus size={16} /> Añadir Video
        </Link>
      </div>

      {initialVideos.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-[#1A1A2E] rounded-xl border border-primary/5">
          No hay videos añadidos.
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {initialVideos.map((video) => (
          <div key={video.videoId} className="bg-[#1A1A2E] rounded-xl border border-primary/5 hover:border-primary/20 transition-all overflow-hidden group flex flex-col">
            <div className="h-40 relative flex items-center justify-center border-b border-white/5 p-4 bg-[#0A0A0F]">
              <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-[#ff0000] flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.6)]">
                  <Play size={20} fill="white" className="ml-1" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 text-xs font-bold text-white px-2 py-1 rounded bg-black/80 backdrop-blur-md">
                {video.duration}
              </span>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-sm text-white mb-2 line-clamp-2">{video.title}</h3>
              <div className="text-xs text-slate-400 mb-4 flex items-center gap-2">
                <span>{video.views} vistas</span>
                <span>•</span>
                <span>{video.publishedAt}</span>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium">
                  <ExternalLink size={14} /> Ver en YT
                </a>
                <button 
                  onClick={() => {
                    if (confirm(`¿Estás seguro de que deseas eliminar este video?`)) {
                      startTransition(() => deleteYoutubeVideo(video.id));
                    }
                  }}
                  disabled={isPending}
                  className="p-1.5 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                  title="Eliminar video"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
