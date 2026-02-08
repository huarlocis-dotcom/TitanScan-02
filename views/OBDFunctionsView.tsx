
import React from 'react';

const OBD_TOOLS = [
  { 
    id: 1, 
    title: 'Leer Códigos', 
    icon: 'auto_read_play', 
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    title: 'Borrar Códigos', 
    icon: 'backspace', 
    img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    title: 'Luz de Falla MIL', 
    icon: 'engine', 
    img: 'https://images.unsplash.com/photo-1621259182978-f09e5e2ca09a?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    title: 'Datos en Vivo', 
    icon: 'query_stats', 
    img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 5, 
    title: 'Prueba Sist. EVAP', 
    icon: 'cyclone', 
    img: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop' // Representación de sistemas de presión y emisiones
  },
  { 
    id: 6, 
    title: 'Monitor a Bordo', 
    icon: 'desktop_windows', 
    img: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=400&auto=format&fit=crop' // Circuito electrónico de alta complejidad
  },
  { 
    id: 7, 
    title: 'Cuadro Congelado', 
    icon: 'ac_unit', 
    img: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 8, 
    title: 'Prueba Sensor O2', 
    icon: 'settings_input_component', 
    img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400&auto=format&fit=crop' // Microprocesadores y sensores
  },
  { 
    id: 9, 
    title: 'Info Vehículo', 
    icon: 'info', 
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 10, 
    title: 'Preparación I/M', 
    icon: 'fact_check', 
    img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 11, 
    title: 'Búsqueda DTC', 
    icon: 'manage_search', 
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop' // Microchip y circuitos integrados
  },
  { 
    id: 12, 
    title: 'Vehículos OBDII', 
    icon: 'directions_car', 
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400&auto=format&fit=crop' 
  },
];

const OBDFunctionsView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-hidden">
      {/* Encabezado Banner - Estilo Azul Profesional */}
      <div className="flex-none bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 p-6 flex items-center justify-between border-b border-sky-500 shadow-2xl">
        <div className="flex items-baseline gap-4">
          <span className="text-white text-7xl font-black italic tracking-tighter opacity-90">TODO</span>
          <div className="flex flex-col">
            <span className="text-white text-4xl font-black tracking-tight leading-none">OBD II</span>
            <span className="text-sky-200 text-3xl font-black tracking-widest leading-none">FUNCIONES</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 bg-black/20 px-6 py-4 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="text-right">
            <p className="text-sky-300 text-[10px] font-black uppercase tracking-widest">Modelo de Escáner</p>
            <p className="text-white text-xl font-black tracking-tight italic">TITAN-X PRO</p>
          </div>
          <div className="size-12 rounded-full bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/50">
             <span className="material-symbols-outlined text-white text-3xl font-bold">bolt</span>
          </div>
        </div>
      </div>

      {/* Cuadrícula de Funciones OBD-II */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-slate-100">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {OBD_TOOLS.map((tool) => (
            <button
              key={tool.id}
              className="group relative h-64 rounded-[2rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl hover:shadow-sky-200 transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Imagen de Fondo Temática */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                style={{ backgroundImage: `url(${tool.img})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Icono Flotante de la Función */}
              <div className="absolute top-6 left-6 size-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 text-white group-hover:bg-sky-500 group-hover:border-sky-400 transition-all duration-300">
                <span className="material-symbols-outlined text-2xl font-bold">{tool.icon}</span>
              </div>

              {/* Etiqueta Inferior - Estilo Azul Sky-600 */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-sky-600 border-t border-sky-500/50 flex items-center gap-4 group-hover:bg-sky-500 transition-colors">
                 <div className="size-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white text-lg">settings_suggest</span>
                 </div>
                 <span className="text-white text-lg font-black uppercase tracking-widest text-left leading-none">
                    {tool.title}
                 </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Barra de Estado Inferior */}
      <div className="flex-none bg-white border-t border-slate-200 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocolo: CAN-BUS J1939</span>
           </div>
           <div className="h-4 w-px bg-slate-200"></div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Voltaje: 12.6V</span>
        </div>
        <div className="flex items-center gap-2 text-sky-600">
           <span className="material-symbols-outlined text-sm font-bold">verified</span>
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sincronización de Vehículo Completa</span>
        </div>
      </div>
    </div>
  );
};

export default OBDFunctionsView;
