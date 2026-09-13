// src/components/TrayectoriaYValor.jsx
import { useState, useEffect, useRef } from "react";

const BENEFICIOS = [
  {
    id: 1,
    icon: "fa-compass-drafting",
    title: "Diseño Personalizado",
    desc: "Planos arquitectónicos adaptados perfectamente a las características de tu terreno a nivel nacional.",
    img: "img/proyectos/torre-leguia.webp",
  },
  {
    id: 2,
    icon: "fa-helmet-safety",
    title: "Acompañamiento Técnico",
    desc: "Soporte profesional continuo a los constructores durante toda la fase de ejecución física.",
    img: "img/proyectos/plaza27.webp",
  },
  {
    id: 3,
    icon: "fa-clipboard-list",
    title: "Supervisión Profesional",
    desc: "Inspección de obra rigurosa con entrega de informes técnicos periódicos del avance estructural.",
    img: "img/proyectos/trivio.webp",
  },
];

const STATS = [
  { valor: 10,  sufijo: "+", label: "Años de experiencia",   detalle: "Desde 2014 construyendo referentes" },
  { valor: 50,  sufijo: "+", label: "Proyectos ejecutados",  detalle: "Residencial, comercial y urbano"     },
  { valor: 100, sufijo: "%", label: "Metodología BIM",       detalle: "Todos nuestros proyectos modelados"  },
  { valor: 5,   sufijo: "+", label: "Ciudades de operación", detalle: "Presencia en el norte y centro"      },
];

const GRUPOS_TESTIMONIOS = [
  [
    { id: 1, iniciales: "RC", nombre: "Ricardo Castillejo", cargo: "Propietario – Vivienda Unifamiliar",   comentario: "Diseñaron mi casa con BIM y pude ver cada detalle antes de construir. Cero sorpresas en obra." },
    { id: 2, iniciales: "ME", nombre: "María Elena Prado",  cargo: "Propietaria – Edificio Multifamiliar", comentario: "La gestión de trámites municipales fue perfecta. En dos meses teníamos la licencia lista. Muy profesionales." },
    { id: 3, iniciales: "JS", nombre: "Jorge Sánchez",      cargo: "Inversionista Inmobiliario",           comentario: "Cumplieron con plazos y presupuesto. La supervisión técnica fue constante. Los recomiendo sin dudarlo." },
  ],
  [
    { id: 4, iniciales: "AA", nombre: "Alejandro Alva",  cargo: "Propietario – Casa de Campo",       comentario: "El diseño bioclimático se adaptó genial al frío de la zona. Se nota la experiencia técnica en cada propuesta." },
    { id: 5, iniciales: "CP", nombre: "Carlos Palacios", cargo: "Constructor – Complejo Comercial",   comentario: "Los informes de supervisión técnica fueron impecables. Facilitaron el control de calidad con el contratista." },
    { id: 6, iniciales: "NL", nombre: "Nancy Luna",      cargo: "Propietaria – Clínica Odontológica", comentario: "Excelente distribución de espacios en un terreno reducido. Muy enfocados en optimizar los recursos." },
  ],
  [
    { id: 7, iniciales: "FR", nombre: "Fernando Rosales", cargo: "Inversionista – Departamentos",  comentario: "Un soporte legal y municipal A1. Nos ahorraron multas y retrasos gracias a que los planos estaban perfectos." },
    { id: 8, iniciales: "SI", nombre: "Sonia Izquierdo",  cargo: "Propietaria – Edificio Familiar", comentario: "La claridad con los costos desde el primer día nos dio la tranquilidad que necesitábamos para financiar la obra." },
    { id: 9, iniciales: "VM", nombre: "Víctor Mendoza",   cargo: "Propietario – Local Comercial",   comentario: "Cumplieron estrictamente con los tiempos de entrega pactados. Un trato corporativo muy serio y profesional." },
  ],
];

