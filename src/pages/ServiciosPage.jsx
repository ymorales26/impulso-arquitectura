// src/pages/ServiciosPage.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function useCounter(target, active, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || isNaN(target)) return;
    const steps = 40;
    const step  = target / steps;
    const delay = duration / steps;
    let current = 0;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { setValue(target); clearInterval(t); }
      else setValue(Math.floor(current));
    }, delay);
    return () => clearInterval(t);
  }, [active, target, duration]);
  return value;
}

const SERVICIOS = [
  { titulo: "Ingeniería de Proyectos",  desc: "Desarrollo de planos detallados, memorias técnicas y cálculos estructurales con estándares de alta precisión.",                     icon: "fa-drafting-compass" },
  { titulo: "Supervisión de Obra",      desc: "Control riguroso de ejecución, presupuestos y plazos para garantizar la calidad en cada etapa constructiva.",                        icon: "fa-hard-hat"         },
  { titulo: "Modelado BIM",             desc: "Implementación de metodologías BIM para optimizar recursos y visualizar tu proyecto antes de la construcción.",                       icon: "fa-cube"             },
  { titulo: "Licencias y Permisos",     desc: "Gestión integral de trámites municipales y legales para asegurar que tu obra cumpla con toda la normativa vigente.",                  icon: "fa-file-contract"    },
  { titulo: "Consultoría Técnica",      desc: "Asesoramiento especializado para la optimización de procesos constructivos y eficiencia energética en tu proyecto.",                  icon: "fa-lightbulb"        },
  { titulo: "Estudios de Suelos",       desc: "Análisis geotécnicos detallados para garantizar la estabilidad y seguridad de tus cimentaciones en cualquier terreno.",              icon: "fa-mountain"         },
];

const STATS = [
  { valor: 100, sufijo: "%", label: "Precisión estructural" },
  { valor: 40,  sufijo: "+", label: "Proyectos optimizados" },
  { valor: 10,  sufijo: "+", label: "Años de experiencia"   },
  { valor: 5,   sufijo: "+", label: "Ciudades de operación" },
];

