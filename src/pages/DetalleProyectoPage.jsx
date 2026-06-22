// src/pages/DetalleProyectoPage.jsx
import { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectFade } from "swiper/modules";
import { useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-fade";

// ─────────────────────────────────────────────
// BASE DE DATOS DE PROYECTOS
// ─────────────────────────────────────────────
import { DETALLES_PROYECTOS } from "../data/proyectosData";
// ─────────────────────────────────────────────
// MAPA — iframe directo con src (no dangerouslySetInnerHTML)
// ─────────────────────────────────────────────
function MapaEmbed({ mapaSrc, pois }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Mapa */}
      <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-white/5">
        <iframe
          src={mapaSrc}
          width="100%"
          height="380"
          style={{ border: 0, display: "block" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa del proyecto"
        />
      </div>

      {/* POIs */}
      {pois?.length > 0 && (
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-impulso-orange font-bold mb-3">
            Puntos de interés cercanos
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {pois.map((poi, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <i
                    className={`fa-solid ${poi.icono} text-impulso-orange text-xs`}
                  />
                </div>
                <span className="text-sm text-gray-300 font-medium">
                  {poi.nombre}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// LIGHTBOX CON SLIDER
// ─────────────────────────────────────────────
function LightboxSlider({ imagenes, indiceInicial, onClose }) {
  const [indice, setIndice] = useState(indiceInicial);

  const anterior = useCallback(
    () => setIndice((i) => (i - 1 + imagenes.length) % imagenes.length),
    [imagenes.length],
  );
  const siguiente = useCallback(
    () => setIndice((i) => (i + 1) % imagenes.length),
    [imagenes.length],
  );

  const handleKey = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
      if (e.key === "Escape") onClose();
    },
    [anterior, siguiente, onClose],
  );

  return (
    <div
      className="fixed inset-0 z-[10010] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
    >
      <div
        className="relative w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen principal */}
        <div
          className="relative rounded-xl overflow-hidden border border-white/10 bg-black/60"
          style={{ maxHeight: "68vh" }}
        >
          <img
            src={imagenes[indice]}
            alt={`Vista ${indice + 1}`}
            className="w-full h-auto object-contain"
            style={{ maxHeight: "63vh" }}
          />
          {/* Contador */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {indice + 1} / {imagenes.length}
          </div>
        </div>

        {/* Flechas */}
        {imagenes.length > 1 && (
          <>
            <button
              onClick={anterior}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-5 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/80 border border-white/20 text-white hover:border-impulso-orange hover:text-impulso-orange transition-all flex items-center justify-center shadow-xl"
            >
              <i className="fa-solid fa-chevron-left text-xs md:text-sm" />
            </button>
            <button
              onClick={siguiente}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-5 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/80 border border-white/20 text-white hover:border-impulso-orange hover:text-impulso-orange transition-all flex items-center justify-center shadow-xl"
            >
              <i className="fa-solid fa-chevron-right text-xs md:text-sm" />
            </button>
          </>
        )}

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/80 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-all flex items-center justify-center"
        >
          <i className="fa-solid fa-xmark text-xs md:text-sm" />
        </button>

        {/* Miniaturas */}
        {imagenes.length > 1 && (
          <div className="flex gap-1.5 mt-3 justify-center overflow-x-auto pb-1 px-2">
            {imagenes.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndice(i)}
                className={`flex-shrink-0 w-10 h-8 md:w-12 md:h-9 rounded-md overflow-hidden border-2 transition-all ${
                  i === indice
                    ? "border-impulso-orange"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={img}
                  alt={`Miniatura ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// GRID DE IMÁGENES (planos y galería)
// ─────────────────────────────────────────────
function GridImagenes({ imagenes, onClickImg, labelPrefix = "Vista" }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {imagenes?.map((img, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl border border-white/10 cursor-zoom-in group bg-white/5"
          style={{ aspectRatio: "4/3" }}
          onClick={() => onClickImg(i)}
        >
          <img
            src={img}
            alt={`${labelPrefix} ${i + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay lupa */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
            <i className="fa-solid fa-magnifying-glass-plus text-white text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {/* Etiqueta */}
          <div className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full backdrop-blur-sm">
            {labelPrefix} {i + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function DetalleProyectoPage({ onClose }) {
  const { slug } = useParams();
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const proyectoData =
    DETALLES_PROYECTOS[slug] || DETALLES_PROYECTOS["torre-leguia"];

  const abrirLightbox = (imagenes, indice = 0) =>
    setLightbox({ imagenes, indice });

  // ── Sidebar contenedor ──────────────────────────────────────────────────
  const renderSidebarContainer = (id, titulo, contenido) => (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setActiveSidebar(null)}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          activeSidebar === id
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-[#000d26] border-l border-white/10 z-[10000] flex flex-col transition-transform duration-500 ease-in-out ${
          activeSidebar === id ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header fijo */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8 flex-shrink-0">
          <h2 className="font-outfit text-xl font-bold tracking-tight text-white uppercase">
            {titulo}
          </h2>
          <button
            onClick={() => setActiveSidebar(null)}
            className="text-gray-400 hover:text-impulso-orange text-sm font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2 transition-colors"
          >
            CERRAR <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-6 space-y-4">
          {contenido}
        </div>

        {/* Footer fijo */}
        <div className="px-6 py-3 md:px-8 border-t border-white/5 flex-shrink-0">
          <p className="text-[10px] text-gray-600">
            Impulso Proyectistas e Ingenieros
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#000714] text-white relative font-raleway overflow-y-auto lg:overflow-hidden">
      {/* LIGHTBOX */}
      {lightbox && (
        <LightboxSlider
          imagenes={lightbox.imagenes}
          indiceInicial={lightbox.indice}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* BOTÓN VOLVER */}
      <button
        onClick={onClose}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 hover:text-impulso-orange transition-colors cursor-pointer bg-black/80 px-4 py-2.5 md:px-5 rounded-full border border-white/10 shadow-2xl"
      >
        <i className="fa-solid fa-arrow-left" /> Volver al Portafolio
      </button>

      {/* SLIDER DE FONDO */}
      <div className="absolute inset-0 w-full h-full lg:h-screen z-0 pointer-events-none">
        <Swiper
          direction="vertical"
          mousewheel={{ releaseOnEdges: true }}
          nested
          effect="fade"
          modules={[Mousewheel, EffectFade]}
          className="w-full h-full"
        >
          {proyectoData.imagenesFondo.map((img, index) => (
            <SwiperSlide key={index} className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#000714] lg:bg-gradient-to-r lg:from-black/80 lg:via-black/40 lg:to-black/80 z-10" />
              <img
                src={img}
                alt={`${proyectoData.nombre} - vista ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* INTERFAZ PRINCIPAL */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 min-h-screen lg:h-screen flex flex-col justify-center py-28 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          {/* IZQUIERDA */}
          <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
            <span className="text-impulso-orange font-outfit text-xs font-bold uppercase tracking-widest block">
              Proyecto Destacado
            </span>
            <h1 className="font-outfit text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase break-words">
              {proyectoData.nombre}
            </h1>
            <p className="text-gray-300 text-sm md:text-base flex items-center justify-center lg:justify-start gap-2 font-medium">
              <i className="fa-solid fa-location-dot text-impulso-orange text-xs" />
              {proyectoData.ubicacionCorta}
            </p>

            {/* BOTÓN NUEVO: Solo aparece si el proyecto tiene link360 */}
            {proyectoData.link360 && (
              <a
                href={proyectoData.link360}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-impulso-orange text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg border border-impulso-orange"
              >
                <i className="fa-solid fa-vr-cardboard" /> Ver Recorrido 360°
              </a>
            )}
          </div>

          {/* DERECHA: CARDS */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full lg:max-w-md lg:justify-self-end">
            <div
              onClick={() => setActiveSidebar("concepto")}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
            >
              <div>
                <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-impulso-orange mb-1.5">
                  01 / Arquitectura
                </h3>
                <h4 className="font-outfit text-base md:text-lg font-bold text-white mb-1">
                  Concepto de Diseño
                </h4>
                <p className="text-gray-400 text-xs line-clamp-2">
                  Explora los fundamentos y pilares que dieron vida a esta
                  infraestructura.
                </p>
              </div>
              <span className="absolute bottom-4 right-4 text-gray-400 group-hover:text-impulso-orange transition-colors">
                <i className="fa-solid fa-plus text-xs" />
              </span>
            </div>

            <div
              onClick={() => setActiveSidebar("planos")}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
            >
              <div>
                <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-impulso-orange mb-1.5">
                  02 / Estructuras
                </h3>
                <h4 className="font-outfit text-base md:text-lg font-bold text-white mb-1">
                  Planos & Distribución
                </h4>
                <p className="text-gray-400 text-xs line-clamp-2">
                  Visualiza las plantas arquitectónicas, metrados y distribución
                  técnica.
                </p>
              </div>
              <span className="absolute bottom-4 right-4 text-gray-400 group-hover:text-impulso-orange transition-colors">
                <i className="fa-solid fa-plus text-xs" />
              </span>
            </div>

            <div
              onClick={() => setActiveSidebar("ubicacion")}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
            >
              <div>
                <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-impulso-orange mb-1.5">
                  03 / Ingeniería
                </h3>
                <h4 className="font-outfit text-base md:text-lg font-bold text-white mb-1">
                  Geolocalización
                </h4>
                <p className="text-gray-400 text-xs line-clamp-2">
                  Ubicación exacta del desarrollo inmobiliario o de la obra
                  ejecutada.
                </p>
              </div>
              <span className="absolute bottom-4 right-4 text-gray-400 group-hover:text-impulso-orange transition-colors">
                <i className="fa-solid fa-plus text-xs" />
              </span>
            </div>

            <div
              onClick={() => setActiveSidebar("galeria")}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer sm:col-span-2 lg:col-span-1"
            >
              <div>
                <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-impulso-orange mb-2">
                  04 / Multimedia
                </h3>
                <h4 className="font-outfit text-lg font-bold text-white mb-1">
                  Galería del Proyecto
                </h4>
                <p className="text-gray-400 text-xs line-clamp-2">
                  Inspecciona capturas de avance de obra, renders y acabados
                  finales.
                </p>
              </div>
              <span className="absolute bottom-4 right-4 text-gray-400 group-hover:text-impulso-orange transition-colors">
                <i className="fa-solid fa-plus text-xs" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SIDEBAR 1: CONCEPTO ─────────────────────────────────── */}
      {activeSidebar === "concepto" &&
        renderSidebarContainer(
          "concepto",
          "El Concepto",
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {proyectoData.stats?.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:border-impulso-orange/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-impulso-orange/10 border border-impulso-orange/20 flex items-center justify-center">
                    <i
                      className={`fa-solid ${stat.icono} text-impulso-orange text-sm`}
                    />
                  </div>
                  <div>
                    <p className="text-white font-outfit font-black text-2xl leading-none">
                      {stat.valor}
                    </p>
                    <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10" />

            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-impulso-orange font-bold mb-2">
                Descripción
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed text-justify">
                {proyectoData.conceptoText}
              </p>
            </div>

            {proyectoData.caracteristicas?.length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-impulso-orange font-bold mb-3">
                  Características
                </h4>
                <ul className="space-y-2">
                  {proyectoData.caracteristicas.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-impulso-orange flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>,
        )}

      {/* ── SIDEBAR 2: PLANOS ───────────────────────────────────── */}
      {activeSidebar === "planos" &&
        renderSidebarContainer(
          "planos",
          "Planos Técnicos",
          <div className="space-y-4">
            <p className="text-gray-500 text-xs">
              Toca cualquier plano para ampliar. Usa las flechas para navegar.
            </p>
            <GridImagenes
              imagenes={proyectoData.planosImgs}
              onClickImg={(i) => abrirLightbox(proyectoData.planosImgs, i)}
              labelPrefix="Plano"
            />
          </div>,
        )}

      {/* ── SIDEBAR 3: GEOLOCALIZACIÓN ──────────────────────────── */}
      {activeSidebar === "ubicacion" &&
        renderSidebarContainer(
          "ubicacion",
          "Ubicación en Mapa",
          <MapaEmbed mapaSrc={proyectoData.mapaSrc} pois={proyectoData.pois} />,
        )}

      {/* ── SIDEBAR 4: GALERÍA ──────────────────────────────────── */}
      {activeSidebar === "galeria" &&
        renderSidebarContainer(
          "galeria",
          "Galería de Avances",
          <div className="space-y-4">
            <p className="text-gray-500 text-xs">
              Toca cualquier imagen para ampliar y navegar con las flechas.
            </p>
            <GridImagenes
              imagenes={proyectoData.fotosGaleria}
              onClickImg={(i) => abrirLightbox(proyectoData.fotosGaleria, i)}
              labelPrefix="Captura"
            />
          </div>,
        )}
    </div>
  );
}
