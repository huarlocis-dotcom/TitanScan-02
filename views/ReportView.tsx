
import React from 'react';

const ReportView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-sky-50/30 custom-scrollbar p-6 lg:p-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-white pb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-[0.2em] shadow-lg shadow-red-200">Crítico</span>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">ID Reporte: #TS-2023-8842</p>
            </div>
            <h1 className="text-slate-900 text-4xl lg:text-5xl font-black leading-tight tracking-tighter">Informe de Diagnóstico</h1>
            <div className="flex items-center gap-2 text-sky-600 font-black text-lg">
              <span className="material-symbols-outlined text-2xl font-bold">error</span>
              <p className="tracking-tight uppercase">Cuadro Congelado: P0300 - Falla de Encendido Aleatoria/Múltiple</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-6 py-3.5 bg-sky-600 text-white shadow-xl shadow-sky-200 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-sky-700 transition-all transform hover:-translate-y-1">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Descargar PDF</span>
          </button>
        </div>

        <section>
          <h2 className="text-slate-900 text-xl font-black leading-tight tracking-widest uppercase mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center size-10 rounded-xl bg-sky-100 text-sky-600 shadow-sm">
              <span className="material-symbols-outlined text-2xl">health_and_safety</span>
            </span>
            Resumen de Salud del Vehículo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Vehículo', value: '2023 Ford F-150', color: 'bg-sky-500' },
              { label: 'Odómetro', value: '45,230 mi', color: 'bg-sky-200' },
              { label: 'VIN', value: '1FTEW1E45K...', color: 'bg-sky-200' },
              { label: 'Estado', value: 'Acción Requerida', color: 'bg-red-500', isCritical: true },
            ].map((stat, i) => (
              <div key={i} className={`flex flex-col gap-2 rounded-2xl p-6 border transition-all ${stat.isCritical ? 'bg-red-50/50 border-red-100 shadow-red-50' : 'bg-white border-slate-100 shadow-sm'} shadow-xl`}>
                <p className={`${stat.isCritical ? 'text-red-500' : 'text-slate-400'} text-[10px] font-black uppercase tracking-[0.2em]`}>{stat.label}</p>
                <p className={`${stat.isCritical ? 'text-red-600' : 'text-slate-900'} text-lg font-black leading-tight tracking-tight`}>{stat.value}</p>
                <div className={`mt-2 w-10 h-1 rounded-full ${stat.color}`}></div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-10">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900 text-xl font-black tracking-widest uppercase flex items-center gap-3">
                  <span className="flex items-center justify-center size-10 rounded-xl bg-sky-100 text-sky-600 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">bar_chart</span>
                  </span>
                  Datos de Cuadro Congelado
                </h2>
                <span className="text-[10px] font-black text-sky-600 bg-white border border-sky-100 px-4 py-2 rounded-full shadow-sm uppercase tracking-widest">Oct 24, 14:32</span>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-2xl">
                <div className="grid grid-cols-2 bg-slate-50/80 border-b border-slate-100 px-8 py-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sensor / PID</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Valor</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { name: 'RPM del Motor', val: '2,850 rpm' },
                    { name: 'Carga Calculada', val: '45.0 %' },
                    { name: 'Temp. Refrigerante', val: '195 °F', status: 'normal' },
                    { name: 'Velocidad del Vehículo', val: '55 mph' },
                    { name: 'Ajuste de Combustible ST 1', val: '-12.3 %', isRed: true },
                    { name: 'Ajuste de Combustible LT 1', val: '+4.5 %' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-2 px-8 py-5 hover:bg-slate-50/50 transition-colors group">
                      <span className="text-slate-600 font-bold text-sm uppercase tracking-tight group-hover:text-sky-600 transition-all">{row.name}</span>
                      <div className="flex justify-end items-center gap-2">
                        {row.status === 'normal' && <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>}
                        <span className={`text-sm font-black font-mono px-3 py-1 rounded-lg ${row.isRed ? 'text-red-600 bg-red-50 border border-red-100' : 'text-slate-900 bg-slate-50 border border-slate-100 shadow-sm'}`}>
                          {row.val}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 text-center">
                  <button className="text-sky-600 font-black text-[11px] uppercase tracking-widest hover:text-sky-700 transition-colors flex items-center justify-center gap-2 mx-auto">
                    <span>Ver los 42 PIDs</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-slate-900 text-xl font-black tracking-widest uppercase mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center size-10 rounded-xl bg-sky-100 text-sky-600 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">edit_note</span>
                </span>
                Notas del Técnico
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-2xl">
                <div className="flex gap-6">
                  <div className="size-14 rounded-full bg-sky-50 flex items-center justify-center shrink-0 border-2 border-white shadow-xl">
                    <span className="material-symbols-outlined text-sky-500 text-3xl font-bold">person</span>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="font-black text-slate-900 text-base uppercase tracking-tight">Mike Anderson <span className="text-sky-300 font-medium mx-2">•</span> <span className="text-sky-600 font-bold uppercase tracking-widest text-xs">Técnico Líder</span></h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Oct 24, 15:05</span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-2 top-2 bottom-2 w-1 bg-sky-500/20 rounded-full"></div>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100 ml-4 shadow-inner">
                        El cliente reportó ralentí inestable y luz de motor parpadeando durante la aceleración en carretera. Los datos del cuadro congelado confirman fallo de encendido a altas RPM. Se sospecha de la bobina de encendido en el cilindro 3 o bujía sucia. Se procederá con prueba de compresión y diagnóstico de intercambio de bobina.
                      </p>
                    </div>
                    <button className="mt-5 text-xs font-black text-sky-600 uppercase tracking-widest hover:text-sky-700 flex items-center gap-2 transition-colors ml-4">
                      <span className="material-symbols-outlined text-lg">add_circle</span> Agregar Nota de Seguimiento
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-8">
            <section>
              <h2 className="text-slate-900 text-xl font-black tracking-widest uppercase mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center size-10 rounded-xl bg-sky-100 text-sky-600 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">build</span>
                </span>
                Soluciones Sugeridas
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-2xl">
                <div className="p-8 bg-gradient-to-br from-sky-500/10 to-transparent border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-lg text-sky-600 border border-sky-100">
                      <span className="material-symbols-outlined text-3xl font-bold">lightbulb</span>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-lg tracking-tight uppercase">Probabilidad de Solución</h3>
                      <p className="text-[10px] text-sky-600 font-black uppercase tracking-widest mt-1">Basado en 12,400 casos similares</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { label: 'Reemplazar Bujías', sub: 'Solución #1 para este modelo', severity: 'Alta', color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Bobinas de Encendido', sub: 'Inspeccionar por grietas', severity: 'Media', color: 'text-amber-600 bg-amber-50' },
                    { label: 'Inyectores de Combustible', sub: 'Verificar obstrucciones', severity: 'Baja', color: 'text-slate-400 bg-slate-50' },
                  ].map((sol, i) => (
                    <label key={i} className="flex items-start gap-4 p-6 hover:bg-slate-50 cursor-pointer transition-all group">
                      <input type="checkbox" className="mt-1.5 rounded-lg border-slate-200 text-sky-600 focus:ring-sky-500 size-5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[14px] font-black text-slate-900 uppercase tracking-tight group-hover:text-sky-600 transition-all">{sol.label}</span>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${sol.color}`}>{sol.severity}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-bold tracking-wide">{sol.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <button className="w-full py-4 rounded-xl bg-white border border-sky-200 text-sky-600 text-xs font-black uppercase tracking-[0.2em] hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all shadow-md">
                    Generar Estimado
                  </button>
                </div>
              </div>
            </section>

            <div className="rounded-2xl bg-slate-900 p-8 text-white relative overflow-hidden shadow-2xl shadow-sky-900/40">
              <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sky-400">
                  <span className="material-symbols-outlined font-bold">workspace_premium</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">TitanScan Pro</span>
                </div>
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">Diagnóstico en Vivo</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">Transmita datos de sensores en vivo para identificar fallas intermitentes mientras conduce el vehículo.</p>
                <button className="mt-4 text-[11px] font-black uppercase tracking-widest text-white bg-sky-600 hover:bg-sky-500 py-4 px-6 rounded-xl transition-all shadow-xl shadow-sky-900/50 transform hover:-translate-y-1">
                  Iniciar Sesión en Vivo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-20 border-t border-white py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <p>© 2024 TitanScan OS. Suite de Diagnóstico Avanzado.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-sky-600 transition-colors">Ayuda</a>
            <a href="#" className="hover:text-sky-600 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-sky-600 transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReportView;
