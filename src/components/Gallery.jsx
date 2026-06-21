// src/components/Gallery.jsx
import { useState, useEffect, useRef } from "react";

const CATEGORIAS = [
  { id: "todos", label: "Todos los Proyectos", count: "09", icon: "fa-cubes" },
  {
    id: "residencial",
    label: "Residencial Urbano",
    count: "06",
    icon: "fa-building",
  },
  {
    id: "comerciales",
    label: "Locales Comerciales",
    count: "01",
    icon: "fa-store",
  },
  { id: "lotes", label: "Lotes & Terrenos", count: "02", icon: "fa-map" },
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
    slug: "torre-leguia",
    title: "Torre Leguía",
    category: "residencial",
    categoryLabel: "Residencial Urbano",
    img: "img/proyectos/torre-leguia.webp",
    desc: "Ubicado estratégicamente en Huaraz, este desarrollo cuenta con acabados de primera y una arquitectura moderna que aprovecha cada espacio.",
    area: "59.55 m²",
    ano: "2025",
    alcance: "Ingeniería y Construcción",
    estado: "En Proceso",
    ciudad: "Huaraz",
    direccion: "Intersección de Jr. Pomabamba con Augusto B. Leguía",
  },
    {
    id: 2,
    slug: "trivio",
    title: "Trivio",
    category: "residencial",
    categoryLabel: "Residencial Urbano",
    img: "img/proyectos/trivio.webp",
    desc: "Gracias a su diseño con tres fachadas, cada espacio recibe iluminación natural de manera excepcional, ofreciendo ambientes cálidos. Un proyecto pensado en el bienestar diario de sus recidentes.",
    area: "82.60 m²",
    ano: "2025",
    alcance: "Habilitación Urbana",
    estado: "En Proceso",
    ciudad: "Arequipa",
    direccion: "Av. Villa Hermosa 212, Espaldas del Real Plaza",
  },

  {
    id: 3,
    slug: "plaza27",
    title: "Plaza 27",
    category: "residencial",
    categoryLabel: "Residencial Urbano",
    img: "img/proyectos/plaza27.webp",
    desc: "Un edificio de departamentos ubicado en el centro de Huaraz, a un paso de todo lo que necesitas, un punto estratégico a pocas cuadras de la Plaza de Armas y rodeado de parques y centros educativos.",
    area: "75.70 m²",
    ano: "2024",
    alcance: "Modelamiento Estructural",
    estado: "Terminado",
    ciudad: "Huaraz",
    direccion: "Pasaje Octavio Hinostroza con Av. 27 de Noviembre",
  },
  {
    id: 4,
    slug: "eleven",
    title: "Eleven",
    category: "residencial",
    categoryLabel: "Residencial Urbano",
    img: "img/proyectos/eleven.webp",
    desc: "Eleven es un exclusivo proyecto de tan solo 11 departamentos para vivir con tranquilidad, comodidad y seguridad. Ubicado a una cuadra de Plaza San Miguel, frente a la Universidad Católica (PUCP).",
    area: "65.15 m²",
    ano: "2026",
    alcance: "Ingeniería y Construcción",
    estado: "En Proceso",
    ciudad: "Huaraz",
    direccion: "Calle Universitaria 1200, San Miguel - Frente a la PUCP",
  },
    {
    id: 5,
    slug: "aflora",
    title: "Aflora",
    category: "residencial",
    categoryLabel: "Residencial Urbano",
    img: "img/proyectos/aflora.webp",
    desc: "El proyecto AFLORA es un edificio único, rodeado por más de 7 parques y muy bien ubicado, cerca de todo lo que necesitas. AFLORA contará Área de parrillas exclusiva para sus propietarios; además, todos los departamentos contarán con acabados excepcionales.",
    area: "127.60 m²",
    ano: "2024",
    alcance: "Ingeniería y Construcción",
    estado: "Terminado",
    ciudad: "Arequipa",
    direccion: "Av. San Martín 123, Miraflores",
  },
      {
    id: 6,
    slug: "oasiz",
    title: "Oasiz",
    category: "residencial",
    categoryLabel: "Residencial Urbano",
    img: "img/proyectos/oasiz.webp",
    desc: " Ubicado en un punto bastante estratégico rodeado de colegios, clínicas y restaurantes. Con vistas hacia el paisaje natural y la ciudad.",
    area: "127.60 m²",
    ano: "2023",
    alcance: "Ingeniería y Construcción",
    estado: "Terminado",
    ciudad: "Huaraz",
    direccion: "Jr. Pablo Patrón 574. Sector Los Ángeles (Ex piscina Master Pool)",
  },
  {
    id: 7,
    slug: "palmira",
    title: "Plaza Comercial Palmira",
    category: "comerciales",
    categoryLabel: "Locales Comerciales",
    img: "img/proyectos/palmira.webp",
    desc: "Somos la 1° Plaza Comercial de Huaraz que contará con más de 120 puestos, con distintos rubros comerciales.",
    area: "980 m²",
    ano: "2024",
    alcance: "Arquitectura e Ingeniería",
    estado: "Terminado",
    ciudad: "Huaraz",
    direccion: "Palmira Baja - A una cuadra del cruce Palmira",
  },
    {
    id: 8,
    slug: "san-felipe",
    title: "San Felipe",
    category: "lotes",
    categoryLabel: "Lotes & Terrenos",
    img: "img/proyectos/san-felipe.webp",
    desc: "La nueva Urbanización San Felipe estratégicamente ubicada, frente al condominio El Pinar y al costado del nuevo campus de la Universidad César Vallejo.",
    area: "1200 m²",
    ano: "2023",
    alcance: "Habilitación Urbana",
    estado: "Terminado",
    ciudad: "Huaraz",
    direccion: "A 5 minutos de Huaraz y Al costado del nuevo Campus de la UCV",
  },
      {
    id: 9,
    slug: "arboleda",
    title: "Arboleda",
    category: "lotes",
    categoryLabel: "Lotes & Terrenos",
    img: "img/proyectos/arboleda.webp",
    desc: "La nueva Urbanización Arboleda estratégicamente ubicada.",
    area: "1200 m²",
    ano: "2024",
    alcance: "Habilitación Urbana",
    estado: "En Proceso",
    ciudad: "Huaraz",
    direccion: "Carretera a Rivas - Marian, a 5 minutos del nuevo Mall de Huaraz",
  },
  {
    id: 10,
    slug: "nexus",
    title: "Nexus",
    category: "conceptos",
    categoryLabel: "Conceptos",
    img: "img/proyectos/nexus.webp",
    desc: "Ofrecemos terrenos con alto valor logístico, acceso privilegiado y proyección de desarrollo, ideales para inversión o expansión empresarial.",
    area: "1200 m²",
    ano: "2024",
    alcance: "Lotes Industriales",
    estado: "En Proceso",
    ciudad: "Chiclayo",
    direccion: "Au. Panamericana N 14160, Mórrope 14000",
  },
];

