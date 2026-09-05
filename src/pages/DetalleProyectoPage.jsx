// src/pages/DetalleProyectoPage.jsx
// Rediseño estilo 57uno.com / carmen.pe
// — Fachada a pantalla completa
// — Concepto y stats visibles de inmediato
// — Galería dominante en scroll
// — Planos y mapa al final, sin sidebar

import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { DETALLES_PROYECTOS } from "../data/proyectosData";

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX CON SLIDER
// ─────────────────────────────────────────────────────────────────────────────
function LightboxSlider({ imagenes, indiceInicial, onClose }) {
  const [indice, setIndice] = useState(indiceInicial);

  const anterior  = useCallback(() => setIndice(i => (i - 1 + imagenes.length) % imagenes.length), [imagenes.length]);
  const siguiente = useCallback(() => setIndice(i => (i + 1) % imagenes.length), [imagenes.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  anterior();
      if (e.key === "ArrowRight") siguiente();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [anterior, siguiente, onClose]);

  return (
    <div className="fixed inset-0 z-[10010] bg-black/97 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full max-w-5xl px-4 md:px-16" onClick={e => e.stopPropagation()}>

        <img
          src={imagenes[indice]}
          alt={`Vista ${indice + 1}`}
          className="w-full max-h-[80vh] object-contain"
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-outfit text-[10px] font-bold tracking-[4px] uppercase text-white/50">
          {String(indice + 1).padStart(2,"0")} / {String(imagenes.length).padStart(2,"0")}
        </div>

        {imagenes.length > 1 && (
          <>
            <button onClick={anterior}  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-impulso-orange hover:text-impulso-orange transition-all cursor-pointer">
              <i className="fa-solid fa-chevron-left text-xs" />
            </button>
            <button onClick={siguiente} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-impulso-orange hover:text-impulso-orange transition-all cursor-pointer">
              <i className="fa-solid fa-chevron-right text-xs" />
            </button>
          </>
        )}

        <button onClick={onClose} className="absolute top-0 right-4 md:right-16 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer">
          <i className="fa-solid fa-xmark text-sm" />
        </button>

        {imagenes.length > 1 && (
          <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-1">
            {imagenes.map((img, i) => (
              <button key={i} onClick={() => setIndice(i)}
                className={`flex-shrink-0 w-12 h-8 overflow-hidden border transition-all cursor-pointer ${i === indice ? "border-impulso-orange" : "border-white/20 opacity-40 hover:opacity-70"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function DetalleProyectoPage({ onClose }) {
  const { slug } = useParams();
  const [lightbox,  setLightbox]  = useState(null);
  const [headerVis, setHeaderVis] = useState(false);

  const proyectoData = DETALLES_PROYECTOS[slug] || DETALLES_PROYECTOS["torre-leguia"];

  useEffect(() => { setTimeout(() => setHeaderVis(true), 80); }, []);

  const abrirLightbox = (imagenes, indice = 0) => setLightbox({ imagenes, indice });

  const fotosHero    = proyectoData.imagenesFondo || [];
  const fotosGaleria = proyectoData.fotosGaleria?.length ? proyectoData.fotosGaleria : fotosHero;
  const planos       = proyectoData.planosImgs    || [];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900 font-raleway selection:bg-impulso-orange selection:text-white">

      {lightbox && (
        <LightboxSlider
          imagenes={lightbox.imagenes}
          indiceInicial={lightbox.indice}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* ── 1. HERO — FACHADA PANTALLA COMPLETA ────────────────────── */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
        <img
          src={fotosHero[0]}
          alt={proyectoData.nombre}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: headerVis ? "scale(1.04)" : "scale(1)",
            transition: "transform 8000ms ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Nombre + meta */}
        <div
          className={`absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-24 pb-14 transition-all duration-1000 ${headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-4">
            {proyectoData.ubicacionCorta}
          </span>
          <h1
            className="font-outfit font-black text-white leading-none tracking-tighter mb-6"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          >
            {proyectoData.nombre}
          </h1>

          {/* Stats breves + scroll cue */}
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-8">
              {proyectoData.stats?.slice(0, 3).map((s, i) => (
                <div key={i}>
                  <p className="font-outfit font-black text-white text-lg md:text-2xl leading-none">{s.valor}</p>
                  <p className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-white/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            {/* Indicador scroll */}
            <div className="hidden md:flex flex-col items-center gap-2 pb-2">
              <div className="w-px h-12 bg-white/15 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 bg-impulso-orange" style={{ height: "40%", animation: "scrollLine 2s ease-in-out infinite" }} />
              </div>
              <span className="font-outfit text-[8px] font-bold uppercase tracking-[4px] text-white/30">Scroll</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* ── 2. CONCEPTO ─────────────────────────────────────────────── */}
      <section className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          <div className="lg:col-span-4">
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
              Concepto
            </span>
            <h2
              className="font-outfit font-black text-gray-900 leading-none tracking-tighter"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {proyectoData.nombre}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="font-raleway text-gray-600 text-base md:text-lg leading-relaxed mb-10">
              {proyectoData.conceptoText}
            </p>
            {proyectoData.caracteristicas?.length > 0 && (
              <ul className="grid sm:grid-cols-2 gap-3 mt-8">
                {proyectoData.caracteristicas.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-px h-4 bg-impulso-orange flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Stats horizontales */}
        {proyectoData.stats?.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-300 grid grid-cols-2 md:grid-cols-4 gap-0">
            {proyectoData.stats.map((s, i) => (
              <div
                key={i}
                className={`py-6 ${i < proyectoData.stats.length - 1 ? "border-r border-gray-300" : ""}`}
                style={{ paddingLeft: i > 0 ? "2rem" : 0, paddingRight: i < proyectoData.stats.length - 1 ? "2rem" : 0 }}
              >
                <p className="font-outfit font-black text-gray-900 leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  {s.valor}
                </p>
                <p className="font-outfit text-[10px] font-bold uppercase tracking-[3px] text-impulso-orange mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── 3. GALERÍA — IMÁGENES DOMINANTES ───────────────────────── */}
      {fotosGaleria.length > 0 && (
        <section className="border-t border-gray-300">
          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-8 flex items-end justify-between">
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-3">Multimedia</span>
              <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
                Galería del proyecto
              </h2>
            </div>
            <span className="font-outfit text-[10px] text-gray-400 tracking-[3px] uppercase hidden md:block">
              {fotosGaleria.length} imágenes
            </span>
          </div>

          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 mb-6">
            <div className="w-full h-px bg-gray-300" />
          </div>

          {/* Grid editorial alternado */}
          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {fotosGaleria.map((foto, i) => {
                // Primera imagen grande (8 col), segunda pequeña (4 col), resto en 4
                const colSpan = i === 0 ? "md:col-span-8" : i === 1 ? "md:col-span-4" : "md:col-span-4";
                const altura  = i === 0 || i === 1 ? "h-[300px] md:h-[560px]" : "h-[260px]";
                return (
                  <div
                    key={i}
                    className={`${colSpan} ${altura} overflow-hidden relative group cursor-zoom-in`}
                    onClick={() => abrirLightbox(fotosGaleria, i)}
                  >
                    <img
                      src={foto}
                      alt={`${proyectoData.nombre} ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500 flex items-center justify-center">
                      <i className="fa-solid fa-magnifying-glass-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-3 left-3 font-outfit text-[9px] font-bold tracking-[3px] text-white/60 bg-black/40 px-2 py-0.5 backdrop-blur-sm">
                      {String(i + 1).padStart(2,"0")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. PLANOS TÉCNICOS ──────────────────────────────────────── */}
      {planos.length > 0 && (
        <section className="border-t border-gray-300 bg-white">
          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-8 flex items-end justify-between">
            <div>
              <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-3">Estructuras</span>
              <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
                Planos técnicos
              </h2>
            </div>
            <span className="font-outfit text-[10px] text-gray-400 tracking-[3px] uppercase hidden md:block">{planos.length} planos</span>
          </div>

          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 mb-6">
            <div className="w-full h-px bg-gray-200" />
          </div>

          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pb-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {planos.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] overflow-hidden relative group cursor-zoom-in bg-gray-100"
                  onClick={() => abrirLightbox(planos, i)}
                >
                  <img src={img} alt={`Plano ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <i className="fa-solid fa-magnifying-glass-plus text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 left-2 font-outfit text-[9px] font-bold tracking-[3px] text-white/70 bg-black/50 px-1.5 py-0.5">
                    P-{String(i + 1).padStart(2,"0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. MAPA + POIs ──────────────────────────────────────────── */}
      {proyectoData.mapaSrc && (
        <section className="border-t border-gray-300">
          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-8">
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-3">Ubicación</span>
            <h2 className="font-outfit font-black text-gray-900 leading-none tracking-tighter" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Geolocalización
            </h2>
          </div>

          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 mb-8">
            <div className="w-full h-px bg-gray-300" />
          </div>

          <div className="max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 pb-20">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 overflow-hidden border border-gray-200">
                <iframe
                  src={proyectoData.mapaSrc}
                  width="100%" height="420"
                  style={{ border: 0, display: "block", filter: "grayscale(20%) contrast(1.05)" }}
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${proyectoData.nombre}`}
                />
              </div>
              {proyectoData.pois?.length > 0 && (
                <div>
                  <p className="font-outfit text-[10px] font-bold uppercase tracking-[4px] text-gray-400 mb-6">
                    Puntos de interés cercanos
                  </p>
                  <ul className="space-y-4">
                    {proyectoData.pois.map((poi, i) => (
                      <li key={i} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0">
                        <div className="w-8 h-8 border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <i className={`fa-solid ${poi.icono} text-impulso-orange text-xs`} />
                        </div>
                        <span className="font-raleway text-sm text-gray-600">{poi.nombre}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. CTA BANNER IMPACTANTE ────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>

        {/* Imagen de fondo — edificio */}
        <img
          src={fotosHero[0]}
          alt="Proyecto"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Capa oscura base */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Forma diagonal naranja — panel izquierdo */}
        <div
          className="absolute inset-y-0 left-0 bg-gray-950"
          style={{
            width: "55%",
            clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)",
          }}
        />
        {/* Acento naranja — borde diagonal */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "55%",
            clipPath: "polygon(calc(100% - 6px) 0, 100% 0, 82% 100%, calc(82% - 5px) 100%)",
            background: "linear-gradient(to bottom, #FF6B1A, #cc4d00)",
          }}
        />

        {/* Textura grid técnica sobre el panel */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ width: "55%" }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-cta)" />
          </svg>
        </div>

        {/* Contenido sobre el panel */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-24">
          <div className="max-w-lg">
            <span className="font-outfit text-[10px] font-bold tracking-[5px] uppercase text-impulso-orange block mb-5">
              Estamos a un clic
            </span>
            <h3
              className="font-outfit font-black text-white leading-none tracking-tighter mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              ¿Tienes un proyecto<br />en mente?
            </h3>
            <a
              href="https://wa.me/51959679522?text=Hola%2C%20vi%20el%20proyecto%20y%20estoy%20interesado.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n."
              target="_blank"
              rel="noreferrer"
            className="inline-flex items-center gap-3 font-outfit text-xs font-bold uppercase tracking-[4px] px-7 py-3.5 cursor-pointer transition-all duration-300"
              style={{ backgroundColor: "#FF6B1A", color: "#111827" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FF6B1A"; e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#FF6B1A"; e.currentTarget.style.color = "#111827"; }}
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              Contáctanos
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(250%);  opacity: 0; }
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
}