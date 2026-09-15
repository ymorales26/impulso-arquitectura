// src/components/Gallery.jsx
// Layout fullwidth — cada proyecto ocupa pantalla completa, foto dominante
import { useState, useRef, useEffect } from "react";

const PROYECTOS = [
  {
    id: "torre-leguia",
    slug: "torre-leguia",
    indice: "01",
    titulo: "Torre Leguía",
    lugar: "Huaraz, Ancash",
    año: "2024",
    tipo: "Edificio de Uso Mixto",
    img: "img/proyectos/torre-leguia.webp",
    concepto:
      "Diseñado en colaboración con el estudio Brag Arquitectos, el proyecto plantea un edificio de uso mixto que integra comercio y vivienda en un solo volumen. Su fachada modular refleja un lenguaje contemporáneo vinculado al contexto de Huaraz.",
  },
  {
    id: "trivio",
    slug: "trivio",
    indice: "02",
    titulo: "Trivio",
    lugar: "Arequipa, Perú",
    año: "2025",
    tipo: "Edificio Residencial",
    img: "img/proyectos/trivio.webp",
    concepto:
      "Diseñado con un enfoque modernista, el edificio destaca por su composición de líneas puras, fachadas limpias y una distribución funcional que prioriza la iluminación natural y el confort de sus residentes.",
  },
  {
    id: "plaza27",
    slug: "plaza27",
    indice: "03",
    titulo: "Plaza 27",
    lugar: "Huaraz, Ancash",
    año: "2025",
    tipo: "Edificio Residencial",
    img: "img/proyectos/plaza27.webp",
    concepto:
      "El proyecto responde a la monumentalidad de la Cordillera Blanca mediante una volumetría esbelta que enfatiza la verticalidad y lo consolida como un hito urbano de carácter atemporal.",
  },
  {
    id: "aflora",
    slug: "aflora",
    indice: "04",
    titulo: "Aflora",
    lugar: "Huaraz, Ancash",
    año: "2025",
    tipo: "Edificio Multifamiliar",
    img: "img/proyectos/aflora.webp",
    concepto:
      "Ubicado en el distrito de Jose Luis Bustamante y Riveros, Arequipa – Arequipa, edificio Multifamiliar.",
  },
  {
    id: "JTU",
    slug: "JTU",
    indice: "05",
    titulo: "JTU",
    lugar: "Lima, Perú",
    año: "2025-2026",
    tipo: "Edificio Multifamiliar",
    img: "img/proyectos/JTU.webp",
    concepto:
      "Proyecto de edificio multifamiliar que se integra en el entorno urbano de Lima, con un diseño moderno y funcional.",
  }
];

function ProyectoSlide({ proj, onVerProyecto, isActive, index }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "90vh", minHeight: 520 }}
    >
      {/* IMAGEN DE FONDO — ocupa todo */}
      <img
        src={proj.img}
        alt={proj.titulo}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: vis ? "scale(1.03)" : "scale(1.08)" }}
      />

      {/* Gradiente — oscuro abajo para leer texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Número grande decorativo — esquina superior derecha */}
      <div className="absolute top-8 right-8 md:right-16 font-outfit font-black text-white/10 leading-none select-none hidden md:block"
        style={{ fontSize: "clamp(6rem, 15vw, 14rem)" }}>
        {proj.indice}
      </div>

      {/* Tipo — esquina superior izquierda */}
      <div className="absolute top-8 left-8 md:left-16">
        <span className="font-outfit text-[9px] font-bold uppercase tracking-[5px] text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1.5 block">
          {proj.tipo}
        </span>
      </div>

      {/* Contenido inferior */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-24 pb-12 md:pb-16 transition-all duration-1000 ${
          vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          {/* Izquierda — nombre + lugar */}
          <div>
            <p className="font-outfit text-[10px] font-bold uppercase tracking-[5px] text-impulso-orange mb-3">
              {proj.lugar} — {proj.año}
            </p>
            <h2
              className="font-outfit font-black text-white leading-none tracking-tighter"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
            >
              {proj.titulo}
            </h2>
          </div>

          {/* Derecha — concepto + CTA */}
          <div className="md:max-w-sm flex flex-col gap-5 md:items-end md:text-right">
            <p className="font-raleway text-white/70 text-sm leading-relaxed hidden lg:block">
              {proj.concepto}
            </p>
            <button
              onClick={() => onVerProyecto?.(proj.slug)}
              className="inline-flex items-center gap-3 group cursor-pointer self-start md:self-end"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <span className="font-outfit text-xs font-bold uppercase tracking-[4px] text-white group-hover:text-impulso-orange transition-colors duration-300">
                Ver proyecto
              </span>
              <span className="w-8 h-px bg-white group-hover:w-14 group-hover:bg-impulso-orange transition-all duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Línea divisoria inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </article>
  );
}

export default function Gallery({ onVerProyecto }) {
  return (
    <section id="proyectos" className="w-full bg-black overflow-hidden">

      {/* ── ENCABEZADO ──────────────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
            Portafolio
          </span>
          <h2
            className="font-outfit font-black text-white leading-none tracking-tighter"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Proyectos<br />
            <span className="text-impulso-orange">Seleccionados</span>
          </h2>
        </div>
        <p className="font-raleway text-white/50 text-sm leading-relaxed max-w-xs md:text-right">
          Cada obra es el resultado de un proceso riguroso que equilibra función, materialidad y contexto.
        </p>
      </div>

      {/* ── DIVISOR ─────────────────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="w-full h-px bg-white/10" />
      </div>

      {/* ── SLIDES — uno por proyecto ────────────────────────────────── */}
      <div className="flex flex-col">
        {PROYECTOS.map((proj, i) => (
          <ProyectoSlide
            key={proj.id}
            proj={proj}
            onVerProyecto={onVerProyecto}
            index={i}
          />
        ))}
      </div>

      {/* ── CIERRE ──────────────────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10">
        <p className="font-raleway text-white/30 text-xs uppercase tracking-widest">
          Impulso Proyectistas e Ingenieros S.A.C.
        </p>
        <button
          onClick={() => onVerProyecto?.("torre-leguia")}
          className="inline-flex items-center gap-3 group cursor-pointer"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <span className="font-outfit text-xs font-bold uppercase tracking-[4px] text-white/40 group-hover:text-impulso-orange transition-colors duration-300">
            Ver todos los proyectos
          </span>
          <i className="fa-solid fa-arrow-right-long text-white/30 group-hover:text-impulso-orange group-hover:translate-x-1 transition-all duration-300 text-xs" />
        </button>
      </div>

    </section>
  );
}