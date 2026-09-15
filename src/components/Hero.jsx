// src/components/Hero.jsx
// Estilo estudio de arquitectura — editorial, tipografía dominante, fotos que respiran
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    id: 1,
    img: "img/proyectos/torre-leguia.webp",
    proyecto: "Torre Leguía",
    lugar: "Huaraz, Ancash",
    tipo: "Edificio Residencial Mixto",
    slug: "torre-leguia",
    indice: "01",
  },
  {
    id: 2,
    img: "img/proyectos/trivio.webp",
    proyecto: "Trivio",
    lugar: "Arequipa, Perú",
    tipo: "Edificio Residencial",
    slug: "trivio",
    indice: "02",
  },
  {
    id: 3,
    img: "img/proyectos/plaza27.webp",
    proyecto: "Plaza 27",
    lugar: "Huaraz, Ancash",
    tipo: "Edificio Residencial",
    slug: "plaza27",
    indice: "03",
  },
  {
    id: 4,
    img: "img/proyectos/aflora.webp",
    proyecto: "Aflora",
    lugar: "Arequipa, Perú",
    tipo: "Edificio Multifamiliar",
    slug: "aflora",
    indice: "04",
  },
  {
    id: 5,
    img: "img/proyectos/JTU.webp",
    proyecto: "JTU",
    lugar: "Lima, Perú",
    tipo: "Edificio Multifamiliar",
    slug: "JTU",
    indice: "05",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (index) => {
    if (animating || index === current) return;
    setPrev(current);
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 900);
  };

  const next = () => goTo((current + 1) % SLIDES.length);
  const back = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 7000);
    return () => clearInterval(timerRef.current);
  }, [current, animating]);

  const slide = SLIDES[current];

  return (
    <section
      id="inicio"
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black select-none"
    >
      {/* ── IMÁGENES ─────────────────────────────────────────────── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: i === current ? 2 : i === prev ? 1 : 0,
            transition: "opacity 900ms ease",
            opacity: i === current ? 1 : 0,
          }}
        >
          <img
            src={s.img}
            alt={s.proyecto}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: i === current ? "scale(1.04)" : "scale(1)",
              transition: "transform 7000ms ease-out",
            }}
          />
          {/* Gradiente — oscuro abajo y a la izquierda para leer el texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* ── CONTENIDO PRINCIPAL ──────────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 md:pb-20 px-8 md:px-16 lg:px-24">

        {/* Tipo de proyecto — eyebrow pequeño */}
        <div className="mb-3 flex items-center gap-4 overflow-hidden">
          <span
            key={`tipo-${current}`}
            className="font-outfit text-[10px] md:text-xs font-bold uppercase tracking-[5px] text-impulso-orange animate-fade-up"
          >
            {slide.tipo}
          </span>
          <div className="flex-1 h-px bg-white/20 max-w-[80px]" />
        </div>

        {/* Nombre del proyecto — tipografía dominante */}
        <div className="overflow-hidden mb-4">
          <h1
            key={`titulo-${current}`}
            className="font-outfit font-black text-white leading-none tracking-tighter animate-slide-up"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            {slide.proyecto}
          </h1>
        </div>

        {/* Lugar + CTA en la misma línea */}
        <div
          key={`meta-${current}`}
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 animate-fade-up-slow"
        >
          <p className="font-raleway text-white/60 text-xs md:text-sm tracking-widest uppercase">
            {slide.lugar}
          </p>
          <Link
            to={`/proyecto/${slide.slug}`}
            className="inline-flex items-center gap-3 group"
          >
            <span className="font-outfit text-xs font-bold uppercase tracking-widest text-white group-hover:text-impulso-orange transition-colors duration-300">
              Ver proyecto
            </span>
            <span className="w-8 h-px bg-white group-hover:w-14 group-hover:bg-impulso-orange transition-all duration-500" />
          </Link>
        </div>
      </div>

      {/* ── CONTADOR + NAVEGACIÓN (esquina inferior derecha) ─────── */}
      <div className="absolute bottom-16 md:bottom-20 right-8 md:right-16 lg:right-24 z-10 flex flex-col items-end gap-6">

        {/* Contador */}
        <div className="flex items-baseline gap-1 font-outfit">
          <span className="text-white text-2xl font-black">{slide.indice}</span>
          <span className="text-white/30 text-xs">/ {SLIDES.length.toString().padStart(2, "0")}</span>
        </div>

        {/* Flechas */}
        <div className="flex items-center gap-3">
          <button
            onClick={back}
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-impulso-orange hover:text-impulso-orange transition-all duration-300 cursor-pointer"
            aria-label="Proyecto anterior"
          >
            <i className="fa-solid fa-chevron-left text-xs" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-impulso-orange hover:text-impulso-orange transition-all duration-300 cursor-pointer"
            aria-label="Proyecto siguiente"
          >
            <i className="fa-solid fa-chevron-right text-xs" />
          </button>
        </div>
      </div>

      {/* ── MINIATURAS VERTICALES (desktop derecha) ──────────────── */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="group relative overflow-hidden cursor-pointer"
            style={{ width: 52, height: 70 }}
            aria-label={`Ver ${s.proyecto}`}
          >
            <img
              src={s.img}
              alt={s.proyecto}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ opacity: i === current ? 1 : 0.4 }}
            />
            {/* Borde naranja activo */}
            <div
              className="absolute inset-0 border transition-all duration-300"
              style={{
                borderColor: i === current ? "#FF6B1A" : "transparent",
              }}
            />
          </button>
        ))}
      </div>

      {/* ── BARRA DE PROGRESO inferior ────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-white/10">
        <div
          className="h-full bg-impulso-orange"
          style={{
            width: `${((current + 1) / SLIDES.length) * 100}%`,
            transition: "width 700ms ease",
          }}
        />
      </div>

      {/* ── LOGO marca de agua superior izquierdo ─────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 px-8 md:px-16 lg:px-24 pt-8 flex items-center justify-between pointer-events-none">
        {/* Espacio — la Navbar ya va por encima, esto es solo un detalle de layout */}
        <div />
        {/* Claim estudio */}
        <span className="font-outfit text-[9px] font-bold tracking-[4px] uppercase text-white/30 hidden md:block">
          Proyectistas & Ingenieros
        </span>
      </div>

      {/* ── ESTILOS de animación (Tailwind no los tiene nativos) ─── */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fade-up {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(.16,1,.3,1) both;
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease both 0.15s;
        }
        .animate-fade-up-slow {
          animation: fade-up 0.7s ease both 0.3s;
        }
      `}</style>
    </section>
  );
}