export default function Gallery({ onVerProyecto }) {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const containerRef = useRef(null);

  const proyectosFiltrados = PROYECTOS.filter(
    (proj) => categoriaActiva === "todos" || proj.category === categoriaActiva,
  );

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

        {/* FILTROS (DESKTOP) */}
{/* 💻 CONSOLA DE FILTROS SUPERIOR (REDISEÑO PREMIUM PARA WEB) */}
<div className="hidden lg:flex justify-center mb-20 w-full">
  <div className="inline-flex items-center bg-gray-50/80 backdrop-blur-md p-2 rounded-2xl border border-gray-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] gap-1.5 relative">
    {CATEGORIAS.map((cat) => {
      const esActivo = categoriaActiva === cat.id;
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
          {/* Icono animado */}
          <i
            className={`fa-solid ${cat.icon} text-sm transition-transform duration-300 ${
              esActivo 
                ? "text-impulso-orange scale-110" 
                : "text-gray-400 group-hover:scale-110 group-hover:text-impulso-orange"
            }`}
          ></i>

          {/* Etiqueta */}
          <span className="font-medium font-raleway tracking-wide transition-colors">
            {cat.label}
          </span>

          {/* Contador Estilo Notificación Minimalista */}
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full font-outfit transition-all duration-300 ${
              esActivo
                ? "bg-white/15 text-white"
                : "bg-gray-200/70 text-gray-400 group-hover:bg-impulso-orange/10 group-hover:text-impulso-orange"
            }`}
          >
            {cat.count}
          </span>
        </button>
      );
    })}
  </div>
</div>

        {/* PROYECTOS */}
        <div ref={containerRef} className="flex flex-col gap-24 md:gap-32 min-h-[600px] w-full">
          {proyectosFiltrados.map((proj, idx) => {
            const esInvertido = idx % 2 !== 0;

            return (
              <div
                key={proj.id}
                className={`proyecto-row flex flex-col md:flex-row items-center relative w-full transform transition-all duration-700 ease-out opacity-0 translate-y-12 scale-95 ${
                  esInvertido ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 📸 IMAGEN + CIUDAD */}
                <div className="w-full md:w-[60%] h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden shadow-xl relative group border border-gray-100 rounded-xl md:rounded-none">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white font-outfit text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-white/10 shadow-md flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-impulso-orange"></i>
                    <span>{proj.ciudad}</span>
                  </div>

                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  />
                </div>

                {/* 📑 TARJETA INFO */}
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

                  {/* 📊 GRID DE 4 DATOS (2 COLUMNAS) */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6 pt-6 border-t border-gray-100 w-full">
                    
                    {/* ALCANCE */}
                    <div className="flex items-start gap-2.5">
                      <i className="fa-solid fa-briefcase text-impulso-orange text-xs mt-1"></i>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Alcance</p>
                        <p className="text-xs font-bold text-gray-700 font-outfit mt-0.5 leading-snug">{proj.alcance}</p>
                      </div>
                    </div>

                    {/* ESTADO */}
                    <div className="flex items-start gap-2.5">
                      <i className="fa-solid fa-circle-check text-impulso-orange text-xs mt-1"></i>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Estado</p>
                        <p className={`text-xs font-bold font-outfit mt-0.5 px-2 py-0.5 rounded inline-block ${
                          proj.estado.toLowerCase() === "terminado" 
                            ? "bg-green-50 text-green-700 border border-green-100" 
                            : proj.estado.toLowerCase() === "en proceso"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}>{proj.estado}</p>
                      </div>
                    </div>

                    {/* ÁREA */}
                    <div className="flex items-start gap-2.5">
                      <i className="fa-solid fa-maximize text-impulso-orange text-xs mt-1"></i>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Área</p>
                        <p className="text-xs font-bold text-gray-700 font-outfit mt-0.5">{proj.area}</p>
                      </div>
                    </div>

                    {/* AÑO (Vuelve a su sitio) */}
                    <div className="flex items-start gap-2.5">
                      <i className="fa-solid fa-calendar-days text-impulso-orange text-xs mt-1"></i>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Año</p>
                        <p className="text-xs font-bold text-gray-700 font-outfit mt-0.5">{proj.ano}</p>
                      </div>
                    </div>

                    {/* ✨ DIRECCIÓN TOTALMENTE EXPANSIBLE (Ocupa las 2 columnas abajo) */}
                    <div className="col-span-2 flex items-start gap-2.5 pt-2 border-t border-gray-50 mt-1">
                      <i className="fa-solid fa-map-pin text-impulso-orange text-xs mt-1"></i>
                      <div className="w-full">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Dirección</p>
                        <p className="text-xs font-bold text-gray-700 font-outfit mt-0.5 leading-relaxed break-words">
                          {proj.direccion}
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

      {/* DOCK FLOTANTE MÓVIL */}
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