import { useState, useEffect, useRef } from "react";
import { CATEGORIAS, PROYECTOS } from "../data/galleryData";

export default function Gallery({ onVerProyecto }) {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const containerRef = useRef(null);

  const proyectosFiltrados = PROYECTOS.filter(
    (proj) => categoriaActiva === "todos" || proj.category === categoriaActiva,
  );

  const getCount = (id) => {
    if (id === "todos") return PROYECTOS.length;
    return PROYECTOS.filter((p) => p.category === id).length;
  };

  useEffect(() => {
    const rows = containerRef.current?.querySelectorAll(".proyecto-row");
    if (!rows) return;

    const observerOptions = {
      root: null,
      rootMargin: "-5% 0px -5% 0px",
      threshold: 0.1,
    };

    const rowObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
          entry.target.classList.remove("opacity-0", "translate-y-12", "scale-95");
        }
      });
    }, observerOptions);

    rows.forEach((row) => rowObserver.observe(row));
    return () => rows.forEach((row) => rowObserver.unobserve(row));
  }, [categoriaActiva]);

  return (
    <div className="bg-white text-gray-900 w-full overflow-hidden relative">
      <section id="proyectos" className="py-24 max-w-[1300px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* ENCABEZADO */}
        <div className="mb-14 text-center md:text-left">
          <span className="text-xs font-bold text-impulso-orange tracking-widest uppercase font-outfit block mb-3">
            NUESTRO PORTAFOLIO
          </span>
          <h2 className="font-outfit text-3xl md:text-5xl font-black uppercase tracking-wider text-gray-900">
            Proyectos <span className="text-impulso-orange">Destacados</span>
          </h2>
          <div className="w-20 h-1 bg-impulso-orange mt-4 mx-auto md:mx-0"></div>
        </div>

        {/* 💻 CONSOLA DE FILTROS PREMIUM */}
        <div className="hidden lg:flex justify-center mb-20 w-full">
          <div className="inline-flex items-center bg-gray-50/80 backdrop-blur-md p-2 rounded-2xl border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] gap-1.5 relative">
            {CATEGORIAS.map((cat) => {
              const esActivo = categoriaActiva === cat.id;
              const count = getCount(cat.id); // Cálculo automático aquí

              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaActiva(cat.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl transition-all duration-300 relative group cursor-pointer font-outfit text-xs font-bold uppercase tracking-wider ${
                    esActivo
                      ? "bg-[#02184c] text-white shadow-md shadow-[#02184c]/10 scale-[1.02]"
                      : "text-gray-500 hover:text-[#02184c] hover:bg-gray-200/50"
                  }`}
                >
                  <i className={`fa-solid ${cat.icon} text-sm transition-transform duration-300 ${
                      esActivo ? "text-impulso-orange scale-110" : "text-gray-400 group-hover:scale-110 group-hover:text-impulso-orange"
                    }`}
                  ></i>
                  <span className="font-medium font-raleway tracking-wide transition-colors">{cat.label}</span>
                  
                  {/* Contador automático */}
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full font-outfit transition-all duration-300 ${
                      esActivo ? "bg-white/15 text-white" : "bg-gray-200/70 text-gray-400 group-hover:bg-impulso-orange/10 group-hover:text-impulso-orange"
                    }`}
                  >
                    {count.toString().padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PROYECTOS */}
        <div ref={containerRef} className="flex flex-col gap-24 md:gap-32 min-h-fit w-full px-4 md:px-0">
          {proyectosFiltrados.length > 0 ? (
            proyectosFiltrados.map((proj, idx) => {
              const esInvertido = idx % 2 !== 0;
              return (
                <div key={proj.id} className={`proyecto-row flex flex-col md:flex-row items-center relative w-full max-w-[1100px] mx-auto transform transition-all duration-700 ease-out opacity-0 translate-y-12 scale-95 ${esInvertido ? "md:flex-row-reverse" : ""}`}>
                  <div className="w-full md:w-[75%] h-[350px] sm:h-[450px] md:h-[500px] overflow-hidden shadow-2xl relative group border border-gray-100 rounded-l z-10">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white font-outfit text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-white/10 shadow-md flex items-center gap-1.5">
                      <i className="fa-solid fa-location-dot text-impulso-orange"></i>
                      <span>{proj.ciudad}</span>
                    </div>
                    <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  </div>
                  <div className={`w-[90%] md:w-[40%] bg-white p-8 md:p-10 lg:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 rounded-xl z-20 -mt-20 md:mt-0 flex flex-col items-start ${esInvertido ? "md:mr-0 md:-ml-24 lg:-ml-32 text-left" : "md:ml-0 md:-mr-24 lg:-mr-32 text-left"}`}>
                    <span className="text-xs font-bold text-impulso-orange tracking-widest uppercase font-outfit">{proj.categoryLabel}</span>
                    <h3 className="text-2xl md:text-3xl font-black mt-3 font-outfit text-gray-900 tracking-tight">{proj.title}</h3>
                    <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed font-raleway font-medium">{proj.desc}</p>
                    <button onClick={() => onVerProyecto && onVerProyecto(proj.slug)} className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-gray-900 font-raleway text-xs font-bold uppercase tracking-widest rounded bg-transparent hover:text-impulso-orange hover:border-impulso-orange hover:bg-gray-50 transition-all duration-300 group/btn cursor-pointer">
                      Ver Proyecto <i className="fa-solid fa-arrow-right-long ml-2.5"></i>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full text-center py-20">
              <h3 className="text-gray-400 font-outfit text-xl font-bold uppercase">Aún no disponible</h3>
            </div>
          )}
        </div>
      </section>

      {/* DOCK FLOTANTE MÓVIL */}
      <div className="lg:hidden fixed bottom-6 right-4 sm:right-6 w-[72%] max-w-[300px] bg-[#02184c]/95 backdrop-blur-lg border border-white/20 p-2 rounded-2xl shadow-[0_20px_50px_rgba(2,24,76,0.3)] z-50 flex justify-between items-center">
        {CATEGORIAS.map((cat) => {
          const esActivo = categoriaActiva === cat.id;
          return (
            <button key={cat.id} onClick={() => setCategoriaActiva(cat.id)} className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-xl transition-all ${esActivo ? "text-white scale-110 font-bold" : "text-white/60"}`}>
              <i className={`fa-solid ${cat.icon} text-sm`}></i>
              <span className="text-[8px] font-bold uppercase tracking-tighter mt-1 block max-w-[50px] text-center truncate">{cat.id === "todos" ? "Todos" : cat.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}