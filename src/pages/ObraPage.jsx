// src/pages/ObraPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OBRAS = [
  {
    id: 1,
    titulo: "Torre Leguía",
    tipo: "Edificio de Uso Mixto",
    estado: "En ejecución",
    avance: 30,
    lugar: "Huaraz, Ancash",
    año: "2024 – 2025",
    img: "img/proyectos/torre-leguia.webp",
    desc: "Edificio de uso mixto que integra comercio y vivienda en un solo volumen. Fachada modular de concreto, ladrillo y vidrio con vegetación en cubierta y balcones.",
  },
  {
    id: 2,
    titulo: "Trivio",
    tipo: "Edificio Residencial",
    estado: "En ejecución",
    avance: 100,
    lugar: "Arequipa, Perú",
    año: "2025-2026",
    img: "img/proyectos/trivio.webp",
    desc: "Edificio modernista de líneas puras y fachadas limpias. Distribución funcional que prioriza iluminación natural, ventilación y confort de sus residentes.",
  },
  {
    id: 3,
    titulo: "Plaza 27",
    tipo: "Edificio Residencial",
    estado: "En ejecución",
    avance: 90,
    lugar: "Huaraz, Ancash",
    año: "2025-2026",
    img: "img/proyectos/plaza27.webp",
    desc: "Volumetría esbelta que enfatiza la verticalidad como hito urbano. Materialidad contemporánea que dialoga con la Cordillera Blanca y el paisaje andino.",
  },
  {
    id: 4,
    titulo: "Aflora",
    tipo: "Edificio Multifamiliar",
    estado: "Entrega y liquidación",
    avance: 100,
    lugar: "Arequipa, Perú",
    año: "2025-2026",
    img: "img/proyectos/aflora.webp",
    desc: "Donde la arquitectura dialoga con las cumbres: elegancia vertical que se eleva y perdura en el paisaje.",
  },
    {
    id: 5,
    titulo: "JTU",
    tipo: "Edificio Multifamiliar",
    estado: "En Planificación",
    avance: 50,
    lugar: "Lima, Perú",
    año: "2025-2026",
    img: "img/proyectos/JTU.webp",
    desc: "El proyecto JTU es un edificio multifamiliar que se integra de manera armónica al entorno urbano de Lima, ofreciendo un diseño moderno y funcional que prioriza la comodidad y el bienestar de sus residentes.",
  },
];

const ETAPAS = [
  { num: "01", titulo: "Expediente técnico",    desc: "Elaboración de planos, memorias descriptivas, especificaciones técnicas y presupuesto de obra." },
  { num: "02", titulo: "Licencia de obra",      desc: "Gestión y aprobación del expediente ante la Municipalidad correspondiente." },
  { num: "03", titulo: "Ejecución",             desc: "Construcción con control de calidad, cronograma valorizado y supervisión permanente en campo." },
  { num: "04", titulo: "Entrega y liquidación", desc: "Dossier fotográfico, planos as-built, declaratoria de fábrica y entrega formal al propietario." },
];

