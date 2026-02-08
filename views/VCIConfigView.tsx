
import React, { useState, useEffect, useRef } from 'react';

interface Library {
  name: string;
  desc: string;
  status: 'PENDING' | 'INSTALLING' | 'INSTALLED' | 'ERROR';
  version?: string;
}

const INITIAL_LIBRARIES: Library[] = [
  { name: "pyserial", desc: "Comunicación SmartLink / ELM327", status: "INSTALLED", version: "3.5" },
  { name: "udsoncan", desc: "Implementación Protocolo UDS (ISO-14229)", status: "INSTALLED", version: "1.21.0" },
  { name: "scipy", desc: "Procesamiento de Señales y FFT", status: "INSTALLED", version: "1.11.3" },
  { name: "rxpy", desc: "Programación Reactiva de Flujos CAN", status: "INSTALLED", version: "4.0.4" },
  { name: "asyncio", desc: "Motor de Concurrencia Asíncrona", status: "INSTALLED", version: "Built-in" },
  { name: "sqlalchemy", desc: "ORM para Base de Datos DTC/VIN", status: "INSTALLED", version: "2.0.21" },
  { name: "redis", desc: "Caché de Alta Velocidad para Telemetría", status: "INSTALLED", version: "5.0.1" },
  { name: "pandas", desc: "Análisis Estadístico de Sensores", status: "INSTALLED", version: "2.1.1" },
  { name: "customtkinter", desc: "Interfaz HMI de Alto Rendimiento", status: "INSTALLED", version: "5.2.1" }
];

