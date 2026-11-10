import React, { useState, useEffect, useMemo } from 'react';
import { 
  SectorType, 
  FactVentaRow, 
  InventoryItem, 
  CompraItem, 
  GastoCostoItem, 
  DimRegionItem, 
  DimClienteItem 
} from './types';
import { 
  INITIAL_FACT_VENTAS, 
  INITIAL_INVENTORY, 
  INITIAL_COMPRAS, 
  INITIAL_GASTOS_COSTOS, 
  INITIAL_DIM_REGIONES, 
  INITIAL_DIM_CLIENTES,
  SECTOR_PRESETS 
} from './data/defaultDataset';
import { 
  computeFinancialKPIs, 
  computeRegionSummaries, 
  computeMonthlySummaries, 
  computeClientRankings 
} from './utils/calculations';
import { FullAppDataset } from './utils/ticExportImport';

// Components
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { InventoryManagement } from './components/InventoryManagement';
import { FinancialManagement } from './components/FinancialManagement';
import { DatabaseTables } from './components/DatabaseTables';
import { DaxFormulasViewer } from './components/DaxFormulasViewer';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { TicCenterModal } from './components/TicCenterModal';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { RowEditorModal } from './components/RowEditorModal';

const STORAGE_KEY = 'SIG_FININV_DATASET_V1';

