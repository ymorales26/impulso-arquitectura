// src/components/TrayectoriaYValor.jsx
import { useState, useEffect, useRef } from "react";

const BENEFICIOS = [
  { id: 1, icon: "fa-compass-drafting", title: "Diseño Personalizado", desc: "Planos arquitectónicos adaptados perfectamente a las características de tu terreno en Huaraz." },
  { id: 2, icon: "fa-calculator", title: "Costos Claros", desc: "Estimación precisa de costos desde la etapa conceptual inicial para evitar desfases económicos." },
  { id: 3, icon: "fa-file-signature", title: "Licencia Municipal", desc: "Planos técnicos y expedientes completos listos para obtener la aprobación del municipio." },
  { id: 4, icon: "fa-helmet-safety", title: "Acompañamiento Técnico", desc: "Soporte profesional continuo a los constructores durante toda la fase de ejecución física." },
  { id: 5, icon: "fa-clipboard-list", title: "Supervisión Profesional", desc: "Inspección de obra rigurosa con entrega de informes técnicos periódicos del avance estructural." },
  { id: 6, icon: "fa-building-shield", title: "Gestión de Trámites", desc: "Administración y seguimiento de expedientes ante la Municipalidad de Huaraz." }
];

const GRUPOS_TESTIMONIOS = [
  [
    { id: 1, iniciales: "RC", nombre: "Ricardo Castillejo", cargo: "Propietario – Vivienda Unifamiliar", comentario: "Excelente trabajo. Diseñaron mi casa con BIM y pude ver cada detalle antes de construir. Cero sorpresas en obra." },
    { id: 2, iniciales: "ME", nombre: "María Elena Prado", cargo: "Propietaria – Edificio Multifamiliar", comentario: "La gestión de trámites municipales fue perfecta. En dos meses teníamos la licencia lista. Muy profesionales." },
    { id: 3, iniciales: "JS", nombre: "Jorge Sánchez", cargo: "Inversionista Inmobiliario", comentario: "Cumplieron con plazos y presupuesto. La supervisión técnica fue constante. Los recomiendo sin dudarlo." }
  ],
  [
    { id: 4, iniciales: "AA", nombre: "Alejandro Alva", cargo: "Propietario – Casa de Campo", comentario: "El diseño bioclimático se adaptó genial al frío de la zona. Se nota la experiencia técnica en cada propuesta." },
    { id: 5, iniciales: "CP", nombre: "Carlos Palacios", cargo: "Constructor – Complejo Comercial", comentario: "Los informes de supervisión técnica fueron impecables. Facilitaron el control de calidad con el contratista." },
    { id: 6, iniciales: "NL", nombre: "Nancy Luna", cargo: "Propietaria – Clínica Odontológica", comentario: "Excelente distribución de espacios comerciales en un terreno reducido. Muy enfocados en optimizar recursos." }
  ],
  [
    { id: 7, iniciales: "FR", nombre: "Fernando Rosales", cargo: "Inversionista – Departamentos", comentario: "Un soporte legal y municipal A1. Nos ahorraron multas y retrasos gracias a que los planos estaban perfectos." },
    { id: 8, iniciales: "SI", nombre: "Sonia Izquierdo", cargo: "Propietaria – Edificio Familiar", comentario: "La claridad con los costos desde el primer día nos dio la tranquilidad que necesitábamos para financiar la obra." },
    { id: 9, iniciales: "VM", nombre: "Víctor Mendoza", cargo: "Propietario – Local Comercial", comentario: "Cumplieron estrictamente con los tiempos de entrega pactados. Un trato corporativo muy serio y profesional." }
  ]
];

