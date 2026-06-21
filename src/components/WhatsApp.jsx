import { useState } from 'react';

export default function WhatsApp() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[99999] font-raleway">
      {showChat && (
        <div className="absolute bottom-[70px] left-0 w-[280px] bg-impulso-mineral border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
          <div className="bg-[#25D366] p-4 text-white">
            <strong className="font-outfit block text-sm">Contacta con un asesor</strong>
            <p className="text-xs opacity-90 mt-0.5">Respuesta inmediata</p>
          </div>
          <div className="p-3">
            <a 
              href="https://wa.me/51959679522?text=Hola,%20solicito%20información%20sobre%20sus%20servicios%20de%20ingeniería."
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Asesor" className="w-10 h-10 rounded-full object-cover bg-neutral-800" />
              <div>
                <span className="block text-white text-xs font-bold font-outfit">Asesoría de Proyectos</span>
                <span className="block text-gray-400 text-[10px] mt-0.5">🇵🇪 Central Impulso</span>
              </div>
            </a>
          </div>
        </div>
      )}
      <button 
        onClick={() => setShowChat(!showChat)}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-105 transition-transform cursor-pointer"
        aria-label="WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </button>
    </div>
  );
}