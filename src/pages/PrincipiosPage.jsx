// src/pages/PrincipiosPage.jsx
import { useState, useEffect, useRef } from "react";

const VALORES = [
  {
    num: "01",
    titulo: "Rigor técnico",
    desc: "Cada proyecto es analizado con precisión estructural y normativa vigente. No asumimos, calculamos.",
    icon: "fa-drafting-compass",
  },
  {
    num: "02",
    titulo: "Transparencia",
    desc: "Presupuestos claros desde el día uno. Sin costos ocultos, sin sorpresas en obra.",
    icon: "fa-file-lines",
  },
  {
    num: "03",
    titulo: "Compromiso",
    desc: "Acompañamos a nuestros clientes desde el concepto hasta la entrega final, sin excepciones.",
    icon: "fa-handshake",
  },
  {
    num: "04",
    titulo: "Innovación BIM",
    desc: "Modelamos cada proyecto en 3D antes de construir. Más eficiencia, menos errores en campo.",
    icon: "fa-cube",
  },
  {
    num: "05",
    titulo: "Contexto local",
    desc: "Diseñamos pensando en el territorio, el clima y la cultura andina. Arquitectura que responde a su entorno.",
    icon: "fa-mountain-sun",
  },
  {
    num: "06",
    titulo: "Calidad estructural",
    desc: "Cumplimos con la norma E.030 antisísmica. La seguridad de quienes habitan nuestras obras es innegociable.",
    icon: "fa-building-shield",
  },
];

export default function PrincipiosPage() {
  const [bannerVis, setBannerVis] = useState(false);
  const [valoresVis, setValoresVis] = useState(false);
  const [misionVis, setMisionVis] = useState(false);
  const valoresRef = useRef(null);
  const misionRef  = useRef(null);

  useEffect(() => {
    setBannerVis(true);
    const opts = { threshold: 0.1 };
    const obV = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setValoresVis(true);  obV.disconnect(); } }, opts);
    const obM = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setMisionVis(true);   obM.disconnect(); } }, opts);
    if (valoresRef.current) obV.observe(valoresRef.current);
    if (misionRef.current)  obM.observe(misionRef.current);
    return () => { obV.disconnect(); obM.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900 font-raleway selection:bg-impulso-orange selection:text-white">

      {/* ── BANNER ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="img/proyectos/banner-03.avif"
          alt="Principios"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: bannerVis ? "scale(1.04)" : "scale(1)", transition: "transform 8000ms ease-out" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-14">
          <div className={`transition-all duration-1000 ${bannerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
              Misión · Visión · Valores
            </span>
            <h1 className="font-outfit font-black text-white leading-none tracking-tighter" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
              Nuestros<br />principios
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </div>

      {/* ── MISIÓN Y VISIÓN ─────────────────────────────────────────── */}
      <section ref={misionRef} className="border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-28">
          <div className={`grid lg:grid-cols-2 gap-0 transition-all duration-1000 ${misionVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

            {/* Misión */}
            <div className="lg:pr-16 lg:border-r border-gray-300 pb-12 lg:pb-0">
              <div className="w-8 h-px bg-impulso-orange mb-8" />
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
                Misión
              </span>
              <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Construir con propósito
              </h2>
              <p className="font-raleway text-gray-600 text-base leading-relaxed">
                Somos un estudio de arquitectura e ingeniería comprometido con el desarrollo sostenible del territorio peruano. Ofrecemos soluciones integrales de diseño, ingeniería y gestión de proyectos, garantizando calidad técnica, cumplimiento normativo y acompañamiento real a cada cliente desde la idea hasta la entrega.
              </p>
            </div>

            {/* Visión */}
            <div className="lg:pl-16 pt-12 lg:pt-0">
              <div className="w-8 h-px bg-impulso-orange mb-8" />
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
                Visión
              </span>
              <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Referente en los Andes
              </h2>
              <p className="font-raleway text-gray-600 text-base leading-relaxed">
                Ser reconocidos como el estudio de arquitectura e ingeniería líder en la región andina del Perú; distinguidos por nuestra rigurosidad técnica, innovación en metodología BIM y un lenguaje arquitectónico que dialoga con el paisaje, la cultura y las necesidades reales de cada comunidad que habitamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES ─────────────────────────────────────────────────── */}
      <section ref={valoresRef} className="border-t border-gray-300">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-8">
          <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-3">
            Lo que nos define
          </span>
          <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
            Valores del estudio
          </h2>
        </div>

        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 mb-8">
          <div className="w-full h-px bg-gray-300" />
        </div>

        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {VALORES.map((v, i) => {
              const col = i % 3;
              const colSm = i % 2;
              const isLastRow = i >= VALORES.length - 3;
              return (
                <div
                  key={i}
                  className={[
                    "py-10 border-b border-gray-300",
                    col === 0 ? "lg:pr-10" : col === 1 ? "lg:px-10 lg:border-l lg:border-r lg:border-gray-300" : "lg:pl-10",
                    colSm === 0 ? "sm:pr-8 sm:border-r sm:border-gray-300 lg:border-r-0" : "sm:pl-8",
                    isLastRow ? "lg:border-b-0" : "",
                    "transition-all duration-700",
                    valoresVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  ].join(" ")}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="font-outfit font-black text-gray-100 text-5xl leading-none block mb-4">{v.num}</span>
                  <div className="w-6 h-px bg-impulso-orange mb-5" />
                  <i className={`fa-solid ${v.icon} text-gray-400 text-lg mb-4 block`} />
                  <h4 className="font-outfit font-black text-gray-900 text-sm uppercase tracking-wider mb-3">{v.titulo}</h4>
                  <p className="font-raleway text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FRANJA OSCURA — FRASE ───────────────────────────────────── */}
      <section className="bg-gray-950 text-white border-t border-white/5">
        <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-24">
          <div className="max-w-3xl">
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-6">
              Nuestra filosofía
            </span>
            <p className="font-outfit font-black text-white leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}>
              "La arquitectura no es solo construir — es dar forma a cómo las personas{" "}
              <span className="text-impulso-orange">viven, trabajan y sueñan.</span>"
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}