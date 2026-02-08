
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface NetworkNode {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'offline';
  bus: 'CAN-C' | 'CAN-I' | 'LIN' | 'MOST';
  description: string;
  pos: { top: string; left: string };
  dtcs?: string[];
}

const INITIAL_NODES: NetworkNode[] = [
  { id: 'ECM', name: 'ECM (Motor)', status: 'healthy', bus: 'CAN-C', description: 'Engine Control Module - Gestión de Combustión', pos: { top: '15%', left: '50%' } },
  { id: 'TCM', name: 'TCM (Transmisión)', status: 'healthy', bus: 'CAN-C', description: 'Transmission Control Module - Gestión de Cambios', pos: { top: '30%', left: '50%' } },
  { id: 'ABS', name: 'ABS (Frenos)', status: 'error', bus: 'CAN-C', description: 'Anti-lock Braking System - Seguridad Activa', pos: { top: '22%', left: '25%' }, dtcs: ['C0035', 'C0040'] },
  { id: 'SRS', name: 'SRS (Airbag)', status: 'offline', bus: 'CAN-I', description: 'Supplemental Restraint System - Seguridad Pasiva', pos: { top: '55%', left: '50%' } },
  { id: 'BCM', name: 'BCM', status: 'healthy', bus: 'CAN-I', description: 'Body Control Module', pos: { top: '45%', left: '35%' } },
  { id: 'PDM', name: 'PDM', status: 'healthy', bus: 'CAN-I', description: 'Passenger Door Module', pos: { top: '45%', left: '65%' } },
];

