
import React, { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';

interface PIDItem {
  id: string;
  name: string;
  sub: string;
  value: number;
  unit: string;
  color: string;
  hex: string;
  progress: number;
  category: 'Motor' | 'Transmisión' | 'Emisiones' | 'Carrocería';
  checked: boolean;
}

const INITIAL_PIDS: PIDItem[] = [
  { id: 'rpm', name: 'RPM del Motor', sub: 'Async Stream 0x010C', value: 2450, unit: 'RPM', color: 'bg-sky-500', hex: '#0ea5e9', progress: 35, category: 'Motor', checked: true },
  { id: 'vss', name: 'Velocidad Vehículo', sub: 'Async Stream 0x010D', value: 65, unit: 'KM/H', color: 'bg-indigo-500', hex: '#6366f1', progress: 40, category: 'Motor', checked: true },
  { id: 'ect', name: 'Temp. Refrigerante', sub: 'Async Stream 0x0105', value: 92, unit: '°C', color: 'bg-emerald-500', hex: '#10b981', progress: 65, category: 'Motor', checked: true },
  { id: 'map', name: 'Presión MAP', sub: 'Async Stream 0x010B', value: 35, unit: 'kPa', color: 'bg-amber-500', hex: '#f59e0b', progress: 30, category: 'Motor', checked: true },
  { id: 'iat', name: 'Temp. Aire Admisión', sub: 'Async Stream 0x010F', value: 28, unit: '°C', color: 'bg-sky-400', hex: '#38bdf8', progress: 45, category: 'Motor', checked: false },
];

const LiveDataView: React.FC = () => {
  const [pids, setPids] = useState<PIDItem[]>(INITIAL_PIDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [graphData, setGraphData] = useState<any[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    // Frecuencia de muestreo de 50ms según especificación de RealTimeEngine (Python asyncio)
    const interval = setInterval(() => {
      let currentValues: Record<string, number> = {};
      
      setPids(prev => {
        const updated = prev.map(p => {
          const delta = (Math.random() - 0.5) * (p.id === 'rpm' ? 120 : 0.8);
          const newValue = Math.max(0, p.value + delta);
          const finalVal = parseFloat(newValue.toFixed(p.id === 'batt' ? 1 : 0));
          currentValues[p.id] = finalVal;
          return { ...p, value: finalVal };
        });
        return updated;
      });

      setGraphData(prev => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString(),
          ...currentValues
        };
        const newData = [...prev, newDataPoint];
        return newData.slice(-40); // Más puntos para una visualización fluida a 20Hz
      });
      setLastUpdate(Date.now());
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const togglePid = (id: string) => {
    setPids(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  const saveSession = () => {
    const session = {
      id: `SES-${Date.now()}`,
      date: new Date().toLocaleString(),
      pids: pids.filter(p => p.checked).map(p => ({ name: p.name, lastValue: p.value })),
      type: 'Reactive Telemetry Stream'
    };
    const saved = JSON.parse(localStorage.getItem('saved_sessions') || '[]');
    localStorage.setItem('saved_sessions', JSON.stringify([...saved, session]));
    alert('Instantánea capturada via AsyncIO Stream.');
  };

  const selectedPids = useMemo(() => pids.filter(p => p.checked), [pids]);
  const filteredPidsForList = useMemo(() => pids.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())), [pids, searchTerm]);

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-none px-10 py-8 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm z-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                 <div className="size-3 rounded-full bg-sky-500 animate-ping shadow-[0_0_12px_rgba(14,165,233,0.8)]"></div>
                 <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Reactive Telemetry</h1>
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 italic flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">bolt</span>
                ASYNCIO LOOP: 20Hz (50ms) // RXPY STREAM: ONLINE
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative group/lbtn">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest opacity-0 group-hover/lbtn:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-2xl scale-90 group-hover:scale-100">
                 Buffer de Grabación Reactivo
              </div>
              <button onClick={() => setIsRecording(!isRecording)} className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${isRecording ? 'bg-red-500 text-white shadow-red-100 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-slate-200/50'}`}>
                <span className="material-symbols-outlined text-xl">{isRecording ? 'stop_circle' : 'radio_button_checked'}</span>
                {isRecording ? 'Grabando Async...' : 'Grabar Sesión'}
              </button>
            </div>

            <button onClick={saveSession} className="flex items-center gap-3 px-8 py-4 bg-sky-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-sky-700 shadow-2xl shadow-sky-100 transition-all active:scale-95">
              <span className="material-symbols-outlined text-xl">save</span>
              Snapshot
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-[1500px] mx-auto space-y-10">
            {selectedPids.length === 0 ? (
              <div className="h-[65vh] flex flex-col items-center justify-center text-center opacity-10">
                 <span className="material-symbols-outlined text-[120px] mb-8">stream</span>
                 <p className="font-black uppercase tracking-[0.5em] text-sm">Iniciando Motor de Telemetría...</p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
                  {selectedPids.map(pid => (
                    <div key={pid.id} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm transition-all hover:shadow-2xl group relative overflow-hidden flex flex-col">
                      <div className={`absolute top-0 left-0 w-2 h-full ${pid.color}`}></div>
                      <div className="flex justify-between items-start mb-8">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{pid.name}</span>
                        <div className="relative group/info">
                           <div className="absolute -top-10 right-0 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/info:opacity-100 transition-all whitespace-nowrap z-20 pointer-events-none">
                            {pid.sub}
                           </div>
                           <span className="material-symbols-outlined text-slate-200 group-hover:text-sky-500 transition-colors cursor-help">memory</span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-6xl font-black text-slate-900 tracking-tighter tabular-nums italic leading-none">{pid.value}</span>
                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{pid.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-[3.5rem] border border-slate-100 p-12 h-[550px] shadow-2xl relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={graphData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                      <defs>
                        {selectedPids.map(p => (
                          <linearGradient key={`grad-${p.id}`} id={`color-${p.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={p.hex} stopOpacity={0.15}/>
                            <stop offset="95%" stopColor={p.hex} stopOpacity={0}/>
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1.5rem', color: '#fff', fontSize: '11px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', padding: '1.5rem' }} />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                      {selectedPids.map((pid) => (
                        <Area key={pid.id} name={pid.name} type="stepAfter" dataKey={pid.id} stroke={pid.hex} strokeWidth={3} fill={`url(#color-${pid.id})`} isAnimationActive={false} dot={false} />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="w-[420px] bg-white border-l border-slate-200 flex flex-col shadow-2xl z-20">
        <div className="p-10 border-b border-slate-200 bg-slate-50/50">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
             <span className="material-symbols-outlined text-sky-600 font-bold">dynamic_feed</span>
             Motor de Suscripción (RX)
          </h3>
          <div className="relative group/search">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">search</span>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Filtrar PIDs..." className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-3">
            {filteredPidsForList.map(pid => (
              <label key={pid.id} className={`flex items-center justify-between p-5 rounded-3xl cursor-pointer border transition-all relative group ${pid.checked ? 'bg-sky-50 border-sky-300 shadow-lg' : 'border-transparent hover:bg-slate-50'}`}>
                <div className="flex items-center gap-5">
                  <div className={`size-12 rounded-2xl ${pid.color} flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-2xl">sensors</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1.5">{pid.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{pid.id.toUpperCase()}</span>
                  </div>
                </div>
                <input type="checkbox" checked={pid.checked} onChange={() => togglePid(pid.id)} className="size-6 rounded-lg border-slate-300 text-sky-600 focus:ring-0 cursor-pointer" />
              </label>
            ))}
        </div>
        <div className="p-10 border-t border-slate-100 bg-slate-50/50">
           <div className="bg-slate-900 p-8 rounded-[3rem] shadow-xl relative group/hstat overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:15px_15px]"></div>
              <p className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-500 text-base">analytics</span>
                REAL-TIME DATA RATE
              </p>
              <div className="flex items-center justify-between">
                 <span className="text-3xl font-mono text-white font-black italic">20.0 Hz</span>
                 <span className="text-[10px] text-sky-500 font-black uppercase">Buffered</span>
              </div>
           </div>
        </div>
      </aside>
    </div>
  );
};

export default LiveDataView;
