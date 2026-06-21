import { Link } from "react-router-dom"; // 1. Importa el Link arriba de tu componente
import { useState, useEffect } from "react";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="contacto"
      className="bg-[#000714] text-gray-400 pt-20 pb-28 md:pb-12 border-t-4 border-impulso-orange relative z-10 font-raleway overflow-hidden"
    >
      {/* 📐 TEXTURA ARQUITECTÓNICA EN SVG (Grilla técnica de planos / Blueprint) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
              <circle cx="40" cy="0" r="1.5" fill="white" />
              <circle cx="0" cy="40" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        {/* SECCIÓN PRINCIPAL: 3 COLUMNAS REESTRUCTURADAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* COLUMNA 1: MARCA Y REDES */}
          <div>
            {/* LOGO DE LA EMPRESA */}
            {/* LOGO DE LA EMPRESA */}
            <div className="h-20 flex items-center">
              <img
                src="/img/logo_blanco.png"
                alt="Impulso Proyectistas e Ingenieros"
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="text-impulso-orange font-outfit font-bold text-xs uppercase tracking-wider mt-1">
              Proyectistas e Ingenieros S.A.C.
            </p>
            <p className="text-gray-400/60 mt-4 text-sm leading-relaxed">
              Soluciones integrales en ingeniería, diseño y gestión de proyectos
              con altos estándares de calidad.
            </p>

            <div className="flex gap-3 mt-6">
              {["facebook-f", "instagram", "tiktok"].map((red) => (
                <a
                  key={red}
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-impulso-orange hover:text-white transition-all duration-300 border border-white/5"
                  aria-label={red}
                >
                  <i className={`fa-brands fa-${red} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 2: VALOR TÉCNICO / GARANTÍAS DE OBRA (Reemplaza Especialidades) */}
          <div>
            <h4 className="font-outfit text-white text-base uppercase tracking-wider mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-impulso-orange">
              Respaldo Técnico
            </h4>
            <ul className="space-y-4 text-sm">
              {[
                {
                  title: "Estándar Antisísmico",
                  desc: "Estructuras calculadas bajo rigurosa normativa de seguridad.",
                },
                {
                  title: "Optimización de Recursos",
                  desc: "Presupuestos y metrados precisos mediante tecnología BIM.",
                },
                {
                  title: "Gestión Integral",
                  desc: "Acompañamiento desde el concepto plano hasta la entrega final.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex flex-col gap-0.5">
                  <span className="text-white font-outfit text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-impulso-orange rounded-full"></span>
                    {item.title}
                  </span>
                  <span className="text-gray-500 text-xs pl-3.5">
                    {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div>
            <h4 className="font-outfit text-white text-base uppercase tracking-wider mb-6 relative after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-[2px] after:bg-impulso-orange">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-gray-400/80">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-impulso-orange mt-1"></i>
                <span>Av. Principal 123, Oficina 401</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-impulso-orange"></i>
                <span>+51 959 679 522</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-impulso-orange"></i>
                <span className="break-all">
                  contacto@impulsoingenieros.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 📘 LIBRO DE RECLAMACIONES REOPTIMIZADO (Fila completa, icono integrado y más grande) 
        <div className="mb-10">
          <div className="border-t border-b border-white/5 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center sm:text-left">
              ¿Tienes alguna sugerencia o disconformidad? Estamos listos para
              escucharte.
            </div>
            <Link
              to="/libro-reclamaciones"
              className="inline-flex items-center gap-3 border border-white/10 hover:border-impulso-orange text-white hover:text-impulso-orange px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest font-outfit transition-all duration-300 bg-white/[0.01] hover:bg-white/[0.03] group"
            >
              <i className="fa-solid fa-book-open text-base text-impulso-orange transition-transform group-hover:scale-110"></i>
              <span>Libro de Reclamaciones</span>
            </Link>
          </div>
        </div> */}

        {/* 📜 TEXTO LEGAL DISCRETO */}
        <div className="mb-10 text-[12px] text-gray-600 text-justify leading-relaxed font-medium">
          <p>
            * Todas las imágenes de la publicidad fueron elaboradas con fines
            ilustrativos y sus características y dimensiones son aproximadas y
            referenciales; por tanto, pueden presentar modificaciones en el
            transcurso del proyecto, no constituyendo necesariamente una
            representación exacta de la realidad. Su único objetivo es mostrar
            una caracterización general del proyecto y no cada uno de sus
            detalles. Verifique las características y especificaciones de su
            departamento al momento de la compra.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-500 font-semibold">
            <Link
              to="/terminos-condiciones"
              className="text-impulso-orange hover:underline transition-all"
            >
              Términos y Condiciones
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link
              to="/politicas-privacidad"
              className="text-impulso-orange hover:underline transition-all"
            >
              Políticas de Privacidad
            </Link>
          </div>
        </div>

        {/* PEU DE PÀGINA INFERIOR */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p className="text-center sm:text-left">
            &copy; 2026 Impulso Proyectistas e Ingenieros S.A.C. Todos los
            derechos reservados.
          </p>

          {/* Botón TOP estático solo visible en móviles */}
          <button
            onClick={scrollToTop}
            className="md:hidden w-10 h-10 bg-white/5 border border-white/10 text-gray-400 rounded-xl flex items-center justify-center active:bg-impulso-orange active:text-white transition-all cursor-pointer"
            aria-label="Ir arriba"
          >
            <i className="fa-solid fa-chevron-up text-xs"></i>
          </button>
        </div>
      </div>

      {/* 💻 BOTÓN TOP FIJO ESCRITORIO (Aparece dinámicamente con el scroll, alineado con la altura de WhatsApp) */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 right-24 w-12 h-12 bg-[#000714] border border-impulso-orange/40 text-impulso-orange rounded-full items-center justify-center hover:bg-impulso-orange hover:text-white hover:border-impulso-orange transition-all duration-300 shadow-2xl cursor-pointer z-50 animate-fade-in"
          style={{ marginRight: "10px" }}
          aria-label="Subir al inicio"
        >
          <i className="fa-solid fa-chevron-up text-sm"></i>
        </button>
      )}
    </footer>
  );
}
