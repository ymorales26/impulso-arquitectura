export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-gray-100 font-raleway pb-20">
      
      {/* BANNER PRINCIPAL (Inspirado en image_51067c.jpg) */}
      <div className="relative h-[320px] md:h-[380px] bg-impulso-dark overflow-hidden flex items-center justify-center text-center px-4">
        {/* Imagen de fondo con toma de dron - Ajustada para conservar claridad y luz */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center brightness-[0.38] mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('/images/dron-edificio-horizontal.jpg')` }} // Mismo background u otra foto de dron
        />
        {/* Capa de gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-impulso-dark/50 via-transparent to-impulso-dark/90 z-10" />

        {/* Contenido del Banner */}
        <div className="relative z-20 pt-12">
          <span className="font-outfit text-xs font-bold text-impulso-orange tracking-[4px] uppercase block mb-3">
            Términos de Uso Corporativo
          </span>
          <h1 className="font-outfit text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            Términos y Condiciones
          </h1>
          <div className="w-12 h-[3px] bg-impulso-orange mx-auto mt-4 rounded-full" />
        </div>
      </div>

      {/* CONTENEDOR CON SUPERPOSICIÓN (OVERLAP) */}
      <div className="container mx-auto px-4 max-w-4xl relative z-30 -mt-20 md:-mt-24">
        <div className="bg-white border border-gray-200/80 rounded-xl p-6 md:p-12 shadow-xl shadow-gray-900/5">
          
          <div className="text-right text-[11px] text-gray-400 font-medium border-b border-gray-100 pb-4 mb-6">
            Última actualización: 20 de junio de 2026
          </div>

          {/* Cuerpo Legal */}
          <div className="space-y-6 text-sm text-gray-600 text-justify leading-relaxed">
            <p>
              Bienvenido al sitio web oficial de <strong className="text-impulso-dark">Impulso Ingenieros & Construcción S.A.C.</strong> Al acceder, navegar y utilizar este sitio web, usted acepta plenamente y sin reservas los presentes Términos y Condiciones de Uso. Si no está de acuerdo con estas cláusulas, le solicitamos que se abstenga de utilizar la plataforma.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              1. Propiedad Intelectual
            </h2>
            <p>
              Todo el contenido visual, arquitectónico, logotipos, planos conceptuales, fotografías tomadas por drones, códigos fuente y diseños mostrados en este portal son propiedad exclusiva de <strong>Impulso Ingenieros</strong>. Queda totalmente prohibida su reproducción parcial o total sin autorización expresa.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              2. Precisión de la Información de Proyectos
            </h2>
            <p>
              Las imágenes tridimensionales (renders), simulaciones y planos de ingeniería que se muestran en el sitio web son estrictamente de carácter referencial e ilustrativo. Las especificaciones técnicas finales y áreas exactas serán detalladas exclusivamente en los contratos y minutas firmados por las partes.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              3. Modificaciones del Servicio
            </h2>
            <p>
              Impulso Ingenieros se reserva el derecho exclusivo de actualizar, modificar o eliminar de manera unilateral cualquier sección, contenido o aspecto técnico de este sitio web sin previo aviso, con el fin de optimizar la experiencia del usuario y cumplir con las normativas vigentes del sector.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}