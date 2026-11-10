import React from 'react';
import { 
  Building2, 
  Upload, 
  Download, 
  FileText, 
  RotateCcw, 
  Sliders, 
  Layers, 
  CheckCircle2,
  Database,
  BarChart3,
  Package,
  DollarSign,
  Code2
} from 'lucide-react';
import { SectorType } from '../types';
import { SECTOR_PRESETS } from '../data/defaultDataset';

interface HeaderProps {
  currentSector: SectorType;
  onSectorChange: (sector: SectorType) => void;
  activeTab: 'dashboard' | 'inventarios' | 'finanzas' | 'tablas' | 'dax' | 'simulador';
  onTabChange: (tab: 'dashboard' | 'inventarios' | 'finanzas' | 'tablas' | 'dax' | 'simulador') => void;
  onOpenTicModal: () => void;
  onOpenReportModal: () => void;
  onResetData: () => void;
  factVentasCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSector,
  onSectorChange,
  activeTab,
  onTabChange,
  onOpenTicModal,
  onOpenReportModal,
  onResetData,
  factVentasCount,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      {/* Top Banner with branding and TIC quick tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 ring-1 ring-white/20">
            <Layers className="h-6 w-6 text-slate-950 font-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                SIG-FinInv
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  v2.6 TICS
                </span>
              </span>
              <span className="text-xs text-slate-400 hidden lg:inline-block">|</span>
              <span className="text-xs text-slate-300 font-medium hidden lg:inline-block">
                SENA CPL-3410829 · Gestión Integral
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">
              Cálculo Multidimensional: Inventarios, Rotación, Compras, Costos, Gastos, Punto de Equilibrio y DAX
            </p>
          </div>
        </div>

        {/* Sector Selector & Global TIC Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Sector Switcher */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700/80">
            <Building2 className="h-4 w-4 text-emerald-400 ml-2 mr-1.5" />
            <select
              value={currentSector}
              onChange={(e) => onSectorChange(e.target.value as SectorType)}
              className="bg-transparent text-xs text-slate-200 font-medium py-1 pr-3 focus:outline-none cursor-pointer"
              title="Cambiar orientación sectorial del modelo"
            >
              <option value="logistica" className="bg-slate-900 text-white">Logística & Carga (SENA Oficial)</option>
              <option value="retail" className="bg-slate-900 text-white">Comercio Minorista / Retail</option>
              <option value="manufactura" className="bg-slate-900 text-white">Manufactura & Producción</option>
              <option value="alimentos" className="bg-slate-900 text-white">Agroindustria & Alimentos</option>
              <option value="salud" className="bg-slate-900 text-white">Salud & Farmacéutica</option>
            </select>
          </div>

          {/* TIC Import/Export Center Button */}
          <button
            onClick={onOpenTicModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
            title="Cargar y Descargar archivos TIC (Excel, CSV, JSON, DAX, SQL)"
          >
            <Download className="h-3.5 w-3.5" />
            <Upload className="h-3.5 w-3.5" />
            <span>Archivos TIC</span>
          </button>

          {/* Executive Report Modal Button */}
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
            title="Generar e Imprimir Informe de Gestión Gerencial"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Informe Gerencial</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onResetData}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700/80 transition-colors border border-slate-700 cursor-pointer"
            title="Restablecer base de datos al estado original SENA CPL-3410829"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-950/60 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Tablero 360° KPIs</span>
            </button>

            <button
              onClick={() => onTabChange('inventarios')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'inventarios'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Inventarios & Rotación</span>
            </button>

            <button
              onClick={() => onTabChange('finanzas')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'finanzas'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <DollarSign className="h-4 w-4" />
              <span>Finanzas & Punto de Equilibrio</span>
            </button>

            <button
              onClick={() => onTabChange('simulador')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'simulador'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>Simulador What-If</span>
            </button>

            <button
              onClick={() => onTabChange('tablas')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'tablas'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>Bases de Datos Editables ({factVentasCount})</span>
            </button>

            <button
              onClick={() => onTabChange('dax')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'dax'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>Medidas DAX & Excel SENA</span>
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              <span>Filtros y cálculos en vivo</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
