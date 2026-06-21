import { useState } from 'react';

export default function LibroReclamaciones() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipoDoc: 'DNI',
    numDoc: '',
    correo: '',
    telefono: '',
    departamento: 'ANCASH', // Por defecto tu región principal
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
    aceptaPoliticas: false
  });

  const [hojaNumero] = useState('00001'); // Esto idealmente vendría de una base de datos
  const [fechaRegistro] = useState(new Date().toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.aceptaPoliticas) {
      alert('Debes aceptar las políticas de privacidad para continuar.');
      return;
    }
    // Aquí conectarías con tu backend o EmailJS para el envío simultáneo a ambos correos
    console.log('Datos enviados a backend/correo:', formData);
    alert(`Reclamo Registrado con Éxito.\nSe ha enviado una copia de la Hoja N° ${hojaNumero} al correo del cliente.`);
  };

  return (
    <div className="min-h-screen bg-gray-800 font-raleway pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* ENCABEZADO OFICIAL DE LA HOJA */}
        <div className="bg-white border-2 border-gray-200 rounded-t-lg p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-gray-200 pb-6">
            <div>
              {/* Logo / Nombre de marca */}
              <h1 className="font-outfit text-2xl font-black tracking-tight text-impulso-dark uppercase">
                IMPULSO <span className="text-impulso-orange">INGENIEROS</span>
              </h1>
              <p className="text-xs text-gray-500 mt-1 font-medium">Impulso Ingenieros & Construcción S.A.C.</p>
              <h2 className="text-xl font-bold text-gray-800 mt-3 font-outfit uppercase tracking-wide">
                Libro de Reclamaciones Virtual
              </h2>
              <p className="text-xs text-gray-500 max-w-md mt-1 leading-relaxed">
                Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571).
              </p>
            </div>
            
            {/* Cuadro de Control Legal */}
            <div className="border-2 border-impulso-orange/40 rounded p-4 bg-impulso-orange/5 min-w-[220px] text-center md:text-right">
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">Hoja de Reclamación</div>
              <div className="text-2xl font-black text-impulso-orange font-outfit my-0.5">Nº {hojaNumero}</div>
              <div className="text-xs text-gray-500 mt-1 border-t border-gray-200/60 pt-1">
                <span className="font-semibold text-gray-700">Fecha de Registro:</span> <br />
                {fechaRegistro}
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO OFICIAL */}
        <form onSubmit={handleSubmit} className="bg-white border-x-2 border-b-2 border-gray-200 rounded-b-lg p-6 md:p-8 shadow-sm space-y-8">
          
          {/* SECCIÓN 1: IDENTIFICACIÓN DEL CONSUMIDOR */}
          <div>
            <div className="flex items-center gap-3 bg-gray-900 text-white px-4 py-2 rounded mb-6 select-none">
              <span className="font-outfit font-black bg-impulso-orange text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              <h3 className="font-outfit font-bold text-sm uppercase tracking-wider">Identificación del Consumidor Reclamante</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Nombres *</label>
                <input required type="text" name="nombres" value={formData.nombres} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Apellidos *</label>
                <input required type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Tipo Documento *</label>
                <select name="tipoDoc" value={formData.tipoDoc} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange transition-colors">
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
                  <option value="Carnet de Extranjería">Carnet de Extranjería</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Número de Documento *</label>
                <input required type="text" name="numDoc" value={formData.numDoc} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Correo Electrónico *</label>
                <input required type="email" name="correo" value={formData.correo} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange transition-colors" placeholder="ejemplo@correo.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Teléfono / Celular *</label>
                <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange transition-colors" />
              </div>
            </div>

            {/* Domicilio Legal */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Domicilio Legal</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Departamento</label>
                  <select name="departamento" value={formData.departamento} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-impulso-orange">
                    <option value="AMAZONAS">AMAZONAS</option>
                    <option value="ANCASH">ANCASH</option>
                    <option value="LIMA">LIMA</option>
                    {/* ...Puedes renderizar los demás si gustas, he dejado los principales de tu alcance territorial */}
                    <option value="LA LIBERTAD">LA LIBERTAD</option>
                    <option value="AREQUIPA">AREQUIPA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Provincia</label>
                  <input required type="text" name="provincia" placeholder="Ej: Huaraz" value={formData.provincia} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-impulso-orange" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Distrito</label>
                  <input required type="text" name="distrito" placeholder="Ej: Independencia" value={formData.distrito} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-impulso-orange" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Dirección Exacta *</label>
                <input required type="text" name="direccion" placeholder="Av. Centenario Nro. 123 Int. B" value={formData.direccion} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange" />
              </div>
            </div>

            {/* Menor de Edad Checkbox */}
            <div className="mt-4 bg-gray-50 p-3 rounded border border-gray-200/60 flex items-start gap-3">
              <input type="checkbox" id="esMenor" name="esMenor" checked={formData.esMenor} onChange={handleChange} className="mt-1 accent-impulso-orange cursor-pointer" />
              <label htmlFor="esMenor" className="cursor-pointer select-none">
                <span className="block text-xs font-bold text-gray-800">El reclamante es menor de edad</span>
                <span className="block text-[11px] text-gray-500">Marque esta casilla si está llenando el formulario en representación de un menor de edad.</span>
              </label>
            </div>
          </div>

          {/* SECCIÓN 2: IDENTIFICACIÓN DEL BIEN CONTRATADO */}
          <div>
            <div className="flex items-center gap-3 bg-gray-900 text-white px-4 py-2 rounded mb-6 select-none">
              <span className="font-outfit font-black bg-impulso-orange text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              <h3 className="font-outfit font-bold text-sm uppercase tracking-wider">Identificación del Bien Contratado</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Proyecto / Obra Relacionada *</label>
                <select required name="proyecto" value={formData.proyecto} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange">
                  <option value="">-- Seleccione el Proyecto --</option>
                  <option value="Terrazas de Unchus">Terrazas de Unchus</option>
                  <option value="Diseño Vanguardista">Diseño Vanguardista</option>
                  <option value="Ingeniería Estructural">Ingeniería Estructural</option>
                  <option value="Gestión de Proyectos">Gestión de Proyectos</option>
                  <option value="Sede Central Corporativa">Sede Central Corporativa</option>
                  <option value="Otro Servicio / Proyecto">Otro Servicio de Ingeniería</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Tipo de Bien</label>
                <div className="flex gap-4 mt-2">
                  <label className="inline-flex items-center text-xs font-semibold text-gray-700 cursor-pointer">
                    <input type="radio" name="tipoBien" value="Inmueble / Lote" checked={formData.tipoBien === 'Inmueble / Lote'} onChange={handleChange} className="mr-2 accent-impulso-orange" />
                    Producto (Inmueble / Lote)
                  </label>
                  <label className="inline-flex items-center text-xs font-semibold text-gray-700 cursor-pointer">
                    <input type="radio" name="tipoBien" value="Atención / Gestión" checked={formData.tipoBien === 'Atención / Gestión'} onChange={handleChange} className="mr-2 accent-impulso-orange" />
                    Servicio (Gestión / Atención)
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Descripción del bien (Ej: Lote 15, Manzana C / Contrato N°045) *</label>
                <input required type="text" name="descripcionBien" value={formData.descripcionBien} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange" />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: DETALLE DE LA RECLAMACIÓN */}
          <div>
            <div className="flex items-center gap-3 bg-gray-900 text-white px-4 py-2 rounded mb-6 select-none">
              <span className="font-outfit font-black bg-impulso-orange text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
              <h3 className="font-outfit font-bold text-sm uppercase tracking-wider">Detalle de la Reclamación</h3>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Naturaleza de la incidencia:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded border border-gray-200">
                <label className="flex items-start text-xs text-gray-700 cursor-pointer select-none">
                  <input type="radio" name="tipoIncidencia" value="Reclamo" checked={formData.tipoIncidencia === 'Reclamo'} onChange={handleChange} className="mr-2 mt-0.5 accent-impulso-orange" />
                  <div>
                    <span className="font-bold block text-gray-800">Reclamo</span>
                    <span className="text-[11px] text-gray-500">Disconformidad relacionada directamente a los productos o servicios adquiridos.</span>
                  </div>
                </label>
                <label className="flex items-start text-xs text-gray-700 cursor-pointer select-none">
                  <input type="radio" name="tipoIncidencia" value="Queja" checked={formData.tipoIncidencia === 'Queja'} onChange={handleChange} className="mr-2 mt-0.5 accent-impulso-orange" />
                  <div>
                    <span className="font-bold block text-gray-800">Queja</span>
                    <span className="text-[11px] text-gray-500">Malestar o descontento respecto a la atención al cliente o gestiones administrativas.</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Detalle de los hechos explicados claramente *</label>
                <textarea required rows="4" name="detalleHechos" value={formData.detalleHechos} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange resize-y" placeholder="Describa de manera ordenada lo sucedido..."></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Pedido concreto del consumidor *</label>
                <textarea required rows="3" name="pedidoConcreto" value={formData.pedidoConcreto} onChange={handleChange} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-impulso-orange resize-y" placeholder="¿Qué solución solicita específicamente?"></textarea>
              </div>
            </div>
          </div>

          {/* MENSAJES LEGALES DE CIERRE Y ENVÍO */}
          <div className="border-t-2 border-dashed border-gray-200 pt-6 space-y-4">
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded text-xs text-blue-900 leading-relaxed">
              <span className="font-bold block mb-0.5 uppercase tracking-wide">📌 Información Importante:</span>
              De acuerdo con la normativa vigente, la empresa deberá dar respuesta a su disconformidad en un plazo no mayor a **quince (15) días hábiles** de manera improrrogable.
            </div>

            <div className="flex items-start gap-3">
              <input required type="checkbox" id="aceptaPoliticas" name="aceptaPoliticas" checked={formData.aceptaPoliticas} onChange={handleChange} className="mt-1 accent-impulso-orange cursor-pointer" />
              <label htmlFor="aceptaPoliticas" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                Declaro haber leído y acepto las <span className="text-impulso-orange font-bold underline">Políticas de Privacidad</span> y doy mi consentimiento expreso para el tratamiento de mis datos personales únicamente para la correcta gestión de esta hoja de reclamación.
              </label>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-impulso-dark text-white font-outfit text-xs font-bold uppercase tracking-widest rounded hover:bg-impulso-orange transition-all duration-300 cursor-pointer shadow-md shadow-gray-200"
              >
                Registrar Reclamo & Enviar Copia
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}