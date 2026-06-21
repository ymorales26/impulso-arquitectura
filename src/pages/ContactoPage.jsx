import { useState } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    celular: '',
    mensaje: ''
  });

  const [estadoEnvio, setEstadoEnvio] = useState({
    enviando: false,
    exito: false,
    error: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoEnvio({ enviando: true, exito: false, error: false });

    try {
      // Usando tu ID real de Formspree de forma segura mediante Fetch
      const response = await fetch('https://formspree.io/f/xzbojnja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setEstadoEnvio({ enviando: false, exito: true, error: false });
        // Limpiamos los campos del formulario tras el éxito
        setFormData({ nombre: '', correo: '', celular: '', mensaje: '' });
      } else {
        setEstadoEnvio({ enviando: false, exito: false, error: true });
      }
    } catch (error) {
      setEstadoEnvio({ enviando: false, exito: false, error: true });
    }
  };

  return (
    <div id="contacto" className="min-h-screen bg-white">
      
      {/* 1. BANNER PRINCIPAL */}
      <div className="relative w-full h-[70vh] flex items-center justify-start overflow-hidden z-10">
        <img 
          src="https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg" 
          alt="Modern Architecture" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 px-6 md:px-20 max-w-3xl">
          <span className="text-impulso-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Ingeniería & Diseño
          </span>
          <h1 className="text-4xl md:text-7xl font-black uppercase text-white leading-[1.1] mb-6 tracking-tighter">
            Contacto
          </h1>
          <div className="w-20 h-1 bg-impulso-orange mb-6"></div>
          <p className="text-white/80 text-lg md:text-xl font-light italic max-w-xl">
            Convertimos visiones arquitectónicas en infraestructuras de alto rendimiento.
          </p>
        </div>
      </div>

      {/* 2. SECCIÓN DE FORMULARIO E INFO */}
      <div className="max-w-[1200px] mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-start">
        
        {/* Columna Izquierda: Información de contacto directo */}
        <div>
          <span className="text-impulso-orange font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            Canales Directos
          </span>
          <h2 className="text-3xl font-black text-gray-900 uppercase mb-8">
            Conéctate con nuestro equipo técnico
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Ya sea para una cotización, una consulta sobre licencias o el desarrollo integral de un proyecto BIM, nuestro equipo multidisciplinario te responderá en menos de 24 horas.
          </p>

          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center text-impulso-orange mr-4 shadow-sm">
                <i className="fa-solid fa-phone text-xl"></i>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Llámanos o WhatsApp</p>
                <p className="text-gray-900 font-bold">+51 999 999 999</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center text-impulso-orange mr-4 shadow-sm">
                <i className="fa-solid fa-envelope text-xl"></i>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Escríbenos por Correo</p>
                <p className="text-gray-900 font-bold">contacto@impulso.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center text-impulso-orange mr-4 shadow-sm">
                <i className="fa-solid fa-location-dot text-xl"></i>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Oficina Principal</p>
                <p className="text-gray-900 font-bold">Huaraz, Ancash, Perú</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: El Formulario */}
        <div className="bg-white p-10 border border-gray-200 shadow-xl relative">
          
          {/* Mensaje de Éxito propio de la Web */}
          {estadoEnvio.exito && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-md flex items-center">
              <i className="fa-solid fa-circle-check text-xl mr-3 text-green-500"></i>
              ¡Mensaje enviado con éxito! Nos comunicaremos contigo muy pronto.
            </div>
          )}

          {/* Mensaje de Error */}
          {estadoEnvio.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-medium rounded-md flex items-center">
              <i className="fa-solid fa-circle-exclamation text-xl mr-3 text-red-500"></i>
              Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-xs uppercase font-bold tracking-widest text-gray-700 mb-2">Nombre Completo</label>
              <input 
                type="text" 
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-gray-50 p-4 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-impulso-orange transition-all duration-300"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-700 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  name="correo"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="juan@correo.com"
                  className="w-full bg-gray-50 p-4 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-impulso-orange transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold tracking-widest text-gray-700 mb-2">Celular / Teléfono</label>
                <input 
                  type="tel" 
                  name="celular"
                  required
                  value={formData.celular}
                  onChange={handleChange}
                  placeholder="999888777"
                  className="w-full bg-gray-50 p-4 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-impulso-orange transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-widest text-gray-700 mb-2">Mensaje o Detalles del Proyecto</label>
              <textarea 
                name="mensaje"
                rows="5"
                required
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntanos brevemente sobre tu requerimiento o estructura..."
                className="w-full bg-gray-50 p-4 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-impulso-orange transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={estadoEnvio.enviando}
              className="w-full bg-gray-900 text-white py-4 uppercase font-bold tracking-widest hover:bg-impulso-orange transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {estadoEnvio.enviando ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}