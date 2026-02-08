
import React, { useState, useEffect } from 'react';
import { View, VehicleProfile } from '../types';

interface TopNavProps {
  currentView: View;
  activeVehicle?: VehicleProfile | null;
}

const TopNav: React.FC<TopNavProps> = ({ currentView, activeVehicle }) => {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="flex-none flex items-center justify-between border-b border-slate-200 px-6 py-3 bg-white z-[90] shadow-sm">
      <div className="flex items-center gap-8">
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-4 text-sky-600 cursor-pointer group active:scale-95 relative"
          title="Reiniciar TitanScan OS"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-100 shadow-sm group-hover:bg-sky-600 group-hover:text-white transition-all">
              <span className="material-symbols-outlined font-bold text-2xl">hub</span>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-slate-900 text-xl font-black tracking-tighter leading-none italic group-hover:text-sky-600 transition-colors">TitanScan OS</h2>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.25em] mt-1 leading-none">HUGO LOPEZ CISNERO</p>
            </div>
          </div>

          {/* Indicador de Estado OBD2 / VCI */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 shadow-sm ${
            activeVehicle 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className={`size-2 rounded-full ${activeVehicle ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'} shadow-sm`}></div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-black uppercase tracking-widest">
                {activeVehicle ? 'VCI CONECTADO' : 'VCI DESCONECTADO'}
              </span>
              {activeVehicle && (
                <span className="text-[7px] font-mono font-bold mt-0.5 opacity-70">
                  ID: {activeVehicle.vin.substring(0, 8)}...
                </span>
              )}
            </div>
            
            {/* Tooltip de Estado */}
            <div className="absolute top-14 left-0 px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl border border-white/10 whitespace-nowrap z-[1000]">
              {activeVehicle ? `Enlace estable con OBD2: ${activeVehicle.brand}` : 'Esperando conexión de hardware SmartLink'}
            </div>
          </div>
        </div>
        
        {activeVehicle && (
          <div className="flex items-center gap-4 bg-slate-900 text-white px-5 py-2.5 rounded-2xl shadow-xl shadow-slate-200 border border-slate-800 group animate-in fade-in slide-in-from-left-4 duration-500 relative">
             <div className="flex flex-col">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-sky-400 leading-none mb-1">Vehículo Activo</p>
                <p className="text-xs font-black italic tracking-tighter leading-none">{activeVehicle.brand} {activeVehicle.model}</p>
             </div>
             <div className="h-6 w-px bg-white/10"></div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 group/vci">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[9px] font-mono tracking-widest text-white/60">BUS: ONLINE</span>
                  {/* Tooltip VCI */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/vci:opacity-100 transition-all pointer-events-none shadow-2xl border border-white/10 whitespace-nowrap z-[1000]">
                    Flujo de Datos CAN-BUS Activo
                  </div>
                </div>
                <div className="flex flex-col items-end group/time relative">
                  <span className="text-[7px] font-black text-sky-400 uppercase tracking-widest leading-none mb-0.5">Session Time</span>
                  <span className="text-[10px] font-mono text-white font-bold">{formatUptime(uptime)}</span>
                  <div className="absolute top-10 right-0 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/time:opacity-100 transition-all pointer-events-none shadow-2xl border border-white/10 whitespace-nowrap z-[1000]">
                    Tiempo de Diagnóstico Activo
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <div className="relative group/topbtn">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/topbtn:opacity-100 transition-all pointer-events-none shadow-2xl border border-white/10 whitespace-nowrap z-[1000]">
              Ajustes Rápidos
            </div>
            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-sky-600 transition-colors">
              <span className="material-symbols-outlined text-[22px]">settings</span>
            </button>
          </div>
          <div className="relative group/topbtn">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/topbtn:opacity-100 transition-all pointer-events-none shadow-2xl border border-white/10 whitespace-nowrap z-[1000]">
              Notificaciones del Sistema
            </div>
            <button className="size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-sky-600 transition-colors relative">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
        
        <div className="flex items-center gap-3 pl-1 group/user relative cursor-pointer">
          <div className="absolute top-12 right-0 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/user:opacity-100 transition-all pointer-events-none shadow-2xl border border-white/10 whitespace-nowrap z-[1000]">
            Perfil: Hugo Lopez
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none text-slate-900 uppercase tracking-tight">HUGO LOPEZ CISNERO</p>
            <p className="text-xs text-slate-400 leading-none mt-1">Técnico Maestro</p>
          </div>
          <div className="size-9 rounded-full bg-cover bg-center border-2 border-slate-200 shadow-sm" style={{backgroundImage: 'url("https://picsum.photos/seed/technician/200")'}}></div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
