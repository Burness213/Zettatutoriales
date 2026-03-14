"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LayoutDashboard, Package, FolderOpen, Youtube } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Programas", href: "/admin/programas" },
  { icon: FolderOpen, label: "Categorías", href: "/admin/categorias" },
  { icon: Youtube, label: "Videos YouTube", href: "/admin/youtube" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] bg-[#0D0D1A] flex flex-col border-r border-primary/10 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary rounded-lg p-2 flex items-center justify-center text-white">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h1 className="font-montserrat font-bold text-lg leading-none tracking-tight text-white">Zetta Admin</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">Software Hub</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                active 
                  ? "bg-primary text-white font-medium shadow-lg shadow-primary/20" 
                  : "text-slate-400 hover:bg-primary/10 hover:text-primary font-medium"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-primary/10">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
          <UserButton showName />
        </div>
      </div>
    </aside>
  );
}
