import { useState, useEffect } from "react";

// 1. Array optimizado con 6 tomas horizontales y enfoque de ingeniería premium
const IMAGENES_SLIDER = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg",
    subtitle: "Diseño Vanguardista",
    title: "Arquitectura que Trasciende",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/13012592/pexels-photo-13012592.jpeg",
    subtitle: "Ingeniería Estructural",
    title: "Precisión en Cada Detalle",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/20432865/pexels-photo-20432865.jpeg",
    subtitle: "Gestión de Proyectos",
    title: "Construyendo el Futuro Urbano",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/8746219/pexels-photo-8746219.jpeg", // Espacio para foto de dron 4
    subtitle: "Infraestructura Vial",
    title: "Conectividad y Desarrollo Sostenible",
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg", // Espacio para foto de dron 5
    subtitle: "Tecnología e Innovación",
    title: "Modelamiento BIM de Alta Complejidad",
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg", // Espacio para foto de dron 6
    subtitle: "Sustentabilidad",
    title: "Soluciones Estructurales Eco-Eficientes",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Funciones para navegar manualmente
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

  // Efecto Autoplay: Cambia la foto automáticamente cada 6 segundos
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
              {/* Imagen panorámica con sutil efecto Zoom continuo */}
              {/* Cambia brightness-[0.35] por uno mayor para aclarar la foto */}
              <div
                className={`absolute inset-0 w-full h-full bg-cover bg-center brightness-[0.48] transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
                style={{ backgroundImage: `url('${slide.url}')` }}
              />

              {/* Capa de degradado sutil inferior para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-10" />

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
                    <span className="font-outfit text-sm md:text-base font-bold text-impulso-orange tracking-[4px] uppercase block mb-3">
                      {slide.subtitle}
                    </span>
                    <h1 className="font-outfit text-4xl md:text-7xl font-black uppercase text-white leading-[1.15] tracking-tighter">
                      {slide.title.split(" ")[0]} <br />
                      <span className="text-white">
                        {slide.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h1>
                    <p className="font-raleway text-gray-300 mt-6 text-base md:text-lg max-w-xl leading-relaxed">
                      Soluciones integrales de construcción con altos estándares
                      técnicos e ingeniería de precisión.
                    </p>
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
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/20 text-white flex items-center justify-center hover:bg-impulso-orange hover:border-impulso-orange transition-all duration-300 group cursor-pointer"
        aria-label="Anterior diapositiva"
      >
        <i className="fa-solid fa-chevron-left text-sm group-hover:-translate-x-0.5 transition-transform"></i>
      </button>

      {/* FLECHA DERECHA */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/20 text-white flex items-center justify-center hover:bg-impulso-orange hover:border-impulso-orange transition-all duration-300 group cursor-pointer"
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
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
