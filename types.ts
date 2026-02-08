
export enum View {
  DASHBOARD = 'DASHBOARD',
  OBD_FUNCTIONS = 'OBD_FUNCTIONS',
  DIAGNOSTICS = 'DIAGNOSTICS',
  LIVE_DATA = 'LIVE_DATA',
  PROGRAMMING = 'PROGRAMMING',
  SERVICES = 'SERVICES',
  REPORTS = 'REPORTS',
  VEHICLE_PROFILES = 'VEHICLE_PROFILES',
  TOPOLOGY = 'TOPOLOGY',
  OSCILLOSCOPE = 'OSCILLOSCOPE',
  IMMOBILIZER = 'IMMOBILIZER',
  ADAS = 'ADAS',
  SETTINGS = 'SETTINGS',
  ACTIVE_TEST = 'ACTIVE_TEST',
  VCI_CONFIG = 'VCI_CONFIG',
  PRESENTATION = 'PRESENTATION'
}

export interface VehicleProfile {
  id: string;
  vin: string;
  brand: string;
  model: string;
  year: number;
  lastScan: string;
  mileage: string;
  activeDTCs: number;
  image: string;
}

export interface DTC {
  code: string;
  status: 'Activo' | 'Pendiente' | 'Histórico';
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  description: string;
}

export interface Module {
  id: string;
  name: string;
  version: string;
  action?: string;
  status: 'Actualización Lista' | 'Seleccionado' | 'Sincronizado';
  selected?: boolean;
}

export interface PID {
  name: string;
  value: string;
  unit: string;
  percentage?: number;
  status?: string;
}

export interface SavedReport {
  id: string;
  date: string;
  vehicle: string;
  vin: string;
  type: string;
  summary: string;
}
