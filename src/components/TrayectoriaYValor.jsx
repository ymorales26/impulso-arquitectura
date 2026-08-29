// src/components/TrayectoriaYValor.jsx
import { useState, useEffect, useRef } from "react";

const BENEFICIOS = [
  { id: 1, icon: "fa-compass-drafting", title: "Diseño Personalizado",    desc: "Planos arquitectónicos adaptados perfectamente a las características de tu terreno en Huaraz." },
  { id: 2, icon: "fa-calculator",       title: "Costos Claros",           desc: "Estimación precisa de costos desde la etapa conceptual inicial para evitar desfases económicos." },
  { id: 3, icon: "fa-file-signature",   title: "Licencia Municipal",      desc: "Planos técnicos y expedientes completos listos para obtener la aprobación del municipio." },
  { id: 4, icon: "fa-helmet-safety",    title: "Acompañamiento Técnico",  desc: "Soporte profesional continuo a los constructores durante toda la fase de ejecución física." },
  { id: 5, icon: "fa-clipboard-list",   title: "Supervisión Profesional", desc: "Inspección de obra rigurosa con entrega de informes técnicos periódicos del avance estructural." },
  { id: 6, icon: "fa-building-shield",  title: "Gestión de Trámites",     desc: "Administración y seguimiento de expedientes ante la Municipalidad de Huaraz." },
];

const STATS = [
  { valor: 10,  sufijo: "+", label: "Años de experiencia" },
  { valor: 50,  sufijo: "+", label: "Proyectos ejecutados" },
  { valor: 100, sufijo: "%", label: "Metodología BIM" },
  { valor: 5,   sufijo: "+", label: "Ciudades de operación" },
];

const GRUPOS_TESTIMONIOS = [
  [
    { id: 1, iniciales: "RC", nombre: "Ricardo Castillejo", cargo: "Propietario – Vivienda Unifamiliar",   comentario: "Diseñaron mi casa con BIM y pude ver cada detalle antes de construir. Cero sorpresas en obra." },
    { id: 2, iniciales: "ME", nombre: "María Elena Prado",  cargo: "Propietaria – Edificio Multifamiliar", comentario: "La gestión de trámites municipales fue perfecta. En dos meses teníamos la licencia lista. Muy profesionales." },
    { id: 3, iniciales: "JS", nombre: "Jorge Sánchez",      cargo: "Inversionista Inmobiliario",           comentario: "Cumplieron con plazos y presupuesto. La supervisión técnica fue constante. Los recomiendo sin dudarlo." },
  ],
  [
    { id: 4, iniciales: "AA", nombre: "Alejandro Alva",   cargo: "Propietario – Casa de Campo",       comentario: "El diseño bioclimático se adaptó genial al frío de la zona. Se nota la experiencia técnica en cada propuesta." },
    { id: 5, iniciales: "CP", nombre: "Carlos Palacios",  cargo: "Constructor – Complejo Comercial",   comentario: "Los informes de supervisión técnica fueron impecables. Facilitaron el control de calidad con el contratista." },
    { id: 6, iniciales: "NL", nombre: "Nancy Luna",       cargo: "Propietaria – Clínica Odontológica", comentario: "Excelente distribución de espacios en un terreno reducido. Muy enfocados en optimizar recursos." },
  ],
  [
    { id: 7, iniciales: "FR", nombre: "Fernando Rosales", cargo: "Inversionista – Departamentos",  comentario: "Un soporte legal y municipal A1. Nos ahorraron multas y retrasos gracias a que los planos estaban perfectos." },
    { id: 8, iniciales: "SI", nombre: "Sonia Izquierdo",  cargo: "Propietaria – Edificio Familiar", comentario: "La claridad con los costos desde el primer día nos dio la tranquilidad que necesitábamos para financiar la obra." },
    { id: 9, iniciales: "VM", nombre: "Víctor Mendoza",   cargo: "Propietario – Local Comercial",   comentario: "Cumplieron estrictamente con los tiempos de entrega pactados. Un trato corporativo muy serio y profesional." },
  ],
];