export default function ObraPage() {
  const navigate = useNavigate();
  const [bannerVis, setBannerVis] = useState(false);
  const [etapasVis, setEtapasVis] = useState(false);
  const etapasRef = useRef(null);

  useEffect(() => {
    setBannerVis(true);
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setEtapasVis(true); ob.disconnect(); } }, { threshold: 0.1 });
    if (etapasRef.current) ob.observe(etapasRef.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900 font-raleway selection:bg-impulso-orange selection:text-white">

      {/* ── BANNER ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="img/proyectos/banner-01.avif"
          alt="Obra"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: bannerVis ? "scale(1.04)" : "scale(1)", transition: "transform 8000ms ease-out" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-14">
          <div className={`transition-all duration-1000 ${bannerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Ejecución & Construcción
            </span>
            <h1 className="font-outfit font-black text-white leading-none tracking-tighter" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              Obras en<br />ejecución
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </div>

      {/* ── OBRAS ACTUALES ──────────────────────────────────────────── */}
      <section className="border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-8 flex items-end justify-between">
          <div>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-3">En campo</span>
            <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Proyectos activos
            </h2>
          </div>
          <span className="font-outfit text-[10px] text-gray-400 tracking-[3px] uppercase hidden md:block">{OBRAS.length} obras</span>
        </div>

        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 mb-8">
          <div className="w-full h-px bg-gray-300" />
        </div>

        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pb-20">
          {OBRAS.map((obra, idx) => {
            const esInvertido = idx % 2 !== 0;
            return (
              <article key={obra.id} className="py-16 md:py-20 border-b border-gray-300 last:border-b-0">
                <div className={`flex flex-col ${esInvertido ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-start`}>

                  {/* Foto */}
                  <div className="w-full lg:w-[55%] overflow-hidden relative flex-shrink-0">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={obra.img} alt={obra.titulo} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
                    </div>
                    {/* Badge estado */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-gray-950/90 backdrop-blur-sm px-3 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-impulso-orange animate-pulse" />
                      <span className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-white">{obra.estado}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={`flex-1 flex flex-col justify-center ${esInvertido ? "lg:items-end lg:text-right" : ""}`}>
                    <span className="font-outfit text-[10px] font-bold uppercase tracking-[4px] text-impulso-orange block mb-3">{obra.tipo} — {obra.lugar}</span>
                    <h3 className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                      {obra.titulo}
                    </h3>
                    <p className="font-outfit text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-6">{obra.año}</p>

                    <div className={`w-12 h-px bg-gray-300 mb-6 ${esInvertido ? "lg:ml-auto" : ""}`} />

                    <p className="font-raleway text-gray-600 text-sm leading-relaxed max-w-sm mb-8">{obra.desc}</p>

                    {/* Barra de avance */}
                    <div className={`max-w-xs ${esInvertido ? "lg:ml-auto" : ""}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-gray-400">Avance de obra</span>
                        <span className="font-outfit font-black text-impulso-orange text-sm">{obra.avance}%</span>
                      </div>
                      <div className="w-full h-px bg-gray-200">
                        <div className="h-full bg-impulso-orange transition-all duration-1000" style={{ width: `${obra.avance}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── PROCESO DE OBRA ─────────────────────────────────────────── */}
      <section ref={etapasRef} className="border-t border-gray-300 bg-white">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-8">
          <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-3">Proceso</span>
          <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            Cómo ejecutamos<br />
            <span className="text-impulso-orange">cada obra</span>
          </h2>
        </div>

        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 mb-8">
          <div className="w-full h-px bg-gray-200" />
        </div>

        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {ETAPAS.map((e, i) => (
              <div
                key={i}
                className={[
                  "py-10 border-b border-gray-200 lg:border-b-0",
                  i < 3 ? "lg:border-r lg:border-gray-200" : "",
                  i % 2 === 0 ? "sm:border-r sm:border-gray-200 lg:border-r-0" : "",
                  i < 3 ? "lg:border-r lg:border-gray-200" : "",
                  "transition-all duration-700",
                  etapasVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                ].join(" ")}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  paddingRight: i < 3 ? "2.5rem" : 0,
                  paddingLeft: i > 0 ? "2.5rem" : 0,
                }}
              >
                <span className="font-outfit font-black text-gray-100 leading-none block mb-4" style={{ fontSize: "3.5rem" }}>{e.num}</span>
                <div className="w-6 h-px bg-impulso-orange mb-4" />
                <h4 className="font-outfit font-black text-gray-900 text-sm uppercase tracking-wider mb-3">{e.titulo}</h4>
                <p className="font-raleway text-gray-500 text-sm leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 text-white border-t border-white/5">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">¿Tienes una obra?</span>
            <h3 className="font-outfit font-black text-white leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Supervisamos y<br />
              <span className="text-impulso-orange">ejecutamos contigo</span>
            </h3>
          </div>
          <a
            href="https://wa.me/51959679522?text=Hola%2C%20tengo%20una%20obra%20y%20quisiera%20información%20sobre%20supervisión%20y%20ejecución."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 font-outfit text-xs font-bold uppercase tracking-[4px] px-8 py-4 border border-white/20 text-white hover:border-impulso-orange hover:text-impulso-orange transition-all duration-300 cursor-pointer self-start md:self-auto"
          >
            <i className="fa-brands fa-whatsapp text-base" />
            Consultar ahora
          </a>
        </div>
      </section>
    </div>
  );
}