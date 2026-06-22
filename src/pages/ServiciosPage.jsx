// src/pages/ServiciosPage.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// 🔢 Sub-componente interno para la animación contable de números
function ContadorAnimado({ valorFinal, sufijo = "", duracion = 2000, activo }) {
  const [cuenta, setCuenta] = useState(0);

  useEffect(() => {
    if (!activo) return;

    const numeroObjetivo = parseInt(valorFinal, 10);
    if (isNaN(numeroObjetivo)) {
      setCuenta(valorFinal);
      return;
    }

    let tiempoInicio = null;
    const pasoContador = (timestamp) => {
      if (!tiempoInicio) tiempoInicio = timestamp;
      const progreso = timestamp - tiempoInicio;
      
      const porcentaje = Math.min(progreso / duracion, 1);
      const valorActual = Math.floor(porcentaje * numeroObjetivo);
      
      setCuenta(valorActual);

      if (progreso < duracion) {
        requestAnimationFrame(pasoContador);
      }
    };

    requestAnimationFrame(pasoContador);
  }, [valorFinal, duracion, activo]);

  return <span>{cuenta}{sufijo}</span>;
}

export default function ServiciosPage() {
  const navigate = useNavigate();
  
  // Referencias para interceptar el scroll en cada sección técnica
  const bannerRef = useRef(null);
  const cifrasRef = useRef(null);
  const gridHeaderRef = useRef(null);
  const gridCardsRef = useRef(null);
  const trayectoriaRef = useRef(null);
  const ctaRef = useRef(null);

  // Estados independientes para controlar cuándo se ve cada elemento
  const [bannerVisible, setBannerVisible] = useState(false);
  const [cifrasVisibles, setCifrasVisibles] = useState(false);
  const [gridHeaderVisible, setGridHeaderVisible] = useState(false);
  const [trayectoriaVisible, setTrayectoriaVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    // Animamos el banner de inmediato al montar la página
    setBannerVisible(true);

    const observerOptions = {
      root: null,
      rootMargin: "-8% 0px -8% 0px", // Margen ideal para capturar la entrada visual antes del tope
      threshold: 0.1,
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Evaluamos cuál sección entró al viewport y activamos su fade-in up
          if (entry.target === cifrasRef.current) setCifrasVisibles(true);
          if (entry.target === gridHeaderRef.current) setGridHeaderVisible(true);
          if (entry.target === trayectoriaRef.current) setTrayectoriaVisible(true);
          if (entry.target === ctaRef.current) setCtaVisible(true);

          // Si es el contenedor del grid de tarjetas, animamos sus hijos de forma escalonada
          if (entry.target === gridCardsRef.current) {
            const cards = entry.target.querySelectorAll(".servicio-card");
            cards.forEach((card) => {
              card.classList.add("opacity-100", "translate-y-0", "scale-100");
              card.classList.remove("opacity-0", "translate-y-12", "scale-95");
            });
          }
          
          // Dejamos de observar la sección una vez que ya apareció
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Registramos las referencias en el observador nativo
    if (cifrasRef.current) scrollObserver.observe(cifrasRef.current);
    if (gridHeaderRef.current) scrollObserver.observe(gridHeaderRef.current);
    if (gridCardsRef.current) scrollObserver.observe(gridCardsRef.current);
    if (trayectoriaRef.current) scrollObserver.observe(trayectoriaRef.current);
    if (ctaRef.current) scrollObserver.observe(ctaRef.current);

    return () => scrollObserver.disconnect();
  }, []);
  
  const servicios = [
    { titulo: "Ingeniería de Proyectos", desc: "Desarrollo de planos detallados, memorias técnicas y cálculos estructurales con estándares de alta precisión.", icono: "fa-solid fa-drafting-compass" },
    { titulo: "Supervisión de Obra", desc: "Control riguroso de ejecución, presupuestos y plazos para garantizar la calidad en cada etapa constructiva.", icono: "fa-solid fa-hard-hat" },
    { titulo: "Modelado BIM", desc: "Implementación de metodologías BIM para optimizar recursos y visualizar tu proyecto antes de la construcción.", icono: "fa-solid fa-cube" },
    { titulo: "Licencias y Permisos", desc: "Gestión integral de trámites municipales y legales para asegurar que tu obra cumpla con toda la normativa.", icono: "fa-solid fa-file-contract" },
    { titulo: "Consultoría Técnica", desc: "Asesoramiento especializado para la optimización de procesos constructivos y eficiencia energética.", icono: "fa-solid fa-lightbulb" },
    { titulo: "Estudios de Suelos", desc: "Análisis geotécnicos detallados para garantizar la estabilidad y seguridad de tus cimentaciones.", icono: "fa-solid fa-mountain" }
  ];

  const manejarConsultaServicio = (servicioNombre) => {
    navigate('/contacto', { state: { asunto: `Consulta sobre: ${servicioNombre}` } });
  };

  return (
    <div id="servicios" className="min-h-screen bg-white relative overflow-x-hidden font-raleway text-gray-900 selection:bg-impulso-orange selection:text-white">
      
      {/* 1. BANNER PRINCIPAL */}
      <div ref={bannerRef} className="relative w-full h-[65vh] flex items-center justify-start overflow-hidden z-10">
        <img 
          src="img/proyectos/banner-02.avif" 
          alt="Modern Architecture" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative z-10 px-6 md:px-20 max-w-[1200px] mx-auto w-full">
          <div className={`transition-all duration-1000 ease-out transform ${bannerVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
            <span className="text-impulso-orange font-outfit font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
              Ingeniería & Diseño
            </span>
            <h1 className="text-4xl md:text-7xl font-outfit font-black uppercase text-white leading-[1.1] mb-6 tracking-tighter">
              Nuestros Servicios
            </h1>
            <div className="w-20 h-1 bg-impulso-orange mb-6"></div>
            <p className="text-white/80 text-lg md:text-xl font-light italic max-w-xl">
              Convertimos visiones arquitectónicas en infraestructuras de alto rendimiento bajo rigurosos cálculos de ingeniería.
            </p>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE CIFRAS / ESTADÍSTICAS */}
      <div ref={cifrasRef} className="bg-gray-900 text-white py-12 relative z-20 shadow-xl border-b border-white/5">
        <div className={`max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 ease-out transform ${cifrasVisibles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div>
            <p className="text-3xl md:text-4xl font-outfit font-black text-impulso-orange">
              <ContadorAnimado valorFinal={100} sufijo="%" activo={cifrasVisibles} />
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Precisión Estructural</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-outfit font-black text-impulso-orange">
              <ContadorAnimado valorFinal={40} sufijo="+" activo={cifrasVisibles} />
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Proyectos Optimizados</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-outfit font-black text-impulso-orange">
              <ContadorAnimado valorFinal="BIM" activo={cifrasVisibles} />
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Metodología Integrada</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-outfit font-black text-impulso-orange">
              <ContadorAnimado valorFinal="RNE" activo={cifrasVisibles} />
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Cumplimiento Normativo</p>
          </div>
        </div>
      </div>

      {/* 3. GRID DE SERVICIOS */}
      <div className="max-w-[1200px] mx-auto px-6 py-24 relative z-10">
        <div ref={gridHeaderRef} className={`mb-16 text-center transition-all duration-1000 ease-out transform ${gridHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="text-impulso-orange font-outfit text-xs font-bold uppercase tracking-widest block mb-2">Soluciones Integrales</span>
          <h2 className="text-3xl md:text-4xl font-outfit font-black text-gray-900 uppercase">
             Capacidades Técnicas
          </h2>
          <div className="w-12 h-1 bg-impulso-orange mx-auto mt-4"></div>
        </div>

        {/* Contenedor controlado por IntersectionObserver para sus hijos */}
        <div ref={gridCardsRef} className="grid md:grid-cols-3 gap-8">
          {servicios.map((s, index) => (
            <div 
              key={index} 
              style={{ transitionDelay: `${index * 80}ms` }}
              className="servicio-card bg-white p-8 md:p-10 border border-gray-100 shadow-md hover:border-impulso-orange/50 hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between group rounded-xl transform transition-all duration-700 ease-out opacity-0 translate-y-12 scale-95"
            >
              <div>
                <div className="mb-6 w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-impulso-orange/10 transition-colors">
                  <i className={`${s.icono} text-3xl text-impulso-orange`}></i>
                </div>
                <h3 className="text-lg font-outfit font-bold uppercase mb-4 text-gray-900 tracking-tight">{s.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{s.desc}</p>
              </div>
              
              <button 
                onClick={() => manejarConsultaServicio(s.titulo)}
                className="text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-impulso-orange flex items-center gap-2 transition-colors border-t border-gray-100 pt-4 mt-auto w-full text-left cursor-pointer"
              >
                Cotizar Servicio <i className="fa-solid fa-arrow-right-long text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SECCIÓN SOBRE NOSOTROS / TRAYECTORIA */}
      <section className="py-24 bg-gray-50/80 backdrop-blur-sm relative z-10 border-t border-gray-100">
        <div ref={trayectoriaRef} className={`max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out transform ${trayectoriaVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          
          <div className="relative">
            <div className="absolute inset-0 bg-impulso-orange/10 rounded-2xl transform translate-x-3 translate-y-3 -z-10"></div>
            <img 
              src="https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg" 
              alt="Equipo de trabajo" 
              className="rounded-2xl shadow-2xl w-full h-[480px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-impulso-orange text-white p-6 md:p-8 rounded-xl hidden md:block shadow-xl">
              <p className="text-4xl font-outfit font-black">
                <ContadorAnimado valorFinal={5} sufijo="+" activo={trayectoriaVisible} />
              </p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-90">Años de experiencia</p>
            </div>
          </div>

          <div>
            <span className="text-impulso-orange font-outfit font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              Trayectoria Comercial
            </span>
            <h2 className="text-3xl md:text-4xl font-outfit font-black text-gray-900 uppercase mb-6 leading-tight">
              Diseñamos el futuro con absoluta precisión.
            </h2>
            <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed text-justify">
              En Impulso, no solo construimos estructuras; creamos soluciones integrales que fusionan la estética arquitectónica con la rigurosidad de la ingeniería moderna. Nuestro enfoque combina tecnología BIM de vanguardia con un compromiso inquebrantable hacia la calidad y la sostenibilidad regional.
            </p>
            
            <ul className="space-y-3.5 mb-10">
              <li className="flex items-center text-gray-700 text-sm font-medium"><i className="fa-solid fa-circle-check text-impulso-orange mr-3 text-base"></i> Enfoque analítico en eficiencia energética.</li>
              <li className="flex items-center text-gray-700 text-sm font-medium"><i className="fa-solid fa-circle-check text-impulso-orange mr-3 text-base"></i> Equipo multidisciplinario especializado.</li>
              <li className="flex items-center text-gray-700 text-sm font-medium"><i className="fa-solid fa-circle-check text-impulso-orange mr-3 text-base"></i> Cumplimiento estricto de cronogramas y presupuestos.</li>
            </ul>

            <button 
              onClick={() => navigate('/contacto')}
              className="bg-gray-900 text-white px-8 py-4 uppercase font-bold text-xs tracking-widest hover:bg-impulso-orange transition-all duration-300 shadow-lg rounded-sm cursor-pointer"
            >
              Hablemos de tu proyecto
            </button>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN CTA DE CIERRE */}
      <section className="bg-[#000d26] text-white py-20 text-center relative z-10 border-t border-white/5">
        <div ref={ctaRef} className={`max-w-2xl mx-auto px-6 space-y-6 transition-all duration-1000 ease-out transform ${ctaVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          <h3 className="text-2xl md:text-3xl font-outfit font-black uppercase tracking-tight">
            ¿Tienes un requerimiento técnico específico?
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Ejecutamos consultorías personalizadas, firmas de planos y asesoramientos bajo normativas municipales vigentes.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => navigate('/contacto')}
              className="bg-impulso-orange hover:bg-white hover:text-gray-900 text-white px-8 py-3.5 uppercase font-bold text-xs tracking-widest transition-all duration-300 rounded-sm shadow-md cursor-pointer"
            >
              Solicitar Presupuesto Técnico
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}