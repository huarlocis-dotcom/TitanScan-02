
import React, { useState } from 'react';
import { VehicleProfile } from '../types';

const MOCK_PROFILES: VehicleProfile[] = [
  {
    id: '1',
    vin: '1FTF...8923',
    brand: 'Ford',
    model: 'F-150 Lightning',
    year: 2023,
    lastScan: 'Hoy, 10:45 AM',
    mileage: '12,450 mi',
    activeDTCs: 0,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '2',
    vin: '1G1R...3456',
    brand: 'Chevrolet',
    model: 'Camaro SS',
    year: 2022,
    lastScan: 'Hace 3 días',
    mileage: '8,200 mi',
    activeDTCs: 1,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=400&auto=format&fit=crop'
  },
];

interface VehicleProfilesViewProps {
  onSelectVehicle: (vehicle: VehicleProfile) => void;
}

const VehicleProfilesView: React.FC<VehicleProfilesViewProps> = ({ onSelectVehicle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = MOCK_PROFILES.filter(p => 
    p.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.vin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <header className="flex-none p-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full border border-sky-100">
              <span className="material-symbols-outlined text-[18px] font-bold">garage</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Gestión de Flota Profesional</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Mi Garaje</h1>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
             <div className="relative group min-w-[320px]">
                <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400 group-focus-within:text-sky-500 transition-colors">search</span>
                <input 
                  type="text"
                  placeholder="Buscar por modelo o VIN..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {filteredProfiles.map((vehicle) => (
            <div 
              key={vehicle.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-100 transition-all duration-500 flex flex-col"
            >
              <div className="h-48 relative overflow-hidden shrink-0">
                <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                   <h3 className="text-white text-2xl font-black italic tracking-tight">{vehicle.model}</h3>
                   <p className="text-white/70 text-[10px] font-mono tracking-widest uppercase">{vehicle.vin}</p>
                </div>
              </div>
              
              <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Kilometraje</p>
                    <p className="text-slate-900 font-bold text-sm">{vehicle.mileage}</p>
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                   <button 
                    onClick={() => onSelectVehicle(vehicle)}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-sky-100 flex items-center justify-center gap-2"
                   >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      Cargar Diagnóstico
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleProfilesView;
