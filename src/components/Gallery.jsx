// src/components/Gallery.jsx
import { useState, useEffect, useRef } from "react";

const CATEGORIAS = [
  { id: "todos", label: "Todos los Proyectos", count: "05", icon: "fa-cubes" },
  {
    id: "residencial",
    label: "Residencial Urbano",
    count: "01",
    icon: "fa-building",
  },
  {
    id: "comerciales",
    label: "Locales Comerciales",
    count: "02",
    icon: "fa-store",
  },
  { id: "lotes", label: "Lotes & Terrenos", count: "01", icon: "fa-map" },
  {
    id: "conceptos",
    label: "Conceptos Modernos",
    count: "01",
    icon: "fa-compass-drafting",
  },
];

const PROYECTOS = [
  {
    id: 1,
    slug: "residencial-terrazas",
    title: "Residencial Terrazas",
    category: "residencial",
    categoryLabel: "Residencial Urbano",
    img: "https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg",
    desc: "Innovación aplicada a obras estructurales complejas con control eficiente de recursos.",
    area: "168 m²",
    ano: "2024",
  },
  {
    id: 2,
    slug: "centro-corporativo-alfa",
    title: "Centro Corporativo Alfa",
    category: "comerciales",
    categoryLabel: "Locales Comerciales",
    img: "https://images.pexels.com/photos/13012592/pexels-photo-13012592.jpeg",
    desc: "Diseño de vanguardia arquitectónica enfocado en la sustentabilidad urbana e ingeniería antisísmica.",
    area: "2,450 m²",
    ano: "2025",
  },
  {
    id: 3,
    slug: "complejo-industrial-norte",
    title: "Complejo Industrial Norte",
    category: "conceptos",
    categoryLabel: "Conceptos (Unbuilt)",
    img: "https://images.pexels.com/photos/8746219/pexels-photo-8746219.jpeg",
    desc: "Optimización de naves industriales de gran luz utilizando sistemas estructurales de acero.",
    area: "5,800 m²",
    ano: "2026",
  },
  {
    id: 4,
    slug: "condominio-el-mirador",
    title: "Condominio El Mirador",
    category: "lotes",
    categoryLabel: "Lotes",
    img: "https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg",
    desc: "Complejo residencial planificado bajo rigurosos estándares de seguridad estructural.",
    area: "12,000 m²",
    ano: "2023",
  },
  {
    id: 5,
    slug: "plaza-comercial-moderna",
    title: "Plaza Comercial Moderna",
    category: "comerciales",
    categoryLabel: "Locales Comerciales",
    img: "https://images.pexels.com/photos/20432865/pexels-photo-20432865.jpeg",
    desc: "Espacios comerciales modernos que integran estética vanguardista con máxima funcionalidad.",
    area: "980 m²",
    ano: "2024",
  },
];