export default function App() {
  // Sector & Navigation state
  const [currentSector, setCurrentSector] = useState<SectorType>('logistica');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventarios' | 'finanzas' | 'tablas' | 'dax' | 'simulador'>('dashboard');

  // Core Data Tables State (with LocalStorage cache fallback)
  const [factVentas, setFactVentas] = useState<FactVentaRow[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_VENTAS`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_FACT_VENTAS;
  });

  const [inventario, setInventario] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_INV`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_INVENTORY;
  });

  const [compras, setCompras] = useState<CompraItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_COMPRAS`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_COMPRAS;
  });

  const [gastosCostos, setGastosCostos] = useState<GastoCostoItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_GASTOS`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_GASTOS_COSTOS;
  });

  const [dimRegion, setDimRegion] = useState<DimRegionItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_REGIONES`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DIM_REGIONES;
  });

  const [dimCliente, setDimCliente] = useState<DimClienteItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_CLIENTES`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DIM_CLIENTES;
  });

  // Filter States
  const [selectedRegion, setSelectedRegion] = useState<string>('todas');
  const [selectedServicio, setSelectedServicio] = useState<string>('todos');
  const [selectedMonth, setSelectedMonth] = useState<number | 'todos'>('todos');

  // Modals state
  const [isTicModalOpen, setIsTicModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [rowEditorState, setRowEditorState] = useState<{
    isOpen: boolean;
    table: string;
    rowData?: any;
  }>({ isOpen: false, table: 'ventas' });

  // Notification / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Save to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_VENTAS`, JSON.stringify(factVentas));
      localStorage.setItem(`${STORAGE_KEY}_INV`, JSON.stringify(inventario));
      localStorage.setItem(`${STORAGE_KEY}_COMPRAS`, JSON.stringify(compras));
      localStorage.setItem(`${STORAGE_KEY}_GASTOS`, JSON.stringify(gastosCostos));
      localStorage.setItem(`${STORAGE_KEY}_REGIONES`, JSON.stringify(dimRegion));
      localStorage.setItem(`${STORAGE_KEY}_CLIENTES`, JSON.stringify(dimCliente));
    } catch {}
  }, [factVentas, inventario, compras, gastosCostos, dimRegion, dimCliente]);

  // Sector Preset Change Handler
  const handleSectorChange = (sector: SectorType) => {
    setCurrentSector(sector);
    const preset = SECTOR_PRESETS[sector];
    showToast(`Orientación sectorial cambiada a: ${preset.name}`);
  };

  // Reset to default SENA Dataset
  const handleResetData = () => {
    if (confirm('¿Desea restablecer todas las tablas a la versión original del dataset SENA CPL-3410829?')) {
      setFactVentas(INITIAL_FACT_VENTAS);
      setInventario(INITIAL_INVENTORY);
      setCompras(INITIAL_COMPRAS);
      setGastosCostos(INITIAL_GASTOS_COSTOS);
      setDimRegion(INITIAL_DIM_REGIONES);
      setDimCliente(INITIAL_DIM_CLIENTES);
      setSelectedRegion('todas');
      setSelectedServicio('todos');
      setSelectedMonth('todos');
      try {
        localStorage.clear();
      } catch {}
      showToast('Base de datos restablecida exitosamente al estado oficial SENA.');
    }
  };

  // TIC Dataset Import Handler
  const handleImportDataset = (imported: Partial<FullAppDataset>) => {
    if (imported.FactVentas && imported.FactVentas.length > 0) {
      setFactVentas(imported.FactVentas);
    }
    if (imported.Inventario && imported.Inventario.length > 0) {
      setInventario(imported.Inventario as InventoryItem[]);
    }
    if (imported.Compras && imported.Compras.length > 0) {
      setCompras(imported.Compras as CompraItem[]);
    }
    if (imported.GastosCostos && imported.GastosCostos.length > 0) {
      setGastosCostos(imported.GastosCostos as GastoCostoItem[]);
    }
    if (imported.DimRegion && imported.DimRegion.length > 0) {
      setDimRegion(imported.DimRegion as DimRegionItem[]);
    }
    if (imported.DimCliente && imported.DimCliente.length > 0) {
      setDimCliente(imported.DimCliente as DimClienteItem[]);
    }
    showToast('Datos importados y vinculados al modelo de cálculo exitosamente.');
  };

  // Filtered Ventas according to toolbar
  const filteredVentas = useMemo(() => {
    return factVentas.filter((v) => {
      const matchRegion = selectedRegion === 'todas' || v.Región.toLowerCase().trim() === selectedRegion.toLowerCase().trim();
      const matchServicio = selectedServicio === 'todos' || v.Servicio.toLowerCase().trim() === selectedServicio.toLowerCase().trim();
      const matchMonth = selectedMonth === 'todos' || v.Mes === selectedMonth;
      return matchRegion && matchServicio && matchMonth;
    });
  }, [factVentas, selectedRegion, selectedServicio, selectedMonth]);

  // Dynamic KPI Engine Calculations
  const kpis = useMemo(() => {
    return computeFinancialKPIs(filteredVentas, inventario, gastosCostos, dimRegion);
  }, [filteredVentas, inventario, gastosCostos, dimRegion]);

  const baseKpis = useMemo(() => {
    return computeFinancialKPIs(factVentas, inventario, gastosCostos, dimRegion);
  }, [factVentas, inventario, gastosCostos, dimRegion]);

  const regionSummaries = useMemo(() => {
    return computeRegionSummaries(filteredVentas, dimRegion);
  }, [filteredVentas, dimRegion]);

  const monthlySummaries = useMemo(() => {
    return computeMonthlySummaries(filteredVentas);
  }, [filteredVentas]);

  const clientRankings = useMemo(() => {
    return computeClientRankings(filteredVentas, dimCliente);
  }, [filteredVentas, dimCliente]);

  // Full dataset object for exports
  const fullDataset: FullAppDataset = useMemo(() => ({
    FactVentas: factVentas,
    Inventario: inventario,
    Compras: compras,
    GastosCostos: gastosCostos,
    DimRegion: dimRegion,
    DimCliente: dimCliente,
  }), [factVentas, inventario, compras, gastosCostos, dimRegion, dimCliente]);

  // Row Add / Edit Handler
  const handleSaveRow = (table: string, data: any) => {
    if (table === 'ventas') {
      const existsIndex = factVentas.findIndex((v) => v.id === data.id);
      if (existsIndex >= 0) {
        const next = [...factVentas];
        next[existsIndex] = data;
        setFactVentas(next);
      } else {
        setFactVentas([data, ...factVentas]);
      }
      showToast('Registro de ventas guardado correctamente.');
    } else if (table === 'inventarios') {
      const existsIndex = inventario.findIndex((i) => i.sku === data.sku);
      if (existsIndex >= 0) {
        const next = [...inventario];
        next[existsIndex] = data;
        setInventario(next);
      } else {
        setInventario([data, ...inventario]);
      }
      showToast('Item de inventario guardado correctamente.');
    } else if (table === 'compras') {
      setCompras([data, ...compras]);
      showToast('Orden de compra registrada.');
    } else if (table === 'gastos') {
      const existsIndex = gastosCostos.findIndex((g) => g.id === data.id);
      if (existsIndex >= 0) {
        const next = [...gastosCostos];
        next[existsIndex] = data;
        setGastosCostos(next);
      } else {
        setGastosCostos([data, ...gastosCostos]);
      }
      showToast('Concepto de costo/gasto actualizado.');
    } else if (table === 'regiones') {
      const existsIndex = dimRegion.findIndex((r) => r.Región === data.Región);
      if (existsIndex >= 0) {
        const next = [...dimRegion];
        next[existsIndex] = data;
        setDimRegion(next);
      } else {
        setDimRegion([...dimRegion, data]);
      }
      showToast('Dimensión Región actualizada.');
    } else if (table === 'clientes') {
      const existsIndex = dimCliente.findIndex((c) => c.ClienteID === data.ClienteID);
      if (existsIndex >= 0) {
        const next = [...dimCliente];
        next[existsIndex] = data;
        setDimCliente(next);
      } else {
        setDimCliente([...dimCliente, data]);
      }
      showToast('Dimensión Cliente actualizada.');
    }
  };

  // Row Delete Handler
  const handleDeleteRow = (table: string, id: string) => {
    if (!confirm('¿Confirma eliminar este registro? La acción afectará en vivo los cálculos de KPIs y punto de equilibrio.')) {
      return;
    }
    if (table === 'ventas') {
      setFactVentas(factVentas.filter((v) => v.id !== id));
    } else if (table === 'inventarios') {
      setInventario(inventario.filter((i) => i.sku !== id));
    } else if (table === 'compras') {
      setCompras(compras.filter((c) => c.id !== id));
    } else if (table === 'gastos') {
      setGastosCostos(gastosCostos.filter((g) => g.id !== id));
    }
    showToast('Registro eliminado exitosamente.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-emerald-400/40 animate-fade-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentSector={currentSector}
        onSectorChange={handleSectorChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTicModal={() => setIsTicModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onResetData={handleResetData}
        factVentasCount={factVentas.length}
      />

      {/* Sector Orientation Banner */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">Orientación Sectorial Activa:</span>
            <strong className="text-white">{SECTOR_PRESETS[currentSector].name}</strong>
            <span className="text-[11px] px-2 py-0.2 rounded bg-slate-800 text-emerald-400 border border-slate-700">
              {SECTOR_PRESETS[currentSector].badge}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Líneas: <strong className="text-white">{factVentas.length}</strong></span>
            <span>Clientes: <strong className="text-white">{dimCliente.length}</strong></span>
            <span>Regiones: <strong className="text-white">{dimRegion.length}</strong></span>
            <span>Items Stock: <strong className="text-white">{inventario.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            kpis={kpis}
            regionSummaries={regionSummaries}
            monthlySummaries={monthlySummaries}
            clientRankings={clientRankings}
            filteredVentas={filteredVentas}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            selectedServicio={selectedServicio}
            onSelectServicio={setSelectedServicio}
            selectedMonth={selectedMonth}
            onSelectMonth={setSelectedMonth}
          />
        )}

        {activeTab === 'inventarios' && (
          <InventoryManagement
            inventario={inventario}
            compras={compras}
            kpis={kpis}
            onUpdateInventoryItem={(item) => {
              const idx = inventario.findIndex((i) => i.sku === item.sku);
              if (idx >= 0) {
                const next = [...inventario];
                next[idx] = item;
                setInventario(next);
                showToast(`Stock actualizado para ${item.nombre}`);
              }
            }}
            onAddPurchase={(compra) => {
              setCompras([compra, ...compras]);
              showToast(`Orden ${compra.compraID} generada exitosamente.`);
            }}
          />
        )}

        {activeTab === 'finanzas' && (
          <FinancialManagement
            kpis={kpis}
            gastosCostos={gastosCostos}
            onAddGasto={(gasto) => {
              setGastosCostos([...gastosCostos, gasto]);
              showToast(`Concepto "${gasto.concepto}" incorporado al P&L.`);
            }}
            onDeleteGasto={(id) => {
              setGastosCostos(gastosCostos.filter((g) => g.id !== id));
              showToast('Concepto de gasto eliminado.');
            }}
          />
        )}

        {activeTab === 'simulador' && (
          <WhatIfSimulator baseKpis={baseKpis} />
        )}

        {activeTab === 'tablas' && (
          <DatabaseTables
            factVentas={factVentas}
            inventario={inventario}
            compras={compras}
            gastosCostos={gastosCostos}
            dimRegion={dimRegion}
            dimCliente={dimCliente}
            onOpenRowEditor={(table, rowData) => {
              setRowEditorState({
                isOpen: true,
                table,
                rowData,
              });
            }}
            onDeleteRow={handleDeleteRow}
          />
        )}

        {activeTab === 'dax' && (
          <DaxFormulasViewer />
        )}
      </main>

      {/* TIC Center Modal */}
      <TicCenterModal
        isOpen={isTicModalOpen}
        onClose={() => setIsTicModalOpen(false)}
        dataset={fullDataset}
        kpis={kpis}
        onImportDataset={handleImportDataset}
      />

      {/* Executive Report Modal */}
      <ExecutiveReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        kpis={kpis}
        regionSummaries={regionSummaries}
        clientRankings={clientRankings}
      />

      {/* Row Editor Modal */}
      <RowEditorModal
        isOpen={rowEditorState.isOpen}
        onClose={() => setRowEditorState({ ...rowEditorState, isOpen: false })}
        table={rowEditorState.table}
        initialData={rowEditorState.rowData}
        onSaveRow={handleSaveRow}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <p className="font-semibold text-slate-400">
            SIG-FinInv · Sistema de Información y Gestión para Actividades, Inventarios y Finanzas Empresariales
          </p>
          <p>
            Desarrollado con base en el Dataset Oficial SENA CPL_3410829 · Instructor Alfredo de Jesús Pérez Méndez · 2026
          </p>
          <p className="text-[11px] text-slate-600">
            Compatibilidad TIC: Excel (.xlsx), CSV, JSON, Power BI DAX, Power Query M y SQL Relacional.
          </p>
        </div>
      </footer>
    </div>
  );
}
