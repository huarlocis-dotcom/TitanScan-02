
import React, { useState } from 'react';
import { DTC } from '../types';

const MOCK_DTCS: DTC[] = [
  { code: 'P0300', status: 'Activo', severity: 'Alta', description: 'Fallo de Encendido Aleatorio/Múltiple Detectado' },
  { code: 'P0171', status: 'Pendiente', severity: 'Media', description: 'Sistema Muy Pobre (Banco 1)' },
  { code: 'U0100', status: 'Activo', severity: 'Crítica', description: 'Pérdida de Comunicación con ECM/PCM A' },
  { code: 'P0420', status: 'Histórico', severity: 'Baja', description: 'Eficiencia del Sistema Catalítico por Debajo del Umbral (Banco 1)' },
  { code: 'C0035', status: 'Activo', severity: 'Media', description: 'Circuito del Sensor de Velocidad Rueda Delantera Izquierda' },
];

const DiagnosticsView: React.FC = () => {
  const [dtcs, setDtcs] = useState<DTC[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedDtc, setSelectedDtc] = useState<DTC | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const startScan = () => {
    setDtcs([]);
    setIsScanning(true);
    setScanProgress(0);
    setSelectedDtc(null);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDtcs(MOCK_DTCS);
          setIsScanning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleClearRequest = () => {
    if (dtcs.length > 0) {
      setShowConfirmClear(true);
    }
  };

  const confirmClearCodes = () => {
    setShowConfirmClear(false);
    setIsScanning(true);
    setScanProgress(0);
    setSelectedDtc(null);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDtcs([]);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="flex h-full overflow-hidden relative">
      {/* Diálogo de Confirmación "En Frente" */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-12 max-w-lg w-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 animate-in zoom-in-95 duration-300">
            <div className="size-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <span className="material-symbols-outlined text-5xl font-bold">delete_forever</span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 text-center italic tracking-tighter uppercase mb-4">¿Confirmar Borrado?</h3>
            <p className="text-slate-500 text-center font-medium text-lg leading-relaxed mb-10 px-4">
              Esta operación es irreversible. Se enviará el comando <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-red-600">0x04</span> para limpiar la memoria no volátil de la ECU.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Abortar
              </button>
              <button 
                onClick={confirmClearCodes}
                className="flex-1 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200 transition-all hover:scale-[1.02] active:scale-95"
              >
                Ejecutar Borrado
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="p-8 pb-4 flex justify-between items-end flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black text-sky-600 tracking-tight italic uppercase">Análisis de Fallas</h1>
            <p className="text-slate-500 text-sm font-medium">Lectura en vivo via SmartLink J2534</p>
          </div>
          <div className="flex gap-4">
            <div className="relative group/btn">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-2xl scale-90 group-hover:scale-100">
                 Escaneo Profundo de Módulos
              </div>
              <button 
                onClick={startScan}
                disabled={isScanning}
                className={`flex items-center gap-3 rounded-2xl h-14 px-8 text-white text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${isScanning ? 'bg-slate-400' : 'bg-sky-600 hover:bg-sky-700 shadow-sky-100'}`}
              >
                <span className={`material-symbols-outlined text-[24px] ${isScanning ? 'animate-spin' : ''}`}>
                  {isScanning ? 'sync' : 'search_insights'}
                </span>
                {isScanning ? 'Sincronizando...' : 'Escanear Todo'}
              </button>
            </div>

            <div className="relative group/btn">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/btn:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-2xl scale-90 group-hover:scale-100">
                 Resetear DTCs en Memoria
              </div>
              <button 
                onClick={handleClearRequest}
                disabled={isScanning || dtcs.length === 0}
                className={`flex items-center gap-3 rounded-2xl h-14 px-8 text-xs font-black uppercase tracking-widest transition-all shadow-sm border active:scale-95 ${
                  isScanning || dtcs.length === 0 
                    ? 'bg-slate-50 text-slate-300 border-slate-100' 
                    : 'bg-white border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">delete_sweep</span>
                Borrar Historial
              </button>
            </div>
          </div>
        </div>

        {isScanning && (
          <div className="px-8 mt-4 animate-in slide-in-from-top-2">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
              <div className="bg-sky-600 h-full transition-all duration-300 ease-out" style={{ width: `${scanProgress}%` }}></div>
            </div>
            <p className="text-[10px] font-mono font-black text-sky-600 mt-3 uppercase tracking-[0.4em] flex justify-between px-1">
              <span>SOLICITANDO DTC_QUERY...</span>
              <span>{scanProgress}%</span>
            </p>
          </div>
        )}

        <div className="px-8 py-6">
          <div className="relative group">
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 px-3 py-1 bg-slate-800 text-white rounded-lg text-[8px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              Filtrar por Código o Texto
            </div>
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-sky-500 font-bold">search</span>
            <input 
              className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none placeholder:text-slate-400 font-bold text-sm shadow-sm transition-all" 
              placeholder="Escriba un código (ej. P0300) para buscar..." 
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="rounded-[2.5rem] border border-slate-100 bg-white overflow-hidden shadow-2xl shadow-slate-200/40">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-black w-40 italic">DTC_CODE</th>
                  <th className="px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-black w-40 text-center">STATUS</th>
                  <th className="px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-black w-48">NIVEL</th>
                  <th className="px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-black">DESCRIPCIÓN TÉCNICA</th>
                  <th className="px-10 py-6 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {dtcs.length === 0 && !isScanning ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-48 text-center">
                      <div className="flex flex-col items-center opacity-10">
                        <span className="material-symbols-outlined text-[120px] mb-6">verified_user</span>
                        <p className="font-black uppercase text-sm tracking-[0.5em]">Memoria del Bus Limpia</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  dtcs.map((dtc) => (
                    <tr 
                      key={dtc.code} 
                      onClick={() => setSelectedDtc(dtc)}
                      className={`hover:bg-sky-50 transition-all duration-300 cursor-pointer group ${selectedDtc?.code === dtc.code ? 'bg-sky-50/80 border-l-[6px] border-l-sky-500' : 'border-l-[6px] border-l-transparent'}`}
                    >
                      <td className="px-10 py-8 font-black text-slate-900 font-mono text-2xl italic tracking-tighter">{dtc.code}</td>
                      <td className="px-10 py-8 text-center">
                        <span className={`inline-flex items-center px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                          dtc.status === 'Activo' ? 'bg-red-50 text-red-600 border-red-100' :
                          dtc.status === 'Pendiente' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {dtc.status}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.15em] ${
                          dtc.severity === 'Crítica' || dtc.severity === 'Alta' ? 'text-red-600' :
                          dtc.severity === 'Media' ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          <span className="material-symbols-outlined text-[22px] fill-1 shadow-inner">
                            {dtc.severity === 'Crítica' ? 'brightness_high' : 'error'}
                          </span>
                          {dtc.severity}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-slate-600 font-bold text-base leading-tight tracking-tight">{dtc.description}</td>
                      <td className="px-10 py-8 text-right relative overflow-hidden">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 bg-sky-500 text-white rounded-l-lg text-[8px] font-black uppercase opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 z-10 pointer-events-none">
                           DETALLES
                        </div>
                        <span className="material-symbols-outlined text-sky-500 font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:-translate-x-4 duration-300">double_arrow</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <aside className="w-[500px] bg-slate-50 border-l border-slate-200 overflow-y-auto flex flex-col custom-scrollbar shadow-2xl z-10">
        {selectedDtc ? (
          <div className="animate-in slide-in-from-right-10 duration-500 h-full flex flex-col">
            <div className="sticky top-0 bg-slate-50/95 backdrop-blur-md z-10 border-b border-slate-200 p-10 pb-6">
              <div className="flex justify-between items-start mb-6">
                <div className="relative group/tag">
                   <div className="absolute -top-10 left-0 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover/tag:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-2xl">
                    Referencia del Fabricante
                  </div>
                  <div className="bg-white text-sky-600 border border-sky-100 shadow-xl font-mono text-3xl font-black px-6 py-3 rounded-2xl italic">
                    {selectedDtc.code}
                  </div>
                </div>
                <div className="relative group/close">
                   <div className="absolute top-12 right-0 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover/close:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-2xl">
                    Cerrar Análisis
                  </div>
                  <button onClick={() => setSelectedDtc(null)} className="size-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-all">
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>
              </div>
              <h3 className="text-slate-900 text-3xl font-black leading-tight mb-6 italic tracking-tighter uppercase">{selectedDtc.description}</h3>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                <span className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border shadow-md ${
                  selectedDtc.severity === 'Crítica' || selectedDtc.severity === 'Alta' ? 'text-red-700 bg-red-50 border-red-100' : 'text-amber-700 bg-amber-50 border-amber-100'
                }`}>
                  <span className="material-symbols-outlined text-[20px] fill-1">crisis_alert</span> NIVEL: {selectedDtc.severity}
                </span>
                <span className="flex items-center gap-2 text-slate-500 bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="material-symbols-outlined text-[20px] text-sky-500">history</span> GRABADO: 14:32:01
                </span>
              </div>
            </div>

            <div className="p-10 space-y-12">
              <section>
                <div className="flex items-center justify-between mb-6">
                   <h4 className="text-sky-600 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px]">troubleshoot</span> Causas Probables
                  </h4>
                  <div className="size-2 rounded-full bg-sky-500 animate-pulse"></div>
                </div>
                <div className="space-y-4 bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                  {[
                    { label: 'Componente defectuoso / Obstruido', prob: '88%' },
                    { label: 'Falla en el cableado o conector', prob: '65%' },
                    { label: 'Controlador (PCM) con error lógico', prob: '12%' },
                  ].map((cause, i) => (
                    <div key={i} className={`flex items-start gap-4 ${i < 2 ? 'pb-4 border-b border-slate-50' : ''}`}>
                      <div className={`mt-2 min-w-[8px] h-[8px] rounded-full ${i === 0 ? 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]' : 'bg-slate-300'}`}></div>
                      <span className="text-base text-slate-700 font-bold flex-1">{cause.label}</span>
                      <span className="text-[11px] text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl font-black border border-sky-100">{cause.prob}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-sky-600 text-[11px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[22px]">handyman</span> Procedimiento de Reparación
                </h4>
                <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="relative pl-10 border-l-[3px] border-sky-100 space-y-14">
                    <div className="relative">
                      <div className="absolute -left-[54px] top-0 size-11 flex items-center justify-center rounded-2xl bg-sky-600 text-white text-[16px] font-black border-4 border-white shadow-2xl italic">1</div>
                      <h5 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight italic">Inspección Física</h5>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium bg-slate-50/50 p-5 rounded-2xl">
                        Localice el sensor correspondiente y verifique integridad del mazo de cables. Limpie terminales con spray dieléctrico.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[54px] top-0 size-11 flex items-center justify-center rounded-2xl bg-slate-900 text-white text-[16px] font-black border-4 border-white shadow-2xl italic">2</div>
                      <h5 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight italic">Prueba Dinámica</h5>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium bg-slate-50/50 p-5 rounded-2xl">
                        Use la vista de <span className="text-sky-600 font-bold uppercase">Datos en Vivo</span> para monitorear la respuesta del sensor mientras se aplica carga.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="pt-6 pb-16 relative group/final">
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/final:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-2xl">
                  Guardar Evidencia en el Expediente
                </div>
                <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-2xl hover:bg-black hover:-translate-y-2 active:scale-95">
                  <span className="material-symbols-outlined text-2xl">assignment_turned_in</span>
                  Certificar Diagnóstico
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-300">
            <span className="material-symbols-outlined text-[100px] mb-8 opacity-10">biotech</span>
            <p className="text-xs font-black uppercase tracking-[0.4em] leading-relaxed max-w-[280px]">
              Seleccione un nodo en el listado para iniciar la <span className="text-sky-500">Reparación Guiada</span>
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default DiagnosticsView;
