// src/pages/PublicacionesPage.jsx
import { useState, useEffect, useRef } from "react";

const PUBLICACIONES = [
  {
    id: 1,
    tipo: "Certificación",
    titulo: "Certificación ISO 9001:2015 en Gestión de Proyectos",
    fecha: "Marzo 2024",
    desc: "Impulso obtiene la certificación internacional ISO 9001 en su sistema de gestión de calidad, consolidando su posición como estudio de referencia en la región andina.",
    img: "img/proyectos/torre-leguia.webp",
    tag: "Calidad",
  },
  {
    id: 2,
    tipo: "Publicación técnica",
    titulo: "BIM en zona sísmica: metodología aplicada en Huaraz",
    fecha: "Enero 2024",
    desc: "Artículo técnico publicado en la Revista de Ingeniería Peruana sobre la implementación de modelado BIM en edificaciones de alta complejidad sísmica en la Cordillera Blanca.",
    img: "img/proyectos/plaza27.webp",
    tag: "BIM",
  },
  {
    id: 3,
    tipo: "Reconocimiento",
    titulo: "Premio a la Excelencia en Diseño Urbano — CIP Ancash 2023",
    fecha: "Diciembre 2023",
    desc: "El Colegio de Ingenieros del Perú, capítulo Ancash, reconoce a Impulso con el Premio a la Excelencia por el diseño urbanístico de la Urbanización San Felipe.",
    img: "img/proyectos/trivio.webp",
    tag: "Premio",
  },
  {
    id: 4,
    tipo: "Reporte de obra",
    titulo: "Informe de avance Q4 2023 — Torre Leguía",
    fecha: "Octubre 2023",
    desc: "Reporte trimestral con registro fotográfico, metrados ejecutados y control de cronograma de la obra Torre Leguía en su fase de casco estructural.",
    img: "img/proyectos/torre-leguia.webp",
    tag: "Informe",
  },
  {
    id: 5,
    tipo: "Certificación",
    titulo: "Habilitación Profesional — CAPECO 2023",
    fecha: "Agosto 2023",
    desc: "Renovación de habilitación profesional ante la Cámara Peruana de la Construcción, acreditando a Impulso como empresa constructora habilitada para obras públicas y privadas.",
    img: "img/proyectos/plaza27.webp",
    tag: "Calidad",
  },
  {
    id: 6,
    tipo: "Publicación técnica",
    titulo: "Diseño bioclimático en altura: casos en los Andes peruanos",
    fecha: "Junio 2023",
    desc: "Ponencia presentada en el Congreso Nacional de Arquitectura sobre estrategias de confort térmico y eficiencia energética aplicadas en edificaciones a más de 3,000 msnm.",
    img: "img/proyectos/trivio.webp",
    tag: "Investigación",
  },
];

const TAGS = ["Todos", "Calidad", "BIM", "Premio", "Informe", "Investigación"];

const TAG_COLORS = {
  "Calidad":       "bg-green-100 text-green-700",
  "BIM":           "bg-blue-100 text-blue-700",
  "Premio":        "bg-yellow-100 text-yellow-700",
  "Informe":       "bg-gray-100 text-gray-600",
  "Investigación": "bg-purple-100 text-purple-700",
};

