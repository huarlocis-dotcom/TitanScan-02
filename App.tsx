
import React, { useState, useEffect } from 'react';
import { View, VehicleProfile } from './types';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import ProgrammingView from './views/ProgrammingView';
import LiveDataView from './views/LiveDataView';
import DiagnosticsView from './views/DiagnosticsView';
import ServiceView from './views/ServiceView';
import ReportView from './views/ReportView';
import DashboardView from './views/DashboardView';
import OBDFunctionsView from './views/OBDFunctionsView';
import VehicleProfilesView from './views/VehicleProfilesView';
import TopologyView from './views/TopologyView';
import OscilloscopeView from './views/OscilloscopeView';
import ADASView from './views/ADASView';
import ImmobilizerView from './views/ImmobilizerView';
import SettingsView from './views/SettingsView';
import ActiveTestView from './views/ActiveTestView';
import VCIConfigView from './views/VCIConfigView';
import PresentationView from './views/PresentationView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [activeVehicle, setActiveVehicle] = useState<VehicleProfile | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSelectVehicle = (vehicle: VehicleProfile) => {
    setIsConnecting(true);
    setTimeout(() => {
      setActiveVehicle(vehicle);
      setIsConnecting(false);
      setCurrentView(View.DIAGNOSTICS);
    }, 2000);
  };

  const renderView = () => {
    if (isConnecting) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center bg-white text-slate-900">
          <div className="relative size-32 mb-8">
            <div className="absolute inset-0 border-4 border-sky-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-sky-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-sky-600 animate-pulse">hub</span>
            </div>
          </div>
          <h2 className="text-2xl font-black italic tracking-widest uppercase text-slate-900">Estableciendo Protocolo</h2>
          <p className="text-sky-600 font-mono text-xs mt-2 tracking-[0.3em] font-black uppercase">J2534 PASS-THRU ACTIVE...</p>
        </div>
      );
    }

    switch (currentView) {
      case View.DASHBOARD:
        return <DashboardView onBrandSelect={(brand) => setCurrentView(View.OBD_FUNCTIONS)} />;
      case View.VEHICLE_PROFILES:
        return <VehicleProfilesView onSelectVehicle={handleSelectVehicle} />;
      case View.OBD_FUNCTIONS:
        return <OBDFunctionsView />;
      case View.PROGRAMMING:
        return <ProgrammingView />;
      case View.LIVE_DATA:
        return <LiveDataView />;
      case View.DIAGNOSTICS:
        return <DiagnosticsView />;
      case View.SERVICES:
        return <ServiceView activeVehicle={activeVehicle} />;
      case View.REPORTS:
        return <ReportView />;
      case View.TOPOLOGY:
        return <TopologyView />;
      case View.OSCILLOSCOPE:
        return <OscilloscopeView />;
      case View.ADAS:
        return <ADASView />;
      case View.IMMOBILIZER:
        return <ImmobilizerView />;
      case View.SETTINGS:
        return <SettingsView />;
      case View.ACTIVE_TEST:
        return <ActiveTestView />;
      case View.VCI_CONFIG:
        return <VCIConfigView />;
      case View.PRESENTATION:
        return <PresentationView />;
      default:
        return <DashboardView onBrandSelect={() => setCurrentView(View.OBD_FUNCTIONS)} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white text-slate-900 overflow-hidden">
      <TopNav currentView={currentView} activeVehicle={activeVehicle} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          isOpen={false}
          toggleSidebar={() => {}}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50/50">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
