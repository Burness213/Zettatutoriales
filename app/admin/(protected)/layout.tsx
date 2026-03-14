import AdminSidebar from "@/components/layout/AdminSidebar";
import { Bell, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-[#0A0A0F] font-poppins text-slate-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-primary/10 sticky top-0 bg-[#0A0A0F]/80 backdrop-blur-md z-10 shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Admin</span>
              <ChevronRight size={10} />
              <span className="text-primary">Dashboard</span>
            </div>
            <h2 className="font-montserrat font-bold text-xl text-slate-100">Panel de Control</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="p-2 hover:bg-primary/10 rounded-full cursor-pointer flex items-center justify-center text-slate-400 transition-colors">
                <Bell size={20} />
              </span>
              <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-[#0A0A0F]"></span>
            </div>
            <Link href="/admin/programas/nuevo" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
              <Plus size={16} />
              Nuevo Programa
            </Link>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
