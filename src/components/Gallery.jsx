// src/components/Gallery.jsx
// Estilo estudio de arquitectura — layout editorial, sin filtros, 3 proyectos
// Los datos viven aquí directamente (no depende de galleryData.js para los 3 proyectos principales)

const PROYECTOS = [
  {
    id: "torre-leguia",
    slug: "torre-leguia",
    indice: "01",
    titulo: "Torre Leguía",
    lugar: "Huaraz, Ancash — 2024",
    tipo: "Edificio de Uso Mixto",
    img: "img/proyectos/torre-leguia.webp",
    concepto:
      "Diseñado en colaboración con el estudio Brag Arquitectos, el proyecto plantea un edificio de uso mixto que integra comercio y vivienda en un solo volumen. Su fachada modular, compuesta por concreto, ladrillo y vidrio, refleja un lenguaje contemporáneo vinculado al contexto de Huaraz, mientras que la vegetación en la cubierta y los balcones aporta confort ambiental e integra el edificio con el paisaje andino.",
  },
  {
    id: "trivio",
    slug: "trivio",
    indice: "02",
    titulo: "Trivio",
    lugar: "Arequipa, Perú — 2025",
    tipo: "Edificio Residencial",
    img: "img/proyectos/trivio.webp",
    concepto:
      "Diseñado con un enfoque modernista, el edificio destaca por su composición de líneas puras, fachadas limpias y una distribución funcional que prioriza la iluminación, la ventilación natural y el confort de sus residentes, integrándose de manera armónica al entorno urbano de Arequipa.",
  },
  {
    id: "plaza27",
    slug: "plaza27",
    indice: "03",
    titulo: "Plaza 27",
    lugar: "Huaraz, Ancash — 2025",
    tipo: "Edificio Residencial",
    img: "img/proyectos/plaza27.webp",
    concepto:
      "El proyecto responde a la monumentalidad de la Cordillera Blanca mediante una volumetría esbelta que enfatiza la verticalidad y lo consolida como un hito urbano. Su jerarquía volumétrica, materialidad contemporánea y ritmo compositivo establecen un diálogo con el paisaje andino, enmarcando las vistas hacia los nevados y proyectando una arquitectura de carácter atemporal.",
  },
];

export default function Gallery({ onVerProyecto }) {
  return (
    <section
      id="proyectos"
      className="bg-[#f5f3ef] text-gray-900 w-full overflow-hidden"
    >
      {/* ── ENCABEZADO DE SECCIÓN ──────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
            Portafolio
          </span>
          <h2
            className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Proyectos
            <br />
            <span className="text-impulso-orange">Seleccionados</span>
          </h2>
        </div>
        <p className="font-raleway text-gray-500 text-sm leading-relaxed max-w-xs md:text-right">
          Cada obra es el resultado de un proceso riguroso que equilibra función,
          materialidad y contexto.
        </p>
      </div>

      {/* ── DIVISOR ────────────────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="w-full h-px bg-gray-300" />
      </div>

      {/* ── LISTA DE PROYECTOS ─────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24">
        {PROYECTOS.map((proj, idx) => {
          const esInvertido = idx % 2 !== 0;
          return (
            <article
              key={proj.id}
              className="py-20 md:py-28 border-b border-gray-300 last:border-b-0"
            >
              <div
                className={`flex flex-col ${
                  esInvertido ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-10 lg:gap-16 items-start`}
              >
                {/* FOTO */}
                <div
                  className="w-full lg:w-[58%] overflow-hidden relative group cursor-pointer flex-shrink-0"
                  onClick={() => onVerProyecto?.(proj.slug)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={proj.img}
                      alt={proj.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  {/* Overlay sutil al hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Tipo de proyecto sobre la imagen */}
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-3 py-1.5">
                    <span className="font-outfit text-[10px] font-bold uppercase tracking-[3px] text-gray-900">
                      {proj.tipo}
                    </span>
                  </div>
                </div>

                {/* TEXTO */}
                <div
                  className={`flex-1 flex flex-col justify-center ${
                    esInvertido ? "lg:items-end lg:text-right" : ""
                  }`}
                >
                  {/* Número de proyecto */}
                  <span
                    className="font-outfit font-black text-gray-200 leading-none mb-2 select-none"
                    style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                    aria-hidden="true"
                  >
                    {proj.indice}
                  </span>

                  {/* Título */}
                  <h3
                    className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-3"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    {proj.titulo}
                  </h3>

                  {/* Lugar */}
                  <p className="font-outfit text-[10px] font-bold uppercase tracking-[4px] text-impulso-orange mb-6">
                    {proj.lugar}
                  </p>

                  {/* Divisor corto */}
                  <div
                    className={`w-12 h-px bg-gray-400 mb-6 ${
                      esInvertido ? "lg:ml-auto" : ""
                    }`}
                  />

                  {/* Concepto */}
                  <p className="font-raleway text-gray-600 text-sm md:text-base leading-relaxed max-w-sm">
                    {proj.concepto}
                  </p>

                  {/* CTA */}
                  <div className={`mt-10 ${esInvertido ? "lg:flex lg:justify-end" : ""}`}>
                    <button
                      onClick={() => onVerProyecto?.(proj.slug)}
                      className="group inline-flex items-center gap-3 cursor-pointer border border-gray-900 px-6 py-3 hover:bg-gray-900 hover:border-gray-900 transition-all duration-300"
                    >
                      <span className="font-outfit text-[11px] font-bold uppercase tracking-[4px] text-gray-900 group-hover:text-white transition-colors duration-300">
                        Ver proyecto
                      </span>
                      <i className="fa-solid fa-arrow-right-long text-gray-900 group-hover:text-impulso-orange text-xs transition-all duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── CIERRE DE SECCIÓN ──────────────────────────────────────── */}
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-raleway text-gray-400 text-xs uppercase tracking-widest">
          Impulso Proyectistas e Ingenieros S.A.C.
        </p>
        <button
          onClick={() => onVerProyecto?.("torre-leguia")}
          className="inline-flex items-center gap-3 group cursor-pointer"
        >
          <span className="font-outfit text-xs font-bold uppercase tracking-[4px] text-gray-500 group-hover:text-impulso-orange transition-colors duration-300">
            Conoce todos los proyectos
          </span>
          <i className="fa-solid fa-arrow-right-long text-gray-400 group-hover:text-impulso-orange group-hover:translate-x-1 transition-all duration-300 text-xs" />
        </button>
      </div>
    </section>
  );
}