// ── Hook: contador animado ────────────────────────────────────────────────────
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
  const benefRef   = useRef(null);
  const statsRef   = useRef(null);
  const [benefVisible, setBenefVisible] = useState(false);
  const [statsActive,  setStatsActive]  = useState(false);
  const [grupoActivo,  setGrupoActivo]  = useState(0);

  // Contadores
  const c0 = useCounter(STATS[0].valor, statsActive, 900);
  const c1 = useCounter(STATS[1].valor, statsActive, 1100);
  const c2 = useCounter(STATS[2].valor, statsActive, 1300);
  const c3 = useCounter(STATS[3].valor, statsActive, 700);
  const counts = [c0, c1, c2, c3];

  useEffect(() => {
    const opts = { threshold: 0.15 };
    const obB  = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBenefVisible(true);  obB.disconnect(); } }, opts);
    const obS  = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsActive(true);   obS.disconnect(); } }, opts);
    if (benefRef.current) obB.observe(benefRef.current);
    if (statsRef.current) obS.observe(statsRef.current);
    return () => { obB.disconnect(); obS.disconnect(); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setGrupoActivo(p => (p + 1) % GRUPOS_TESTIMONIOS.length), 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full bg-[#f5f3ef] text-gray-900 overflow-hidden selection:bg-impulso-orange selection:text-white">

      {/* ══════════════════════════════════════════════════════════════
          SECCIÓN 1 — QUÉ OBTIENES
      ══════════════════════════════════════════════════════════════ */}
      <section ref={benefRef} className="w-full border-t border-gray-300">

        {/* Encabezado */}
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div
            className={`transition-all duration-1000 ${benefVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Por qué elegirnos
            </span>
            <h2
              className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Lo que obtienes
              <br />
              <span className="text-impulso-orange">al trabajar con nosotros</span>
            </h2>
          </div>
          <p
            className={`font-raleway text-gray-500 text-sm leading-relaxed max-w-xs md:text-right transition-all duration-1000 delay-200 ${benefVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            No vendemos planos sueltos — desarrollamos proyectos integrales y viables de principio a fin.
          </p>
        </div>

        {/* Divisor */}
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="w-full h-px bg-gray-300" />
        </div>

        {/* Grid de beneficios */}
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {BENEFICIOS.map((b, i) => {
              const col   = i % 3;
              const colSm = i % 2;
              const isLastRow = i >= BENEFICIOS.length - 3;
              return (
              <div
                key={b.id}
                className={[
                  "py-10 border-b border-gray-300",
                  col === 0 ? "lg:pr-10" : col === 1 ? "lg:px-10 lg:border-l lg:border-r lg:border-gray-300" : "lg:pl-10",
                  colSm === 0 ? "sm:pr-8 sm:border-r sm:border-gray-300 lg:border-r-0" : "sm:pl-8",
                  isLastRow ? "lg:border-b-0" : "",
                  "transition-all duration-700",
                  benefVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                ].join(" ")}
                style={{ transitionDelay: `${i * 80 + 300}ms` }}
              >
                {/* Ícono minimalista — línea naranja arriba */}
                <div className="w-8 h-px bg-impulso-orange mb-6" />
                <i className={`fa-solid ${b.icon} text-gray-400 text-xl mb-4 block`} />
                <h4 className="font-outfit font-black text-gray-900 text-sm uppercase tracking-wider mb-3">
                  {b.title}
                </h4>
                <p className="font-raleway text-gray-500 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECCIÓN 2 — TRAYECTORIA / STATS
          Fondo oscuro — rompe el ritmo visual del scroll
      ══════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="w-full bg-gray-950 text-white">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-24">

          {/* Encabezado */}
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
                Respaldo profesional
              </span>
              <h2
                className="font-outfit font-black text-white leading-none tracking-tighter"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Nuestra
                <br />
                trayectoria
              </h2>
            </div>
            <p className="font-raleway text-gray-400 text-sm leading-relaxed max-w-xs md:text-right">
              Expandimos nuestros servicios a Huaraz con el mismo estándar técnico y profesional.
            </p>
          </div>

          {/* Divisor */}
          <div className="w-full h-px bg-white/10 mb-16" />

          {/* Stats — cuatro columnas con línea divisora vertical */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`py-8 pr-8 ${i < 3 ? "border-r border-white/10" : ""}`}
              >
                <div
                  className="font-outfit font-black text-impulso-orange leading-none tracking-tighter tabular-nums"
                  style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
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

      {/* ══════════════════════════════════════════════════════════════
          SECCIÓN 3 — TESTIMONIOS
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-20">

          {/* Encabezado */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
                Opiniones reales
              </span>
              <h2
                className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Clientes que confían
                <br />
                <span className="text-impulso-orange">en nuestro criterio</span>
              </h2>
            </div>
            {/* Navegación — flechas + contador */}
            <div className="flex items-center gap-4 self-end pb-2">
              <span className="font-outfit text-xs text-gray-400 tabular-nums">
                {(grupoActivo + 1).toString().padStart(2,"0")} / {GRUPOS_TESTIMONIOS.length.toString().padStart(2,"0")}
              </span>
              <button
                onClick={() => setGrupoActivo(p => (p - 1 + GRUPOS_TESTIMONIOS.length) % GRUPOS_TESTIMONIOS.length)}
                className="w-9 h-9 border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200 cursor-pointer"
                aria-label="Anterior"
              >
                <i className="fa-solid fa-chevron-left text-xs" />
              </button>
              <button
                onClick={() => setGrupoActivo(p => (p + 1) % GRUPOS_TESTIMONIOS.length)}
                className="w-9 h-9 border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200 cursor-pointer"
                aria-label="Siguiente"
              >
                <i className="fa-solid fa-chevron-right text-xs" />
              </button>
            </div>
          </div>

          {/* Divisor */}
          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Slider de testimonios */}
          <div className="relative min-h-[280px]">
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
                    className={`flex flex-col justify-between py-8
                      ${ti === 0 ? "pr-8" : ti === 1 ? "px-8 border-l border-r border-gray-300" : "pl-8"}
                    `}
                  >
                    {/* Comilla naranja pequeña — visible pero discreta */}
                    <div>
                      <i className="fa-solid fa-quote-left text-impulso-orange/40 text-2xl mb-4 block" />
                      <p className="font-raleway text-gray-600 text-sm leading-relaxed">
                        {test.comentario}
                      </p>
                    </div>
                    {/* Autor */}
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200">
                      <div className="w-9 h-9 rounded-full bg-gray-900 text-white font-outfit font-black text-xs flex items-center justify-center flex-shrink-0">
                        {test.iniciales}
                      </div>
                      <div>
                        <p className="font-outfit font-bold text-gray-900 text-xs tracking-wide">
                          {test.nombre}
                        </p>
                        <p className="font-raleway text-gray-400 text-[11px] mt-0.5">
                          {test.cargo}
                        </p>
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