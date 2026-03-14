import { Shield, FileText, AlertTriangle } from "lucide-react";
import { notFound } from "next/navigation";

const pages = {
  privacidad: {
    title: "Política de Privacidad",
    icon: <Shield size={32} className="text-emerald-500" />,
    content: "En Zetta Tutoriales, nos tomamos muy en serio tu privacidad. No recolectamos información personal innecesaria ni vendemos tus datos a terceros. Toda la información de uso del sitio se emplea únicamente para mejorar tu experiencia y ofrecerte el mejor contenido."
  },
  terminos: {
    title: "Términos de Uso",
    icon: <FileText size={32} className="text-blue-500" />,
    content: "Al utilizar Zetta Tutoriales, aceptas utilizar el sitio únicamente para propósitos educativos y de aprendizaje. Todo el software proporcionado se revisa para garantizar su seguridad, pero su uso es bajo tu propia responsabilidad. El contenido de los tutoriales es propiedad intelectual de Zetta Tutoriales."
  },
  dmca: {
    title: "DMCA (Derechos de Autor)",
    icon: <AlertTriangle size={32} className="text-yellow-500" />,
    content: "Respetamos los derechos de propiedad intelectual de terceros. Zetta Tutoriales opera como un índice y portal educativo. Si crees que un enlace o contenido infringe tus derechos de autor, puedes contactarnos a través de nuestra página de Contacto para solicitar la eliminación de los hipervínculos."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) return {};
  return { title: page.title };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  
  if (!page) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[70vh]">
      <div className="bg-[#1A1A2E] border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
          {page.icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 font-montserrat tracking-tight text-white">
          {page.title}
        </h1>
        <div className="prose prose-invert prose-lg prose-p:leading-relaxed prose-p:text-gray-400 max-w-none">
          <p>{page.content}</p>
        </div>
      </div>
    </div>
  );
}
