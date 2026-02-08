
import React, { useState, useEffect } from 'react';

const BRANDS = [
  // Americanas
  { name: 'Chevrolet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/640px-Chevrolet-logo.png' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/1024px-Ford_Motor_Company_Logo.svg.png' },
  { name: 'Jeep', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Jeep_logo.svg/1200px-Jeep_logo.svg.png' },
  { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/1024px-Tesla_Motors.svg.png' },
  { name: 'GMC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/GMC_logo.svg/1024px-GMC_logo.svg.png' },

  // Europeas
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1024px-BMW.svg.png' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1024px-Audi-Logo_2016.svg.png' },
  { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1024px-Mercedes-Benz_Logo_2010.svg.png' },
  { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1024px-Volkswagen_logo_2019.svg.png' },
  { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Porsche-logo.svg/800px-Porsche-logo.svg.png' },

  // Asiáticas
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1024px-Toyota_carlogo.svg.png' },
  { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.svg/1024px-Nissan_logo.svg.png' },
  { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/1024px-Hyundai_Motor_Company_logo.svg.png' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/1024px-Honda.svg.png' },
  { name: 'Mazda', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Mazda_logo_with_wordmark.svg/1280px-Mazda_logo_with_wordmark.svg.png' },
];

const RECENT_VEHICLES = [
  { model: 'F-150 Lightning', year: 2023, vin: '1FTF...8923', brand: 'Ford', health: 98 },
  { model: 'Camaro SS', year: 2022, vin: '1G1R...3456', brand: 'Chevrolet', health: 85 },
];

interface DashboardViewProps {
  onBrandSelect: (brand: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onBrandSelect }) => {
  const [savedSessions, setSavedSessions] = useState<any[]>([]);

  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem('saved_sessions') || '[]');
    setSavedSessions(sessions);
  }, []);

  const deleteSession = (id: string) => {
    const updated = savedSessions.filter(s => s.id !== id);
    localStorage.setItem('saved_sessions', JSON.stringify(updated));
    setSavedSessions(updated);
  };

  return (
    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full border border-sky-100">
              <span className="material-symbols-outlined text-[18px] font-bold">verified</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">TitanScan Suite v2.5.0</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic uppercase leading-tight">Mesa de Control</h1>
            <p className="text-xl text-slate-400 font-medium max-w-xl leading-relaxed">
              Gestión centralizada de diagnóstico, programación y telemetría avanzada para vehículos de alta gama.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl min-w-[340px] relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-6xl text-white">hub</span>
             </div>
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                   <div className="size-3 rounded-full bg-emerald-500 animate-pulse"></div>
                   <p className="text-white text-[11px] font-black uppercase tracking-[0.3em]">SmartLink C Link: OK</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/5 p-3 rounded-xl">
                      <p className="text-[8px] text-sky-400 font-black uppercase tracking-widest mb-1">Baudrate</p>
                      <p className="text-white font-mono text-sm font-bold tracking-tighter">115,200 bps</p>
                   </div>
                   <div className="bg-white/5 p-3 rounded-xl">
                      <p className="text-[8px] text-sky-400 font-black uppercase tracking-widest mb-1">Latencia</p>
                      <p className="text-white font-mono text-sm font-bold tracking-tighter">12.4 ms</p>
                   </div>
                </div>
                <div className="h-[1px] bg-white/10 w-full"></div>
                <p className="text-white/40 text-[9px] font-mono tracking-widest uppercase">SERIAL: TS-SLC-8812-PRO</p>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Dashboard - Brands */}
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-8">
              <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sky-600 font-bold">category</span>
                  <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Ecosistema Multimarca TitanScan</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {BRANDS.map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => onBrandSelect(brand.name)}
                    className="group flex flex-col items-center gap-4 p-6 bg-white border border-slate-100 rounded-[2.5rem] hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-100 transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="h-16 w-full flex items-center justify-center grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                      <img 
                        src={brand.logo} 
                        alt={brand.name} 
                        className="max-h-full max-w-full object-contain pointer-events-none"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-sky-600 uppercase tracking-[0.2em] transition-colors duration-300 text-center">
                      {brand.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-sky-600 font-bold">history</span>
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Flota en Servicio Reciente</h2>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {RECENT_VEHICLES.map((v, i) => (
                    <button key={i} className="flex flex-col p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-100 transition-all group text-left shadow-sm relative overflow-hidden">
                      <div className="flex items-center gap-6 mb-6">
                          <div className="size-16 rounded-2xl bg-slate-50 flex items-center justify-center shadow-inner group-hover:bg-sky-50 transition-colors shrink-0">
                            <span className="material-symbols-outlined text-3xl text-sky-600">directions_car</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em] leading-none mb-1">{v.brand}</p>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">{v.model}</h3>
                            <p className="text-slate-400 text-[10px] font-mono mt-2 tracking-[0.2em]">{v.vin}</p>
                          </div>
                      </div>
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className={`h-full ${v.health > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${v.health}%` }}></div>
                      </div>
                    </button>
                  ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Saved Sessions */}
          <aside className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sky-600 font-bold">save_as</span>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Sesiones Guardadas</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {savedSessions.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-slate-100 rounded-[3rem] text-center space-y-4">
                   <span className="material-symbols-outlined text-4xl text-slate-200">folder_open</span>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No hay reportes ni sesiones grabadas.</p>
                </div>
              ) : (
                savedSessions.map((session) => (
                  <div key={session.id} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 hover:border-sky-500 transition-all group shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[8px] font-black text-sky-600 uppercase tracking-widest">{session.type}</p>
                        <h4 className="text-sm font-black text-slate-900 uppercase italic mt-1">{session.id}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">{session.date}</p>
                      </div>
                      <button 
                        onClick={() => deleteSession(session.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {session.pids?.slice(0, 2).map((p: any, i: number) => (
                        <span key={i} className="text-[8px] font-black bg-white border border-slate-200 px-2 py-1 rounded-lg uppercase text-slate-500">{p.name}: {p.lastValue}</span>
                      ))}
                      {session.pids?.length > 2 && <span className="text-[8px] font-black text-sky-600">+{session.pids.length - 2} más</span>}
                    </div>
                    <button className="w-full mt-6 py-3 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all">
                      Cargar Reporte
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-10 bg-sky-50 rounded-[3rem] border border-sky-100 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3 text-sky-600">
                    <span className="material-symbols-outlined text-3xl font-bold">cloud_upload</span>
                    <h4 className="text-lg font-black uppercase italic tracking-tighter">Backup en la Nube</h4>
                  </div>
                  <p className="text-[11px] text-sky-700/70 font-bold leading-relaxed">
                    Sincroniza tus diagnósticos con TitanScan Cloud para acceder desde cualquier terminal J2534.
                  </p>
                  <button className="w-full py-4 bg-sky-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-sky-200 hover:bg-sky-700 transition-all">
                    Sincronizar Ahora
                  </button>
               </div>
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[120px]">cloud</span>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
