import { app, BrowserWindow, screen, shell } from 'electron';
import * as path from 'path';
import * as process from 'process';

// Add declaration for __dirname to satisfy TypeScript when Node types are missing globally
declare const __dirname: string;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: Math.min(1600, width),
    height: Math.min(1000, height),
    minWidth: 1024,
    minHeight: 768,
    title: "TitanScan OS - Engineering Suite",
    backgroundColor: '#ffffff',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Permitir la carga de módulos ES6 locales si es necesario
    },
    titleBarStyle: 'hiddenInset', // Estilo moderno para macOS
    show: false
  });

  // Cargar el archivo principal de la aplicación
  // El path es relativo a la carpeta dist/ donde se compila este main.ts
  // Fixed: __dirname is now declared to satisfy the TypeScript compiler
  mainWindow.loadFile(path.join(__dirname, '../index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools();
    }
  });

  // Gestionar enlaces externos
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      // Fixed: Replaced require('electron').shell with imported shell module
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // Fixed: Imported process module to ensure the platform property is correctly typed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});