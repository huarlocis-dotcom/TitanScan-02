
import React, { useState } from 'react';
import { VehicleProfile } from '../types';

interface ServiceViewProps {
  activeVehicle?: VehicleProfile | null;
}

const SERVICE_BRANDS = [
  { name: 'Chevrolet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/640px-Chevrolet-logo.png' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/1024px-Ford_Motor_Company_Logo.svg.png' },
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1024px-BMW.svg.png' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1024px-Audi-Logo_2016.svg.png' },
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1024px-Toyota_carlogo.svg.png' },
  { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.svg/1024px-Nissan_logo.svg.png' },
  { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1024px-Mercedes-Benz_Logo_2010.svg.png' },
  { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1024px-Volkswagen_logo_2019.svg.png' },
];

const COMMON_SERVICES = [
  { id: 'oil', title: 'Reinicio de Vida de Aceite', desc: 'Reinicia el sistema de monitoreo tras un cambio de aceite.', icon: 'water_drop' },
  { id: 'throttle', title: 'Ajuste de Cuerpo de Aceleración', desc: 'Reaprende los valores de control de la válvula de mariposa.', icon: 'tune' },
  { id: 'brakes', title: 'Modo Cambio de Frenos', desc: 'Retrae los pistones del freno de estacionamiento electrónico.', icon: 'disc_full' },
  { id: 'dpf', title: 'Regeneración DPF', desc: 'Inicia el ciclo de limpieza forzada del filtro de partículas.', icon: 'filter_alt' },
  { id: 'sas', title: 'Calibración Angulo Dirección', desc: 'Reinicia el sensor SAS tras alineación o reparación de suspensión.', icon: 'navigation' },
  { id: 'tpms', title: 'Aprendizaje de Sensores TPMS', desc: 'Sincroniza nuevos sensores de presión de neumáticos.', icon: 'speed' },
  { id: 'bms', title: 'Registro de Batería', desc: 'Informa al alternador sobre la instalación de una batería nueva.', icon: 'battery_charging_full' },
  { id: 'suspension', title: 'Calibración Suspensión de Aire', desc: 'Ajusta la altura de la carrocería en sistemas neumáticos.', icon: 'height' },
];

const ServiceView: React.FC<ServiceViewProps> = ({ activeVehicle }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(activeVehicle?.brand || null);

  const renderBrandSelection = () => (
    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full border border-sky-100">
            <span className="material-symbols-outlined text-[18px] font-bold">handyman</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Mantenimiento Especializado</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase">Seleccionar Marca</h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl">
            Para acceder a las funciones de servicio específicas, primero seleccione el fabricante del vehículo conectado.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {SERVICE_BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => setSelectedBrand(brand.name)}
              className="group flex flex-col items-center justify-center gap-6 p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-100 transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="h-20 w-full flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-full max-w-full object-contain pointer-events-none grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <span className="text-xs font-black text-slate-400 group-hover:text-sky-600 uppercase tracking-widest transition-colors">
                {brand.name}
              </span>
            </button>
          ))}
          <button className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] hover:border-sky-300 hover:bg-sky-50 transition-all group">
            <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-sky-600">add_circle</span>
            <span className="text-[10px] font-black text-slate-400 group-hover:text-sky-600 uppercase tracking-widest text-center">Protocolos Genéricos</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderServiceList = (brand: string) => (
    <div className="flex h-full overflow-hidden bg-sky-50/50 animate-in slide-in-from-right-8 duration-500">
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="flex items-start justify-between bg-white p-10 rounded-[3rem] shadow-xl shadow-sky-900/5 border border-slate-100">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => !activeVehicle && setSelectedBrand(null)}
                className={`flex items-center gap-2 text-sky-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 hover:opacity-70 transition-all ${activeVehicle ? 'hidden' : 'flex'}`}
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span> Volver a marcas
              </button>
              <div className="flex items-center gap-6 mb-2">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
                   <img 
                    src={SERVICE_BRANDS.find(b => b.name === brand)?.logo || 'https://cdn-icons-png.flaticon.com/512/3089/3089803.png'} 
                    alt={brand} 
                    className="max-w-full max-h-full object-contain"
                   />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-slate-900 text-5xl font-black leading-tight tracking-tighter italic uppercase">{brand}</h1>
                  <p className="text-sky-600 text-lg font-black tracking-widest uppercase">Funciones de Servicio</p>
                </div>
              </div>
              <p className="text-slate-500 text-base font-medium leading-relaxed max-w-2xl mt-4">
                Procedimientos especializados para <span className="text-slate-900 font-bold">{brand}</span>. Asegúrese de que el encendido esté ACTIVADO y el freno de mano aplicado.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {COMMON_SERVICES.map((svc) => (
              <button key={svc.id} className="group flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-8 hover:border-sky-500 hover:shadow-2xl hover:-translate-y-1 transition-all text-left relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                  <span className="material-symbols-outlined text-[160px] text-sky-600">{svc.icon}</span>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm z-10">
                  <span className="material-symbols-outlined text-3xl font-bold">{svc.icon}</span>
                </div>
                <div className="flex flex-col gap-2 z-10">
                  <h3 className="text-slate-900 text-xl font-black leading-tight tracking-tight uppercase italic">{svc.title}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{svc.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <aside className="w-[420px] bg-white border-l border-slate-200 flex flex-col shrink-0 z-20 shadow-2xl">
        <div className="p-10 border-b border-slate-200">
          <h3 className="text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="material-symbols-outlined text-sky-600 font-bold">hub</span>
            Estado de Comunicación
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-10 custom-scrollbar">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">Vehículo Identificado</p>
              <div className="flex items-center justify-between bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                <span className="text-slate-900 font-mono text-sm font-black tracking-widest">
                  {activeVehicle ? activeVehicle.vin : `PROTOCOLO GENERICO - ${brand.toUpperCase()}`}
                </span>
                <span className="material-symbols-outlined text-emerald-500 text-xl font-bold">verified</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">Especificación de Sistema</p>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                <p className="text-slate-900 font-black text-lg italic tracking-tight">{activeVehicle ? `${activeVehicle.year} ${activeVehicle.model}` : `Gestor Especializado ${brand}`}</p>
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mt-1">Base de Datos Versión 2024.11</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-emerald-700 text-[10px] font-black tracking-widest uppercase">VCI ONLINE - LATENCIA 12MS</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">Monitor de Voltaje</p>
              <p className="text-sky-600 font-black font-mono text-2xl italic tracking-tighter">12.6 V</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 relative h-48 overflow-hidden shadow-2xl">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:15px_15px]"></div>
               <svg className="w-full h-full absolute inset-0 text-sky-500" preserveAspectRatio="none" viewBox="0 0 100 50">
                <path d="M0,35 L10,32 L20,38 L30,33 L40,35 L50,28 L60,32 L70,30 L80,33 L90,29 L100,32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"></path>
                <circle cx="100" cy="32" r="3" fill="white" stroke="currentColor" strokeWidth="2"></circle>
              </svg>
            </div>
          </div>

          <div className="mt-auto bg-red-50 border border-red-100 rounded-[2rem] p-6 flex gap-4 items-start shadow-sm">
            <span className="material-symbols-outlined text-red-500 text-3xl font-bold">report</span>
            <div className="space-y-1">
              <p className="text-red-700 text-[10px] font-black uppercase tracking-widest">Protocolo de Seguridad</p>
              <p className="text-red-900/70 text-xs font-bold leading-relaxed">
                No interrumpa la conexión VCI durante los procedimientos de escritura. La caída de voltaje puede causar daños permanentes en la EEPROM.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {selectedBrand ? renderServiceList(selectedBrand) : renderBrandSelection()}
    </div>
  );
};

export default ServiceView;
