
import React, { useState, useEffect, useRef } from 'react';

type SignalType = 'CKP' | 'CMP' | 'INJECTOR' | 'CAN_BUS';

interface SignalPreset {
  id: SignalType;
  name: string;
  description: string;
  defaultTimebase: number;
  defaultVolts: number;
  connectionPin: string;
}

const PRESETS: Record<SignalType, SignalPreset> = {
  CKP: { id: 'CKP', name: 'Sensor Cigüeñal (VR)', description: 'Señal inductiva procesada via scipy.signal.find_peaks para detección de dientes.', defaultTimebase: 20, defaultVolts: 5, connectionPin: 'PIN 34 (Sensor +)' },
  CMP: { id: 'CMP', name: 'Sensor Árbol de Levas', description: 'Señal de efecto Hall. Procesamiento digital de flancos activos.', defaultTimebase: 50, defaultVolts: 2, connectionPin: 'PIN 12 (Phase Input)' },
  INJECTOR: { id: 'INJECTOR', name: 'Pulso de Inyección', description: 'Señal PWM con pico inductivo (>60V). Análisis de tiempo de apertura.', defaultTimebase: 10, defaultVolts: 10, connectionPin: 'PIN 15 (Control Iny. 1)' },
  CAN_BUS: { id: 'CAN_BUS', name: 'CAN High / Low', description: 'Comunicación diferencial de alta velocidad procesada con scipy.fft.', defaultTimebase: 5, defaultVolts: 1, connectionPin: 'PIN 6 / 14 OBD-II' }
};

const OscilloscopeView: React.FC = () => {
  const [activeSignal, setActiveSignal] = useState<SignalType>('CAN_BUS');
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState<'TIME' | 'FFT'>('TIME');
  const [timebase, setTimebase] = useState(PRESETS.CAN_BUS.defaultTimebase);
  const [voltsDiv, setVoltsDiv] = useState(PRESETS.CAN_BUS.defaultVolts);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const offsetRef = useRef(0);

  const drawWave = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);
    
    // Grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += width/10) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
    for (let y = 0; y <= height; y += height/8) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

    if (isRunning) offsetRef.current += 15;

    ctx.beginPath();
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(14,165,233,0.5)';

    if (mode === 'TIME') {
      const yBase = height / 2;
      for (let x = 0; x < width; x++) {
        const t = (x + offsetRef.current) * 0.1;
        let y = 0;
        if (activeSignal === 'CAN_BUS') y = Math.sin(t*2) + Math.sin(t*5) > 0.5 ? -40 : 40;
        else if (activeSignal === 'CKP') y = Math.sin(t*0.5) * 60;
        else y = Math.sin(t*0.2) > 0.8 ? 50 : -20;
        
        if (x === 0) ctx.moveTo(x, yBase + y);
        else ctx.lineTo(x, yBase + y);
      }
    } else {
      // FFT Simulation
      for (let x = 0; x < width; x += 10) {
        const h = Math.random() * height * 0.6;
        ctx.fillStyle = '#0ea5e9';
        ctx.fillRect(x, height - h, 6, h);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
    requestRef.current = requestAnimationFrame(() => drawWave(ctx, width, height));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) drawWave(ctx, canvas.width, canvas.height);
    }
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isRunning, mode, activeSignal]);

  return (
    <div className="flex h-full bg-slate-900 overflow-hidden text-white font-sans">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex-1 bg-black rounded-[3rem] border-[6px] border-slate-800 shadow-2xl relative overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute top-10 left-10 flex gap-4">
              <div className="bg-slate-900/90 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-2xl">
                <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest mb-1">Modo de Análisis</p>
                <p className="text-2xl font-black italic">{mode === 'TIME' ? 'DOMINIO TIEMPO' : 'DOMINIO FRECUENCIA (FFT)'}</p>
              </div>
            </div>
            <div className="absolute bottom-10 right-10 flex items-center gap-4 bg-black/50 px-6 py-3 rounded-xl border border-white/5 backdrop-blur-sm">
               <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <p className="text-[10px] font-black uppercase tracking-widest">SCIPY SIGNAL ENGINE: ON</p>
            </div>
          </div>
        </div>

        <div className="h-44 bg-slate-800/80 border-t border-slate-700 p-8 flex items-center justify-between gap-10">
          <div className="flex items-center gap-10">
            <button onClick={() => setIsRunning(!isRunning)} className={`size-20 rounded-3xl flex items-center justify-center shadow-2xl transition-all ${isRunning ? 'bg-red-500' : 'bg-emerald-500'}`}>
              <span className="material-symbols-outlined text-4xl">{isRunning ? 'pause' : 'play_arrow'}</span>
            </button>
            <div className="flex gap-4">
               <button onClick={() => setMode('TIME')} className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'TIME' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-500'}`}>Osciloscopio</button>
               <button onClick={() => setMode('FFT')} className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${mode === 'FFT' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-500'}`}>Espectro FFT</button>
            </div>
          </div>
          <div className="flex gap-3">
             {Object.values(PRESETS).map(p => (
               <button key={p.id} onClick={() => setActiveSignal(p.id)} className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${activeSignal === p.id ? 'bg-sky-600 border-sky-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                 {p.name}
               </button>
             ))}
          </div>
        </div>
      </div>

      <aside className="w-[450px] bg-slate-800 border-l border-slate-700 flex flex-col p-10 space-y-10 shadow-2xl">
         <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-sky-400 mb-6">Engine Logic (scipy)</h3>
            <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-700 text-[11px] font-mono leading-relaxed text-slate-400">
               <p className="text-sky-300">from scipy import fft</p>
               <p className="text-sky-300">import numpy as np</p>
               <p className="mt-4">def process_spectrum(data):</p>
               <p className="pl-4">freqs = fft.fftfreq(len(data))</p>
               <p className="pl-4">power = np.abs(fft.fft(data))</p>
               <p className="pl-4">return freqs, power</p>
            </div>
         </div>
         <div className="bg-sky-500/10 p-8 rounded-[2.5rem] border border-sky-500/20">
            <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-4">Detección de Ruido en Bus</h4>
            <p className="text-xs text-slate-300 leading-relaxed italic">El análisis FFT permite identificar interferencias electromagnéticas (EMI) en el bus CAN antes de que causen errores lógicos U0xxx.</p>
         </div>
      </aside>
    </div>
  );
};

export default OscilloscopeView;
