
import React, { useState } from 'react';

interface ADASSensor {
  id: string;
  name: string;
  type: 'Camera' | 'Radar' | 'Lidar' | 'Ultrasonic';
  status: 'Calibrated' | 'Needs Calibration' | 'Faulty';
  location: string;
}

const SENSORS: ADASSensor[] = [
  { id: 'FCAM', name: 'Cámara Frontal Superior', type: 'Camera', status: 'Needs Calibration', location: 'Parabrisas Centro' },
  { id: 'FRAD', name: 'Radar Frontal de Distancia', type: 'Radar', status: 'Calibrated', location: 'Parrilla Delantera' },
  { id: 'BSM_L', name: 'Punto Ciego Izquierdo', type: 'Radar', status: 'Calibrated', location: 'Parachoques Trasero Izq.' },
  { id: 'BSM_R', name: 'Punto Ciego Derecho', type: 'Radar', status: 'Faulty', location: 'Parachoques Trasero Der.' },
];

const ADASView: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<ADASSensor | null>(SENSORS[0]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startCalibration = () => {
    setIsCalibrating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCalibrating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden font-sans">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header ADAS */}
        <div className="p-10 bg-white border-b border-slate-200 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-sky-600 font-bold">visibility</span>
              <h2 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Sistemas de Seguridad Activa</h2>
            </div>
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Calibración ADAS Suite</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-sky-50 px-6 py-3 rounded-2xl border border-sky-100 flex items-center gap-3">
               <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Entorno Preparado</span>
            </div>
          </div>
        </div>

        {/* Studio de Calibración */}
        <div className="flex-1 p-10 flex gap-10 overflow-hidden">
          <div className="flex-1 bg-white rounded-[3rem] border border-slate-200 shadow-xl relative overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">Visualización del Blanco de Calibración</h3>
               <div className="flex gap-2">
                  <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">Eje: 0.00°</span>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">Dist: 2.50m</span>
               </div>
            </div>

            <div className="flex-1 relative bg-slate-900 flex items-center justify-center p-12">
               {/* Gráfico Técnico del Vehículo y Target */}
               <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                  
                  {/* Vehículo Top View */}
                  <img 
                    src="https://www.transparentpng.com/download/car/8W5s29-white-car-top-view-images-free-car-transparent.png" 
                    alt="Vehicle"
                    className="w-48 opacity-40 invert grayscale brightness-200 rotate-180"
                  />

                  {/* Línea de Láser */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-[300px] w-px bg-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,1)]"></div>
                  
                  {/* Target de Calibración */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-24 border-4 border-white rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm animate-pulse">
                     <div className="size-16 border-2 border-sky-500 rounded-full flex items-center justify-center">
                        <div className="size-1 bg-sky-500"></div>
                     </div>
                     <div className="absolute -top-6 text-[9px] font-black text-sky-400 tracking-[0.3em] uppercase">Target ID: LDW-01</div>
                  </div>

                  {/* HUD lateral */}
                  <div className="absolute top-0 left-0 p-8 space-y-4">
                     <div className="bg-black/50 p-4 rounded-xl border border-white/10 text-[10px] font-mono">
                        <p className="text-emerald-400">POS_X: 1254.2</p>
                        <p className="text-emerald-400">POS_Y: 00.00</p>
                        <p className="text-sky-400 font-bold">READY TO SCAN</p>
                     </div>
                  </div>
               </div>

               {isCalibrating && (
                 <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
                    <div className="size-48 relative mb-8">
                       <svg className="size-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * progress) / 100} className="text-sky-500 transition-all duration-300" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-black italic">{progress}%</span>
                       </div>
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-white">Sincronizando Sensor...</p>
                 </div>
               )}
            </div>

            <div className="p-8 bg-white border-t border-slate-100 flex justify-center">
               <button 
                onClick={startCalibration}
                disabled={isCalibrating}
                className={`px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all ${
                  isCalibrating ? 'bg-slate-100 text-slate-400' : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sky-100'
                }`}
               >
                 {isCalibrating ? 'Calibración en Progreso' : 'Iniciar Calibración Estática'}
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar ADAS */}
      <aside className="w-[450px] bg-white border-l border-slate-200 flex flex-col shadow-2xl">
        <div className="p-10 border-b border-slate-100">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Módulos Detectados</h3>
           <div className="space-y-4">
              {SENSORS.map(sensor => (
                <button 
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className={`w-full p-6 rounded-[2rem] border transition-all text-left flex items-center gap-4 ${
                    selectedSensor?.id === sensor.id ? 'bg-sky-50 border-sky-300 shadow-lg shadow-sky-100 scale-105' : 'bg-white border-slate-100 hover:border-sky-200'
                  }`}
                >
                  <div className={`size-12 rounded-2xl flex items-center justify-center ${
                    sensor.status === 'Calibrated' ? 'bg-emerald-50 text-emerald-500' : 
                    sensor.status === 'Faulty' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
                  }`}>
                    <span className="material-symbols-outlined font-bold">{sensor.type === 'Camera' ? 'photo_camera' : 'radar'}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sensor.id}</p>
                    <p className="text-sm font-black text-slate-900 italic tracking-tight">{sensor.name}</p>
                  </div>
                </button>
              ))}
           </div>
        </div>

        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar space-y-8">
          {selectedSensor && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h4 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em] mb-4">Instrucciones de Montaje</h4>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Localización</p>
                  <p className="text-sm font-bold text-slate-800">{selectedSensor.location}</p>
                </div>
                <div className="h-px bg-slate-200 w-full"></div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="size-5 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                    <p className="text-xs text-slate-600 font-medium">Sitúe el marco de calibración a 2.5m del centro del parachoques.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="size-5 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                    <p className="text-xs text-slate-600 font-medium">Ajuste la altura del blanco a 1.2m desde el suelo.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="size-5 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">3</span>
                    <p className="text-xs text-slate-600 font-medium">Asegure una iluminación uniforme sin reflejos en el cristal.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-10 border-t border-slate-100 bg-slate-50/50">
           <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl">
             Generar Certificado ADAS
           </button>
        </div>
      </aside>
    </div>
  );
};

export default ADASView;
