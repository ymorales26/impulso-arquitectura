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

// Servicios con imagen de fondo propia para hacerlo visual
const SERVICIOS = [
  {
    titulo: "Diseño de Arquitectura",
    desc: "Proyectos residenciales, comerciales y de uso mixto con enfoque funcional, estético y adaptado al territorio.",
    icon: "fa-drafting-compass",
    img: "img/proyectos/torre-leguia.webp",
    items: ["Anteproyecto y proyecto definitivo", "Renders y visualización 3D", "Planos de detalle y especificaciones"],
  },
  {
    titulo: "Desarrollo de Proyectos",
    desc: "Gestión integral desde la concepción hasta la entrega, incluyendo licencias, presupuesto y supervisión de obra.",
    icon: "fa-hard-hat",
    img: "img/proyectos/plaza27.webp",
    items: ["Expediente técnico completo", "Gestión de licencias municipales", "Supervisión y control de obra"],
  },
  {
    titulo: "Habilitaciones Urbanas",
    desc: "Diseño y ejecución de urbanizaciones con redes de servicios, vías, lotes y áreas comunes bajo normativa vigente.",
    icon: "fa-map",
    img: "img/proyectos/trivio.webp",
    items: ["Lotización y diseño vial", "Redes de agua, desagüe y electricidad", "Trámites de habilitación urbana"],
  },
  {
    titulo: "Modelado BIM",
    desc: "Implementación de metodología BIM para optimizar recursos, detectar interferencias y mejorar la coordinación.",
    icon: "fa-cube",
    img: "img/proyectos/torre-leguia.webp",
    items: ["Modelado arquitectónico y estructural", "Coordinación multidisciplinaria", "LOD 200 – 400 según requerimiento"],
  },
  {
    titulo: "Consultoría Técnica",
    desc: "Asesoramiento especializado en normativa, eficiencia estructural, optimización de costos y procesos constructivos.",
    icon: "fa-lightbulb",
    img: "img/proyectos/plaza27.webp",
    items: ["Revisión de expedientes técnicos", "Peritaje y evaluación estructural", "Asesoría en normativa RNE"],
  },/*
  {
    titulo: "Estudios de Suelos",
    desc: "Análisis geotécnicos para garantizar la estabilidad de cimentaciones en cualquier tipo de terreno y altitud.",
    icon: "fa-mountain",
    img: "img/proyectos/trivio.webp",
    items: ["Ensayos de laboratorio certificados", "Informe geotécnico normativo", "Recomendación de tipo de cimentación"],
  },*/
];

const STATS = [
  { valor: 100, sufijo: "%", label: "Precisión estructural" },
  { valor: 50,  sufijo: "+", label: "Proyectos ejecutados"  },
  { valor: 10,  sufijo: "+", label: "Años de experiencia"   },
  { valor: 5,   sufijo: "+", label: "Ciudades de operación" },
];

