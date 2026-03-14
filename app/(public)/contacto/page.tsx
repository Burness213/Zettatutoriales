import { Mail, MapPin, MessageSquare, Send } from "lucide-react";

export const metadata = {
  title: "Contacto | Zetta Tutoriales",
  description: "Ponte en contacto con el equipo de soporte de Zetta Tutoriales.",
};

export default function ContactoPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-[70vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white font-montserrat tracking-tight mb-4">
          Ponte en <span className="text-primary">Contacto</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          ¿Tienes alguna duda, sugerencia o quieres reportar un enlace caído? 
          Estamos aquí para ayudarte. Envíanos un mensaje.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white font-montserrat mb-6">Información de Contacto</h2>
          
          <div className="flex items-start gap-4 p-6 bg-[#1A1A2E] border border-white/5 rounded-2xl shadow-xl hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Correo Electrónico</h3>
              <p className="text-gray-400 text-sm mb-2">Para consultas generales, soporte o reportes.</p>
              <a href="mailto:soporte@zettatutoriales.com" className="text-primary font-medium hover:underline">
                soporte@zettatutoriales.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-[#1A1A2E] border border-white/5 rounded-2xl shadow-xl hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <MessageSquare className="text-blue-500" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Redes Sociales</h3>
              <p className="text-gray-400 text-sm mb-2">Síguenos o envíanos un DM en nuestras redes.</p>
              <a href="https://www.youtube.com/@ZettaTutos" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">
                @ZettaTutos en YouTube
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-[#1A1A2E] border border-white/5 rounded-2xl shadow-xl hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <MapPin className="text-emerald-500" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Ubicación Global</h3>
              <p className="text-gray-400 text-sm">Operamos 100% de manera digital, brindando herramientas de software a todo el mundo hispanohablante.</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#1A1A2E] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl -mr-32 -mt-32 rounded-full pointer-events-none" />
          
          <h2 className="text-2xl font-bold text-white font-montserrat mb-8 relative z-10">Envíanos un mensaje</h2>
          
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  placeholder="Tu nombre"
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  placeholder="tu@correo.com"
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Asunto</label>
              <select className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                <option>Soporte Técnico / Problema de Descarga</option>
                <option>Sugerir un nuevo programa</option>
                <option>Reportar enlace caído (DMCA / Error)</option>
                <option>Consultas de Negocios</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Mensaje</label>
              <textarea 
                placeholder="Describe tu consulta con el mayor detalle posible..."
                rows={5}
                className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="button" 
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,51,51,0.3)]"
              onClick={(e) => {
                e.preventDefault();
                alert('Mensaje de prueba enviado. Esta función requiere conexión a backend (v2).');
              }}
            >
              <Send size={18} />
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
