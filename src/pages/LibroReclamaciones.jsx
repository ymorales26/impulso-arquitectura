// src/pages/LibroReclamaciones.jsx
import { useState } from 'react';

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqpkvaee";

export default function LibroReclamaciones() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipoDoc: 'DNI',
    numDoc: '',
    correo: '',
    telefono: '',
    departamento: 'ANCASH',
    provincia: '',
    distrito: '',
    direccion: '',
    esMenor: false,
    proyecto: '',
    tipoBien: 'Inmueble / Lote',
    descripcionBien: '',
    tipoIncidencia: 'Reclamo',
    detalleHechos: '',
    pedidoConcreto: '',
    aceptaPoliticas: false,
  });

  const [estadoEnvio, setEstadoEnvio] = useState({ enviando: false, exito: false, error: false });

  const [hojaNumero] = useState("001");
  const [fechaRegistro] = useState(
    new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.aceptaPoliticas) {
      alert('Debes aceptar las políticas de privacidad para continuar.');
      return;
    }
    setEstadoEnvio({ enviando: true, exito: false, error: false });
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `📋 Hoja de Reclamación N° ${hojaNumero} — ${formData.tipoIncidencia}`,
          hojaNumero,
          fechaRegistro,
        }),
      });
      if (response.ok) {
        setEstadoEnvio({ enviando: false, exito: true, error: false });
        setFormData({
          nombres: '', apellidos: '', tipoDoc: 'DNI', numDoc: '',
          correo: '', telefono: '', departamento: 'ANCASH',
          provincia: '', distrito: '', direccion: '', esMenor: false,
          proyecto: '', tipoBien: 'Inmueble / Lote', descripcionBien: '',
          tipoIncidencia: 'Reclamo', detalleHechos: '', pedidoConcreto: '',
          aceptaPoliticas: false,
        });
      } else {
        setEstadoEnvio({ enviando: false, exito: false, error: true });
      }
    } catch {
      setEstadoEnvio({ enviando: false, exito: false, error: true });
    }
  };

  // Estilos reutilizables
  const inputCls = "w-full px-3 py-2.5 bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-impulso-orange transition-colors duration-200 font-raleway";
  const labelCls = "block text-[10px] font-bold uppercase tracking-[3px] text-gray-400 mb-1.5 font-outfit";

  return (
    <div className="min-h-screen bg-[#0c142c] font-raleway pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8">

        {/* ── ENCABEZADO OFICIAL ─────────────────────────────────── */}
        <div className="bg-white border border-gray-200 p-8 md:p-10 mb-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 pb-8 border-b border-gray-100">
            <div>
              <img src="/img/logo.png" alt="Impulso" className="h-10 w-auto object-contain mb-4" />
              <p className="font-outfit text-[10px] font-bold uppercase tracking-[4px] text-impulso-orange">
                Proyectistas e Ingenieros S.A.C.
              </p>
              <h1 className="font-outfit font-black text-gray-900 text-2xl md:text-3xl tracking-tight mt-3">
                Libro de Reclamaciones
              </h1>
              <p className="font-raleway text-xs text-gray-400 mt-1 max-w-sm leading-relaxed">
                Conforme al Código de Protección y Defensa del Consumidor — Ley N° 29571.
              </p>
            </div>

            {/* Badge hoja */}
            <div className="border border-impulso-orange/30 bg-impulso-orange/5 p-5 text-center min-w-[180px]">
              <p className="font-outfit text-[9px] font-bold uppercase tracking-[4px] text-gray-400 mb-1">
                Hoja de Reclamación
              </p>
              <p className="font-outfit font-black text-impulso-orange text-3xl leading-none">
                N° {hojaNumero}
              </p>
              <div className="w-full h-px bg-gray-200 my-3" />
              <p className="font-outfit text-[9px] font-bold uppercase tracking-[3px] text-gray-400">
                {fechaRegistro}
              </p>
            </div>
          </div>
        </div>

        {/* ── FORMULARIO ─────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="bg-white border-x border-b border-gray-200 p-8 md:p-10 space-y-10">

          {/* ─ SECCIÓN 1: CONSUMIDOR ─ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-gray-900 flex items-center justify-center flex-shrink-0">
                <span className="font-outfit font-black text-white text-xs">1</span>
              </div>
              <h3 className="font-outfit font-black text-gray-900 text-sm uppercase tracking-wider">
                Identificación del Consumidor Reclamante
              </h3>
            </div>
            <div className="w-full h-px bg-gray-100 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>Nombres *</label>
                <input required type="text" name="nombres" value={formData.nombres} onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Apellidos *</label>
                <input required type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Tipo de Documento *</label>
                <select name="tipoDoc" value={formData.tipoDoc} onChange={handleChange} className={inputCls}>
                  <option>DNI</option>
                  <option>RUC</option>
                  <option>Carnet de Extranjería</option>
                  <option>Pasaporte</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Número de Documento *</label>
                <input required type="text" name="numDoc" value={formData.numDoc} onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Correo Electrónico *</label>
                <input required type="email" name="correo" value={formData.correo} onChange={handleChange} className={inputCls} placeholder="ejemplo@correo.com" />
              </div>
              <div>
                <label className={labelCls}>Teléfono / Celular *</label>
                <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className={inputCls} />
              </div>
            </div>

            {/* Domicilio */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="font-outfit text-[10px] font-bold uppercase tracking-[4px] text-gray-400 mb-4">Domicilio Legal</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={labelCls}>Departamento</label>
                  <select name="departamento" value={formData.departamento} onChange={handleChange} className={inputCls}>
                    {["ANCASH","LIMA","AREQUIPA","LA LIBERTAD","AMAZONAS","OTROS"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Provincia *</label>
                  <input required type="text" name="provincia" placeholder="Ej: Huaraz" value={formData.provincia} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Distrito *</label>
                  <input required type="text" name="distrito" placeholder="Ej: Independencia" value={formData.distrito} onChange={handleChange} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Dirección Exacta *</label>
                <input required type="text" name="direccion" value={formData.direccion} onChange={handleChange} className={inputCls} placeholder="Av. Centenario Nro. 123" />
              </div>
            </div>

            {/* Menor de edad */}
            <div className="mt-4 flex items-start gap-3 bg-gray-50 border border-gray-200 p-4">
              <input type="checkbox" id="esMenor" name="esMenor" checked={formData.esMenor} onChange={handleChange} className="mt-0.5 accent-orange-500 cursor-pointer" />
              <label htmlFor="esMenor" className="cursor-pointer">
                <span className="font-outfit text-xs font-bold text-gray-800 block">El reclamante es menor de edad</span>
                <span className="font-raleway text-[11px] text-gray-500">Marque si llena el formulario en representación de un menor.</span>
              </label>
            </div>
          </div>

          {/* ─ SECCIÓN 2: BIEN CONTRATADO ─ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-gray-900 flex items-center justify-center flex-shrink-0">
                <span className="font-outfit font-black text-white text-xs">2</span>
              </div>
              <h3 className="font-outfit font-black text-gray-900 text-sm uppercase tracking-wider">
                Identificación del Bien Contratado
              </h3>
            </div>
            <div className="w-full h-px bg-gray-100 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>Proyecto / Obra Relacionada *</label>
                <select required name="proyecto" value={formData.proyecto} onChange={handleChange} className={inputCls}>
                  <option value="">-- Seleccione --</option>
                  <option>Torre Leguía</option>
                  <option>Trivio</option>
                  <option>Plaza 27</option>
                  <option>Otro Servicio / Proyecto</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Tipo de Bien</label>
                <div className="flex gap-6 mt-2">
                  {["Inmueble / Lote", "Atención / Gestión"].map(v => (
                    <label key={v} className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                      <input type="radio" name="tipoBien" value={v} checked={formData.tipoBien === v} onChange={handleChange} className="accent-orange-500" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Descripción del Bien (Ej: Lote 15, Manzana C / Contrato N°045) *</label>
                <input required type="text" name="descripcionBien" value={formData.descripcionBien} onChange={handleChange} className={inputCls} />
              </div>
            </div>
          </div>

          {/* ─ SECCIÓN 3: DETALLE ─ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-gray-900 flex items-center justify-center flex-shrink-0">
                <span className="font-outfit font-black text-white text-xs">3</span>
              </div>
              <h3 className="font-outfit font-black text-gray-900 text-sm uppercase tracking-wider">
                Detalle de la Reclamación
              </h3>
            </div>
            <div className="w-full h-px bg-gray-100 mb-6" />

            {/* Tipo incidencia */}
            <div className="mb-6">
              <label className={labelCls}>Naturaleza de la incidencia</label>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                {[
                  { v: "Reclamo", desc: "Disconformidad con los productos o servicios adquiridos." },
                  { v: "Queja",   desc: "Malestar respecto a la atención al cliente o gestiones administrativas." },
                ].map(({ v, desc }) => (
                  <label key={v} className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-4 cursor-pointer">
                    <input type="radio" name="tipoIncidencia" value={v} checked={formData.tipoIncidencia === v} onChange={handleChange} className="mt-0.5 accent-orange-500" />
                    <div>
                      <span className="font-outfit font-black text-xs text-gray-900 uppercase block">{v}</span>
                      <span className="font-raleway text-[11px] text-gray-500">{desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelCls}>Detalle de los hechos *</label>
                <textarea required rows={4} name="detalleHechos" value={formData.detalleHechos} onChange={handleChange} className={`${inputCls} resize-y`} placeholder="Describa de manera ordenada lo sucedido..." />
              </div>
              <div>
                <label className={labelCls}>Pedido concreto *</label>
                <textarea required rows={3} name="pedidoConcreto" value={formData.pedidoConcreto} onChange={handleChange} className={`${inputCls} resize-y`} placeholder="¿Qué solución solicita específicamente?" />
              </div>
            </div>
          </div>

          {/* ─ CIERRE LEGAL + ENVÍO ─ */}
          <div className="border-t border-dashed border-gray-200 pt-8 space-y-5">
            <div className="bg-blue-50 border border-blue-100 p-4 text-xs text-blue-800 leading-relaxed font-raleway">
              <span className="font-outfit font-black text-xs uppercase tracking-wider block mb-1">Información importante</span>
              La empresa dará respuesta a su reclamación en un plazo no mayor a <strong>15 días hábiles</strong> conforme a la normativa vigente.
            </div>

            {/* Política */}
            <div className="flex items-start gap-3">
              <input required type="checkbox" id="aceptaPoliticas" name="aceptaPoliticas" checked={formData.aceptaPoliticas} onChange={handleChange} className="mt-0.5 accent-orange-500 cursor-pointer" />
              <label htmlFor="aceptaPoliticas" className="text-xs text-gray-500 leading-relaxed cursor-pointer font-raleway">
                Declaro haber leído y acepto las{" "}
                <a href="/politicas-privacidad" className="text-impulso-orange font-bold underline">Políticas de Privacidad</a>{" "}
                y doy mi consentimiento para el tratamiento de mis datos personales para la gestión de esta reclamación.
              </label>
            </div>

            {/* Feedback */}
            {estadoEnvio.exito && (
              <div className="bg-green-50 border border-green-200 p-4">
                <p className="font-outfit text-xs font-bold uppercase tracking-widest text-green-700">
                  ✓ Reclamo N° {hojaNumero} registrado. Recibirás una confirmación en tu correo.
                </p>
              </div>
            )}
            {estadoEnvio.error && (
              <div className="bg-red-50 border border-red-200 p-4">
                <p className="font-outfit text-xs font-bold uppercase tracking-widest text-red-600">
                  Error al enviar. Intenta de nuevo o contáctanos directamente.
                </p>
              </div>
            )}

            {/* Botón */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={estadoEnvio.enviando}
                style={{ backgroundColor: estadoEnvio.enviando ? "#9ca3af" : "#111827", color: "#ffffff" }}
                className="inline-flex items-center gap-3 font-outfit text-xs font-bold uppercase tracking-[4px] px-8 py-4 cursor-pointer transition-all duration-300 disabled:cursor-not-allowed"
                onMouseEnter={e => { if (!estadoEnvio.enviando) e.currentTarget.style.backgroundColor = "#FF6B1A"; }}
                onMouseLeave={e => { if (!estadoEnvio.enviando) e.currentTarget.style.backgroundColor = "#111827"; }}
              >
                {estadoEnvio.enviando ? (
                  <><i className="fa-solid fa-spinner fa-spin text-xs" /> Enviando...</>
                ) : (
                  <><i className="fa-solid fa-file-signature text-xs" /> Registrar Reclamo</>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}