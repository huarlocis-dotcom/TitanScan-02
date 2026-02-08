
import React, { useState } from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, toggleSidebar }) => {
  const [hoveredItem, setHoveredItem] = useState<View | null>(null);

  const menuItems = [
    { id: View.DASHBOARD, label: 'Inicio Sistema', icon: 'home', desc: 'Panel principal de control' },
    { id: View.VEHICLE_PROFILES, label: 'Garaje Digital', icon: 'garage', badge: '5', desc: 'Gestión de vehículos' },
    { id: View.OBD_FUNCTIONS, label: 'Protocolos OBD-II', icon: 'car_repair', desc: 'Funciones de escaneo estándar' },
    { id: View.DIAGNOSTICS, label: 'Análisis de DTC', icon: 'warning', badge: '3', desc: 'Lectura y borrado de fallas' },
    { id: View.TOPOLOGY, label: 'Topología de Red', icon: 'schema', desc: 'Mapa de módulos CAN-BUS' },
    { id: View.LIVE_DATA, label: 'Flujo de Datos', icon: 'monitoring', desc: 'Telemetría en tiempo real' },
    { id: View.ACTIVE_TEST, label: 'Pruebas Activas', icon: 'bolt', desc: 'Control bidireccional' },
    { id: View.VCI_CONFIG, label: 'VCI & Kernel', icon: 'terminal', desc: 'Hardware y dependencias' },
    { id: View.OSCILLOSCOPE, label: 'Osciloscopio Lab', icon: 'waves', desc: 'Análisis de señales' },
    { id: View.PRESENTATION, label: 'Galería PPTX', icon: 'gallery_thumbnail', desc: 'Capturas para presentación', highlight: true },
    { id: View.PROGRAMMING, label: 'Programación J2534', icon: 'cable', desc: 'Flash de ECUs' },
    { id: View.IMMOBILIZER, label: 'Llaves e Inmo', icon: 'vpn_key', desc: 'Seguridad y transpondedores' },
    { id: View.ADAS, label: 'Sistemas ADAS', icon: 'visibility', desc: 'Calibración de cámaras/radar' },
    { id: View.SERVICES, label: 'Mantenimiento', icon: 'settings_input_component', desc: 'Reseteo de servicios' },
    { id: View.REPORTS, label: 'Informes Técnicos', icon: 'description', desc: 'Historial de diagnósticos' },
  ];

  return (
    <nav className="w-20 flex-none bg-white border-r border-slate-100 flex flex-col items-center py-6 z-[100] relative">
      <div className="flex-1 flex flex-col gap-5 items-center w-full px-4 overflow-y-auto no-scrollbar pb-6">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="relative flex flex-col items-center justify-center shrink-0 h-12"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Tooltip Dinámico "En frente" */}
            <div className={`fixed left-24 px-5 py-3 rounded-2xl bg-slate-900 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-none z-[999] whitespace-nowrap border border-slate-700 ${
              hoveredItem === item.id ? 'opacity-100 translate-x-0 visible scale-100' : 'opacity-0 -translate-x-4 invisible scale-90'
            }`} style={{ top: 'auto' }}>
              <div className="flex flex-col gap-0.5">
                 <div className="flex items-center gap-3">
                    <div className={`size-2 rounded-full shadow-[0_0_12px_rgba(14,165,233,1)] animate-pulse ${item.highlight ? 'bg-amber-500' : 'bg-sky-500'}`}></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                 </div>
                 <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest pl-5">{item.desc}</span>
              </div>
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 size-4 bg-slate-900 rotate-45 border-l border-b border-slate-700"></div>
            </div>

            <button
              onClick={() => onViewChange(item.id)}
              className={`size-12 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-sm transform hover:scale-110 active:scale-95 ${
                currentView === item.id 
                  ? 'bg-sky-600 text-white shadow-xl shadow-sky-200' 
                  : item.highlight 
                    ? 'bg-amber-50 text-amber-600 border border-amber-100'
                    : 'bg-white text-slate-400 border border-slate-100 hover:text-sky-600 hover:bg-sky-50'
              }`}
            >
              <span className={`material-symbols-outlined text-[26px] ${currentView === item.id ? 'fill-1' : 'fill-0'}`}>
                {item.icon}
              </span>
              
              {item.badge && (
                <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                  {item.badge}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="flex-none flex flex-col gap-6 items-center pt-8 border-t border-slate-50 w-full bg-white px-4">
        <div className="relative group">
           <div className="absolute left-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[1000] border border-slate-700">
              Preferencias Globales
           </div>
           <button 
            onClick={() => onViewChange(View.SETTINGS)}
            className={`size-12 flex items-center justify-center rounded-2xl transition-all shadow-sm group relative ${
              currentView === View.SETTINGS ? 'bg-sky-600 text-white' : 'bg-white border border-slate-100 text-slate-400 hover:text-sky-600 hover:bg-sky-50'
            }`}
           >
             <span className="material-symbols-outlined text-[24px]">settings</span>
           </button>
        </div>

        <div className="relative group">
           <div className="absolute left-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[1000] shadow-lg shadow-red-200">
              Cerrar TitanScan OS
           </div>
           <button className="size-12 flex items-center justify-center rounded-2xl bg-white border border-red-50 text-red-400 hover:bg-red-50 transition-all shadow-sm">
             <span className="material-symbols-outlined text-[24px]">power_settings_new</span>
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