const TopologyView: React.FC = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NODES);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [rotation, setRotation] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para Pan y Zoom
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const viewportRef = useRef<HTMLDivElement>(null);

  const startScan = () => {
    setIsScanning(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= nodes.length) {
        clearInterval(interval);
        setIsScanning(false);
      }
      i++;
    }, 200);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'healthy': return 'OK';
      case 'error': return 'ERROR';
      case 'offline': return 'SIN RESPUESTA';
      case 'warning': return 'ALERTA';
      default: return status;
    }
  };

  const filteredNodes = useMemo(() => {
    return nodes.filter(n => 
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      n.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [nodes, searchTerm]);

  const stats = useMemo(() => ({
    total: nodes.length,
    ok: nodes.filter(n => n.status === 'healthy').length,
    fault: nodes.filter(n => n.status === 'warning' || n.status === 'error').length,
    noResponse: nodes.filter(n => n.status === 'offline').length
  }), [nodes]);

  // Manejadores de eventos para Zoom (Rueda del ratón)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, scale + delta), 3);
    setScale(newScale);
  };

  // Manejadores de eventos para Pan (Arrastre)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Solo botón izquierdo
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden font-sans">
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="p-10 bg-white border-b border-slate-200 flex flex-wrap justify-between items-center z-20 shadow-sm gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-sky-600 font-bold">schema</span>
              <h2 className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Arquitectura de Red</h2>
            </div>
            <h1 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">Mapa CAN-BUS 3D</h1>
          </div>

          <div className="flex-1 max-w-lg relative group/search">
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 px-3 py-1 bg-slate-800 text-white rounded-lg text-[8px] font-black uppercase opacity-0 group-hover/search:opacity-100 transition-opacity z-50 pointer-events-none">
              Resaltar Nodo en el Mapa
            </div>
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">search</span>
            <input 
              type="text"
              placeholder="Buscar módulo por nombre o ID (ej. ECM)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-10">
            <div className="flex gap-8 items-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 shadow-inner">
              <div className="flex items-center gap-2 relative group/stat">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[8px] font-black opacity-0 group-hover/stat:opacity-100 transition-opacity z-50 whitespace-nowrap">Nodos Saludables</div>
                <div className="size-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stats.ok} OK</span>
              </div>
              <div className="flex items-center gap-2 relative group/stat">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[8px] font-black opacity-0 group-hover/stat:opacity-100 transition-opacity z-50 whitespace-nowrap">Nodos con DTCs</div>
                <div className="size-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stats.fault} FALLAS</span>
              </div>
            </div>

            <div className="relative group/scan">
               <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-sky-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/scan:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-2xl scale-90 group-hover:scale-100">
                 Interrogación Global del Bus
              </div>
              <button 
                onClick={startScan}
                disabled={isScanning}
                className="flex items-center gap-4 px-10 py-5 bg-sky-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-sky-100 hover:bg-sky-700 transition-all active:scale-95"
              >
                <span className={`material-symbols-outlined text-2xl ${isScanning ? 'animate-spin' : ''}`}>sync</span>
                {isScanning ? 'Analizando...' : 'Escanear Red'}
              </button>
            </div>
          </div>
        </div>

        {/* Viewport del Mapa con Zoom y Pan */}
        <div 
          ref={viewportRef}
          className={`flex-1 relative overflow-hidden flex items-center justify-center p-20 cursor-grab active:cursor-grabbing select-none`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparentpng.com/download/car/8W5s29-white-car-top-view-images-free-car-transparent.png')] bg-center bg-no-repeat opacity-5 invert grayscale brightness-150 scale-[1.6] pointer-events-none"></div>
          
          <div 
            className="relative transition-transform duration-200 ease-out preserve-3d"
            style={{ 
              transform: `perspective(1200px) translate(${position.x}px, ${position.y}px) scale(${scale}) rotateX(45deg) rotateZ(${rotation}deg)`,
              width: '700px',
              height: '900px'
            }}
          >
            {nodes.map(node => {
              const isMatch = searchTerm !== '' && (node.name.toLowerCase().includes(searchTerm.toLowerCase()) || node.id.toLowerCase().includes(searchTerm.toLowerCase()));
              return (
                <div
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNode(node);
                  }}
                  style={{ 
                    top: node.pos.top, 
                    left: node.pos.left,
                    transform: `rotateZ(${-rotation}deg) rotateX(-45deg)`
                  }}
                  className={`absolute cursor-pointer transition-all duration-500 z-10 ${isMatch ? 'scale-[1.6] z-50' : 'hover:scale-110'}`}
                >
                  <div className={`w-40 h-24 rounded-[1.8rem] border-4 flex flex-col items-center justify-center transition-all shadow-2xl ${
                    isMatch ? 'ring-[12px] ring-sky-500/30 border-white shadow-sky-400/50' : ''
                  } ${
                    selectedNode?.id === node.id 
                      ? 'bg-sky-600 border-white text-white scale-110' 
                      : node.status === 'healthy' ? 'bg-emerald-500 border-emerald-400 text-white' 
                      : node.status === 'error' ? 'bg-red-500 border-red-400 text-white' 
                      : 'bg-slate-400 border-slate-300 text-white opacity-60'
                  }`}>
                    <span className="text-[13px] font-black uppercase tracking-tighter leading-none mb-1">{node.id}</span>
                    <span className="text-[9px] font-black uppercase opacity-60 tracking-widest italic">[{getStatusLabel(node.status)}]</span>
                    
                    {isScanning && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-[1.8rem]"></div>
                    )}
                  </div>
                </div>
              );
            })}

            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 700 900">
               <path d="M350,150 L350,650 M200,220 L350,220 M350,450 L500,450" stroke="#0ea5e9" strokeWidth="6" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Controles Flotantes del Mapa */}
          <div className="absolute bottom-12 flex flex-col items-center gap-6 z-30">
            <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 px-10 py-5 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] flex items-center gap-6 group/rot">
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/rot:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl">
                  Giro del Espacio 3D
               </div>
               <span className="material-symbols-outlined text-slate-400 text-2xl">3d_rotation</span>
               <input 
                type="range" min="0" max="360" value={rotation} 
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-56 accent-sky-600 h-2 bg-slate-100 rounded-full appearance-none cursor-pointer border border-slate-200"
               />
               <span className="text-[11px] font-black text-sky-600 uppercase tracking-widest font-mono">{rotation.toString().padStart(3, '0')}°</span>
            </div>

            <div className="flex gap-4 items-center bg-white/90 backdrop-blur-2xl px-6 py-4 rounded-[2rem] border border-slate-200 shadow-2xl">
               <button onClick={() => setScale(Math.min(scale + 0.2, 3))} className="size-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-sky-600 hover:text-white transition-all shadow-sm">
                 <span className="material-symbols-outlined font-bold">zoom_in</span>
               </button>
               <div className="h-6 w-px bg-slate-200"></div>
               <button onClick={resetView} className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">
                 Resetear Vista
               </button>
               <div className="h-6 w-px bg-slate-200"></div>
               <button onClick={() => setScale(Math.max(scale - 0.2, 0.5))} className="size-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-sky-600 hover:text-white transition-all shadow-sm">
                 <span className="material-symbols-outlined font-bold">zoom_out</span>
               </button>
            </div>
          </div>

          <div className="absolute top-10 right-10 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/50 shadow-xl pointer-events-none">
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-sky-600 text-xl">mouse</span>
                   <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Navegación</p>
                </div>
                <ul className="text-[9px] text-slate-500 font-bold uppercase tracking-widest space-y-1">
                   <li>• Scroll: Zoom +/-</li>
                   <li>• Drag: Mover mapa</li>
                   <li>• Slider: Rotar 3D</li>
                </ul>
             </div>
          </div>
        </div>
      </div>

      <aside className="w-[520px] bg-white border-l border-slate-200 shadow-2xl z-30 flex flex-col">
        {selectedNode ? (
          <div className="animate-in slide-in-from-right-12 duration-500 h-full flex flex-col">
            <div className="p-12 border-b border-slate-100 bg-slate-50/50">
               <div className={`px-6 py-2.5 rounded-2xl font-black text-3xl italic inline-block mb-8 shadow-2xl text-white ${
                 selectedNode.status === 'healthy' ? 'bg-emerald-500 shadow-emerald-200' : selectedNode.status === 'error' ? 'bg-red-500 shadow-red-200' : 'bg-slate-500 shadow-slate-200'
               }`}>
                 {selectedNode.id}
               </div>
               <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase mb-3">{selectedNode.name}</h3>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-8">{selectedNode.description}</p>
               
               <div className="flex gap-5">
                  <div className="flex-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Protocolo Bus</p>
                     <p className="text-base font-black text-sky-600 italic uppercase">{selectedNode.bus} // 500 KBPS</p>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Estado Salud</p>
                     <p className={`text-base font-black italic uppercase ${selectedNode.status === 'healthy' ? 'text-emerald-500' : 'text-red-500'}`}>
                       {getStatusLabel(selectedNode.status)}
                     </p>
                  </div>
               </div>
            </div>

            <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                 <span className="material-symbols-outlined text-sky-600">hub</span>
                 Diagnóstico de Enlace Físico
               </h4>
               <div className="space-y-6">
                  {selectedNode.status === 'offline' ? (
                    <div className="p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] text-center space-y-6">
                       <span className="material-symbols-outlined text-6xl text-slate-200">link_off</span>
                       <p className="text-sm font-bold text-slate-500 italic uppercase leading-relaxed px-4">
                         Interface <span className="text-slate-900">SmartLink</span> reporta pérdida de respuesta. Verifique resistencia de terminación (60 Ohms) en el bus CAN-I.
                       </p>
                    </div>
                  ) : selectedNode.dtcs && selectedNode.dtcs.length > 0 ? (
                    selectedNode.dtcs.map(dtc => (
                      <div key={dtc} className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] flex items-center gap-6 shadow-xl shadow-red-900/5 group relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-8xl text-red-600">warning</span>
                        </div>
                        <div className="bg-white px-5 py-2 rounded-xl text-red-600 font-mono font-black text-2xl shadow-xl border border-red-100 z-10 italic">
                          {dtc}
                        </div>
                        <p className="text-sm font-black text-red-800 uppercase tracking-tight leading-tight z-10">Falla de comunicación crítica detectada.</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center p-14 text-slate-300 border-4 border-dashed border-slate-100 rounded-[3rem] group">
                       <span className="material-symbols-outlined text-6xl mb-6 group-hover:text-emerald-500 transition-colors duration-500">verified_user</span>
                       <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Canal Sincronizado OK</p>
                    </div>
                  )}
               </div>
            </div>
            
            <div className="p-12 border-t border-slate-100 bg-slate-50/50">
               <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 active:scale-95 group">
                 <span className="material-symbols-outlined text-sky-400 group-hover:rotate-12 transition-transform">terminal</span> 
                 Analizar Trazas del Kernel
               </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-16 text-center text-slate-300">
             <div className="relative mb-10 group">
                <div className="absolute inset-0 bg-sky-100 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <span className="material-symbols-outlined text-[120px] opacity-10 relative">biotech</span>
             </div>
             <p className="text-xs font-black uppercase tracking-[0.4em] leading-relaxed max-w-[300px]">
               Seleccione un módulo para inspección profunda del <span className="text-sky-600">Kernel TitanScan</span>
             </p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default TopologyView;
