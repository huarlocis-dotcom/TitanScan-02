
import React from 'react';

const PresentationView: React.FC = () => {
  const slides = [
    {
      title: "Mesa de Control",
      subtitle: "Dashboard Inteligente v2.5",
      desc: "Gestión unificada de flota, estado de hardware SmartLink y acceso directo a protocolos OEM.",
      color: "from-sky-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop",
      features: ["Selector Multimarca", "Status de VCI Online", "Historial de Sesiones"]
    },
    {
      title: "Topología 3D",
      subtitle: "Arquitectura CAN-BUS Reactiva",
      desc: "Mapa espacial de nodos que permite identificar fallas físicas y errores de comunicación en tiempo real.",
      color: "from-emerald-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      features: ["Zoom & Pan Táctil", "Estado de Salud por Nodo", "Trazas de Kernel"]
    },
    {
      title: "Telemetría a 20Hz",
      subtitle: "Flujo de Datos Live-Stream",
      desc: "Procesamiento asíncrono de PIDs con visualización gráfica de alta frecuencia para diagnósticos precisos.",
      color: "from-indigo-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop",
      features: ["AsyncIO Engine", "Gráficos Multipista", "Snapshots de Datos"]
    },
    {
      title: "Diagnóstico Clínico",
      subtitle: "Análisis Profundo de DTC",
      desc: "Lectura y borrado de códigos de falla con base de datos de reparaciones guiadas integrada.",
      color: "from-red-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
      features: ["Interpretación de Cuadro Congelado", "Priority Scan", "Clear History"]
    },
    {
      title: "J2534 Pass-Thru",
      subtitle: "Programación Online de ECUs",
      desc: "Interfaz profesional para flasheo, codificación SCN y actualizaciones de software de módulos.",
      color: "from-blue-600 to-indigo-700",
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200&auto=format&fit=crop",
      features: ["Flash Online OEM", "Backup de EEPROM", "Logs J2534 Raw"]
    },
    {
      title: "Osciloscopio Digital",
      subtitle: "Análisis de Señal via Scipy",
      desc: "Captura de señales de sensores CKP/CMP con transformación de Fourier para detectar ruido en el bus.",
      color: "from-slate-700 to-slate-900",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop",
      features: ["Espectro FFT", "Trigger Automático", "Modo Dual Time/Freq"]
    },
    {
      title: "Sistemas ADAS",
      subtitle: "Calibración de Seguridad Activa",
      desc: "Suite completa para la calibración estática y dinámica de radares y cámaras frontales.",
      color: "from-cyan-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1621259182978-f09e5e2ca09a?q=80&w=1200&auto=format&fit=crop",
      features: ["Target Positioning HUD", "Dynamic Sync", "ADAS Certification"]
    },
    {
      title: "Inmovilizador & Keys",
      subtitle: "Programación de Transpondedores",
      desc: "Gestión de llaves, lectura de PIN CODE y emparejamiento de módulos de seguridad.",
      color: "from-amber-500 to-yellow-600",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop",
      features: ["Key Learning", "EEPROM Reset", "Anti-Theft Status"]
    },
    {
      title: "Hardware VCI",
      subtitle: "Ecosistema de Conectividad",
      desc: "Compatibilidad total con SmartLink C, Scanmatik 2 Pro, OpenPort y protocolos DoIP/ENET.",
      color: "from-slate-800 to-black",
      image: "https://images.unsplash.com/photo-1518465545811-23d906806e57?q=80&w=1200&auto=format&fit=crop",
      features: ["SmartLink Support", "J2534 Compliant", "Ethernet DoIP Ready"]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-12 lg:p-24 custom-scrollbar scroll-smooth">
      <div className="max-w-7xl mx-auto space-y-48">
        {/* Hero Slide */}
        <header className="text-center space-y-10 animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-xl">
            <span className="material-symbols-outlined text-amber-500 font-bold animate-pulse">stars</span>
            <span className="text-[12px] font-black text-white uppercase tracking-[0.6em]">Premium Presentation Kit</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.85] flex flex-col items-center">
              <span>TitanScan OS</span>
              <span className="text-sky-500 text-6xl mt-4">Automotive Excellence</span>
            </h1>
            <p className="text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              La plataforma definitiva de diagnóstico e ingeniería automotriz para talleres de alto rendimiento.
            </p>
          </div>
          <div className="flex justify-center gap-6 pt-10">
            <div className="flex flex-col items-center gap-2">
               <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-4xl">devices</span>
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Multi-Device</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-4xl">speed</span>
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-Time</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-4xl">security</span>
               </div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Cloud</span>
            </div>
          </div>
        </header>

        {/* Feature Slides */}
        <div className="grid grid-cols-1 gap-64">
          {slides.map((slide, i) => (
            <div key={i} className="group relative">
               <div className={`flex flex-col lg:flex-row items-center gap-24 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`flex-1 space-y-8 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="space-y-4">
                       <p className="text-sky-400 text-sm font-black uppercase tracking-[0.4em]">{slide.subtitle}</p>
                       <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">{slide.title}</h2>
                    </div>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                      {slide.desc}
                    </p>
                    
                    <ul className="space-y-4 pt-6">
                      {slide.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-white/80 font-bold text-lg">
                           <span className={`material-symbols-outlined text-sky-500`}>check_circle</span>
                           {feat}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-4 pt-8">
                       <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest">
                         Screen ID: {slide.title.replace(/\s+/g, '_').toUpperCase()}_PPT
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full scale-110">
                    {/* Professional Screen Mockup */}
                    <div className="relative group/frame transition-all duration-1000 group-hover:rotate-1">
                       <div className={`absolute -inset-10 bg-gradient-to-tr ${slide.color} rounded-[4rem] blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity`}></div>
                       <div className="relative bg-slate-900 rounded-[3rem] border-[12px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden aspect-video">
                          <div className="absolute top-0 inset-x-0 h-8 bg-slate-800 flex items-center px-6 gap-2 z-20">
                             <div className="size-2.5 rounded-full bg-red-500/40"></div>
                             <div className="size-2.5 rounded-full bg-amber-500/40"></div>
                             <div className="size-2.5 rounded-full bg-emerald-500/40"></div>
                             <div className="ml-6 h-3.5 w-48 bg-slate-700/50 rounded-full"></div>
                             <div className="ml-auto flex items-center gap-3">
                                <div className="size-1.5 rounded-full bg-sky-500 animate-pulse"></div>
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">System Online</span>
                             </div>
                          </div>
                          <div className="absolute inset-0 bg-slate-900 animate-pulse-slow"></div>
                          <img 
                            src={slide.image} 
                            alt={slide.title}
                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 scale-[1.05] group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-10 left-10 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                             <div className="bg-sky-600 px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl">
                                <span className="material-symbols-outlined font-bold">photo_camera</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Capture Preview</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Ending Slide */}
        <footer className="py-40 text-center border-t border-white/5 space-y-12">
           <div className="flex flex-col items-center gap-6">
              <div className="size-24 rounded-[2rem] bg-sky-600 flex items-center justify-center text-white shadow-2xl shadow-sky-900/40 mb-4">
                 <span className="material-symbols-outlined text-6xl font-bold">terminal</span>
              </div>
              <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white">TitanScan OS Engine</h3>
              <p className="text-slate-500 text-sm font-black uppercase tracking-[0.5em]">The Masterpiece of Automotive Diagnosis</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
              {[
                { label: "Stability", val: "99.9%" },
                { label: "Latency", val: "12ms" },
                { label: "OEM Brands", val: "80+" },
                { label: "Cloud Node", val: "Global" }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5">
                   <p className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-2">{stat.label}</p>
                   <p className="text-2xl font-black text-white italic">{stat.val}</p>
                </div>
              ))}
           </div>

           <div className="pt-20">
              <p className="text-slate-600 text-xs font-black uppercase tracking-[0.4em]">HUGO LOPEZ CISNERO // MASTER DESIGN 2024</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default PresentationView;
