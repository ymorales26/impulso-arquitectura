// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: "Proyectos",     action: "scroll", path: "/", id: "proyectos" },
  { label: "Servicios",     action: "route",  path: "/servicios"         },
  { label: "Obra",          action: "route",  path: "/obra"              },
  { label: "Principios",    action: "route",  path: "/principios"        },
  { label: "Publicaciones", action: "route",  path: "/publicaciones"     },
  { label: "Contacto",      action: "route",  path: "/contacto"          },
];

export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);

  const handleNav = (item) => {
    closeMenu();
    if (item.action === "scroll") {
      navigate(item.path);
      setTimeout(() => {
        const el = document.getElementById(item.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      navigate(item.path);
    }
  };

  const isActive = (item) => {
    if (item.action === "scroll") return location.pathname === "/";
    return location.pathname === item.path;
  };

  return (
    <>
      {/* ── HEADER FIJO ───────────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center z-10 relative" onClick={closeMenu}>
            <img
              src={isScrolled ? "/img/logo.png" : "/img/logo_blanco.png"}
              alt="Impulso"
              className="h-10 md:h-12 w-auto object-contain transition-all duration-500"
            />
          </Link>

          {/* HAMBURGUESA — solo visible en móvil, siempre arriba del menú */}
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="lg:hidden flex flex-col justify-between w-6 h-4 cursor-pointer relative z-[10002]"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className={`block w-full h-[2px] rounded-sm transition-all duration-300 origin-center ${
              isOpen
                ? 'translate-y-[7px] rotate-45 bg-white'
                : isScrolled ? 'bg-gray-800' : 'bg-white'
            }`} />
            <span className={`block w-full h-[2px] rounded-sm transition-opacity duration-200 ${
              isOpen ? 'opacity-0' : isScrolled ? 'bg-gray-800' : 'bg-white'
            }`} />
            <span className={`block w-full h-[2px] rounded-sm transition-all duration-300 origin-center ${
              isOpen
                ? '-translate-y-[7px] -rotate-45 bg-white'
                : isScrolled ? 'bg-gray-800' : 'bg-white'
            }`} />
          </button>

          {/* NAV DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className={`relative font-outfit text-[11px] font-bold uppercase tracking-[3px] transition-colors duration-300 cursor-pointer group py-1 ${
                  isActive(item)
                    ? 'text-impulso-orange'
                    : isScrolled
                      ? 'text-gray-700 hover:text-impulso-orange'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-px bg-impulso-orange transition-all duration-300 ${
                  isActive(item) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}
          </nav>

        </div>
      </header>

      {/* ── PANEL MÓVIL — completamente independiente del header ─── */}
      {/* Overlay de fondo */}
      <div
        className={`lg:hidden fixed inset-0 z-[10000] bg-gray-950 transition-all duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Logo dentro del panel */}
        <div className="absolute top-5 left-8">
          <img src="/img/logo_blanco.png" alt="Impulso" className="h-10 w-auto object-contain" />
        </div>

        {/* Links centrados verticalmente */}
        <nav className="flex flex-col justify-center h-full px-8 pt-16 pb-12">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className={`w-full text-left py-4 border-b border-white/8 last:border-0 cursor-pointer group transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : '0ms' }}
            >
              <div className="flex items-center justify-between">
                <span className={`font-outfit font-black uppercase tracking-tight transition-colors duration-200 ${
                  isActive(item) ? 'text-impulso-orange' : 'text-white group-hover:text-impulso-orange'
                }`} style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}>
                  {item.label}
                </span>
                <i className={`fa-solid fa-arrow-right text-sm transition-all duration-300 ${
                  isActive(item) ? 'text-impulso-orange' : 'text-white/20 group-hover:text-impulso-orange group-hover:translate-x-1'
                }`} />
              </div>
            </button>
          ))}
        </nav>

        {/* Pie del panel */}
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
          <span className="font-outfit text-[9px] font-bold uppercase tracking-[4px] text-white/25">
            Proyectistas & Ingenieros S.A.C.
          </span>
          <a
            href="https://wa.me/51959679522"
            target="_blank"
            rel="noreferrer"
            className="font-outfit text-[9px] font-bold uppercase tracking-[4px] text-impulso-orange"
            onClick={closeMenu}
          >
            +51 959 679 522
          </a>
        </div>
      </div>
    </>
  );
}