export default function ServiciosPage() {
  const navigate = useNavigate();

  const [bannerVisible,  setBannerVisible]  = useState(false);
  const [statsActive,    setStatsActive]    = useState(false);
  const [serviciosVis,   setServiciosVis]   = useState(false);
  const [trayVis,        setTrayVis]        = useState(false);
  const [ctaVis,         setCtaVis]         = useState(false);

  const statsRef     = useRef(null);
  const serviciosRef = useRef(null);
  const trayRef      = useRef(null);
  const ctaRef       = useRef(null);

  const c0 = useCounter(STATS[0].valor, statsActive, 900);
  const c1 = useCounter(STATS[1].valor, statsActive, 1100);
  const c2 = useCounter(STATS[2].valor, statsActive, 800);
  const c3 = useCounter(STATS[3].valor, statsActive, 700);
  const counts = [c0, c1, c2, c3];

  useEffect(() => {
    setBannerVisible(true);
    const opts = { threshold: 0.12 };
    const make = (setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); } }, opts);
    const obStats = make(setStatsActive);
    const obServ  = make(setServiciosVis);
    const obTray  = make(setTrayVis);
    const obCta   = make(setCtaVis);
    if (statsRef.current)     obStats.observe(statsRef.current);
    if (serviciosRef.current) obServ.observe(serviciosRef.current);
    if (trayRef.current)      obTray.observe(trayRef.current);
    if (ctaRef.current)       obCta.observe(ctaRef.current);
    return () => [obStats, obServ, obTray, obCta].forEach(o => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900 font-raleway selection:bg-impulso-orange selection:text-white">

      {/* ── BANNER ────────────────────────────────────────────────── */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="img/proyectos/banner-02.avif"
          alt="Servicios"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: bannerVisible ? "scale(1.04)" : "scale(1)",
            transition: "transform 7000ms ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-14">
          <div className={`transition-all duration-1000 ${bannerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Capacidades técnicas
            </span>
            <h1
              className="font-outfit font-black text-white leading-none tracking-tighter"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              Nuestros<br />Servicios
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </div>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-gray-950 text-white">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`py-8 pr-8 transition-all duration-700 ${i < 3 ? "border-r border-white/10" : ""} ${statsActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="font-outfit font-black text-impulso-orange leading-none tracking-tighter tabular-nums"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                >
                  {s.sufijo === "%" ? `${counts[i]}%` : `+${counts[i]}`}
                </div>
                <p className="font-raleway text-gray-400 text-xs md:text-sm mt-3 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID DE SERVICIOS ──────────────────────────────────────── */}
      <section ref={serviciosRef} className="border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-20 pb-4">
          <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
            Soluciones integrales
          </span>
          <h2
            className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Capacidades<br />
            <span className="text-impulso-orange">del estudio</span>
          </h2>
        </div>

        {/* Divisor */}
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 mt-12">
          <div className="w-full h-px bg-gray-300" />
        </div>

        {/* Grid — mismo patrón que beneficios */}
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {SERVICIOS.map((s, i) => {
              const col   = i % 3;
              const colSm = i % 2;
              const isLastRow = i >= SERVICIOS.length - 3;
              return (
                <div
                  key={i}
                  className={[
                    "py-10 border-b border-gray-300",
                    col === 0 ? "lg:pr-10" : col === 1 ? "lg:px-10 lg:border-l lg:border-r lg:border-gray-300" : "lg:pl-10",
                    colSm === 0 ? "sm:pr-8 sm:border-r sm:border-gray-300 lg:border-r-0" : "sm:pl-8",
                    isLastRow ? "lg:border-b-0" : "",
                    "transition-all duration-700 group cursor-pointer",
                    serviciosVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  ].join(" ")}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  onClick={() => navigate("/contacto")}
                >
                  <div className="w-6 h-px bg-impulso-orange mb-6" />
                  <i className={`fa-solid ${s.icon} text-gray-400 text-lg mb-4 block group-hover:text-impulso-orange transition-colors duration-300`} />
                  <h4 className="font-outfit font-black text-gray-900 text-sm uppercase tracking-wider mb-3">
                    {s.titulo}
                  </h4>
                  <p className="font-raleway text-gray-500 text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                  <div className="inline-flex items-center gap-3 group/cta">
                    <span className="font-outfit text-[10px] font-bold uppercase tracking-[3px] text-gray-400 group-hover/cta:text-impulso-orange transition-colors duration-200">
                      Cotizar
                    </span>
                    <span className="w-4 h-px bg-gray-300 group-hover/cta:w-8 group-hover/cta:bg-impulso-orange transition-all duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ─────────────────────────────────────────── */}
      <section ref={trayRef} className="border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-24">
          <div
            className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000 ${trayVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Foto */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg"
                alt="Equipo de trabajo"
                className="w-full h-full object-cover"
              />
              {/* Badge años */}
              <div className="absolute bottom-6 right-6 bg-gray-950 text-white px-5 py-4 text-center">
                <p className="font-outfit font-black text-impulso-orange" style={{ fontSize: "2rem" }}>+5</p>
                <p className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-gray-400 mt-0.5">Años</p>
              </div>
            </div>

            {/* Texto */}
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
                Trayectoria
              </span>
              <h2
                className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-8"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                Diseñamos el futuro<br />
                <span className="text-impulso-orange">con precisión</span>
              </h2>

              <div className="w-full h-px bg-gray-300 mb-8" />

              <p className="font-raleway text-gray-600 text-sm leading-relaxed mb-8">
                En Impulso, no solo construimos estructuras — creamos soluciones integrales que fusionan la estética arquitectónica con la rigurosidad de la ingeniería moderna. Nuestro enfoque combina tecnología BIM de vanguardia con un compromiso inquebrantable hacia la calidad y la sostenibilidad regional.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Enfoque analítico en eficiencia energética",
                  "Equipo multidisciplinario especializado",
                  "Cumplimiento estricto de cronogramas y presupuestos",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-gray-700">
                    <div className="w-px h-4 bg-impulso-orange mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/contacto")}
                className="inline-flex items-center gap-4 group cursor-pointer"
              >
                <span className="font-outfit text-xs font-bold uppercase tracking-[4px] text-gray-900 group-hover:text-impulso-orange transition-colors duration-300">
                  Hablemos de tu proyecto
                </span>
                <span className="w-8 h-px bg-gray-900 group-hover:w-16 group-hover:bg-impulso-orange transition-all duration-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA CIERRE ────────────────────────────────────────────── */}
      <section ref={ctaRef} className="bg-[#f5f3ef] border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-24">
          <div
            className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 transition-all duration-1000 ${ctaVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Texto izquierdo */}
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
                ¿Tienes un proyecto?
              </span>
              <h3
                className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Trabajemos<br />
                <span className="text-impulso-orange">juntos</span>
              </h3>
            </div>

            {/* Derecha — descripción + botón WhatsApp */}
            <div className="flex flex-col gap-6 lg:items-end">
              <p className="font-raleway text-gray-500 text-sm leading-relaxed max-w-xs lg:text-right">
                Ejecutamos consultorías personalizadas, firmas de planos y asesoramientos bajo normativas municipales vigentes.
              </p>
              <a
                href="https://wa.me/51959679522?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios.%20Tengo%20un%20proyecto%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n."
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: "#111827", color: "#ffffff" }}
                className="inline-flex items-center gap-3 font-outfit text-xs font-bold uppercase tracking-[4px] px-8 py-4 transition-all duration-300 cursor-pointer self-start lg:self-end hover:opacity-80"
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FF6B1A"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#111827"}
              >
                <i className="fa-brands fa-whatsapp text-base" />
                Solicitar información
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}