const VCIConfigView: React.FC = () => {
  const [libraries, setLibraries] = useState<Library[]>(INITIAL_LIBRARIES);
  const [ports, setPorts] = useState<string[]>(['COM1', 'COM3 (SmartLink)', 'ttyUSB0']);
  const [selectedPort, setSelectedPort] = useState('COM3 (SmartLink)');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[i] TitanScan OS Environment: Ready", 
    "[i] Python 3.10.12 - RealTimeEngine Loaded", 
    "[i] Reactive Streams (rxpy) Initialized"
  ]);
  const [isKernelActive, setIsKernelActive] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (msg: string, type: 'INFO' | 'SUCCESS' | 'ERROR' | 'CMD' = 'INFO') => {
    const prefix = type === 'CMD' ? '$ ' : type === 'ERROR' ? '[!] ' : type === 'SUCCESS' ? '[OK] ' : '[i] ';
    setLogs(prev => [...prev, `${prefix}${msg}`]);
  };

  const simulatePipFreeze = () => {
    addLog("pip freeze > requirements.txt", "CMD");
    libraries.forEach(lib => {
      addLog(`${lib.name}==${lib.version || 'latest'}`, "INFO");
    });
    addLog("Requirements exported to TitanScan Cloud Storage.", "SUCCESS");
  };

  const startKernel = () => {
    setIsConnecting(true);
    addLog("Iniciando RealTimeEngine...", "INFO");
    
    setTimeout(() => {
      addLog("import rx; from rx import operators as ops", "CMD");
      addLog("Asyncio Event Loop started on worker thread.", "SUCCESS");
      addLog("UDS Client connecting to IsoTPSocket(can0, 0x7E0)...", "INFO");
      setTimeout(() => {
        addLog("client.change_session(extendedDiagnostic)", "CMD");
        addLog("RX < 50 03 00 32 01 F4", "SUCCESS");
        addLog("Real-time data stream established (50ms interval).", "SUCCESS");
        setIsConnecting(false);
        setIsKernelActive(true);
      }, 800);
    }, 500);
  };

  return (
    <div className="flex h-full bg-white font-sans overflow-hidden">
      <div className="flex-1 flex flex-col p-12 overflow-y-auto custom-scrollbar">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="material-symbols-outlined text-sky-600 font-bold">terminal</span>
             <h2 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Gestor de Hardware & Kernel</h2>
          </div>
          <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">VCI & Engine Setup</h1>
          <p className="text-slate-400 font-medium text-lg mt-4 max-w-2xl">Gestión de librerías científicas y motor reactivo para telemetría de baja latencia.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="bg-slate-50 rounded-[3rem] border border-slate-100 p-10 space-y-8 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                 <span className="material-symbols-outlined text-sky-600">developer_board</span> TitanScanEngine (Async/Reactive)
              </h3>
              {isKernelActive && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[9px] font-black uppercase tracking-widest animate-pulse">
                  Stream Active (50ms)
                </span>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interface SmartLink</label>
                <div className="flex gap-3">
                   <select value={selectedPort} onChange={(e) => setSelectedPort(e.target.value)} disabled={isConnecting || isKernelActive} className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50">
                     {ports.map(p => <option key={p} value={p}>{p}</option>)}
                   </select>
                   <button onClick={() => { addLog("Scanning interfaces...", "INFO"); setPorts([...ports, `COM${Math.floor(Math.random()*10)+4}`]); }} disabled={isConnecting || isKernelActive} className="bg-white border border-slate-200 size-14 rounded-2xl flex items-center justify-center text-slate-400 hover:text-sky-600 transition-all active:scale-90 relative group">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Refrescar Puertos</div>
                      <span className="material-symbols-outlined">refresh</span>
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 group/stat relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white rounded-lg text-[8px] font-black opacity-0 group-hover/stat:opacity-100 transition-all">Velocidad CAN</div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Baudrate</p>
                    <p className="text-slate-900 font-mono font-bold">500,000 bps</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 group/stat relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white rounded-lg text-[8px] font-black opacity-0 group-hover/stat:opacity-100 transition-all">Intervalo de Muestreo</div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sampling</p>
                    <p className="text-slate-900 font-mono font-bold">20 Hz (50ms)</p>
                 </div>
              </div>

              <button onClick={startKernel} disabled={isConnecting || isKernelActive} className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 ${isKernelActive ? 'bg-emerald-500 text-white cursor-default' : 'bg-sky-600 text-white hover:bg-sky-700 active:scale-95'}`}>
                <span className={`material-symbols-outlined ${isConnecting ? 'animate-spin' : ''}`}>
                  {isKernelActive ? 'verified' : 'bolt'}
                </span>
                {isConnecting ? 'INICIALIZANDO MOTOR...' : isKernelActive ? 'REAL-TIME ENGINE READY' : 'CONECTAR UDS CLIENT'}
              </button>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                 <span className="material-symbols-outlined text-sky-600">package_2</span> Dependencias del Sistema
              </h3>
              <div className="flex gap-2">
                <button onClick={simulatePipFreeze} className="text-[9px] font-black text-slate-500 hover:text-sky-600 uppercase tracking-widest flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 transition-all">
                  <span className="material-symbols-outlined text-xs">list_alt</span> pip freeze
                </button>
                <button disabled={isInstalling} className="text-[10px] font-black text-sky-600 hover:text-sky-700 uppercase tracking-widest flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-xl border border-sky-100 transition-all disabled:opacity-50">
                  <span className="material-symbols-outlined text-sm font-bold">download</span> Actualizar Todo
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {libraries.map(lib => (
                <div key={lib.name} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-sky-300 transition-all group relative">
                   <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-xl flex items-center justify-center transition-all bg-slate-50 text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-600`}>
                         <span className="material-symbols-outlined text-xl">settings_input_component</span>
                      </div>
                      <div>
                         <div className="flex items-center gap-2">
                            <p className="text-sm font-black text-slate-900 uppercase">{lib.name}</p>
                            <span className="text-[9px] text-slate-300 font-mono">v{lib.version}</span>
                         </div>
                         <p className="text-[10px] text-slate-400 font-medium">{lib.desc}</p>
                      </div>
                   </div>
                   <span className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest bg-emerald-50 text-emerald-600 border-emerald-100`}>
                     {lib.status}
                   </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <aside className="w-[450px] bg-slate-900 flex flex-col shadow-2xl">
         <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <div className="flex flex-col">
              <h3 className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em]">TitanScan System Shell</h3>
              <p className="text-[8px] text-slate-500 font-mono uppercase tracking-widest mt-1">UDS Session Manager v2.1</p>
            </div>
            <button onClick={() => setLogs(["[i] Console cleared."])} className="text-slate-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
         </div>
         <div className="flex-1 p-8 overflow-y-auto font-mono text-[11px] space-y-1.5 custom-scrollbar bg-black/20">
            {logs.map((log, i) => (
              <div key={i} className={`break-all leading-relaxed ${
                log.startsWith('[OK]') ? 'text-emerald-400' : 
                log.startsWith('[!]') ? 'text-red-400' : 
                log.startsWith('$') ? 'text-sky-300 font-bold' : 
                'text-slate-400'
              }`}>
                 {log}
              </div>
            ))}
            {isConnecting && <div className="text-sky-500 animate-pulse mt-4">_</div>}
            <div ref={logEndRef} />
         </div>
         <div className="p-8 bg-slate-800 border-t border-slate-700">
            <div className="bg-black/50 p-6 rounded-2xl border border-white/5 flex gap-4">
               <span className="material-symbols-outlined text-sky-500 text-xl shrink-0">info</span>
               <div className="space-y-1">
                  <p className="text-white text-[10px] font-black uppercase tracking-widest">Protocolo de Alta Fidelidad</p>
                  <p className="text-[9px] text-white/40 leading-relaxed italic">
                    El motor reactivo basado en `rxpy` y `asyncio` permite procesar hasta 1000 mensajes por segundo sin bloquear la interfaz HMI.
                  </p>
               </div>
            </div>
         </div>
      </aside>
    </div>
  );
};

export default VCIConfigView;