export default function Gallery({ onVerProyecto }) {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const containerRef = useRef(null);

  const proyectosFiltrados = PROYECTOS.filter(
    (proj) => categoriaActiva === "todos" || proj.category === categoriaActiva,
  );

  useEffect(() => {
    const rows = containerRef.current.querySelectorAll(".proyecto-row");
    const observerOptions = {
      root: null,
      rootMargin: "-5% 0px -5% 0px",
      threshold: 0.1,
    };

    const rowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "opacity-100",
            "translate-y-0",
            "scale-100",
          );
          entry.target.classList.remove(
            "opacity-0",
            "translate-y-12",
            "scale-95",
          );
        }
      });
    }, observerOptions);

    rows.forEach((row) => rowObserver.observe(row));
    return () => rows.forEach((row) => rowObserver.unobserve(row));
  }, [categoriaActiva]);

  return (
    <div className="bg-white text-gray-900 w-full overflow-hidden relative">
      <section
        id="proyectos"
        className="py-24 max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16"
      >
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="mb-14 text-center md:text-left">
          <span className="text-xs font-bold text-impulso-orange tracking-widest uppercase font-outfit block mb-3">
            NUESTRO PORTAFOLIO
          </span>
          <h2 className="font-outfit text-3xl md:text-5xl font-black uppercase tracking-wider text-gray-900">
            Proyectos <span className="text-impulso-orange">Destacados</span>
          </h2>
          <div className="w-20 h-1 bg-impulso-orange mt-4 mx-auto md:mx-0"></div>
        </div>

        {/* 💻 CONSOLA DE FILTROS SUPERIOR */}
        <div className="hidden lg:flex items-center justify-between bg-gray-50/90 backdrop-blur-md p-3 rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] mb-24 gap-3 w-full">
          {CATEGORIAS.map((cat) => {
            const esActivo = categoriaActiva === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`flex-1 flex items-center justify-center gap-3 p-3.5 rounded-xl transition-all duration-300 group cursor-pointer border ${
                  esActivo
                    ? "bg-[#02184c] border-[#02184c] text-white shadow-lg shadow-[#02184c]/20"
                    : "bg-white border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200 hover:shadow-sm"
                }`}
              >
                <i
                  className={`fa-solid ${cat.icon} text-sm transition-colors ${esActivo ? "text-white" : "text-gray-400 group-hover:text-impulso-orange"}`}
                ></i>
                <span className="font-raleway text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                  {cat.label}
                </span>
                <span
                  className={`font-outfit text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${esActivo ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* CONTENEDOR DE PROYECTOS FILTRADOS */}
        <div
          ref={containerRef}
          className="flex flex-col gap-24 md:gap-32 min-h-[600px] w-full"
        >
          {proyectosFiltrados.map((proj, idx) => {
            const esInvertido = idx % 2 !== 0;

            return (
              <div
                key={proj.id}
                className={`proyecto-row flex flex-col md:flex-row items-center relative w-full transform transition-all duration-700 ease-out opacity-0 translate-y-12 scale-95 ${
                  esInvertido ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 📸 IMAGEN */}
                <div className="w-full md:w-[60%] h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden shadow-xl relative group border border-gray-100">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  />
                </div>

                {/* 📑 TARJETA FLOTANTE */}
                <div
                  className={`w-[92%] md:w-[45%] bg-white p-8 md:p-10 lg:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 rounded-xl z-20 -mt-12 md:mt-0 flex flex-col items-start ${
                    esInvertido
                      ? "md:mr-0 md:-ml-16 lg:-ml-24 text-left"
                      : "md:ml-0 md:-mr-16 lg:-mr-24 text-left"
                  }`}
                >
                  <span className="text-xs font-bold text-impulso-orange tracking-widest uppercase font-outfit">
                    {proj.categoryLabel}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-black mt-3 font-outfit text-gray-900 tracking-tight">
                    {proj.title}
                  </h3>

                  <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed font-raleway font-medium">
                    {proj.desc}
                  </p>

                  {/* 📊 GRID COMPACTO DE 4 DATOS CON ICONOS DE FONT AWESOME */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6 pt-6 border-t border-gray-100 w-full">
                    <div className="flex items-start gap-2.5">
                      <i className="fa-solid fa-briefcase text-impulso-orange text-xs mt-1"></i>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                          Alcance
                        </p>
                        <p className="text-xs font-bold text-gray-700 font-outfit mt-0.5">
                          Ingeniería y Construcción
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <i className="fa-solid fa-circle-check text-impulso-orange text-xs mt-1"></i>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                          Estado
                        </p>
                        <p className="text-xs font-bold text-gray-700 font-outfit mt-0.5">
                          Ejecutado con Éxito
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <i className="fa-solid fa-maximize text-impulso-orange text-xs mt-1"></i>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                          Área
                        </p>
                        <p className="text-xs font-bold text-gray-700 font-outfit mt-0.5">
                          {proj.area}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <i className="fa-solid fa-calendar-days text-impulso-orange text-xs mt-1"></i>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                          Año
                        </p>
                        <p className="text-xs font-bold text-gray-700 font-outfit mt-0.5">
                          {proj.ano}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onVerProyecto && onVerProyecto(proj.slug)}
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-gray-900 font-raleway text-xs font-bold uppercase tracking-widest rounded bg-transparent hover:text-impulso-orange hover:border-impulso-orange hover:bg-gray-50 transition-all duration-300 group/btn cursor-pointer"
                  >
                    Ver Proyecto
                    <i className="fa-solid fa-arrow-right-long ml-2.5 transform transition-transform duration-300 group-hover/btn:translate-x-1.5"></i>
                  </button>
                </div>
              </div>
            );
          })}

          {proyectosFiltrados.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 w-full text-center">
              <p className="font-raleway text-sm text-gray-400 font-bold uppercase tracking-widest">
                Próximos proyectos en esta categoría
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 📱 DOCK FLOTANTE INFERIOR MÓVIL */}
      <div className="lg:hidden fixed bottom-6 right-4 sm:right-6 w-[72%] max-w-[300px] bg-[#02184c]/95 backdrop-blur-lg border border-white/20 p-2 rounded-2xl shadow-[0_20px_50px_rgba(2,24,76,0.3)] z-50 flex justify-between items-center">
        {CATEGORIAS.map((cat) => {
          const esActivo = categoriaActiva === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${
                esActivo ? "text-white scale-110 font-bold" : "text-white/60"
              }`}
            >
              <i className={`fa-solid ${cat.icon} text-sm`}></i>
              <span className="text-[8px] font-bold uppercase tracking-tighter mt-1 block max-w-[50px] text-center truncate">
                {cat.id === "todos" ? "Todos" : cat.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
