
import React, { useState, useEffect, useRef } from 'react';
import { Module } from '../types';

const INITIAL_MODULES: Module[] = [
  { id: '0x7E0', name: 'PCM - Powertrain Control', version: 'FL3A-12A650-AA', action: 'FL3A-AB', status: 'Actualización Lista' },
  { id: '0x7E1', name: 'TCM - Transmission Control', version: 'FL3A-14C331-AB', action: 'FL3A-AC', status: 'Seleccionado', selected: true },
  { id: '0x760', name: 'ABS - Braking System', version: 'FL3C-2C219-CE', status: 'Sincronizado' },
  { id: '0x726', name: 'BCM - Body Control', version: 'JU5T-14B476-BA', status: 'Sincronizado' },
];

const INITIAL_LOGS = [
  '[SYS] TitanScan OS Kernel v2.5 initialized.',
  '[COM] Intentando conexión en Puerto COM3 (SmartLink C)...',
  '[TX] > ATZ',
  '[RX] < ELM327 v2.1 (TitanScan Custom)',
  '[TX] > ATE0',
  '[RX] < OK',
  '[TX] > ATL0',
  '[RX] < OK',
  '[TX] > ATSP0',
  '[RX] < OK (Protocol Auto-Search Active)',
  '[COM] Baudrate establecido: 115200 bps',
  '[SYS] Bus CAN-C (500k) detectado.',
  '[TX] > 01 00',
  '[RX] < 41 00 BE 3E B8 11',
  '[SYS] Escaneo de módulos programables completo.',
];

const ProgrammingView: React.FC = () => {
  const [modules] = useState<Module[]>(INITIAL_MODULES);
  const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="flex h-full overflow-hidden bg-white font-sans">
      <section className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
        <div className="p-10 border-b border-slate-100 flex justify-between items-start bg-white">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-sky-600 font-bold">cable</span>
              <h2 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Programación J2534 Pass-Thru</h2>
            </div>
            <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Flash & Codificación Online</h1>
            <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">SMARTLINK C INTERFACE: <span className="text-emerald-500 animate-pulse">VCI_ONLINE_READY</span></p>
          </div>
          <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl transition-all text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 active:scale-95">
            <span className="material-symbols-outlined text-lg">sync_alt</span>
            Reestablecer Canal CAN
          </button>
        </div>

        <div className="px-10 py-4 bg-slate-50/50 border-b border-slate-100 flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-4 top-3 text-slate-400 text-lg">search</span>
            <input className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none placeholder-slate-400 font-bold" placeholder="Buscar módulo por ID..." />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl">
             <span className="size-2 rounded-full bg-sky-500"></span>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">CAN-FD: ACTIVO</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-4 custom-scrollbar">
          <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            <div className="col-span-1 text-center">Sel</div>
            <div className="col-span-4">Descripción de Módulo</div>
            <div className="col-span-3">Firma Actual</div>
            <div className="col-span-2">Acción</div>
            <div className="col-span-2 text-right">Estatus</div>
          </div>

          {modules.map((m) => (
            <div 
              key={m.id} 
              className={`grid grid-cols-12 gap-4 items-center p-6 rounded-[2rem] border transition-all cursor-pointer ${
                m.selected 
                  ? 'border-sky-500 bg-sky-50/50 shadow-xl shadow-sky-900/5 scale-[1.02]' 
                  : 'border-slate-100 bg-white hover:border-sky-200'
              }`}
            >
              <div className="col-span-1 flex justify-center">
                <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${m.selected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-200'}`}>
                   {m.selected && <span className="material-symbols-outlined text-sm font-bold">check</span>}
                </div>
              </div>
              <div className="col-span-4 flex items-center gap-4">
                <div className={`size-12 rounded-2xl flex items-center justify-center ${m.selected ? 'bg-white text-sky-600 shadow-sm' : 'bg-slate-50 text-slate-400'}`}>
                  <span className="material-symbols-outlined text-2xl">
                    {m.name.includes('PCM') ? 'memory' : m.name.includes('TCM') ? 'settings_input_component' : 'security'}
                  </span>
                </div>
                <div>
                  <div className="text-slate-900 font-black text-sm uppercase italic tracking-tight">{m.name}</div>
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">NODE_ID: {m.id}</div>
                </div>
              </div>
              <div className="col-span-3 text-[11px] text-slate-500 font-mono font-bold tracking-tight">{m.version}</div>
              <div className="col-span-2">
                {m.action && (
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                    m.selected ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' : 'bg-sky-50 text-sky-700'
                  }`}>
                    <span className="material-symbols-outlined text-[14px]">upgrade</span> {m.action}
                  </span>
                )}
              </div>
              <div className="col-span-2 text-right">
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  m.status.includes('Sincronizado') ? 'text-emerald-500' : 'text-sky-600'
                }`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="w-[480px] flex flex-col bg-slate-50 flex-none shadow-2xl">
        <div className="p-10 border-b border-slate-200 bg-white">
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-sky-600 text-lg font-bold">analytics</span>
            Sincronización de Enlace
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Voltaje Bus', value: '12.82 V', icon: 'bolt', color: 'text-sky-600' },
              { label: 'Ms Latencia', value: '12 ms', icon: 'wifi_tethering', color: 'text-emerald-500' },
              { label: 'Puerto VCI', value: 'COM3', icon: 'terminal', color: 'text-slate-900' },
              { label: 'Protocolo', value: 'UDS/CAN', icon: 'hub', color: 'text-sky-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm">
                <span className={`material-symbols-outlined ${stat.color} text-2xl`}>{stat.icon}</span>
                <div>
                  <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">{stat.label}</div>
                  <div className="text-slate-900 font-black text-sm tracking-tight">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 bg-slate-900 p-8 font-mono text-[11px] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 bg-slate-800 text-sky-400 text-[9px] uppercase font-black tracking-[0.3em] border-l border-b border-slate-700 z-10">
            SmartLink_C_Console v1.1
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-2 pb-4 text-slate-300">
            {logs.map((log, i) => (
              <div key={i} className={`
                ${log.includes('[TX]') ? 'text-sky-400 font-bold border-l-2 border-sky-400/30 pl-3' : ''}
                ${log.includes('[RX]') ? 'text-emerald-400 border-l-2 border-emerald-400/30 pl-3' : ''}
                ${log.includes('[SYS]') ? 'text-slate-500 italic' : ''}
                ${log.includes('[COM]') ? 'text-amber-400 font-bold' : ''}
              `}>
                {log}
              </div>
            ))}
            <div className="text-sky-600 animate-pulse mt-4 font-black tracking-widest border-t border-slate-800 pt-4 flex items-center gap-2">
               <span className="size-2 rounded-full bg-sky-500"></span>
               ESPERANDO COMANDO DE CONTROL...
            </div>
            <div ref={logEndRef} />
          </div>
        </div>

        <div className="p-10 bg-white border-t border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-900 text-[10px] font-black uppercase tracking-widest">Progreso de Transferencia</span>
            <span className="text-sky-600 text-lg font-black italic">0.0%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-8 shadow-inner">
            <div className="bg-sky-600 h-full w-[0%] transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-black py-5 px-8 rounded-2xl shadow-2xl shadow-sky-100 flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] uppercase tracking-[0.2em] italic">
              <span className="material-symbols-outlined text-2xl">play_circle</span>
              Ejecutar Reprogramación
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-slate-50 border border-slate-200 text-slate-400 text-[9px] font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-lg">save</span> Backup Eeprom
              </button>
              <button className="bg-slate-50 border border-slate-200 text-slate-400 text-[9px] font-black py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-lg">history</span> Logs RAW
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProgrammingView;
