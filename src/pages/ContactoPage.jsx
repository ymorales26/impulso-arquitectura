// src/pages/ContactoPage.jsx
import { useState, useEffect } from "react";

export default function ContactoPage() {
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
      } else {
        setEstadoEnvio({ enviando: false, exito: false, error: true });
      }
    } catch {
      setEstadoEnvio({ enviando: false, exito: false, error: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900 selection:bg-impulso-orange selection:text-white font-raleway">

      {/* ── BANNER EDITORIAL ──────────────────────────────────────── */}
      <div className="relative w-full h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src="img/proyectos/banner-01.avif"
          alt="Contacto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: bannerVisible ? "scale(1.04)" : "scale(1)",
            transition: "transform 7000ms ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* Texto */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-14">
          <div
            className={`transition-all duration-1000 ${bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Ingeniería & Diseño
            </span>
            <h1
              className="font-outfit font-black text-white leading-none tracking-tighter"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              Contacto
            </h1>
          </div>
        </div>

        {/* Línea divisoria inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </div>

      {/* ── CUERPO PRINCIPAL ──────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-20 grid lg:grid-cols-12 gap-16 lg:gap-24">

        {/* ── COLUMNA IZQUIERDA: INFO ────────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col gap-12">

          {/* Intro */}
          <div>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
              Estudio Impulso
            </span>
            <h2
              className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-6"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Conéctate con<br />nuestro equipo
            </h2>
            <p className="font-raleway text-gray-500 text-sm leading-relaxed">
              Ya sea para una cotización o el desarrollo integral de un proyecto, nuestro equipo te responderá en menos de 24 horas.
            </p>
          </div>

          {/* Divisor */}
          <div className="w-full h-px bg-gray-300" />

          {/* Datos de contacto — estilo lista editorial */}
          <ul className="space-y-6">
            {[
              {
                icon: "fa-phone",
                label: "Llámanos o WhatsApp",
                value: "+51 959 679 522",
                href: "https://wa.me/51959679522",
              },
              {
                icon: "fa-envelope",
                label: "Gerencia",
                value: "ymorales@gimpulso.pe",
                href: "mailto:ymorales@gimpulso.pe",
              },
              {
                icon: "fa-headset",
                label: "Administración",
                value: "administracion@gimpulso.pe",
                href: "mailto:administracion@gimpulso.pe",
              },
              {
                icon: "fa-location-dot",
                label: "Oficina principal",
                value: "Pj. Tomas Peñaranda Nro. 102, Independencia, Huaraz",
                href: null,
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-5">
                {/* Línea + ícono */}
                <div className="flex flex-col items-center gap-1 pt-0.5 flex-shrink-0">
                  <div className="w-px h-3 bg-impulso-orange" />
                  <i className={`fa-solid ${item.icon} text-impulso-orange text-xs`} />
                </div>
                <div>
                  <p className="font-outfit text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="font-raleway text-sm text-gray-900 hover:text-impulso-orange transition-colors duration-200"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-raleway text-sm text-gray-600 leading-snug">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Divisor */}
          <div className="w-full h-px bg-gray-300" />

          {/* CTA WhatsApp — sobrio */}
          <a
            href="https://wa.me/51959679522?text=Hola,%20solicito%20información%20sobre%20sus%20servicios."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-4 group"
          >
            <span className="font-outfit text-xs font-bold uppercase tracking-[4px] text-gray-900 group-hover:text-impulso-orange transition-colors duration-300">
              Solicitar información por WhatsApp
            </span>
            <span className="w-8 h-px bg-gray-900 group-hover:w-14 group-hover:bg-impulso-orange transition-all duration-500" />
          </a>
        </div>

        {/* ── COLUMNA DERECHA: FORMULARIO ───────────────────────── */}
        <div className="lg:col-span-7">
          <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
            Formulario de contacto
          </span>
          <h3
            className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-10"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Escríbenos
          </h3>

          {/* Formulario — inputs con borde inferior solamente, sin cards */}
          <form onSubmit={handleSubmit} className="space-y-0">

            <div className="grid md:grid-cols-2 gap-x-8">
              {/* Nombre */}
              <div className="border-b border-gray-300 py-4 focus-within:border-impulso-orange transition-colors duration-200">
                <label className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-gray-400 block mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text" name="nombre" required
                  value={formData.nombre} onChange={handleChange}
                  placeholder="Juan Pérez"
                  className="w-full bg-transparent font-raleway text-sm text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>

              {/* Correo */}
              <div className="border-b border-gray-300 py-4 focus-within:border-impulso-orange transition-colors duration-200">
                <label className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-gray-400 block mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email" name="correo" required
                  value={formData.correo} onChange={handleChange}
                  placeholder="juan@correo.com"
                  className="w-full bg-transparent font-raleway text-sm text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
            </div>

            {/* Celular */}
            <div className="border-b border-gray-300 py-4 focus-within:border-impulso-orange transition-colors duration-200">
              <label className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-gray-400 block mb-1">
                Celular *
              </label>
              <input
                type="tel" name="celular" required
                value={formData.celular} onChange={handleChange}
                placeholder="+51 999 999 999"
                className="w-full bg-transparent font-raleway text-sm text-gray-900 placeholder-gray-500 outline-none"
              />
            </div>

            {/* Mensaje */}
            <div className="border-b border-gray-300 py-4 focus-within:border-impulso-orange transition-colors duration-200">
              <label className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-gray-400 block mb-1">
                Detalles del proyecto *
              </label>
              <textarea
                name="mensaje" rows={5} required
                value={formData.mensaje} onChange={handleChange}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="w-full bg-transparent font-raleway text-sm text-gray-900 placeholder-gray-400 outline-none resize-none"
              />
            </div>

            {/* Feedback */}
            {estadoEnvio.exito && (
              <p className="font-outfit text-xs font-bold uppercase tracking-widest text-green-600 pt-4">
                ✓ Mensaje enviado. Te contactaremos pronto.
              </p>
            )}
            {estadoEnvio.error && (
              <p className="font-outfit text-xs font-bold uppercase tracking-widest text-red-500 pt-4">
                Error al enviar. Intenta de nuevo o escríbenos directamente.
              </p>
            )}

            {/* Botón */}
            <div className="pt-10">
              <button
                type="submit"
                disabled={estadoEnvio.enviando}
                className="inline-flex items-center justify-center gap-3 bg-gray-900 hover:bg-impulso-orange text-white font-outfit text-xs font-bold uppercase tracking-[4px] px-8 py-4 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {estadoEnvio.enviando ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-xs" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <i className="fa-solid fa-arrow-right-long text-xs" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── MAPA ──────────────────────────────────────────────────── */}
      <div className="border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-10">
          <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
            Ubicación
          </span>
          <h2
            className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-10"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
          >
            Nuestra oficina
          </h2>
        </div>
        <div className="w-full h-[420px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3934.9064042755836!2d-77.52813890000002!3d-9.516861100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMzEnMDAuNyJTIDc3wrAzMSc0MS4zIlc!5e0!3m2!1ses-419!2spe!4v1782056636785!5m2!1ses-419!2spe"
            className="w-full h-full"
            style={{ border: 0, filter: "grayscale(30%) contrast(1.05)" }}
            title="Mapa de ubicación"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>

    </div>
  );
}