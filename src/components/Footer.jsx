// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="contacto"
      className="bg-gray-950 text-gray-400 font-raleway relative overflow-hidden"
    >
      {/* Textura grid técnica — muy sutil */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-footer" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="40" cy="0" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-footer)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24">

        {/* ── FRANJA SUPERIOR: marca grande ─────────────────────────── */}
        <div className="border-b border-white/8 py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Logo + claim */}
          <div>
            <img
              src="/img/logo_blanco.png"
              alt="Impulso Proyectistas e Ingenieros"
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange">
              Proyectistas e Ingenieros S.A.C.
            </p>
          </div>

          {/* Frase editorial */}
          <p className="font-raleway text-gray-500 text-sm leading-relaxed max-w-xs md:text-right">
            Diseño, ingeniería y gestión de proyectos con altos estándares de calidad en Huaraz y el Perú.
          </p>
        </div>

        {/* ── CUERPO PRINCIPAL: 3 columnas ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-white/8">

          {/* COL 1 — Respaldo técnico */}
          <div className="py-14 md:pr-12 md:border-r border-white/8">
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-8">
              Respaldo técnico
            </span>
            <ul className="space-y-6">
              {[
                { title: "Estándar Antisísmico",    desc: "Estructuras calculadas bajo rigurosa normativa de seguridad." },
                { title: "Optimización de Recursos", desc: "Presupuestos y metrados precisos mediante tecnología BIM." },
                { title: "Gestión Integral",         desc: "Acompañamiento desde el concepto hasta la entrega final." },
              ].map((item, i) => (
                <li key={i}>
                  <div className="w-6 h-px bg-impulso-orange mb-3" />
                  <p className="font-outfit text-white text-xs font-bold uppercase tracking-wider mb-1">
                    {item.title}
                  </p>
                  <p className="font-raleway text-gray-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 2 — Contacto */}
          <div className="py-14 md:px-12 md:border-r border-white/8">
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-8">
              Contacto
            </span>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-impulso-orange mt-0.5 flex-shrink-0 text-xs" />
                <span className="text-gray-400 text-xs leading-relaxed">
                  Pj. Tomas Peñaranda - Centenario Nro. 102<br />
                  Jr. Mariano Melgar con Jr. Pallasca<br />
                  Independencia, Huaraz, Ancash
                </span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-impulso-orange text-xs flex-shrink-0" />
                <a
                  href="tel:+51959679522"
                  className="text-gray-400 text-xs hover:text-impulso-orange transition-colors duration-200"
                >
                  +51 959 679 522
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-user-tie text-impulso-orange text-xs flex-shrink-0" />
                <a
                  href="mailto:ymorales@gimpulso.pe"
                  className="text-gray-400 text-xs hover:text-impulso-orange transition-colors duration-200"
                >
                  ymorales@gimpulso.pe
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-headset text-impulso-orange text-xs flex-shrink-0" />
                <a
                  href="mailto:administracion@gimpulso.pe"
                  className="text-gray-400 text-xs hover:text-impulso-orange transition-colors duration-200"
                >
                  administracion@gimpulso.pe
                </a>
              </li>
            </ul>
          </div>

          {/* COL 3 — Redes + navegación */}
          <div className="py-14 md:pl-12">
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-8">
              Síguenos
            </span>

            {/* Redes — cuadradas, sin border-radius */}
            <div className="flex gap-3 mb-10">
              {[
                { red: "facebook-f",  href: "#" },
                { red: "instagram",   href: "#" },
                { red: "tiktok",      href: "#" },
              ].map(({ red, href }) => (
                <a
                  key={red}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={red}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:border-impulso-orange hover:text-impulso-orange transition-all duration-300"
                >
                  <i className={`fa-brands fa-${red} text-xs`} />
                </a>
              ))}
            </div>

            {/* Links legales y acceso rápido */}
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
              Acceso rápido
            </span>
            <ul className="space-y-3">
              {[
                { label: "Ver proyectos",              to: "/#proyectos"           },
                { label: "Nuestros servicios",         to: "/servicios"            },
                { label: "Agenda una asesoría",        to: "/contacto"             },
                { label: "Libro de Reclamaciones",     to: "/libro-reclamaciones"  },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="font-raleway text-xs text-gray-500 hover:text-impulso-orange transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-gray-700 group-hover:w-5 group-hover:bg-impulso-orange transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── AVISO LEGAL ───────────────────────────────────────────── */}
        <div className="py-8 border-b border-white/8">
          <p className="text-[11px] text-gray-600 leading-relaxed text-justify">
            * Todas las imágenes fueron elaboradas con fines ilustrativos. Sus características y dimensiones son
            aproximadas y referenciales, pudiendo presentar modificaciones en el transcurso del proyecto.
            No constituyen una representación exacta de la realidad.
          </p>
          <div className="flex gap-6 mt-4">
            <Link to="/terminos-condiciones"  className="text-[11px] text-impulso-orange hover:underline transition-all">Términos y Condiciones</Link>
            <Link to="/politicas-privacidad"  className="text-[11px] text-impulso-orange hover:underline transition-all">Políticas de Privacidad</Link>
          </div>
        </div>

        {/* ── PIE FINAL ─────────────────────────────────────────────── */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-600 text-center sm:text-left">
            © 2026 Impulso Proyectistas e Ingenieros S.A.C. — Todos los derechos reservados.
          </p>

          {/* Botón TOP — móvil */}
          <button
            onClick={scrollToTop}
            className="sm:hidden w-9 h-9 border border-white/10 text-gray-500 flex items-center justify-center hover:border-impulso-orange hover:text-impulso-orange transition-all cursor-pointer"
            aria-label="Ir arriba"
          >
            <i className="fa-solid fa-chevron-up text-xs" />
          </button>
        </div>

      </div>

      {/* Botón TOP fijo desktop */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="hidden sm:flex fixed bottom-6 right-24 w-11 h-11 bg-gray-950 border border-impulso-orange/40 text-impulso-orange items-center justify-center hover:bg-impulso-orange hover:text-white transition-all duration-300 shadow-2xl cursor-pointer z-50"
          style={{ marginRight: "10px" }}
          aria-label="Subir al inicio"
        >
          <i className="fa-solid fa-chevron-up text-xs" />
        </button>
      )}
    </footer>
  );
}