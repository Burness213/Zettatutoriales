import { Mail, MessageSquare, Send } from "lucide-react";

export const metadata = { title: "Contacto — Zetta Tutoriales" };

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[70vh]">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
          <MessageSquare size={16} /> Habla con nosotros
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat tracking-tight text-white mb-6">
          Formulario de <span className="text-primary">Contacto</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          ¿Tienes alguna duda sobre un tutorial, sugerencias para el canal, o un reclamo de DMCA? Escríbenos y te responderemos lo más pronto posible.
        </p>
      </div>

      <div className="bg-[#1A1A2E] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Tu Nombre</label>
              <input type="text" className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Ej. Juan Pérez" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Correo Electrónico</label>
              <input type="email" className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-primary focus:border-primary outline-none transition-all" placeholder="ejemplo@correo.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Asunto</label>
            <select className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer">
              <option value="general">Duda General</option>
              <option value="tutorial">Sugerencia de Tutorial</option>
              <option value="soporte">Soporte Técnico</option>
              <option value="dmca">Reporte DMCA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Mensaje</label>
            <textarea rows={6} className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="Escribe todos los detalles de tu consulta aquí..."></textarea>
          </div>
          <button type="button" className="w-full py-4 rounded-xl bg-primary hover:bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-primary/20">
            <Send size={20} />
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
