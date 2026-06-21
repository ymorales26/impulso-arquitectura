// src/components/de-proyecto/SidebarConcepto.jsx
export default function SidebarConcepto({ isOpen, onClose, data }) {
  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#000714] z-[10000] border-l border-white/10 transition-transform duration-500 p-8 flex flex-col justify-between ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div>
        <button onClick={onClose} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-impulso-orange mb-8 hover:opacity-70 transition-opacity cursor-pointer">
          <i className="fa-solid fa-arrow-left"></i> Volver
        </button>
        <h2 className="font-outfit text-3xl font-black text-white uppercase mb-8">El Concepto</h2>
        <p className="text-gray-400 text-sm leading-relaxed text-justify mb-6">{data}</p>
      </div>
      <div className="text-[10px] text-gray-600">Impulso Proyectistas e Ingenieros</div>
    </div>
  );
}