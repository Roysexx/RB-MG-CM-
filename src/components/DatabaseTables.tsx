import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Filter, 
  Table, 
  MapPin, 
  Users, 
  Boxes, 
  ShoppingCart, 
  DollarSign 
} from 'lucide-react';
import { 
  FactVentaRow, 
  InventoryItem, 
  CompraItem, 
  GastoCostoItem, 
  DimRegionItem, 
  DimClienteItem 
} from '../types';
import { formatCurrency, formatPercent, formatNumber } from '../utils/calculations';
import { exportToCSV } from '../utils/ticExportImport';

interface DatabaseTablesProps {
  factVentas: FactVentaRow[];
  inventario: InventoryItem[];
  compras: CompraItem[];
  gastosCostos: GastoCostoItem[];
  dimRegion: DimRegionItem[];
  dimCliente: DimClienteItem[];
  onOpenRowEditor: (table: string, rowData?: any) => void;
  onDeleteRow: (table: string, id: string) => void;
}

export const DatabaseTables: React.FC<DatabaseTablesProps> = ({
  factVentas,
  inventario,
  compras,
  gastosCostos,
  dimRegion,
  dimCliente,
  onOpenRowEditor,
  onDeleteRow,
}) => {
  const [activeTable, setActiveTable] = useState<'ventas' | 'inventarios' | 'compras' | 'gastos' | 'regiones' | 'clientes'>('ventas');
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('todas');

  // Search filter helpers
  const filteredVentas = factVentas.filter((v) => {
    const matchesSearch = 
      v.PedidoID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.Servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.ClienteID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.Región.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'todas' || v.Región === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const handleExportCurrent = () => {
    if (activeTable === 'ventas') exportToCSV(factVentas, 'FactVentas_SENA_CPL3410829.csv');
    if (activeTable === 'inventarios') exportToCSV(inventario, 'Inventarios_Stock_TIC.csv');
    if (activeTable === 'compras') exportToCSV(compras, 'Compras_Aprovisionamiento_TIC.csv');
    if (activeTable === 'gastos') exportToCSV(gastosCostos, 'Costos_Gastos_Operativos.csv');
    if (activeTable === 'regiones') exportToCSV(dimRegion, 'DimRegion_Metas.csv');
    if (activeTable === 'clientes') exportToCSV(dimCliente, 'DimCliente_Cartera.csv');
  };

  return (
    <div className="space-y-5">
      {/* Table Selector Pills */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTable('ventas')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTable === 'ventas'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Table className="h-3.5 w-3.5" />
            <span>FactVentas ({factVentas.length})</span>
          </button>

          <button
            onClick={() => setActiveTable('inventarios')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTable === 'inventarios'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Boxes className="h-3.5 w-3.5" />
            <span>Inventarios ({inventario.length})</span>
          </button>

          <button
            onClick={() => setActiveTable('compras')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTable === 'compras'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Compras ({compras.length})</span>
          </button>

          <button
            onClick={() => setActiveTable('gastos')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTable === 'gastos'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <DollarSign className="h-3.5 w-3.5" />
            <span>Costos y Gastos ({gastosCostos.length})</span>
          </button>

          <button
            onClick={() => setActiveTable('regiones')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTable === 'regiones'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>DimRegion ({dimRegion.length})</span>
          </button>

          <button
            onClick={() => setActiveTable('clientes')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTable === 'clientes'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>DimCliente ({dimCliente.length})</span>
          </button>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCurrent}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 cursor-pointer"
            title="Descargar tabla activa en formato CSV para Excel"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => onOpenRowEditor(activeTable)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Agregar Registro</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        {/* Search & Filter Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center bg-slate-800/90 rounded-lg px-3 py-1.5 border border-slate-700 w-full sm:w-80">
            <Search className="h-4 w-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar en la tabla activa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-slate-200 placeholder-slate-400 focus:outline-none w-full"
            />
          </div>

          {activeTable === 'ventas' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filtrar Región:</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="todas">Todas</option>
                <option value="Urabá">Urabá</option>
                <option value="Medellín">Medellín</option>
                <option value="Bogotá">Bogotá</option>
                <option value="Costa">Costa</option>
              </select>
            </div>
          )}
        </div>

        {/* 1. FACTVENTAS TABLE */}
        {activeTable === 'ventas' && (
          <div className="overflow-x-auto rounded-lg border border-slate-800 max-h-[550px] overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold sticky top-0 z-10 border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2.5">Pedido</th>
                  <th className="px-3 py-2.5">Fecha</th>
                  <th className="px-3 py-2.5">Región</th>
                  <th className="px-3 py-2.5">Servicio</th>
                  <th className="px-3 py-2.5">Cliente</th>
                  <th className="px-3 py-2.5 text-right">Cant.</th>
                  <th className="px-3 py-2.5 text-right">Precio Unit.</th>
                  <th className="px-3 py-2.5 text-right">Desc. %</th>
                  <th className="px-3 py-2.5 text-right font-bold text-white">Importe (Neto)</th>
                  <th className="px-3 py-2.5 text-right">Bruto</th>
                  <th className="px-3 py-2.5 text-center">Mes</th>
                  <th className="px-3 py-2.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
                {filteredVentas.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/40">
                    <td className="px-3 py-2.5 font-mono font-semibold text-emerald-400">{v.PedidoID}</td>
                    <td className="px-3 py-2.5 text-slate-300">{v.Fecha}</td>
                    <td className="px-3 py-2.5 text-white font-medium">{v.Región}</td>
                    <td className="px-3 py-2.5 text-slate-300">{v.Servicio}</td>
                    <td className="px-3 py-2.5 font-mono text-slate-400">{v.ClienteID}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-semibold text-white">{v.Cantidad}</td>
                    <td className="px-3 py-2.5 text-right font-mono">{formatCurrency(v.PrecioUnitario)}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-amber-400">
                      {v.DescuentoPct ? `${(v.DescuentoPct * 100).toFixed(0)}%` : '-'}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-emerald-400">
                      {formatCurrency(v.Importe)}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-slate-400">{formatCurrency(v.Bruto)}</td>
                    <td className="px-3 py-2.5 text-center font-mono">{v.Mes}</td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onOpenRowEditor('ventas', v)}
                          className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 cursor-pointer"
                          title="Editar registro"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteRow('ventas', v.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                          title="Eliminar registro"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. INVENTARIOS TABLE */}
        {activeTable === 'inventarios' && (
          <div className="overflow-x-auto rounded-lg border border-slate-800 max-h-[550px] overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold sticky top-0 z-10 border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2.5">SKU</th>
                  <th className="px-3 py-2.5">Nombre</th>
                  <th className="px-3 py-2.5">Categoría</th>
                  <th className="px-3 py-2.5 text-right">Inicial</th>
                  <th className="px-3 py-2.5 text-right">Entradas</th>
                  <th className="px-3 py-2.5 text-right">Salidas</th>
                  <th className="px-3 py-2.5 text-right font-bold text-white">Stock Actual</th>
                  <th className="px-3 py-2.5 text-right">Costo Unit.</th>
                  <th className="px-3 py-2.5 text-right">Valor Stock</th>
                  <th className="px-3 py-2.5 text-center">Estado</th>
                  <th className="px-3 py-2.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
                {inventario.map((i) => (
                  <tr key={i.sku} className="hover:bg-slate-800/40">
                    <td className="px-3 py-2.5 font-mono font-semibold text-emerald-400">{i.sku}</td>
                    <td className="px-3 py-2.5 font-medium text-white">{i.nombre}</td>
                    <td className="px-3 py-2.5 text-slate-400">{i.categoria}</td>
                    <td className="px-3 py-2.5 text-right font-mono">{i.stockInicial}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-emerald-400">+{i.entradas}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-rose-400">-{i.salidas}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-white">{i.stockActual}</td>
                    <td className="px-3 py-2.5 text-right font-mono">{formatCurrency(i.costoUnitario)}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-emerald-400">{formatCurrency(i.valorInventario)}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 border border-slate-700 text-slate-300">
                        {i.estado}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onOpenRowEditor('inventarios', i)}
                          className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteRow('inventarios', i.sku)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. COMPRAS TABLE */}
        {activeTable === 'compras' && (
          <div className="overflow-x-auto rounded-lg border border-slate-800 max-h-[550px] overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold sticky top-0 z-10 border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2.5">N° Orden</th>
                  <th className="px-3 py-2.5">Fecha</th>
                  <th className="px-3 py-2.5">Proveedor</th>
                  <th className="px-3 py-2.5">SKU / Descripción</th>
                  <th className="px-3 py-2.5 text-right">Cant.</th>
                  <th className="px-3 py-2.5 text-right">Costo Unit.</th>
                  <th className="px-3 py-2.5 text-right font-bold text-white">Costo Total</th>
                  <th className="px-3 py-2.5 text-center">Lead Time</th>
                  <th className="px-3 py-2.5 text-center">Estado</th>
                  <th className="px-3 py-2.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
                {compras.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40">
                    <td className="px-3 py-2.5 font-mono font-semibold text-emerald-400">{c.compraID}</td>
                    <td className="px-3 py-2.5 text-slate-300">{c.fecha}</td>
                    <td className="px-3 py-2.5 font-medium text-white">{c.proveedor}</td>
                    <td className="px-3 py-2.5 text-slate-300">[{c.sku}] {c.descripcion}</td>
                    <td className="px-3 py-2.5 text-right font-mono">{c.cantidad}</td>
                    <td className="px-3 py-2.5 text-right font-mono">{formatCurrency(c.costoUnitario)}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-white">{formatCurrency(c.costoTotal)}</td>
                    <td className="px-3 py-2.5 text-center">{c.tiempoEntregaDias} días</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400">
                        {c.estado}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <button
                        onClick={() => onDeleteRow('compras', c.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. GASTOS / COSTOS TABLE */}
        {activeTable === 'gastos' && (
          <div className="overflow-x-auto rounded-lg border border-slate-800 max-h-[550px] overflow-y-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold sticky top-0 z-10 border-b border-slate-800">
                <tr>
                  <th className="px-3 py-2.5">Código</th>
                  <th className="px-3 py-2.5">Concepto</th>
                  <th className="px-3 py-2.5">Clasificación</th>
                  <th className="px-3 py-2.5">Periodo</th>
                  <th className="px-3 py-2.5 text-right font-bold text-white">Monto</th>
                  <th className="px-3 py-2.5">Responsable</th>
                  <th className="px-3 py-2.5">Descripción</th>
                  <th className="px-3 py-2.5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
                {gastosCostos.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-800/40">
                    <td className="px-3 py-2.5 font-mono font-semibold text-emerald-400">{g.codigo}</td>
                    <td className="px-3 py-2.5 font-medium text-white">{g.concepto}</td>
                    <td className="px-3 py-2.5 text-slate-300">{g.clasificacion}</td>
                    <td className="px-3 py-2.5 text-slate-400">{g.periodo}</td>
                    <td className="px-3 py-2.5 text-right font-mono font-bold text-white">{formatCurrency(g.monto)}</td>
                    <td className="px-3 py-2.5 text-slate-300">{g.responsable}</td>
                    <td className="px-3 py-2.5 text-slate-400 max-w-xs truncate">{g.descripcion}</td>
                    <td className="px-3 py-2.5 text-center">
                      <button
                        onClick={() => onDeleteRow('gastos', g.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. DIMREGION TABLE */}
        {activeTable === 'regiones' && (
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Región</th>
                  <th className="px-4 py-3">Departamento</th>
                  <th className="px-4 py-3 text-right font-bold text-white">Meta Semestral ($)</th>
                  <th className="px-4 py-3">Supervisor Regional</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
                {dimRegion.map((r) => (
                  <tr key={r.Región} className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-semibold text-white">{r.Región}</td>
                    <td className="px-4 py-3 text-slate-300">{r.Departamento}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-emerald-400">{formatCurrency(r.MetaSemestral)}</td>
                    <td className="px-4 py-3 text-slate-300">{r.Supervisor || 'N/A'}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onOpenRowEditor('regiones', r)}
                        className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 6. DIMCLIENTE TABLE */}
        {activeTable === 'clientes' && (
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">ClienteID</th>
                  <th className="px-4 py-3">Nombre Cliente</th>
                  <th className="px-4 py-3">Región Sede</th>
                  <th className="px-4 py-3">Contacto Comercial</th>
                  <th className="px-4 py-3">Teléfono</th>
                  <th className="px-4 py-3 text-right">Cupo Crédito ($)</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
                {dimCliente.map((c) => (
                  <tr key={c.ClienteID} className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-mono font-semibold text-emerald-400">{c.ClienteID}</td>
                    <td className="px-4 py-3 font-bold text-white">{c.NombreCliente}</td>
                    <td className="px-4 py-3 text-slate-300">{c.Región}</td>
                    <td className="px-4 py-3 text-slate-300">{c.Contacto || 'N/A'}</td>
                    <td className="px-4 py-3 font-mono text-slate-400">{c.Telefono || 'N/A'}</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-white">
                      {formatCurrency(c.CupoCredito || 0)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onOpenRowEditor('clientes', c)}
                        className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