export default function ServiciosPage() {
  const navigate = useNavigate();

  const [bannerVisible, setBannerVisible] = useState(false);
  const [statsActive,   setStatsActive]   = useState(false);
  const [ctaVis,        setCtaVis]        = useState(false);

  const statsRef = useRef(null);
  const ctaRef   = useRef(null);

  const c0 = useCounter(STATS[0].valor, statsActive, 900);
  const c1 = useCounter(STATS[1].valor, statsActive, 1100);
  const c2 = useCounter(STATS[2].valor, statsActive, 800);
  const c3 = useCounter(STATS[3].valor, statsActive, 700);
  const counts = [c0, c1, c2, c3];

  useEffect(() => {
    setBannerVisible(true);
    const opts = { threshold: 0.12 };
    const make = (setter) => new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setter(true); }, opts
    );
    const obStats = make(setStatsActive);
    const obCta   = make(setCtaVis);
    if (statsRef.current) obStats.observe(statsRef.current);
    if (ctaRef.current)   obCta.observe(ctaRef.current);
    return () => [obStats, obCta].forEach(o => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900 font-raleway selection:bg-impulso-orange selection:text-white">

      {/* ── BANNER ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="img/proyectos/banner-02.avif"
          alt="Servicios"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: bannerVisible ? "scale(1.04)" : "scale(1)", transition: "transform 7000ms ease-out" }}
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
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`py-6 transition-all duration-700 ${i < 3 ? "border-r border-white/10 pr-8" : ""} ${statsActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ paddingLeft: i > 0 ? "2rem" : 0, transitionDelay: `${i * 100}ms` }}
              >
                <div className="font-outfit font-black text-impulso-orange leading-none tracking-tighter tabular-nums"
                  style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
                  {s.sufijo === "%" ? `${counts[i]}%` : `+${counts[i]}`}
                </div>
                <p className="font-raleway text-gray-400 text-xs mt-2 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS — VISUAL FULLWIDTH ────────────────────────────── */}
      <section className="border-t border-gray-300">

        {/* Encabezado */}
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Soluciones integrales
            </span>
            <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              Lo que hacemos
            </h2>
          </div>
          <p className="font-raleway text-gray-500 text-sm leading-relaxed max-w-xs md:text-right">
            Desde el diseño hasta la entrega — cubrimos cada etapa de tu proyecto.
          </p>
        </div>

        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 mb-4">
          <div className="w-full h-px bg-gray-300" />
        </div>

        {/* Cards visuales — alternan foto izq/der */}
        <div className="flex flex-col">
          {SERVICIOS.map((s, i) => {
            const esInvertido = i % 2 !== 0;
            return (
              <ServiceCard
                key={i}
                servicio={s}
                esInvertido={esInvertido}
                onContact={() => navigate("/contacto")}
              />
            );
          })}
        </div>
      </section>

      {/* ── CTA CIERRE ──────────────────────────────────────────────── */}
      <section ref={ctaRef} className="border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-24">
          <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 transition-all duration-1000 ${ctaVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
                ¿Tienes un proyecto?
              </span>
              <h3 className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Trabajemos<br />
                <span className="text-impulso-orange">juntos</span>
              </h3>
            </div>
            <div className="flex flex-col gap-6 lg:items-end">
              <p className="font-raleway text-gray-500 text-sm leading-relaxed max-w-xs lg:text-right">
                Ejecutamos consultorías personalizadas, firmas de planos y asesoramientos bajo normativas municipales vigentes.
              </p>
              <a
                href="https://wa.me/51959679522?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios.%20Tengo%20un%20proyecto%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n."
                target="_blank" rel="noreferrer"
                style={{ backgroundColor: "#111827", color: "#ffffff" }}
                className="inline-flex items-center gap-3 font-outfit text-xs font-bold uppercase tracking-[4px] px-8 py-4 cursor-pointer self-start lg:self-end"
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

// ── Sub-componente: cada servicio como bloque visual ──────────────────────────
function ServiceCard({ servicio, esInvertido, onContact }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`border-b border-gray-300 last:border-b-0 transition-all duration-1000 ${vis ? "opacity-100" : "opacity-0"}`}
    >
      <div className={`flex flex-col ${esInvertido ? "lg:flex-row-reverse" : "lg:flex-row"}`}>

        {/* FOTO — ocupa 55% en desktop */}
        <div className="w-full lg:w-[55%] overflow-hidden flex-shrink-0 relative"
          style={{ aspectRatio: "16/9", minHeight: 280 }}>
          <img
            src={servicio.img}
            alt={servicio.titulo}
            className={`w-full h-full object-cover transition-transform duration-1000 ${vis ? "scale-100" : "scale-105"}`}
          />
          {/* Ícono centrado sobre la foto */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-16 h-16 border border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <i className={`fa-solid ${servicio.icon} text-white text-2xl`} />
            </div>
          </div>
        </div>

        {/* TEXTO — 45% */}
        <div className={`flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-14 py-12 bg-[#f5f3ef] ${esInvertido ? "lg:items-end lg:text-right" : ""}`}>
          <div className="w-6 h-px bg-impulso-orange mb-6" />
          <h3 className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            {servicio.titulo}
          </h3>
          <p className="font-raleway text-gray-600 text-sm leading-relaxed mb-8 max-w-sm">
            {servicio.desc}
          </p>

          {/* Lista de items */}
          <ul className={`space-y-2 mb-10 ${esInvertido ? "lg:items-end" : ""}`}>
            {servicio.items.map((item, j) => (
              <li key={j} className={`flex items-start gap-3 text-xs text-gray-500 ${esInvertido ? "lg:flex-row-reverse" : ""}`}>
                <div className="w-px h-3.5 bg-impulso-orange flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={onContact}
            className={`inline-flex items-center gap-3 group cursor-pointer ${esInvertido ? "lg:self-end" : "self-start"}`}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <span className="font-outfit text-[10px] font-bold uppercase tracking-[4px] text-gray-400 group-hover:text-impulso-orange transition-colors duration-300">
              Cotizar servicio
            </span>
            <span className="w-5 h-px bg-gray-300 group-hover:w-10 group-hover:bg-impulso-orange transition-all duration-400" />
          </button>
        </div>

      </div>
    </div>
  );
}