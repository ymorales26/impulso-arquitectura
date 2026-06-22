// src/components/Hero.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const IMAGENES_SLIDER = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/34808220/pexels-photo-34808220.jpeg",
    subtitle: "Ingeniería Estructural",
    title: "Precisión en Cada Detalle",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/11953163/pexels-photo-11953163.jpeg",
    subtitle: "Diseño Vanguardista",
    title: "Arquitectura que Trasciende",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/29861540/pexels-photo-29861540.jpeg",
    subtitle: "Gestión de Proyectos",
    title: "Construyendo el Futuro Urbano",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/18142047/pexels-photo-18142047.jpeg",
    subtitle: "Infraestructura Vial",
    title: "Conectividad y Desarrollo Sostenible",
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/30810995/pexels-photo-30810995.jpeg",
    subtitle: "Tecnología e Innovación",
    title: "Modelamiento BIM de Alta Complejidad",
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/13046597/pexels-photo-13046597.jpeg",
    subtitle: "Sustentabilidad",
    title: "Soluciones Estructurales Eco-Eficientes",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? IMAGENES_SLIDER.length - 1 : prev - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === IMAGENES_SLIDER.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative h-[90vh] md:h-screen w-full bg-impulso-dark overflow-hidden select-none"
    >
      {/* CONTENEDOR DE IMÁGENES */}
      <div className="relative w-full h-full">
        {IMAGENES_SLIDER.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 visible z-10"
                  : "opacity-0 invisible z-0"
              }`}
            >
              {/* ✨ FIX: Imagen con mayor claridad (de 0.40 a 0.55) */}
              <div
                className={`absolute inset-0 w-full h-full bg-cover bg-center brightness-[0.55] transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                style={{ backgroundImage: `url('${slide.url}')` }}
              />

              {/* ✨ FIX: Degradados más suaves para mayor luminosidad ambiental */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 z-10" />

              {/* TEXTOS ANIMADOS */}
              <div className="absolute inset-0 flex items-center justify-start z-20">
                <div className="container mx-auto px-6 md:px-[7vw]">
                  <div
                    className={`max-w-3xl transition-all duration-1000 delay-300 transform ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <span className="font-outfit text-sm md:text-base font-bold text-impulso-orange tracking-[4px] uppercase block mb-3 shadow-sm">
                      {slide.subtitle}
                    </span>
                    <h1 className="font-outfit text-4xl md:text-7xl font-black uppercase text-white leading-[1.15] tracking-tighter drop-shadow-md">
                      {slide.title.split(" ")[0]} <br />
                      <span className="text-white">
                        {slide.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h1>

                    {/* DESCRIPCIÓN */}
                    <p className="font-raleway text-white mt-5 text-sm md:text-base max-w-2xl leading-relaxed font-semibold drop-shadow-sm">
                      Diseñamos y construimos tu proyecto en Huaraz con
                      metodología BIM, planificación técnica y presupuesto claro
                      desde el inicio.
                    </p>

                    {/* CONTENEDOR DE ICONOS TÉCNICOS DESTACADOS */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-white font-outfit text-xs md:text-sm font-bold tracking-wide">
                      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
                        <i className="fa-solid fa-circle-check text-impulso-orange"></i>
                        <span>+50 proyectos ejecutados</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
                        <i className="fa-solid fa-graduation-cap text-impulso-orange"></i>
                        <span>Metodología BIM certificada</span>
                      </div>
                    </div>

                    {/* BOTÓN DE AGENDA */}
                    <div className="mt-8">
                      <Link
                        to="/contacto"
                        className="inline-flex items-center justify-center px-7 py-3.5 bg-impulso-orange text-white font-outfit text-xs md:text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-orange-600 shadow-lg shadow-impulso-orange/30 transition-all duration-300 group/btn"
                      >
                        Agenda una Asesoría Gratuitas
                        <i className="fa-solid fa-calendar-check ml-2.5 transform transition-transform duration-300 group-hover/btn:scale-110"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FLECHA IZQUIERDA */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/10 text-white flex items-center justify-center hover:bg-impulso-orange hover:border-impulso-orange transition-all duration-300 group cursor-pointer"
        aria-label="Anterior diapositiva"
      >
        <i className="fa-solid fa-chevron-left text-sm group-hover:-translate-x-0.5 transition-transform"></i>
      </button>

      {/* FLECHA DERECHA */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/10 text-white flex items-center justify-center hover:bg-impulso-orange hover:border-impulso-orange transition-all duration-300 group cursor-pointer"
        aria-label="Siguiente diapositiva"
      >
        <i className="fa-solid fa-chevron-right text-sm group-hover:translate-x-0.5 transition-transform"></i>
      </button>

      {/* PUNTOS INDICADORES INFERIORES */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {IMAGENES_SLIDER.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "w-8 bg-impulso-orange"
                : "w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
