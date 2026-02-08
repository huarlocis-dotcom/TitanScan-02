
import React, { useState } from 'react';

const ImmobilizerView: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pinCode, setPinCode] = useState('');

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(prev => prev + 1);
    }, 2500);
  };

  return (
    <div className="flex h-full bg-white overflow-hidden font-sans">
      <div className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-sky-600 font-bold">vpn_key</span>
              <h2 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Seguridad & Antirrobo</h2>
            </div>
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Gestión de Inmovilizador</h1>
          </div>
          <div className="bg-sky-50 px-6 py-2 rounded-xl border border-sky-100 text-[10px] font-black text-sky-600 uppercase tracking-widest">
            ESTADO: ACCESO CONCEDIDO
          </div>
        </div>

        <div className="flex-1 p-10 flex flex-col items-center justify-center text-center">
          <div className="max-w-xl w-full">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="size-32 bg-sky-50 rounded-[2.5rem] flex items-center justify-center text-sky-600 mx-auto shadow-xl shadow-sky-100/50">
                  <span className="material-symbols-outlined text-6xl">key</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Detectar Transpondedor</h2>
                <p className="text-slate-500 font-medium">Inserte la llave original en el interruptor de encendido y manténgala en la posición ON.</p>
                <button 
                  onClick={handleAction}
                  disabled={isProcessing}
                  className="w-full py-5 bg-sky-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-sky-200 hover:bg-sky-700 transition-all flex items-center justify-center gap-4"
                >
                  {isProcessing ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Comenzar Lectura'}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
                <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Ingrese PIN CODE</h2>
                <div className="flex justify-center gap-4">
                  {[1, 2, 3, 4].map((_, i) => (
                    <input 
                      key={i}
                      type="password"
                      maxLength={1}
                      className="size-16 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center text-2xl font-black text-sky-600 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
                    />
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">El código suele estar en la tarjeta de seguridad del vehículo.</p>
                <button 
                  onClick={handleAction}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all"
                >
                  Verificar PIN
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in zoom-in duration-500">
                <div className="size-32 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-500 mx-auto border-2 border-emerald-100">
                  <span className="material-symbols-outlined text-6xl">verified</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Programación Exitosa</h2>
                <p className="text-slate-500 font-medium">La nueva llave ha sido emparejada correctamente con el módulo BCM del vehículo.</p>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full py-5 border-2 border-sky-600 text-sky-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-sky-50 transition-all"
                >
                  Finalizar Proceso
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="w-[400px] bg-slate-50 flex flex-col">
        <div className="p-10 border-b border-slate-200 bg-white">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Funciones Avanzadas</h3>
          <div className="space-y-4">
            {[
              { label: 'Borrar Llaves Perdidas', icon: 'key_off' },
              { label: 'Reinicio de Inmovilizador', icon: 'restart_alt' },
              { label: 'Emparejamiento de ECU', icon: 'hub' }
            ].map(f => (
              <button key={f.label} className="w-full p-6 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/50 transition-all group">
                <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-sky-600 group-hover:text-white transition-all">
                   <span className="material-symbols-outlined text-xl">{f.icon}</span>
                </div>
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ImmobilizerView;