export default function TrayectoriaYValor() {
  // Referencias para detectar el scroll
  const seccionBeneficiosRef = useRef(null);
  const seccionContadoresRef = useRef(null);

  // Estados de animación
  const [beneficiosVisibles, setBeneficiosVisibles] = useState(false);
  const [grupoActivo, setGrupoActivo] = useState(0);

  // Estados de contadores
  const [countExp, setCountExp] = useState(0);
  const [countProy, setCountProy] = useState(0);
  const [countBim, setCountBim] = useState(0);
  const [countCiudades, setCountCiudades] = useState(0);

  useEffect(() => {
    // Configuración compartida óptima para activar la animación JUSTO cuando entra al campo visual claro
    const observerOptions = {
      root: null, // usa el viewport del navegador
      rootMargin: "0px 0px -10% 0px", // Margen inferior negativo para retrasar el trigger hasta que suba un 10%
      threshold: 0.15 // Al menos el 15% de la sección debe estar visible
    };

    // 1. Observer para los Beneficios
    const observerBeneficios = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBeneficiosVisibles(true);
        observerBeneficios.unobserve(entry.target);
      }
    }, observerOptions);

    if (seccionBeneficiosRef.current) observerBeneficios.observe(seccionBeneficiosRef.current);

    // 2. Observer para los Contadores Mágicos (WordPress Style)
    const observerContadores = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Iniciar animaciones numéricas calculadas para verse fluidas en tiempo real
        const timerExp = setInterval(() => {
          setCountExp((prev) => (prev >= 10 ? (clearInterval(timerExp), 10) : prev + 1));
        }, 80);

        const timerProy = setInterval(() => {
          setCountProy((prev) => (prev >= 50 ? (clearInterval(timerProy), 50) : prev + 2));
        }, 35);

        const timerBim = setInterval(() => {
          setCountBim((prev) => (prev >= 100 ? (clearInterval(timerBim), 100) : prev + 4));
        }, 25);

        const timerCiudades = setInterval(() => {
          setCountCiudades((prev) => (prev >= 5 ? (clearInterval(timerCiudades), 5) : prev + 1));
        }, 150);

        observerContadores.unobserve(entry.target);
      }
    }, observerOptions);

    if (seccionContadoresRef.current) observerContadores.observe(seccionContadoresRef.current);

    return () => {
      observerBeneficios.disconnect();
      observerContadores.disconnect();
    };
  }, []);

  // 3. Autoplay para el slider de bloques de 3 testimonios
  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setGrupoActivo((prev) => (prev === GRUPOS_TESTIMONIOS.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(sliderTimer);
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 selection:bg-impulso-orange selection:text-white overflow-hidden">
      
      {/* 🟢 SECCIÓN 1: QUÉ OBTIENES (FADE-IN AJUSTADO AL PASAR) */}
      <section ref={seccionBeneficiosRef} className="w-full px-6 md:px-16 py-24 border-t border-gray-100">
        <div className="w-full grid lg:grid-cols-12 gap-12 items-start">
          
          <div className={`lg:col-span-5 md:max-w-xl transition-all duration-1000 transform ${beneficiosVisibles ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
            <span className="text-impulso-orange font-bold tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">
              Proyectistas e Ingenieros S.A.C.
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase font-outfit tracking-tight leading-[1.1]">
              Qué Obtienes al Trabajar con Nosotros
            </h2>
            <div className="w-16 h-1 bg-impulso-orange my-6"></div>
            
            <div className="mt-8 bg-gray-50 border-l-4 border-gray-900 p-5 rounded-r-xl shadow-sm">
              <p className="font-raleway text-sm font-bold text-gray-900">📢 No vendemos planos sueltos.</p>
              <p className="font-raleway text-xs text-gray-600 mt-1 font-medium">Desarrollamos proyectos integrales y viables de principio a fin.</p>
            </div>
          </div>

          <div className={`lg:col-span-7 grid sm:grid-cols-2 gap-6 w-full transition-all duration-1000 delay-200 transform ${beneficiosVisibles ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
            {BENEFICIOS.map((b) => (
              <div key={b.id} className="p-6 border border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300">
                <i className={`fa-solid ${b.icon} text-impulso-orange text-2xl mb-4`}></i>
                <h4 className="font-outfit font-bold text-gray-900 uppercase text-sm tracking-wide">{b.title}</h4>
                <p className="font-raleway text-xs text-gray-500 mt-2 leading-relaxed font-medium">{b.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 📊 SECCIÓN 2: TRAYECTORIA (SINCRO PERFECTA DE NÚMEROS WORDPRESS STYLE) */}
      <section ref={seccionContadoresRef} className="w-full bg-gray-900 text-white px-6 md:px-16 py-20 relative">
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-impulso-orange font-bold tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">Respaldo Técnico</span>
            <h2 className="text-2xl md:text-4xl font-black uppercase font-outfit tracking-tight">Nuestra Trayectoria Profesional</h2>
            <p className="text-gray-400 font-raleway text-sm mt-3 leading-relaxed font-medium">Ahora expandimos nuestros servicios a Huaraz con el mismo estándar técnico y profesional.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full border-t border-white/10 pt-12">
          <div className="text-center sm:text-left">
            <div className="font-outfit text-4xl md:text-6xl font-black text-impulso-orange tracking-tighter mb-2 tabular-nums">+{countExp}</div>
            <p className="font-raleway text-xs md:text-sm text-gray-300 font-semibold">Años de experiencia en arquitectura y construcción</p>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-outfit text-4xl md:text-6xl font-black text-impulso-orange tracking-tighter mb-2 tabular-nums">+{countProy}</div>
            <p className="font-raleway text-xs md:text-sm text-gray-300 font-semibold">Proyectos residenciales ejecutados</p>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-outfit text-4xl md:text-6xl font-black text-impulso-orange tracking-tighter mb-2 tabular-nums">{countBim}%</div>
            <p className="font-raleway text-xs md:text-sm text-gray-300 font-semibold">Proyectos con metodología BIM</p>
          </div>
          <div className="text-center sm:text-left">
            <div className="font-outfit text-4xl md:text-6xl font-black text-impulso-orange tracking-tighter mb-2 tabular-nums">+{countCiudades}</div>
            <p className="font-raleway text-xs md:text-sm text-gray-300 font-semibold">Ciudades donde hemos operado</p>
          </div>
        </div>
      </section>

      {/* 💬 SECCIÓN 3: TESTIMONIOS */}
      <section className="w-full bg-gray-50 px-6 md:px-16 py-24 border-b border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-impulso-orange font-bold tracking-[0.2em] uppercase text-xs mb-3 block font-outfit">Opiniones Reales</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase font-outfit tracking-tight">Clientes que confían en nuestro criterio</h2>
          </div>

          {/* Renderizado de Bloque Activo */}
          <div className="relative min-h-[300px]">
            {GRUPOS_TESTIMONIOS.map((grupo, idx) => (
              <div 
                key={idx} 
                className={`grid md:grid-cols-3 gap-8 items-stretch transition-all duration-1000 transform ${
                  idx === grupoActivo ? "opacity-100 translate-x-0 scale-100" : "absolute inset-0 opacity-0 pointer-events-none translate-x-12 scale-95"
                }`}
              >
                {grupo.map((test) => (
                  <div key={test.id} className="bg-white border border-gray-200/70 p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div>
                      <i className="fa-solid fa-quote-left text-gray-100 text-4xl block mb-4"></i>
                      <p className="font-raleway text-gray-600 text-sm italic leading-relaxed font-medium mb-6">"{test.comentario}"</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-impulso-orange text-white font-outfit font-black flex items-center justify-center text-xs shrink-0">{test.iniciales}</div>
                      <div className="overflow-hidden">
                        <h4 className="font-outfit font-bold text-gray-900 text-xs md:text-sm tracking-wide truncate">{test.nombre}</h4>
                        <p className="font-raleway text-gray-400 text-[11px] font-semibold truncate">{test.cargo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Puntos Controladores del Slider */}
          <div className="flex justify-center gap-2 mt-12">
            {GRUPOS_TESTIMONIOS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setGrupoActivo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === grupoActivo ? "w-8 bg-impulso-orange" : "w-2 bg-gray-300"}`}
                aria-label={`Grupo de opiniones ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}