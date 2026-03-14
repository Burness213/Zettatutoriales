import { FileText } from "lucide-react";

export const metadata = {
  title: "Términos de Uso | Zetta Tutoriales",
  description: "Términos y condiciones de uso del sitio web Zetta Tutoriales.",
};

export default function TerminosPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh]">
      <div className="mb-12">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <FileText size={32} className="text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white font-montserrat tracking-tight mb-4">
          Términos de <span className="text-primary">Uso</span>
        </h1>
        <p className="text-xl text-gray-400">Última actualización: Marzo 2026</p>
      </div>
      
      <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-gray-300 prose-headings:font-montserrat prose-headings:text-white max-w-none">
        <h2>1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar Zetta Tutoriales, usted acepta cumplir y estar sujeto a los siguientes términos y 
          condiciones de uso. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a 
          este sitio. Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y 
          marcas aplicables.
        </p>

        <h2>2. Licencia de Uso</h2>
        <p>
          Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en 
          el sitio web de Zetta Tutoriales solo para visión transitoria personal y no comercial. Esta es la 
          concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede:
        </p>
        <ul>
          <li>Modificar o copiar los materiales.</li>
          <li>Usar los materiales para cualquier propósito comercial o para exhibición pública (comercial o no comercial).</li>
          <li>Intentar descompilar o aplicar ingeniería inversa a cualquier software contenido en el sitio.</li>
          <li>Eliminar cualquier derecho de autor u otras anotaciones de propiedad de los materiales.</li>
        </ul>

        <h2>3. Descargo de Responsabilidad</h2>
        <p>
          Los materiales en el sitio web de Zetta Tutoriales se proporcionan "tal cual". No ofrecemos ninguna garantía, 
          expresa o implícita, y por la presente renunciamos y negamos todas las demás garantías, incluidas, entre otras, 
          las garantías implícitas o las condiciones de comerciabilidad, idoneidad para un propósito particular o la 
          no infracción de propiedad intelectual u otra violación de derechos.
        </p>

        <h2>4. Limitaciones</h2>
        <p>
          En ningún caso Zetta Tutoriales o sus proveedores serán responsables de ningún daño (incluidos, entre otros, 
          daños por pérdida de datos o ganancias, o debido a la interrupción del negocio) que surjan del uso o la 
          incapacidad de usar los materiales en el sitio de Internet.
        </p>

        <h2>5. Responsabilidad del Usuario</h2>
        <p>
          El uso correcto y legal de las herramientas proporcionadas corre enteramente por la cuenta y riesgo del usuario.
          Nos dedicamos únicamente a proporcionar la información y vías de comunicación técnica de forma educativa.
        </p>
      </div>
    </div>
  );
}