function useCounter(target, active, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
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

export default function TrayectoriaYValor() {
  const benefRef = useRef(null);
  const statsRef = useRef(null);
  const [benefVisible, setBenefVisible] = useState(false);
  const [statsActive,  setStatsActive]  = useState(false);
  const [grupoActivo,  setGrupoActivo]  = useState(0);
  const [hoveredBenef, setHoveredBenef] = useState(null);

  const c0 = useCounter(STATS[0].valor, statsActive, 900);
  const c1 = useCounter(STATS[1].valor, statsActive, 1100);
  const c2 = useCounter(STATS[2].valor, statsActive, 1300);
  const c3 = useCounter(STATS[3].valor, statsActive, 700);
  const counts = [c0, c1, c2, c3];

  useEffect(() => {
    const opts = { threshold: 0.12 };
    const obB = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBenefVisible(true); obB.disconnect(); } }, opts);
    const obS = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsActive(true);  obS.disconnect(); } }, opts);
    if (benefRef.current) obB.observe(benefRef.current);
    if (statsRef.current) obS.observe(statsRef.current);
    return () => { obB.disconnect(); obS.disconnect(); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setGrupoActivo(p => (p + 1) % GRUPOS_TESTIMONIOS.length), 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full overflow-hidden selection:bg-impulso-orange selection:text-white">

      {/* ══════════════════════════════════════════════════════
          SECCIÓN 1 — BENEFICIOS con foto de fondo
      ══════════════════════════════════════════════════════ */}
      <section ref={benefRef} className="w-full border-t border-gray-300 bg-[#f5f3ef]">

        {/* Encabezado */}
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-20 pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className={`transition-all duration-1000 ${benefVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Por qué elegirnos
            </span>
            <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Lo que obtienes<br />
              <span className="text-impulso-orange">al trabajar con nosotros</span>
            </h2>
          </div>
          <p className={`font-raleway text-gray-500 text-sm leading-relaxed max-w-xs md:text-right transition-all duration-1000 delay-200 ${benefVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            No vendemos planos sueltos — desarrollamos proyectos integrales y viables de principio a fin.
          </p>
        </div>

        {/* Grid de beneficios con foto — 3 columnas, hover revela imagen */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {BENEFICIOS.map((b, i) => (
            <div
              key={b.id}
              className={`relative overflow-hidden cursor-default transition-all duration-700 ${benefVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${i < 2 ? "md:border-r border-gray-300" : ""} border-t border-gray-300`}
              style={{ height: 360, transitionDelay: `${i * 120}ms` }}
              onMouseEnter={() => setHoveredBenef(b.id)}
              onMouseLeave={() => setHoveredBenef(null)}
            >
              {/* Foto de fondo — aparece al hover */}
              <img
                src={b.img}
                alt={b.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                style={{ opacity: hoveredBenef === b.id ? 0.25 : 0, transform: hoveredBenef === b.id ? "scale(1.03)" : "scale(1.08)" }}
              />

              {/* Fondo sólido crudo — se ve cuando no hay hover */}
              <div className="absolute inset-0 bg-[#f5f3ef] transition-opacity duration-700"
                style={{ opacity: hoveredBenef === b.id ? 0 : 1 }} />

              {/* Contenido */}
              <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-12">
                <div>
                  {/* Número grande decorativo */}
                  <span className="font-outfit font-black text-gray-200 leading-none block mb-6 select-none"
                    style={{ fontSize: "4rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-8 h-px bg-impulso-orange mb-5" />
                  <i className={`fa-solid ${b.icon} text-gray-400 text-xl mb-4 block transition-colors duration-500 ${hoveredBenef === b.id ? "text-impulso-orange" : ""}`} />
                  <h4 className="font-outfit font-black text-gray-900 text-sm uppercase tracking-wider mb-3">
                    {b.title}
                  </h4>
                </div>
                <p className="font-raleway text-gray-500 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECCIÓN 2 — STATS con imagen de fondo
      ══════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="relative w-full overflow-hidden" style={{ minHeight: 480 }}>

        {/* Imagen de fondo */}
        <img
          src="img/proyectos/torre-leguia.webp"
          alt="Trayectoria"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-950/88" />

        <div className="relative z-10 max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-28">

          {/* Encabezado */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
                Respaldo profesional
              </span>
              <h2 className="font-outfit font-black text-white leading-none tracking-tighter"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                Nuestra<br />trayectoria
              </h2>
            </div>
            <p className="font-raleway text-gray-400 text-sm leading-relaxed max-w-xs md:text-right">
              Expandimos nuestros servicios con el mismo estándar técnico y profesional.
            </p>
          </div>

          <div className="w-full h-px bg-white/10 mb-16" />

          {/* Stats — 4 cols con detalle debajo */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`py-8 transition-all duration-700 ${i < 3 ? "border-r border-white/10 pr-8" : ""} ${statsActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ paddingLeft: i > 0 ? "2rem" : 0, transitionDelay: `${i * 120}ms` }}
              >
                <div className="font-outfit font-black text-impulso-orange leading-none tracking-tighter tabular-nums mb-3"
                  style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
                  {s.sufijo === "%" ? `${counts[i]}%` : `+${counts[i]}`}
                </div>
                <p className="font-outfit font-black text-white text-xs md:text-sm uppercase tracking-wider mb-1">
                  {s.label}
                </p>
                <p className="font-raleway text-gray-500 text-xs leading-snug hidden md:block">
                  {s.detalle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECCIÓN 3 — TESTIMONIOS editorial
      ══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#f5f3ef] border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-20 pb-20">

          {/* Encabezado */}
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
                Opiniones reales
              </span>
              <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                Clientes que confían<br />
                <span className="text-impulso-orange">en nuestro criterio</span>
              </h2>
            </div>

            {/* Navegación */}
            <div className="flex items-center gap-4 self-end pb-1">
              <span className="font-outfit text-xs text-gray-400 tabular-nums">
                {(grupoActivo + 1).toString().padStart(2,"0")} / {GRUPOS_TESTIMONIOS.length.toString().padStart(2,"0")}
              </span>
              <button
                onClick={() => setGrupoActivo(p => (p - 1 + GRUPOS_TESTIMONIOS.length) % GRUPOS_TESTIMONIOS.length)}
                className="w-9 h-9 border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-xs" />
              </button>
              <button
                onClick={() => setGrupoActivo(p => (p + 1) % GRUPOS_TESTIMONIOS.length)}
                className="w-9 h-9 border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200 cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-xs" />
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-14" />

          {/* Slider */}
          <div className="relative min-h-[300px]">
            {GRUPOS_TESTIMONIOS.map((grupo, idx) => (
              <div
                key={idx}
                className={`grid md:grid-cols-3 transition-all duration-700 ${
                  idx === grupoActivo
                    ? "opacity-100 translate-x-0 pointer-events-auto relative"
                    : "absolute inset-0 opacity-0 translate-x-8 pointer-events-none"
                }`}
              >
                {grupo.map((test, ti) => (
                  <div
                    key={test.id}
                    className={`flex flex-col justify-between py-8 ${
                      ti === 0 ? "pr-8" : ti === 1 ? "px-8 border-l border-r border-gray-300" : "pl-8"
                    }`}
                  >
                    <div>
                      {/* Comilla tipográfica grande */}
                      <span className="font-outfit font-black text-gray-200 leading-none block mb-3 select-none"
                        style={{ fontSize: "3.5rem", lineHeight: 1 }}>
                        "
                      </span>
                      <p className="font-raleway text-gray-600 text-sm leading-relaxed">
                        {test.comentario}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
                      <div className="w-9 h-9 bg-gray-900 text-white font-outfit font-black text-xs flex items-center justify-center flex-shrink-0">
                        {test.iniciales}
                      </div>
                      <div>
                        <p className="font-outfit font-bold text-gray-900 text-xs tracking-wide">{test.nombre}</p>
                        <p className="font-raleway text-gray-400 text-[11px] mt-0.5">{test.cargo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}