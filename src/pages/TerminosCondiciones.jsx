import { useState, useEffect, useRef } from "react";

// 🔢 Sub-componente interno para la animación contable de números
function ContadorAnimado({ valorFinal, sufijo = "", duracion = 2000, activo }) {
  const [cuenta, setCuenta] = useState(0);

useEffect(() => {
    if (!activo) return;

    const numeroObjetivo = parseInt(valorFinal, 10);
    if (isNaN(numeroObjetivo)) {
      // Forzamos a que se guarde como String o el valor directo sin romper la ejecución
      setCuenta(() => valorFinal);
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

export default function TrayectoriaYOpiniones() {
  const seccionRef = useRef(null);
  const [seccionVisible, setSeccionVisible] = useState(false);

  useEffect(() => {
    // Definimos la función que activa la animación
    const activarEfecto = () => {
      setTimeout(() => {
        setSeccionVisible(true);
      }, 100); // Pequeño delay estratégico para asegurar el ciclo de renderizado
    };

    // 1. Verificación inmediata por si recarga encima de la sección
    if (seccionRef.current) {
      const rect = seccionRef.current.getBoundingClientRect();
      const estaEnPantalla = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (estaEnPantalla) {
        activarEfecto();
        return; // Detiene el observer si ya se activó por recarga
      }
    }

    // 2. Observer nativo por si el usuario llega mediante scroll clásico
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.05,
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activarEfecto();
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (seccionRef.current) {
      scrollObserver.observe(seccionRef.current);
    }

    return () => scrollObserver.disconnect();
  }, []);

  const estadisticas = [
    { valor: "10", sufijo: "+", desc: "Años de experiencia en arquitectura y construcción" },
    { valor: "50", sufijo: "+", desc: "Proyectos residenciales ejecutados" },
    { valor: "100", sufijo: "%", desc: "Proyectos con metodología BIM" },
    { valor: "5", sufijo: "+", desc: "Ciudades donde hemos operado" },
  ];

  return (
    <section 
      ref={seccionRef} 
      className="py-24 bg-white font-raleway overflow-hidden relative border-t border-gray-100"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* 1. ENCABEZADO TÉCNICO */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
            seccionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-impulso-orange font-outfit text-xs font-bold uppercase tracking-widest block mb-2">
            Respaldo Técnico
          </span>
          <h2 className="text-3xl md:text-4xl font-outfit font-black text-gray-900 uppercase">
            Nuestra Trayectoria Profesional
          </h2>
          <div className="w-12 h-1 bg-impulso-orange mx-auto mt-4 mb-6"></div>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            Ahora expandimos nuestros servicios a Huaraz con el mismo estándar técnico y profesional que nos caracteriza.
          </p>
        </div>

        {/* 2. GRID DE ESTADÍSTICAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center mb-24">
          {estadisticas.map((est, index) => (
            <div 
              key={index}
              style={{ transitionDelay: seccionVisible ? `${index * 100}ms` : "0ms" }}
              className={`transform transition-all duration-700 ease-out p-4 ${
                seccionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
              }`}
            >
              <p className="text-4xl md:text-5xl font-outfit font-black text-[#02184c] tracking-tight">
                {est.sufijo === "%" ? "" : est.sufijo}
                <ContadorAnimado valorFinal={est.valor} sufijo={est.sufijo === "%" ? "%" : ""} activo={seccionVisible} />
              </p>
              <p className="text-xs md:text-sm text-gray-600 font-medium mt-3 leading-relaxed max-w-[180px] mx-auto">
                {est.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 3. SECCIÓN DE OPINIONES REALES */}
        <div 
          style={{ transitionDelay: seccionVisible ? "400ms" : "0ms" }}
          className={`border-t border-gray-100 pt-16 text-center transform transition-all duration-1000 ease-out ${
            seccionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-impulso-orange font-outfit text-xs font-bold uppercase tracking-widest block mb-2">
            Opiniones Reales
          </span>
          <h3 className="text-xl md:text-2xl font-outfit font-bold text-gray-900 uppercase tracking-tight">
            Clientes que confían en nuestro criterio
          </h3>
        </div>

      </div>
    </section>
  );
}