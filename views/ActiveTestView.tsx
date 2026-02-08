
import React, { useState } from 'react';

interface Actuator {
  id: string;
  name: string;
  system: string;
  status: 'OFF' | 'ON' | 'BUSY';
  value?: string;
}

const INITIAL_ACTUATORS: Actuator[] = [
  { id: 'FP', name: 'Bomba de Combustible', system: 'Motor / PCM', status: 'OFF', value: '0.0 A' },
  { id: 'AC', name: 'Embrague Compresor A/C', system: 'Climatización / HVAC', status: 'OFF', value: '0.0 A' },
  { id: 'FAN', name: 'Ventilador de Radiador (Alta)', system: 'Enfriamiento', status: 'OFF', value: '0 %' },
  { id: 'INJ1', name: 'Corte de Inyector #1', system: 'Inyección', status: 'ON', value: 'Pulso Activo' },
  { id: 'WIP', name: 'Motor Limpiaparabrisas', system: 'Carrocería / BCM', status: 'OFF', value: 'Parking' },
];

const ActiveTestView: React.FC = () => {
  const [actuators, setActuators] = useState<Actuator[]>(INITIAL_ACTUATORS);

  const toggleActuator = (id: string) => {
    setActuators(prev => prev.map(a => {
      if (a.id === id) {
        const nextStatus = a.status === 'OFF' ? 'ON' : 'OFF';
        return { 
          ...a, 
          status: nextStatus,
          value: nextStatus === 'ON' ? (id === 'FAN' ? '100 %' : '4.2 A') : (id === 'FAN' ? '0 %' : '0.0 A')
        };
      }
      return a;
    }));
  };

  return (
    <div className="flex h-full bg-white overflow-hidden font-sans">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-sky-600 font-bold">bolt</span>
              <h2 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Control Bidireccional J2534</h2>
            </div>
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Pruebas Activas del Sistema</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-red-50 px-6 py-2 rounded-xl border border-red-100 text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
               <span className="material-symbols-outlined text-sm">warning</span> PELIGRO: MOTOR EN MARCHA REQUERIDO
             </div>
          </div>
        </div>

        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {actuators.map(actuator => (
              <div key={actuator.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-sky-100 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[9px] font-black text-sky-600 uppercase tracking-widest mb-1">{actuator.system}</p>
                    <h3 className="text-xl font-black text-slate-900 italic tracking-tight">{actuator.name}</h3>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${actuator.status === 'ON' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                    {actuator.status}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Feedback Real</p>
                    <p className="text-2xl font-mono font-bold text-slate-900">{actuator.value}</p>
                  </div>
                  
                  <button 
                    onClick={() => toggleActuator(actuator.id)}
                    className={`size-16 rounded-2xl flex items-center justify-center transition-all transform active:scale-90 shadow-xl ${
                      actuator.status === 'ON' ? 'bg-red-500 text-white shadow-red-200' : 'bg-sky-600 text-white shadow-sky-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl font-bold">
                      {actuator.status === 'ON' ? 'power_settings_new' : 'play_arrow'}
                    </span>
                  </button>
                </div>

                {actuator.status === 'ON' && (
                  <div className="mt-6 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-progress-fast"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="w-[400px] bg-slate-50 border-l border-slate-200 flex flex-col">
         <div className="p-10 border-b border-slate-200 bg-white">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Gráfica de Respuesta</h3>
            <div className="h-48 bg-slate-900 rounded-3xl p-6 relative overflow-hidden border border-slate-800">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
               <div className="h-full w-full flex items-end gap-1">
                  {[40, 60, 45, 90, 85, 30, 20, 50, 70, 40].map((h, i) => (
                    <div key={i} className="flex-1 bg-sky-500 rounded-t-sm animate-in slide-in-from-bottom duration-500" style={{ height: `${h}%`, opacity: 0.3 + (i/15) }}></div>
                  ))}
               </div>
               <p className="absolute top-4 left-6 text-[9px] font-black text-sky-400 uppercase tracking-widest">Feedback Corriente (A)</p>
            </div>
         </div>
         <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Condiciones de Seguridad</h4>
            <div className="space-y-3">
               {[
                 'Batería > 12.5V estable',
                 'Freno de mano accionado',
                 'Transmisión en PARKING / NEUTRAL',
                 'Sin DTCs críticos de motor'
               ].map((text, i) => (
                 <div key={i} className="flex gap-3 items-center p-4 bg-white rounded-2xl border border-slate-100">
                    <span className="material-symbols-outlined text-emerald-500 text-sm font-bold">check_circle</span>
                    <span className="text-xs font-medium text-slate-600">{text}</span>
                 </div>
               ))}
            </div>
         </div>
      </aside>
    </div>
  );
};

export default ActiveTestView;
