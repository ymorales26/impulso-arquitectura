export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-gray-100 font-raleway pb-20">
      
      {/* BANNER PRINCIPAL */}
      <div className="relative h-[320px] md:h-[380px] bg-impulso-dark overflow-hidden flex items-center justify-center text-center px-4">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center brightness-[0.38] mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('/images/dron-edificio-horizontal.jpg')` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-impulso-dark/50 via-transparent to-impulso-dark/90 z-10" />

        <div className="relative z-20 pt-12">
          <span className="font-outfit text-xs font-bold text-impulso-orange tracking-[4px] uppercase block mb-3">
            Base Legal del Servicio
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
              Bienvenido al sitio web de <strong className="text-impulso-dark">Impulso Ingenieros & Construcción S.A.C.</strong> Al acceder y navegar en nuestro portal, usted acepta cumplir con los presentes Términos y Condiciones. Le rogamos leer detenidamente este documento, ya que regula el uso de nuestro sitio y la relación entre usted y nuestra empresa.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              1. Uso del Sitio Web
            </h2>
            <p>
              El uso de nuestra plataforma es exclusivamente para fines informativos sobre nuestros servicios de ingeniería, proyectos inmobiliarios y gestión de obras. Queda prohibido el uso del sitio con fines ilícitos, dañinos para la infraestructura técnica del portal o cualquier actividad que atente contra los derechos de propiedad intelectual de Impulso.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              2. Propiedad Intelectual
            </h2>
            <p>
              Todos los contenidos, incluyendo fotografías de proyectos, renders, diseños arquitectónicos, logotipos y textos publicados en este sitio web, son propiedad exclusiva de Impulso Ingenieros & Construcción S.A.C. La reproducción, distribución o modificación sin autorización previa y escrita está estrictamente prohibida.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              3. Limitación de Responsabilidad
            </h2>
            <p>
              Aunque nos esforzamos por mantener la información actualizada y veraz, no garantizamos la disponibilidad permanente del sitio ni la ausencia de errores tipográficos en las fichas técnicas de los proyectos. Impulso no se hace responsable por daños o perjuicios derivados del uso directo o indirecto de la información contenida en esta web.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              4. Jurisdicción
            </h2>
            <p>
              Cualquier disputa o conflicto derivado de estos Términos y Condiciones será resuelto bajo las leyes vigentes de la República del Perú y ante los tribunales competentes de la ciudad de Huaraz, renunciando expresamente a cualquier otro fuero.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}