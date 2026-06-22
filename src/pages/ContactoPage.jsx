import { useState, useEffect, useRef } from "react";

export default function ContactoPage() {
  const bannerRef = useRef(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", correo: "", celular: "", mensaje: "" });
  const [estadoEnvio, setEstadoEnvio] = useState({ enviando: false, exito: false, error: false });

  useEffect(() => { setBannerVisible(true); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoEnvio({ enviando: true, exito: false, error: false });
    try {
      const response = await fetch("https://formspree.io/f/xzbojnja", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setEstadoEnvio({ enviando: false, exito: true, error: false });
        setFormData({ nombre: "", correo: "", celular: "", mensaje: "" });
      } else { setEstadoEnvio({ enviando: false, exito: false, error: true }); }
    } catch (error) { setEstadoEnvio({ enviando: false, exito: false, error: true }); }
  };

  return (
    <div id="contacto" className="min-h-screen bg-white text-gray-900 selection:bg-impulso-orange selection:text-white">
      
      {/* 1. BANNER */}
      <div ref={bannerRef} className="relative w-full h-[50vh] flex items-center justify-start overflow-hidden">
        <img src="https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg" className="absolute inset-0 w-full h-full object-cover" alt="Contacto" />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 px-6 md:px-20 max-w-[1200px] mx-auto w-full">
          <div className={`transition-all duration-1000 ${bannerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="text-impulso-orange font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Ingeniería & Diseño</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-6">Contacto</h1>
            <div className="w-20 h-1 bg-impulso-orange"></div>
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN PRINCIPAL */}
      <div className="max-w-[1300px] mx-auto px-6 py-20 grid lg:grid-cols-12 gap-16">
        
        {/* COLUMNA IZQUIERDA: INFO */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h2 className="text-3xl font-black uppercase mb-6">Conéctate con nuestro equipo</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Ya sea para una cotización o el desarrollo integral de un proyecto BIM, nuestro equipo multidisciplinario te responderá en menos de 24 horas.
            </p>
          </div>

          <div className="space-y-4">
            <a href="https://wa.me/51959679522" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-xl hover:border-impulso-orange/30 border border-transparent transition-all group">
              <div className="w-12 h-12 shrink-0 bg-white border flex items-center justify-center text-impulso-orange mr-4 rounded-lg shadow-sm"><i className="fa-solid fa-phone"></i></div>
              <div><p className="text-[10px] uppercase text-gray-400 font-bold">Llámanos o WhatsApp</p><p className="font-bold">+51 959 679 522</p></div>
            </a>
            <a href="mailto:ymorales@impulso.pe" className="flex items-center p-4 bg-gray-50 rounded-xl hover:border-impulso-orange/30 border border-transparent transition-all group">
              <div className="w-12 h-12 shrink-0 bg-white border flex items-center justify-center text-impulso-orange mr-4 rounded-lg shadow-sm"><i className="fa-solid fa-envelope"></i></div>
              <div><p className="text-[10px] uppercase text-gray-400 font-bold">Escríbenos por Correo</p><p className="font-bold">ymorales@impulso.pe</p></div>
            </a>
            <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-transparent">
              <div className="w-12 h-12 shrink-0 bg-white border flex items-center justify-center text-impulso-orange mr-4 rounded-lg shadow-sm"><i className="fa-solid fa-location-dot"></i></div>
              <div><p className="text-[10px] uppercase text-gray-400 font-bold">Oficina Principal</p><p className="font-bold text-sm">Pj. Tomas Peñaranda - Centenario Nro. 102, Ancash - Huaraz</p></div>
            </div>
          </div>

          <div className="p-6 bg-[#02184c] rounded-2xl text-white">
            <h4 className="font-bold text-lg mb-2">¿Necesitas asesoría?</h4>
            <p className="text-blue-100 text-sm mb-4">Estamos listos para evaluar tu proyecto de ingeniería.</p>
            <a href="https://wa.me/51959679522?text=Hola,%20solicito%20información%20sobre%20sus%20servicios%20de%20ingeniería." target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-impulso-orange text-center font-bold text-xs uppercase rounded-lg hover:bg-orange-600 transition-colors">
              Solicitar información
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="lg:col-span-7">
          <h3 className="text-2xl font-black uppercase mb-6 font-outfit">Escríbenos</h3>
          <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" name="nombre" placeholder="Nombre Completo" required className="w-full bg-gray-50 p-4 rounded-xl border focus:border-impulso-orange outline-none" onChange={handleChange} value={formData.nombre} />
                <input type="email" name="correo" placeholder="Correo Electrónico" required className="w-full bg-gray-50 p-4 rounded-xl border focus:border-impulso-orange outline-none" onChange={handleChange} value={formData.correo} />
              </div>
              <input type="tel" name="celular" placeholder="Celular" required className="w-full bg-gray-50 p-4 rounded-xl border focus:border-impulso-orange outline-none" onChange={handleChange} value={formData.celular} />
              <textarea name="mensaje" rows="5" placeholder="Detalles del proyecto..." required className="w-full bg-gray-50 p-4 rounded-xl border focus:border-impulso-orange outline-none resize-none" onChange={handleChange} value={formData.mensaje}></textarea>
              <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-impulso-orange transition-all">
                {estadoEnvio.enviando ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* 3. MAPA Y UBICACIÓN */}
      <div className="w-full bg-gray-50 pt-16 border-t border-gray-100">
        <div className="px-6 md:px-16 mb-10">
          <h2 className="text-3xl font-black uppercase">Nuestra Ubicación</h2>
          <p className="text-gray-500 mt-2">Visítanos en nuestra oficina principal en Huaraz.</p>
        </div>
        <div className="w-full h-[400px]">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3934.9064042755836!2d-77.52813890000002!3d-9.516861100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMzEnMDAuNyJTIDc3wrAzMSc0MS4zIlc!5e0!3m2!1ses-419!2spe!4v1782056636785!5m2!1ses-419!2spe" 
             className="w-full h-full" 
             title="Mapa de ubicación"
             allowFullScreen=""
           ></iframe>
        </div>
      </div>
    </div>
  );
}