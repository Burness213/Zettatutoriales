import { Shield } from "lucide-react";

export const metadata = {
  title: "Política de Privacidad | Zetta Tutoriales",
  description: "Conoce cómo protegemos tus datos y tu privacidad en Zetta Tutoriales.",
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh]">
      <div className="mb-12">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Shield size={32} className="text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white font-montserrat tracking-tight mb-4">
          Política de <span className="text-primary">Privacidad</span>
        </h1>
        <p className="text-xl text-gray-400">Última actualización: Marzo 2026</p>
      </div>
      
      <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-gray-300 prose-headings:font-montserrat prose-headings:text-white max-w-none">
        <h2>1. Información que Recopilamos</h2>
        <p>
          En Zetta Tutoriales, la privacidad de nuestros visitantes es de extrema importancia para nosotros. 
          Este documento de política de privacidad describe los tipos de información personal que recibe y 
          recopila zettatutoriales.com y cómo se utiliza. No recopilamos información personal identificable a 
          menos que usted la proporcione voluntariamente al registrarse como administrador o enviarnos un 
          correo a través de nuestro formulario de contacto.
        </p>

        <h2>2. Uso de la Información</h2>
        <p>
          Cualquier información que recopilamos de usted puede usarse de una de las siguientes maneras:
        </p>
        <ul>
          <li>Para personalizar su experiencia y responder mejor a sus necesidades individuales.</li>
          <li>Para mejorar nuestro sitio web basándonos en la información y los comentarios que recibimos de usted.</li>
          <li>Para enviar correos electrónicos periódicos (si está suscrito a nuestro boletín).</li>
        </ul>

        <h2>3. Uso de Cookies</h2>
        <p>
          Utilizamos cookies para entender y guardar sus preferencias para futuras visitas (como temas claros/oscuros 
          o votaciones) y compilar datos agregados sobre el tráfico del sitio y la interacción del sitio para 
          poder ofrecer mejores experiencias y herramientas en el futuro.
        </p>

        <h2>4. Enlaces a Terceros</h2>
        <p>
          Ocasionalmente, a nuestra discreción, podemos incluir u ofrecer productos o servicios de terceros en
          nuestro sitio web. Estos sitios de terceros tienen políticas de privacidad separadas e independientes. 
          Por lo tanto, no tenemos ninguna responsabilidad ni obligación por el contenido y las actividades de 
          estos sitios enlazados. No obstante, buscamos proteger la integridad de nuestro sitio y agradecemos 
          cualquier comentario sobre estos sitios.
        </p>

        <h2>5. Consentimiento</h2>
        <p>
          Al utilizar nuestro sitio, usted acepta nuestra política de privacidad web. Si decidimos cambiar nuestra política 
          de privacidad, publicaremos esos cambios en esta página.
        </p>
      </div>
    </div>
  );
}
