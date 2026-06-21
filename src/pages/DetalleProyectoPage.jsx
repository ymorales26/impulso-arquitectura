// src/pages/DetalleProyectoPage.jsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, EffectFade } from 'swiper/modules';
import { useParams } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/effect-fade';

// 🗄️ Base de datos indexada por SLUGS con el prefijo "/" corregido para rutas anidadas
const DETALLES_PROYECTOS = {
  "torre-leguia": {
    nombre: "Torre Leguía",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "Ubicado estratégicamente en Huaraz, este desarrollo cuenta con acabados de primera y una arquitectura moderna que aprovecha cada espacio al máximo.",
    imagenesFondo: [
      "/img/proyectos/torre-leguia.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80", 
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3323062366835!2d-77.5332766!3d-9.5232677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a90d1645e54d6f%3A0x673cb439527ec31c!2sHuaraz!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe", 
    fotosGaleria: ["/img/proyectos/torre-leguia.webp"]
  },
  "trivio": {
    nombre: "Trivio",
    ubicacionCorta: "Arequipa, Perú",
    conceptoText: "Gracias a su diseño con tres fachadas, cada espacio recibe iluminación natural de manera excepcional, ofreciendo ambientes cálidos. Un proyecto pensado en el bienestar diario de sus residentes.",
    imagenesFondo: [
      "/img/proyectos/trivio.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15302.730310619574!2d-71.5367613!3d-16.3988661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a7ff253a551%3A0xc6cb5561be7495b6!2sArequipa!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/trivio.webp"]
  },
  "plaza27": {
    nombre: "Plaza 27",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "Un edificio de departamentos ubicado en el centro de Huaraz, a un paso de todo lo que necesitas. Un punto estratégico a pocas cuadras de la Plaza de Armas y rodeado de parques y centros educativos.",
    imagenesFondo: [
      "/img/proyectos/plaza27.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3323062366835!2d-77.5332766!3d-9.5232677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a90d1645e54d6f%3A0x673cb439527ec31c!2sHuaraz!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/plaza27.webp"]
  },
  "eleven": {
    nombre: "Eleven",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "Eleven es un exclusivo proyecto de tan solo 11 departamentos para vivir con tranquilidad, comodidad y seguridad. Cuenta con una propuesta arquitectónica residencial de vanguardia.",
    imagenesFondo: [
      "/img/proyectos/eleven.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3323062366835!2d-77.5332766!3d-9.5232677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a90d1645e54d6f%3A0x673cb439527ec31c!2sHuaraz!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/eleven.webp"]
  },
  "aflora": {
    nombre: "Aflora",
    ubicacionCorta: "Arequipa, Perú",
    conceptoText: "El proyecto AFLORA es un edificio único, rodeado por más de 7 parques y muy bien ubicado, cerca de todo lo que necesitas. AFLORA contará con área de parrillas exclusiva para sus propietarios; además de acabados excepcionales.",
    imagenesFondo: [
      "/img/proyectos/aflora.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15302.730310619574!2d-71.5367613!3d-16.3988661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a7ff253a551%3A0xc6cb5561be7495b6!2sArequipa!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/aflora.webp"]
  },
  "oasiz": {
    nombre: "Oasiz",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "Ubicado en un punto bastante estratégico rodeado de colegios, clínicas y restaurantes. Con vistas inigualables hacia el hermoso paisaje natural de la cordillera y la ciudad.",
    imagenesFondo: [
      "/img/proyectos/oasiz.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3323062366835!2d-77.5332766!3d-9.5232677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a90d1645e54d6f%3A0x673cb439527ec31c!2sHuaraz!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/oasiz.webp"]
  },
  "palmira": {
    nombre: "Plaza Comercial Palmira",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "Somos la 1° Plaza Comercial de Huaraz que contará con más de 120 puestos, distribuidos de manera fluida y óptima con distintos rubros comerciales para potenciar la economía local.",
    imagenesFondo: [
      "/img/proyectos/palmira.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3323062366835!2d-77.5332766!3d-9.5232677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a90d1645e54d6f%3A0x673cb439527ec31c!2sHuaraz!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/palmira.webp"]
  },
  "san-felipe": {
    nombre: "San Felipe",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "La nueva Urbanización San Felipe está estratégicamente ubicada frente al condominio El Pinar y al costado del nuevo campus de la Universidad César Vallejo. Ideal para inversiones de alto rendimiento y proyección urbana.",
    imagenesFondo: [
      "/img/proyectos/san-felipe.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3323062366835!2d-77.5332766!3d-9.5232677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a90d1645e54d6f%3A0x673cb439527ec31c!2sHuaraz!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/san-felipe.webp"]
  },
  "arboleda": {
    nombre: "Arboleda",
    ubicacionCorta: "Huaraz, Ancash",
    conceptoText: "La nueva Urbanización Arboleda está estratégicamente ubicada en la Carretera a Rivas - Marian, a solo 5 minutos del nuevo Mall de Huaraz. Ofrece lotes residenciales rodeados de naturaleza con proyección de desarrollo.",
    imagenesFondo: [
      "/img/proyectos/arboleda.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3323062366835!2d-77.5332766!3d-9.5232677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a90d1645e54d6f%3A0x673cb439527ec31c!2sHuaraz!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/arboleda.webp"]
  },
  "nexus": {
    nombre: "Nexus",
    ubicacionCorta: "Chiclayo, Lambayeque",
    conceptoText: "Ofrecemos terrenos con alto valor logístico, acceso privilegiado y proyección de desarrollo industrial, ideales para inversión a gran escala o expansión empresarial inmediata.",
    imagenesFondo: [
      "/img/proyectos/nexus.webp"
    ],
    planoImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3323985530614!2d-79.840000!3d-6.760000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904cef1b6b555555%3A0x5555555555555555!2sChiclayo!5e0!3m2!1ses-419!2spe!4v1710000000000!5m2!1ses-419!2spe",
    fotosGaleria: ["/img/proyectos/nexus.webp"]
  }
};

export default function DetalleProyectoPage({ onClose }) {
  const { slug } = useParams();
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [activeImg, setActiveImg] = useState(null); 

  const proyectoData = DETALLES_PROYECTOS[slug] || DETALLES_PROYECTOS["torre-leguia"];

  // Sidebar unificado - Fondo sólido limpio sin desenfoques globales
  const renderSidebarContainer = (id, titulo, contenido) => {
    return (
      <>
        <div 
          onClick={() => setActiveSidebar(null)} 
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${activeSidebar === id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        />
        <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-[#000d26] border-l border-white/10 z-[10000] p-6 md:p-8 flex flex-col justify-between transition-transform duration-500 ease-in-out transform ${activeSidebar === id ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col flex-1 h-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h2 className="font-outfit text-xl font-bold tracking-tight text-white uppercase">{titulo}</h2>
              <button onClick={() => setActiveSidebar(null)} className="text-gray-400 hover:text-impulso-orange text-sm font-bold uppercase tracking-widest cursor-pointer flex items-center gap-2 transition-colors">
                CERRAR <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {contenido}
            </div>
          </div>
          <div className="text-[10px] text-gray-600 mt-4 pt-4 border-t border-white/5">Impulso Proyectistas e Ingenieros</div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#000714] text-white relative font-raleway overflow-y-auto lg:overflow-hidden">
      
      {/* LIGHTBOX DE IMÁGENES */}
      {activeImg && (
        <div onClick={() => setActiveImg(null)} className="fixed inset-0 z-[10010] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out">
          <img src={activeImg} className="max-w-full max-h-full object-contain rounded-lg" alt="Vista ampliada" />
        </div>
      )}

      {/* 🔙 BOTÓN VOLVER GENERAL */}
      <button 
        onClick={onClose} 
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 hover:text-impulso-orange transition-colors cursor-pointer bg-black/80 px-4 py-2.5 md:px-5 md:py-2.5 rounded-full border border-white/10 shadow-2xl"
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

      {/* INTERFAZ DE CONTENIDOS */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 min-h-screen lg:h-screen flex flex-col justify-center py-28 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          
          {/* LADO IZQUIERDO */}
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

          {/* LADO DERECHO: MENÚ INTERACTIVO (EFECTO BLUR AISLADO EXCLUSIVO PARA LAS TARJETAS) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full lg:max-w-md lg:justify-self-end">
            
            {/* CARD 1: CONCEPTO */}
            <div 
              onClick={() => setActiveSidebar('concepto')}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
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
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
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
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer"
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
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:border-impulso-orange/50 cursor-pointer sm:col-span-2 lg:col-span-1"
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
      {activeSidebar === 'concepto' && renderSidebarContainer(
        'concepto',
        'El Concepto',
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed text-justify">
            {proyectoData.conceptoText}
          </p>
        </div>
      )}

      {activeSidebar === 'planos' && renderSidebarContainer(
        'planos',
        'Planos Técnicos',
        <div className="space-y-4">
          <p className="text-gray-400 text-xs mb-4">Haz click en el plano técnico para expandir la visualización estructural básica.</p>
          <div className="overflow-hidden rounded-xl border border-white/10 cursor-zoom-in" onClick={() => setActiveImg(proyectoData.planoImg)}>
            <img src={proyectoData.planoImg} alt="Plano de distribución" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      )}

      {activeSidebar === 'ubicacion' && renderSidebarContainer(
        'ubicacion',
        'Ubicación en Mapa',
        <div className="w-full h-[350px] rounded-xl overflow-hidden border border-white/10">
          <iframe 
            src={proyectoData.mapaUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title={`Mapa de ${proyectoData.nombre}`}
          ></iframe>
        </div>
      )}

      {activeSidebar === 'galeria' && renderSidebarContainer(
        'galeria',
        'Galería de Avances',
        <div className="grid grid-cols-2 gap-3">
          {proyectoData.fotosGaleria.map((foto, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-lg border border-white/5 h-28 sm:h-36 cursor-zoom-in"
              onClick={() => setActiveImg(foto)}
            >
              <img 
                src={foto} 
                alt={`Captura ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}