export default function PoliticasPrivacidad() {
  return (
    <div className="min-h-screen bg-gray-100 font-raleway pb-20">
      
      {/* BANNER PRINCIPAL (Inspirado en image_51067c.jpg) */}
      <div className="relative h-[320px] md:h-[380px] bg-impulso-dark overflow-hidden flex items-center justify-center text-center px-4">
        {/* Imagen de fondo con toma de dron - Ajustada para conservar claridad y luz */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center brightness-[0.38] mix-blend-luminosity scale-105"
          style={{ backgroundImage: `url('/images/dron-edificio-horizontal.jpg')` }} // Coloca aquí la ruta de tu foto de dron
        />
        {/* Capa de gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-impulso-dark/50 via-transparent to-impulso-dark/90 z-10" />

        {/* Contenido del Banner */}
        <div className="relative z-20 pt-12">
          <span className="font-outfit text-xs font-bold text-impulso-orange tracking-[4px] uppercase block mb-3">
            Área Legal & Cumplimiento
          </span>
          <h1 className="font-outfit text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            Políticas de Privacidad
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
              En <strong className="text-impulso-dark">Impulso Ingenieros & Construcción S.A.C.</strong>, nos tomamos muy en serio la seguridad y confidencialidad de tus datos personales. En cumplimiento de la <strong>Ley N° 29733 (Ley de Protección de Datos Personales)</strong> y su Reglamento en el Perú, te informamos detalladamente sobre las condiciones bajo las cuales tratamos tu información.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              1. Recopilación de la Información
            </h2>
            <p>
              Recopilamos datos personales (tales como nombres, apellidos, documento de identidad, correo electrónico, teléfono y dirección) únicamente cuando interactúas de manera voluntaria con nuestra plataforma a través de nuestros formularios de contacto, cotizaciones o el registro formal en nuestro Libro de Reclamaciones Virtual.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              2. Finalidad del Tratamiento de Datos
            </h2>
            <p>
              Tus datos serán incorporados en nuestro banco de datos de administración interna con la finalidad estricta de atender tus solicitudes de información técnica, gestionar legalmente los reclamos ingresados en nuestro sistema, y enviar actualizaciones de avance de obras civiles solo si lo has autorizado explícitamente.
            </p>

            <h2 className="font-outfit text-base font-bold text-impulso-dark uppercase tracking-wide pt-4 border-t border-gray-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-impulso-orange rounded-full inline-block" />
              3. Seguridad y Derechos ARCO
            </h2>
            <p>
              Implementamos las medidas técnicas necesarias para evitar la alteración o acceso no autorizado a tu información. Asimismo, tienes la total libertad para ejercer tus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO)</strong> enviando una solicitud formal a nuestros canales institucionales.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}