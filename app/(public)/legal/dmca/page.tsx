import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "DMCA Policy | Zetta Tutoriales",
  description: "Política DMCA para la notificación de reclamos por infracción de derechos de autor.",
};

export default function DMCAPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh]">
      <div className="mb-12">
        <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">
          <AlertTriangle size={32} className="text-yellow-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white font-montserrat tracking-tight mb-4">
          Política <span className="text-yellow-500">DMCA</span>
        </h1>
        <p className="text-xl text-gray-400">Digital Millennium Copyright Act</p>
      </div>
      
      <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-gray-300 prose-headings:font-montserrat prose-headings:text-white max-w-none">
        
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-xl mb-8 text-yellow-500/80">
          Zetta Tutoriales respeta la propiedad intelectual de otros y espera que sus usuarios hagan lo mismo. 
          Es nuestra política responder a notificaciones claras de supuesta infracción de derechos de autor.
        </div>

        <h2>Aviso DMCA</h2>
        <p>
          Si usted es un propietario de derechos de autor o un agente del mismo y cree que el contenido de este sitio 
          infringe sus derechos de autor, puede presentar una notificación de conformidad con la Digital Millennium 
          Copyright Act ("DMCA") proporcionando la siguiente información por escrito:
        </p>

        <ul>
          <li>Una firma física o electrónica de una persona autorizada para actuar en nombre del propietario de un derecho exclusivo que supuestamente se ha infringido;</li>
          <li>Identificación de la obra protegida por derechos de autor que se alega ha sido infringida;</li>
          <li>Identificación del material que se reclama como infractor o como sujeto a la actividad infractora y que debe ser removido, e información razonablemente suficiente para permitir al proveedor del servicio localizar el material (por favor, proporcione las URLs exactas);</li>
          <li>Información razonablemente suficiente para permitirnos comunicarnos con usted, como una dirección, número de teléfono y, si está disponible, un correo electrónico;</li>
          <li>Una declaración de que usted cree de buena fe que el uso del material de la manera reclamada no está autorizado por el propietario de los derechos de autor, su agente o la ley; y</li>
          <li>Una declaración de que la información en la notificación es exacta, y bajo pena de perjurio, que usted está autorizado a actuar en nombre del propietario de un derecho exclusivo que supuestamente ha sido infringido.</li>
        </ul>

        <h2>Procedimiento de Takedown</h2>
        <p>
          Tenga en cuenta que bajo la Sección 512(f) de la DMCA, cualquier persona que haga representaciones falsas 
          materiales de manera consciente que cierto material o actividad infringe los derechos de autor puede estar sujeta a responsabilidad.
        </p>

        <p>
          Para presentar una queja DMCA formal y solicitar la remoción de su contenido protegido, por favor contáctenos 
          a través de la página de <strong>Contacto</strong> de nuestro sitio. Nos comprometemos a resolver la reclamación de forma oportuna.
        </p>
      </div>
    </div>
  );
}
