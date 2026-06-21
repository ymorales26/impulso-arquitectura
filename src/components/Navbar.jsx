import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Detecta el movimiento del scroll para cambiar el diseño del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // Lógica para navegar a la home y luego hacer scroll a la sección
  const handleNav = (path, elementId) => {
    closeMenu();
    navigate(path);
    
    // Si hay un id de sección, hacemos scroll suave al cargar
    if (elementId) {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 py-4 ${
        isScrolled 
          ? 'bg-white shadow-md border-b border-gray-100' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex justify-between items-center">
        
        {/* LOGO (Enlace a Inicio) */}
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <img 
            src={isScrolled ? "/img/logo.png" : "/img/logo_blanco.png"} 
            alt="Logo Impulso Proyectistas e Ingenieros" 
            className="h-12 md:h-18 w-auto object-contain transition-all duration-500 group-hover:scale-105" 
          />
        </Link>
        
        {/* BOTÓN HAMBURGUESA MÓVIL (Tu estilo original recuperado) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer z-[10001]"
          aria-label="Menú"
        >
          <span className={`block w-full h-[3px] rounded transition-transform duration-300 ${
            isOpen ? 'translate-y-2 rotate-45 bg-impulso-orange' : isScrolled ? 'bg-gray-800' : 'bg-white'
          }`}></span>
          <span className={`block w-full h-[3px] rounded transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : isScrolled ? 'bg-gray-800' : 'bg-white'
          }`}></span>
          <span className={`block w-full h-[3px] rounded transition-transform duration-300 ${
            isOpen ? '-translate-y-2 -rotate-45 bg-impulso-orange' : isScrolled ? 'bg-gray-800' : 'bg-white'
          }`}></span>
        </button>

        {/* ENLACES DE NAVEGACIÓN (Estilo original recuperado) */}
        <div className={`fixed md:relative top-0 left-0 w-full md:w-auto h-screen md:h-auto flex items-center justify-center md:block transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 visible translate-y-0 bg-impulso-dark/98' 
            : 'opacity-0 md:opacity-100 invisible md:visible -translate-y-4 md:translate-y-0 bg-transparent'
        }`}>
          <nav className="flex flex-col md:flex-row gap-8 md:gap-9 text-center items-center">
            
            {/* 1. PROYECTOS (Scroll a #proyectos en la home) */}
            <div className="relative group/item py-2 flex flex-col items-center">
              <button 
                onClick={() => handleNav('/', 'proyectos')}
                className={`font-raleway text-xl md:text-xs font-bold uppercase tracking-widest relative group py-1 transition-colors duration-500 block cursor-pointer select-none ${
                  isOpen 
                    ? 'text-white' 
                    : isScrolled ? 'text-gray-800 hover:text-impulso-orange' : 'text-white/90 hover:text-white'
                }`}
              >
                Proyectos
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-impulso-orange transition-all duration-300 group-hover/item:w-full"></span>
              </button>
            </div>

            {/* 2. SERVICIOS (Enlace a /servicios y scroll a #servicios) */}
            <div className="relative group/item py-2 flex flex-col items-center">
              <button 
                onClick={() => handleNav('/servicios', 'servicios')}
                className={`font-raleway text-xl md:text-xs font-bold uppercase tracking-widest relative group py-1 transition-colors duration-500 block cursor-pointer select-none ${
                  isOpen 
                    ? 'text-white' 
                    : isScrolled ? 'text-gray-800 hover:text-impulso-orange' : 'text-white/90 hover:text-white'
                }`}
              >
                Servicios
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-impulso-orange transition-all duration-300 group-hover/item:w-full"></span>
              </button>
            </div>

            {/* 3. CONTACTO (Enlace directo a la ruta /contacto) */}
            <div className="relative group/item py-2 flex flex-col items-center">
              <Link 
                to="/contacto"
                onClick={closeMenu}
                className={`font-raleway text-xl md:text-xs font-bold uppercase tracking-widest relative group py-1 transition-colors duration-500 block cursor-pointer select-none ${
                  isOpen 
                    ? 'text-white' 
                    : isScrolled ? 'text-gray-800 hover:text-impulso-orange' : 'text-white/90 hover:text-white'
                }`}
              >
                Contacto
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-impulso-orange transition-all duration-300 group-hover/item:w-full"></span>
              </Link>
            </div>

          </nav>
        </div>

      </div>
    </header>
  );
}