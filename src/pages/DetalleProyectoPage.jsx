// src/pages/DetalleProyectoPage.jsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, EffectFade } from 'swiper/modules';
import { useParams } from 'react-router-dom';

import SidebarConcepto from '../components/de-proyecto/SidebarConcepto';

import 'swiper/css';
import 'swiper/css/effect-fade';

// 🗄️ Base de datos detallada de cada proyecto
const DETALLES_PROYECTOS = {
  1: {
    nombre: "Residencial Terrazas",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "Este proyecto fusiona la robustez de la ingeniería estructural antisísmica con un diseño arquitectónico minimalista que aprovecha al máximo la iluminación natural y la topografía de Huaraz.",
    imagenesFondo: [
      "https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80", 
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15715.176214371424!2d-77.528912!3d-9.530368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe", // Reemplazar con iframe src real
    fotosGaleria: [
      "https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  2: {
    nombre: "Centro Corporativo Alfa",
    ubicacionCorta: "Lima, Perú",
    conceptoText: "Un hito de vanguardia arquitectónica enfocado en la sustentabilidad urbana, optimizando áreas de oficinas con plantas libres y vidrios de alto rendimiento térmico.",
    imagenesFondo: [
      "https://images.pexels.com/photos/13012592/pexels-photo-13012592.jpeg",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "",
    fotosGaleria: [
      "https://images.pexels.com/photos/13012592/pexels-photo-13012592.jpeg",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    ]
  },
  3: {
    nombre: "Complejo Industrial Norte",
    ubicacionCorta: "Chimbote, Ancash",
    conceptoText: "Planificación modular de alta eficiencia para naves industriales de gran luz, implementando tijerales de acero estructural calculados para cargas dinámicas severas.",
    imagenesFondo: [
      "https://images.pexels.com/photos/8746219/pexels-photo-8746219.jpeg"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "",
    fotosGaleria: [
      "https://images.pexels.com/photos/8746219/pexels-photo-8746219.jpeg"
    ]
  },
  4: {
    nombre: "Condominio El Mirador",
    ubicacionCorta: "Caraz, Ancash",
    conceptoText: "Estructuras residenciales perfectamente integradas al paisaje montañoso, cimentadas bajo rigurosos estudios geotécnicos para garantizar estabilidad absoluta.",
    imagenesFondo: [
      "https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "",
    fotosGaleria: [
      "https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg"
    ]
  },
  5: {
    nombre: "Plaza Comercial Moderna",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "Espacio comercial de distribución fluida que combina pórticos de concreto armado con fachadas flotantes de aluminio, generando una experiencia urbana única.",
    imagenesFondo: [
      "https://images.pexels.com/photos/20432865/pexels-photo-20432865.jpeg"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "",
    fotosGaleria: [
      "https://images.pexels.com/photos/20432865/pexels-photo-20432865.jpeg"
    ]
  }
};

export default function DetalleProyectoPage({ onClose }) {
  const { proyectoId } = useParams();
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [activeImg, setActiveImg] = useState(null); // ESTADO PARA LA LUPA
  const proyectoData = DETALLES_PROYECTOS[proyectoId] || DETALLES_PROYECTOS[1];

  // Función reutilizable para renderizar los sidebars con el estilo del primero (Sin blur)
  const renderSidebarContainer = (id, titulo, contenido) => {
return (
      <>
        <div onClick={() => setActiveSidebar(null)} className={`fixed inset-0 bg-transparent z-50 transition-opacity duration-300 ${activeSidebar === id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
        <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-[#000d26] border-l border-white/10 z-50 p-6 md:p-8 flex flex-col transition-transform duration-300 ease-in-out transform ${activeSidebar === id ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h2 className="font-outfit text-xl font-bold tracking-tight text-white uppercase">{titulo}</h2>
            <button onClick={() => setActiveSidebar(null)} className="text-gray-400 hover:text-impulso-orange text-sm font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2 transition-colors">Cerrar <i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">{contenido}</div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#000714] text-white relative font-raleway overflow-y-auto lg:overflow-hidden">
      
      {/* LIGHTBOX QUE SE ACTIVA CON LA LUPA */}
      {activeImg && (
        <div onClick={() => setActiveImg(null)} className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out">
          <img src={activeImg} className="max-w-full max-h-full object-contain rounded-lg" />
        </div>
      )}

      {/* 🔙 BOTÓN VOLVER GENERAL */}
      <button 
        onClick={onClose} 
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 hover:text-impulso-orange transition-colors cursor-pointer bg-black/60 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-2.5 rounded-full border border-white/10 shadow-2xl"
      >
        <i className="fa-solid fa-arrow-left"></i> Volver al Portafolio
      </button>
      
      {/* 🏙️ SLIDER DE FONDO COMPLETO */}
      <div className="absolute inset-0 w-full h-full lg:h-screen z-0 pointer-events-none">
        <Swiper
          direction={'vertical'}
          mousewheel={{ releaseOnEdges: true }}
          nested={true}
          effect={'fade'}
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

      {/* INTERFAZ DE CONTENIDOS FLOTANTES */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 min-h-screen lg:h-screen flex flex-col justify-center py-28 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          
          {/* LADO IZQUIERDO: Info Principal */}
          <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
            <span className="text-impulso-orange font-outfit text-xs font-bold uppercase tracking-widest block">
              Proyecto Destacado
            </span>
            <h1 className="font-outfit text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase break-words">
              {proyectoData.nombre}
            </h1>
            <p className="text-gray-300 text-sm md:text-base flex items-center justify-center lg:justify-start gap-2 font-medium">
              <i className="fa-solid fa-location-dot text-impulso-orange text-xs"></i> {proyectoData.ubicacionCorta}
            </p>
          </div>

          {/* LADO DERECHO: Menú de Control Interactivo */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full lg:max-w-md lg:justify-self-end">
            
            {/* CARD 1: CONCEPTO */}
            <div 
              onClick={() => setActiveSidebar('concepto')}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
            >
              <div>
                <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-impulso-orange mb-1.5">01 / Arquitectura</h3>
                <h4 className="font-outfit text-base md:text-lg font-bold text-white mb-1">Concepto de Diseño</h4>
                <p className="text-gray-400 text-xs line-clamp-2">Explora los fundamentos y pilares que dieron vida a esta infraestructura.</p>
              </div>
              <span className="absolute bottom-4 right-4 text-gray-400 group-hover:text-impulso-orange transition-colors text-xl font-bold">
                <i className="fa-solid fa-plus text-xs"></i>
              </span>
            </div>

            {/* CARD 2: PLANOS TÉCNICOS */}
            <div 
              onClick={() => setActiveSidebar('planos')}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
            >
              <div>
                <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-impulso-orange mb-1.5">02 / Estructuras</h3>
                <h4 className="font-outfit text-base md:text-lg font-bold text-white mb-1">Planos & Distribución</h4>
                <p className="text-gray-400 text-xs line-clamp-2">Visualiza las plantas arquitectónicas, metrados y distribución técnica.</p>
              </div>
              <span className="absolute bottom-4 right-4 text-gray-400 group-hover:text-impulso-orange transition-colors text-xl font-bold">
                <i className="fa-solid fa-plus text-xs"></i>
              </span>
            </div>

            {/* CARD 3: MAPA DE UBICACIÓN */}
            <div 
              onClick={() => setActiveSidebar('ubicacion')}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
            >
              <div>
                <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-impulso-orange mb-1.5">03 / Ingeniería</h3>
                <h4 className="font-outfit text-base md:text-lg font-bold text-white mb-1">Geolocalización</h4>
                <p className="text-gray-400 text-xs line-clamp-2">Ubicación exacta del desarrollo inmobiliario o de la obra ejecutada.</p>
              </div>
              <span className="absolute bottom-4 right-4 text-gray-400 group-hover:text-impulso-orange transition-colors text-xl font-bold">
                <i className="fa-solid fa-plus text-xs"></i>
              </span>
            </div>

            {/* CARD 4: GALERÍA DE FOTOS */}
            <div 
              onClick={() => setActiveSidebar('galeria')}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer sm:col-span-2 lg:col-span-1"
            >
              <div>
                <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-impulso-orange mb-2">04 / Multimedia</h3>
                <h4 className="font-outfit text-lg font-bold text-white mb-1">Galería del Proyecto</h4>
                <p className="text-gray-400 text-xs line-clamp-2">Inspecciona capturas de avance de obra, renders y acabados finales.</p>
              </div>
              <span className="absolute bottom-4 right-4 text-gray-400 group-hover:text-impulso-orange transition-colors text-xl font-bold">
                <i className="fa-solid fa-plus text-xs"></i>
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* 📑 RENDERS DE SIDEBARS */}
      
      {/* 01 - Concepto de diseño */}
      <SidebarConcepto 
        isOpen={activeSidebar === 'concepto'} 
        onClose={() => setActiveSidebar(null)} 
        data={proyectoData.conceptoText} 
      />

      {/* 02 - Planos */}
      {renderSidebarContainer(
        'planos',
        'Planos y Estructuras',
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            Distribución estructural y plantas técnicas validadas para este desarrollo:
          </p>
          <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40 group">
            <img 
              src={proyectoData.planoImg} 
              alt="Planos del proyecto" 
              className="w-full h-auto object-contain aspect-[4/3] group-hover:scale-102 transition-transform duration-500"
            />
          </div>
          <span className="text-[11px] text-gray-500 block text-center italic">
            * Vista técnica en alta resolución.
          </span>
        </div>
      )}

      {/* 03 - Geolocalización */}
      {renderSidebarContainer(
        'ubicacion',
        'Ubicación del Proyecto',
        <div className="space-y-4 h-full flex flex-col">
          <p className="text-gray-300 text-sm">
            Nuestros desarrollos se ejecutan bajo rigurosos criterios de accesibilidad y plusvalía:
          </p>
          <div className="w-full flex-1 min-h-[320px] rounded-xl overflow-hidden border border-white/10 relative bg-black/20">
            <iframe 
              src={proyectoData.mapaUrl} 
              className="w-full h-full min-h-[320px] opacity-100"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Integrado"
            />
          </div>
          <div className="flex items-center gap-3 bg-white/[0.02] p-3.5 border border-white/5 rounded-xl">
            <i className="fa-solid fa-circle-info text-impulso-orange text-sm"></i>
            <p className="text-xs text-gray-400 leading-snug">
              El mapa está estilizado con un filtro moderno de ingeniería. Si deseas ver un marcador con el logo exacto de la empresa, recuerda usar un mapa personalizado de My Maps.
            </p>
          </div>
        </div>
      )}

      {/* 04 - Galería de Fotos */}
      {renderSidebarContainer(
        'galeria',
        'Galería de Evidencias y Renders',
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">Capturas fotográficas reales de las fases de construcción y simulaciones digitales:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {proyectoData.fotosGaleria.map((foto, index) => (
              <div key={index} onClick={() => setActiveImg(foto)} className="border border-white/10 rounded-xl overflow-hidden bg-black/40 relative aspect-square group cursor-pointer shadow-md">
                <img src={foto} alt={`Fotografía ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <i className="fa-solid fa-magnifying-glass-plus text-white text-base"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}