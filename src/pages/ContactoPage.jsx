// src/pages/ContactoPage.jsx
import { useState, useEffect, useRef } from "react";

export default function ContactoPage() {
  // Referencias para interceptar el scroll y animaciones
  const bannerRef = useRef(null);
  
  // Estado para controlar la animación inmediata del Banner
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    // Animamos el banner de inmediato al montar la página como en ServiciosPage
    setBannerVisible(true);
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    celular: "",
    mensaje: "",
  });

  const [estadoEnvio, setEstadoEnvio] = useState({
    enviando: false,
    exito: false,
    error: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoEnvio({ enviando: true, exito: false, error: false });

    try {
      const response = await fetch("https://formspree.io/f/xzbojnja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setEstadoEnvio({ enviando: false, exito: true, error: false });
        setFormData({ nombre: "", correo: "", celular: "", mensaje: "" });
      } else {
        setEstadoEnvio({ enviando: false, exito: false, error: true });
      }
    } catch (error) {
      setEstadoEnvio({ enviando: false, exito: false, error: true });
    }
  };

  return (
    <div id="contacto" className="min-h-screen bg-white relative overflow-x-hidden font-raleway text-gray-900 selection:bg-impulso-orange selection:text-white">
      
      {/* 1. BANNER PRINCIPAL (Guiado exactamente por la estructura de ServiciosPage) */}
      <div ref={bannerRef} className="relative w-full h-[65vh] flex items-center justify-start overflow-hidden z-10">
        <img
          src="https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg"
          alt="Modern Architecture"
          className="absolute inset-0 w-full h-full object-cover scale-105 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 px-6 md:px-20 max-w-[1200px] mx-auto w-full">
          <div className={`transition-all duration-1000 ease-out transform ${bannerVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
            <span className="text-impulso-orange font-outfit font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
              Ingeniería & Diseño
            </span>
            <h1 className="text-4xl md:text-7xl font-outfit font-black uppercase text-white leading-[1.1] mb-6 tracking-tighter">
              Contacto
            </h1>
            <div className="w-20 h-1 bg-impulso-orange mb-6"></div>
            <p className="text-white/80 text-lg md:text-xl font-light italic max-w-xl">
              Convertimos visiones arquitectónicas en infraestructuras de alto rendimiento bajo estándares BIM en Huaraz.
            </p>
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN DE FORMULARIO E INFO */}
      <div className="max-w-[1300px] mx-auto px-6 py-24 grid lg:grid-cols-12 gap-16 items-start">
        {/* Columna Izquierda: Información de contacto directo */}
        <div className="lg:col-span-5">
          <span className="text-impulso-orange font-bold tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
            Canales Directos
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase mb-6 font-outfit tracking-tight">
            Conéctate con nuestro equipo técnico
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed font-raleway text-sm md:text-base">
            Ya sea para una cotización, una consulta sobre licencias o el
            desarrollo integral de un proyecto BIM, nuestro equipo
            multidisciplinario te responderá en menos de 24 horas.
          </p>

          {/* Tarjetas de Información con Iconos */}
          <div className="space-y-5 mb-12">
            <div className="flex items-center p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-impulso-orange mr-4 shadow-sm rounded-lg">
                <i className="fa-solid fa-phone text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider font-outfit">
                  Llámanos o WhatsApp
                </p>
                <p className="text-gray-900 font-bold font-raleway text-sm md:text-base">
                  +51 999 999 999
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-impulso-orange mr-4 shadow-sm rounded-lg">
                <i className="fa-solid fa-envelope text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider font-outfit">
                  Escríbenos por Correo
                </p>
                <p className="text-gray-900 font-bold font-raleway text-sm md:text-base">
                  contacto@impulso.com
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-impulso-orange mr-4 shadow-sm rounded-lg">
                <i className="fa-solid fa-location-dot text-lg"></i>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider font-outfit">
                  Oficina Principal
                </p>
                <p className="text-gray-900 font-bold font-raleway text-sm md:text-base">
                  Huaraz, Ancash, Perú
                </p>
              </div>
            </div>
          </div>

          {/* Cuadro de Valor Agregado */}
          <div className="border-l-4 border-impulso-orange bg-gray-50 p-6 rounded-r-xl">
            <h4 className="font-outfit text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
              ¿Qué garantizamos en tu asesoría?
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600 font-raleway font-medium">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-impulso-orange text-[10px]"></i>{" "}
                Transparencia total en presupuestos base.
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-impulso-orange text-[10px]"></i>{" "}
                Evaluación de viabilidad climática y del terreno en Ancash.
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-impulso-orange text-[10px]"></i>{" "}
                Levantamiento inicial conceptual usando metodología BIM.
              </li>
            </ul>
          </div>
        </div>

        {/* Columna Derecha: El Formulario */}
        <div className="lg:col-span-7 bg-white p-6 md:p-10 border border-gray-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative">
          {estadoEnvio.exito && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-xl flex items-center font-raleway">
              <i className="fa-solid fa-circle-check text-xl mr-3 text-green-500"></i>
              ¡Mensaje enviado con éxito! Nos comunicaremos contigo muy pronto.
            </div>
          )}

          {estadoEnvio.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-medium rounded-xl flex items-center font-raleway">
              <i className="fa-solid fa-circle-exclamation text-xl mr-3 text-red-500"></i>
              Hubo un problem al enviar el mensaje. Por favor, inténtalo de nuevo.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase font-bold tracking-widest text-gray-700 mb-2 font-outfit">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-gray-50 p-4 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-impulso-orange focus:bg-white transition-all duration-300 font-raleway"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-700 mb-2 font-outfit">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="correo"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="juan@correo.com"
                  className="w-full bg-gray-50 p-4 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-impulso-orange focus:bg-white transition-all duration-300 font-raleway"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-700 mb-2 font-outfit">
                  Celular / Teléfono
                </label>
                <input
                  type="tel"
                  name="celular"
                  required
                  value={formData.celular}
                  onChange={handleChange}
                  placeholder="999888777"
                  className="w-full bg-gray-50 p-4 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-impulso-orange focus:bg-white transition-all duration-300 font-raleway"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-widest text-gray-700 mb-2 font-outfit">
                Mensaje o Detalles del Proyecto
              </label>
              <textarea
                name="mensaje"
                rows="5"
                required
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntanos brevemente sobre tu requerimiento o estructura..."
                className="w-full bg-gray-50 p-4 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-impulso-orange focus:bg-white transition-all duration-300 resize-none font-raleway"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={estadoEnvio.enviando}
              className="w-full bg-gray-900 text-white py-4 rounded-xl uppercase font-bold tracking-widest hover:bg-impulso-orange shadow-md hover:shadow-lg hover:shadow-impulso-orange/20 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed font-outfit cursor-pointer text-xs md:text-sm"
            >
              {estadoEnvio.enviando ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>

      {/* 3. SECCIÓN DE UBICACIÓN Y MAPA NATIVO */}
      <div className="w-full bg-gray-50 border-t border-gray-200 pt-16">
        <div className="w-full px-6 md:px-16 mb-10 text-center md:text-left">
          <span className="text-impulso-orange font-bold tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
            Ubícanos
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase font-outfit tracking-tight">
                Nuestra Oficina
              </h2>
              <p className="text-gray-500 font-raleway text-sm md:text-base mt-3 leading-relaxed">
                Agenda una cita y visítanos para más información sobre tu
                proyecto. Encuéntranos en una zona de fácil acceso para revisar
                tus ideas y planificar cada detalle de forma clara.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENEDOR DEL MAPA ANCHO COMPLETO */}
        <div className="w-full h-[500px] bg-gray-100 border-b border-gray-200 relative shadow-inner">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3934.9064042755836!2d-77.52813890000002!3d-9.516861100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMzEnMDAuNyJTIDc3wrAzMSc0MS4zIlc!5e0!3m2!1ses-419!2spe!4v1782056636785!5m2!1ses-419!2spe"
            className="w-full h-full border-0 contrast-[0.96] saturate-[0.92]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación oficial de ARQBIMSTUDIO"
          ></iframe>
        </div>
      </div>
    </div>
  );
}