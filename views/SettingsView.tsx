
import React, { useState } from 'react';

const SettingsView: React.FC = () => {
  const [units, setUnits] = useState('metric');
  const [vci, setVci] = useState('SmartLink C (J2534)');
  const [baudrate, setBaudrate] = useState('115200');

  return (
    <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-12 lg:p-16">
      <div className="max-w-5xl mx-auto space-y-16">
        <header>
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-sky-600 font-bold">settings</span>
            <h2 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Preferencias de Ingeniería</h2>
          </div>
          <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Configuración Global</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-sky-600">hub</span>
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Interfaz de Comunicación (VCI)</h3>
            </div>
            <div className="space-y-4">
              {['SmartLink C (J2534)', 'OBD-II Wireless V2', 'Ethernet DoIP (Cableado)'].map(type => (
                <button 
                  key={type}
                  onClick={() => setVci(type)}
                  className={`w-full p-8 rounded-[2rem] border-2 flex items-center justify-between transition-all ${
                    vci === type ? 'border-sky-500 bg-sky-50/30 shadow-xl shadow-sky-900/5' : 'border-slate-100 hover:border-sky-200'
                  }`}
                >
                  <div className="text-left">
                     <span className={`text-sm font-black uppercase tracking-tight ${vci === type ? 'text-sky-600' : 'text-slate-900'}`}>{type}</span>
                     {vci === type && <p className="text-[9px] font-black text-sky-400 mt-1 uppercase tracking-widest">Controlador cargado correctamente</p>}
                  </div>
                  {vci === type && <span className="material-symbols-outlined text-sky-600 font-bold">verified</span>}
                </button>
              ))}
            </div>

            {vci.includes('SmartLink C') && (
              <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 space-y-6 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
                 <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em]">Parámetros SmartLink Kernel</h4>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-white/60 text-xs font-bold uppercase tracking-tight">Velocidad del Puerto</span>
                       <select 
                        value={baudrate}
                        onChange={(e) => setBaudrate(e.target.value)}
                        className="bg-slate-800 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
                       >
                          <option value="9600">9600 bps</option>
                          <option value="38400">38400 bps</option>
                          <option value="115200">115200 bps</option>
                       </select>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-white/60 text-xs font-bold uppercase tracking-tight">Auto-Reset (ATZ)</span>
                       <div className="size-10 bg-sky-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-sky-500 transition-colors">
                          <span className="material-symbols-outlined text-white text-xl">power_settings_new</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-sky-600">straighten</span>
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Unidades & Medidas Telemétricas</h3>
            </div>
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-inner">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-lg font-black text-slate-900 uppercase italic tracking-tight">Sistema Métrico</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">KM/H, Celsius, kPa, BAR</p>
                </div>
                <button 
                  onClick={() => setUnits('metric')}
                  className={`size-14 rounded-2xl flex items-center justify-center transition-all ${
                    units === 'metric' ? 'bg-sky-600 text-white shadow-2xl shadow-sky-200' : 'bg-white border border-slate-200 text-slate-200 hover:text-sky-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl font-bold">{units === 'metric' ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                </button>
              </div>
              <div className="h-[2px] bg-slate-200/50 w-full mb-10"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-black text-slate-900 uppercase italic tracking-tight">Sistema Imperial</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">MPH, Fahrenheit, PSI, LBF</p>
                </div>
                <button 
                   onClick={() => setUnits('imperial')}
                   className={`size-14 rounded-2xl flex items-center justify-center transition-all ${
                    units === 'imperial' ? 'bg-sky-600 text-white shadow-2xl shadow-sky-200' : 'bg-white border border-slate-200 text-slate-200 hover:text-sky-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl font-bold">{units === 'imperial' ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                </button>
              </div>
            </div>

            <div className="p-8 bg-sky-50 rounded-[2.5rem] border border-sky-100 flex items-start gap-4 shadow-sm shadow-sky-900/5">
               <span className="material-symbols-outlined text-sky-600 text-3xl font-bold">info</span>
               <div className="space-y-2">
                  <p className="text-sky-900 text-xs font-black uppercase tracking-widest">Nota de Sincronización</p>
                  <p className="text-sky-700/70 text-[11px] font-bold leading-relaxed">
                    Los cambios en las unidades afectarán a todos los informes históricos y gráficos de datos en vivo de forma instantánea.
                  </p>
               </div>
            </div>
          </section>
        </div>

        <section className="bg-slate-900 rounded-[4rem] p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-sky-900/40 relative overflow-hidden mt-12 border border-slate-800">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <span className="material-symbols-outlined text-[200px] text-white">workspace_premium</span>
           </div>
           <div className="relative z-10 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                 <span className="material-symbols-outlined text-sky-400 font-bold">verified_user</span>
                 <p className="text-sky-400 text-[10px] font-black uppercase tracking-[0.4em]">TitanScan Enterprise Cloud</p>
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">MEMBRESIA PRO ELITE</h2>
              <p className="text-slate-400 text-sm font-medium max-w-md leading-relaxed">
                Acceso ilimitado a funciones de codificación SCN online, bases de datos de esquemas eléctricos y soporte remoto J2534 activo hasta Enero 2026.
              </p>
           </div>
           <button className="bg-sky-600 hover:bg-sky-500 text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all relative z-10 shadow-2xl shadow-sky-900 active:scale-95 mt-8 md:mt-0">
             Administrar Licencia Enterprise
           </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsView;