export default function PublicacionesPage() {
  const [bannerVis, setBannerVis] = useState(false);
  const [filtro, setFiltro] = useState("Todos");
  const [gridVis, setGridVis] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    setBannerVis(true);
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGridVis(true); ob.disconnect(); } }, { threshold: 0.05 });
    if (gridRef.current) ob.observe(gridRef.current);
    return () => ob.disconnect();
  }, []);

  const filtradas = filtro === "Todos" ? PUBLICACIONES : PUBLICACIONES.filter(p => p.tag === filtro);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900 font-raleway selection:bg-impulso-orange selection:text-white">

      {/* ── BANNER ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src="img/proyectos/banner-02.avif"
          alt="Publicaciones"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: bannerVis ? "scale(1.04)" : "scale(1)", transition: "transform 8000ms ease-out" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-14">
          <div className={`transition-all duration-1000 ${bannerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Reportes · Certificaciones · Investigación
            </span>
            <h1 className="font-outfit font-black text-white leading-none tracking-tighter" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              Publicaciones
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </div>

      {/* ── FILTROS ─────────────────────────────────────────────────── */}
      <div className="border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-8 flex flex-wrap gap-3 items-center">
          <span className="font-outfit text-[9px] font-bold uppercase tracking-[4px] text-gray-400 mr-2">
            Filtrar:
          </span>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setFiltro(tag)}
              className={`font-outfit text-[10px] font-bold uppercase tracking-[3px] px-4 py-2 border transition-all duration-200 cursor-pointer ${
                filtro === tag
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 text-gray-500 hover:border-gray-600 hover:text-gray-900"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="w-full h-px bg-gray-300" />
        </div>
      </div>

      {/* ── GRID DE PUBLICACIONES ───────────────────────────────────── */}
      <section ref={gridRef} className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {filtradas.map((pub, i) => (
            <article
              key={pub.id}
              className={[
                "border-b border-gray-300 pb-10 mb-0",
                i % 3 !== 2 ? "lg:border-r lg:border-gray-300" : "",
                i % 2 === 0 ? "md:border-r md:border-gray-300 lg:border-r-0" : "",
                i % 3 !== 2 ? "lg:border-r lg:border-gray-300" : "",
                "group transition-all duration-700",
                gridVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{
                transitionDelay: `${i * 80}ms`,
                paddingTop: "2.5rem",
                paddingRight: i % 3 !== 2 ? "2.5rem" : 0,
                paddingLeft: i % 3 !== 0 ? "2.5rem" : 0,
              }}
            >
              {/* Imagen */}
              <div className="aspect-[16/9] overflow-hidden mb-6">
                <img
                  src={pub.img}
                  alt={pub.titulo}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`font-outfit text-[9px] font-bold uppercase tracking-[3px] px-2 py-1 ${TAG_COLORS[pub.tag] || "bg-gray-100 text-gray-600"}`}>
                  {pub.tag}
                </span>
                <span className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-gray-400">
                  {pub.fecha}
                </span>
              </div>

              {/* Tipo */}
              <p className="font-outfit text-[10px] font-bold uppercase tracking-[4px] text-impulso-orange mb-2">
                {pub.tipo}
              </p>

              {/* Título */}
              <h3 className="font-outfit font-black text-gray-900 leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
                {pub.titulo}
              </h3>

              {/* Desc */}
              <p className="font-raleway text-gray-500 text-sm leading-relaxed mb-6">
                {pub.desc}
              </p>

              {/* CTA inline */}
              <div className="inline-flex items-center gap-3 group/cta cursor-pointer">
                <span className="font-outfit text-[10px] font-bold uppercase tracking-[3px] text-gray-400 group-hover/cta:text-impulso-orange transition-colors duration-200">
                  Leer más
                </span>
                <span className="w-4 h-px bg-gray-300 group-hover/cta:w-8 group-hover/cta:bg-impulso-orange transition-all duration-300" />
              </div>
            </article>
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filtradas.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-outfit font-black text-gray-200 text-4xl mb-3">—</p>
            <p className="font-raleway text-gray-400 text-sm">No hay publicaciones en esta categoría aún.</p>
          </div>
        )}
      </section>

      {/* ── SUSCRIPCIÓN / CTA ───────────────────────────────────────── */}
      <section className="border-t border-gray-300 bg-white">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Mantente informado
            </span>
            <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              ¿Quieres recibir<br />
              <span className="text-impulso-orange">nuestros reportes?</span>
            </h2>
          </div>
          <a
            href="https://wa.me/51959679522?text=Hola%2C%20quisiera%20recibir%20información%20y%20reportes%20de%20Impulso%20Proyectistas."
            target="_blank" rel="noreferrer"
            style={{ backgroundColor: "#111827", color: "#ffffff" }}
            className="inline-flex items-center gap-3 font-outfit text-xs font-bold uppercase tracking-[4px] px-8 py-4 transition-all duration-300 cursor-pointer self-start lg:self-auto"
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FF6B1A"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#111827"; }}
          >
            <i className="fa-brands fa-whatsapp text-base" />
            Contáctanos
          </a>
        </div>
      </section>

    </div>
  );
}