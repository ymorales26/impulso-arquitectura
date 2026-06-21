import { useNavigate } from 'react-router-dom';

export default function ServiciosPage() {
  const navigate = useNavigate();
  
  const servicios = [
    {
      titulo: "Ingeniería de Proyectos",
      desc: "Desarrollo de planos detallados, memorias técnicas y cálculos estructurales con estándares de alta precisión.",
      icono: "fa-solid fa-drafting-compass"
    },
    {
      titulo: "Supervisión de Obra",
      desc: "Control riguroso de ejecución, presupuestos y plazos para garantizar la calidad en cada etapa constructiva.",
      icono: "fa-solid fa-hard-hat"
    },
    {
      titulo: "Modelado BIM",
      desc: "Implementación de metodologías BIM para optimizar recursos y visualizar tu proyecto antes de la construcción.",
      icono: "fa-solid fa-cube"
    },
    {
      titulo: "Licencias y Permisos",
      desc: "Gestión integral de trámites municipales y legales para asegurar que tu obra cumpla con toda la normativa.",
      icono: "fa-solid fa-file-contract"
    },
    {
      titulo: "Consultoría Técnica",
      desc: "Asesoramiento especializado para la optimización de procesos constructivos y eficiencia energética.",
      icono: "fa-solid fa-lightbulb"
    },
    {
      titulo: "Estudios de Suelos",
      desc: "Análisis geotécnicos detallados para garantizar la estabilidad y seguridad de tus cimentaciones.",
      icono: "fa-solid fa-mountain"
    }
  ];

  return (
    <div id="servicios" className="min-h-screen bg-white relative overflow-x-hidden">
      
      {/* 1. BANNER PRINCIPAL */}
      <div className="relative w-full h-[70vh] flex items-center justify-start overflow-hidden z-10">
        <img 
          src="https://images.pexels.com/photos/27797720/pexels-photo-27797720.jpeg" 
          alt="Modern Architecture" 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 px-6 md:px-20 max-w-3xl">
          <span className="text-impulso-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Ingeniería & Diseño
          </span>
          <h1 className="text-4xl md:text-7xl font-black uppercase text-white leading-[1.1] mb-6 tracking-tighter">
            Nuestros Servicios
          </h1>
          <div className="w-20 h-1 bg-impulso-orange mb-6"></div>
          <p className="text-white/80 text-lg md:text-xl font-light italic max-w-xl">
            Convertimos visiones arquitectónicas en infraestructuras de alto rendimiento.
          </p>
        </div>
      </div>


      {/* 3. GRID DE SERVICIOS */}
      <div className="max-w-[1200px] mx-auto px-6 py-24 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black text-gray-900 uppercase mb-8">
           Capacidades Técnicas
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicios.map((s, index) => (
            <div 
              key={index} 
              className="bg-white/90 backdrop-blur-sm p-10 border border-gray-200 shadow-lg hover:border-impulso-orange hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="mb-8">
                <i className={`${s.icono} text-4xl text-impulso-orange`}></i>
              </div>
              <h3 className="text-lg font-bold uppercase mb-4 text-gray-900">{s.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SECCIÓN SOBRE NOSOTROS */}
      <section className="py-24 bg-gray-50/80 backdrop-blur-sm relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* Imagen llamativa */}
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg" 
              alt="Equipo de trabajo" 
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            {/* Elemento decorativo flotante */}
            <div className="absolute -bottom-8 -right-8 bg-impulso-orange text-white p-8 rounded-xl hidden md:block">
              <p className="text-4xl font-black">+5</p>
              <p className="text-sm uppercase tracking-widest">Años de experiencia</p>
            </div>
          </div>

          {/* Texto de historia */}
          <div>
            <span className="text-impulso-orange font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Trayectoria
            </span>
            <h2 className="text-4xl font-black text-gray-900 uppercase mb-6 leading-tight">
              Diseñamos el futuro con precisión.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              En Impulso, no solo construimos estructuras; creamos soluciones integrales que fusionan la estética arquitectónica con la rigurosidad de la ingeniería moderna. Nuestro enfoque combina tecnología BIM de vanguardia con un compromiso inquebrantable hacia la calidad y la sostenibilidad.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-gray-800 font-medium">
                <i className="fa-solid fa-check text-impulso-orange mr-3"></i> Enfoque en eficiencia energética.
              </li>
              <li className="flex items-center text-gray-800 font-medium">
                <i className="fa-solid fa-check text-impulso-orange mr-3"></i> Equipo multidisciplinario especializado.
              </li>
              <li className="flex items-center text-gray-800 font-medium">
                <i className="fa-solid fa-check text-impulso-orange mr-3"></i> Cumplimiento estricto de cronogramas.
              </li>
            </ul>

            <button 
              onClick={() => navigate('/contacto')}
              className="bg-gray-900 text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-impulso-orange transition-all duration-300"
            >
              Hablemos de tu proyecto
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}