import React, { useState } from 'react';
import { 
  Package, 
  RotateCw, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  ShoppingCart, 
  Plus, 
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Boxes
} from 'lucide-react';
import { InventoryItem, CompraItem, FinancialKPIs } from '../types';
import { formatCurrency, formatPercent, formatNumber } from '../utils/calculations';

interface InventoryManagementProps {
  inventario: InventoryItem[];
  compras: CompraItem[];
  kpis: FinancialKPIs;
  onUpdateInventoryItem: (item: InventoryItem) => void;
  onAddPurchase: (compra: CompraItem) => void;
}

export const InventoryManagement: React.FC<InventoryManagementProps> = ({
  inventario,
  compras,
  kpis,
  onUpdateInventoryItem,
  onAddPurchase,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // New purchase form state
  const [newPurchase, setNewPurchase] = useState<Partial<CompraItem>>({
    proveedor: '',
    sku: inventario[0]?.sku || '',
    descripcion: '',
    cantidad: 10,
    costoUnitario: inventario[0]?.costoUnitario || 100000,
    tiempoEntregaDias: 3,
    estado: 'Recibido',
  });

  const filteredInventory = inventario.filter((item) => {
    const matchesSearch = 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || item.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPurchase.sku || !newPurchase.cantidad || !newPurchase.costoUnitario) return;

    const matchedItem = inventario.find((i) => i.sku === newPurchase.sku);
    const costTotal = (newPurchase.cantidad || 0) * (newPurchase.costoUnitario || 0);

    const purchaseItem: CompraItem = {
      id: `OC-${Date.now()}`,
      compraID: `OC-2026-${String(compras.length + 1).padStart(3, '0')}`,
      fecha: new Date().toISOString().slice(0, 10),
      proveedor: newPurchase.proveedor || 'Proveedor Autorizado',
      sku: newPurchase.sku,
      descripcion: newPurchase.descripcion || matchedItem?.nombre || 'Reposición de Stock',
      cantidad: Number(newPurchase.cantidad),
      costoUnitario: Number(newPurchase.costoUnitario),
      costoTotal: costTotal,
      tiempoEntregaDias: Number(newPurchase.tiempoEntregaDias || 3),
      estado: (newPurchase.estado as any) || 'Recibido',
    };

    onAddPurchase(purchaseItem);

    // If purchase is 'Recibido', also update stock in inventory
    if (purchaseItem.estado === 'Recibido' && matchedItem) {
      const updatedEntradas = matchedItem.entradas + purchaseItem.cantidad;
      const updatedStockActual = matchedItem.stockInicial + updatedEntradas - matchedItem.salidas;
      const updatedVal = updatedStockActual * matchedItem.costoUnitario;
      const newState = 
        updatedStockActual <= 0 
          ? 'Critico Agotado' 
          : updatedStockActual <= matchedItem.stockSeguridad 
          ? 'Alerta Reorden' 
          : updatedStockActual > (matchedItem.stockSeguridad * 3)
          ? 'Sobre stock'
          : 'Optimo';

      onUpdateInventoryItem({
        ...matchedItem,
        entradas: updatedEntradas,
        stockActual: updatedStockActual,
        valorInventario: updatedVal,
        estado: newState,
      });
    }

    setShowPurchaseModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Valor Total del Inventario</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Boxes className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            {formatCurrency(kpis.valorInventarioTotal)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Valoración continua por Costo Promedio Ponderado
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Rotación de Inventarios</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <RotateCw className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-amber-300 tracking-tight">
            {kpis.rotacionInventarioPromedio.toFixed(2)} veces / semestre
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Velocidad de renovación = Costo Ventas / Inv Promedio
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">Días Calle de Inventario (DIO)</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-sky-300 tracking-tight">
            {Math.round(kpis.diasInventarioPromedio)} días de permanencia
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Días requeridos para vender todo el stock activo
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">GMROI (Retorno Margen)</span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-teal-300 tracking-tight">
            {formatCurrency(kpis.gmroi)} por cada $1 invertido
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gross Margin Return on Inventory Investment
          </p>
        </div>
      </div>

      {/* Main Table Controls & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Package className="h-4 w-4 text-emerald-400" />
              Matriz de Control de Stock, Rotación y Puntos de Reorden
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Supervisión de existencias, capacidad operativa, entradas de compras y salidas de ventas
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setShowPurchaseModal(true)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Registrar Compra / Reposición</span>
            </button>
          </div>
        </div>

        {/* Filters and search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center bg-slate-800/80 rounded-lg px-3 py-1.5 border border-slate-700 w-full sm:w-72">
            <Search className="h-4 w-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar por SKU, nombre o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-slate-200 placeholder-slate-400 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Estado:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="todos">Todos los Estados</option>
              <option value="Optimo">Óptimo</option>
              <option value="Alerta Reorden">Alerta Reorden</option>
              <option value="Critico Agotado">Crítico Agotado</option>
              <option value="Sobre stock">Sobre stock</option>
            </select>
          </div>
        </div>

        {/* Inventory Stock Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="px-3.5 py-3">SKU / Item</th>
                <th className="px-3 py-3">Categoría</th>
                <th className="px-3 py-3 text-right">Inicial</th>
                <th className="px-3 py-3 text-right">Entradas (+)</th>
                <th className="px-3 py-3 text-right">Salidas (-)</th>
                <th className="px-3 py-3 text-right font-bold text-white">Stock Actual</th>
                <th className="px-3 py-3 text-right">Pto. Reorden</th>
                <th className="px-3 py-3 text-right">Costo Unit.</th>
                <th className="px-3 py-3 text-right">Valor Stock</th>
                <th className="px-3 py-3 text-center">Rotación</th>
                <th className="px-3 py-3 text-center">Días (DIO)</th>
                <th className="px-3.5 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
              {filteredInventory.map((item) => {
                const badgeStyle = {
                  Optimo: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                  'Alerta Reorden': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
                  'Critico Agotado': 'bg-rose-500/15 text-rose-400 border-rose-500/30 font-bold',
                  'Sobre stock': 'bg-sky-500/15 text-sky-300 border-sky-500/30',
                }[item.estado] || 'bg-slate-700 text-slate-300';

                return (
                  <tr key={item.sku} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-3.5 py-3 font-medium text-white">
                      <div className="font-semibold text-slate-100">{item.nombre}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{item.sku}</span>
                    </td>
                    <td className="px-3 py-3 text-slate-400">{item.categoria}</td>
                    <td className="px-3 py-3 text-right font-mono text-slate-300">{formatNumber(item.stockInicial)}</td>
                    <td className="px-3 py-3 text-right font-mono text-emerald-400">+{formatNumber(item.entradas)}</td>
                    <td className="px-3 py-3 text-right font-mono text-rose-400">-{formatNumber(item.salidas)}</td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-white text-sm">
                      {formatNumber(item.stockActual)}
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-amber-300">{formatNumber(item.puntoReorden)}</td>
                    <td className="px-3 py-3 text-right font-mono text-slate-300">{formatCurrency(item.costoUnitario)}</td>
                    <td className="px-3 py-3 text-right font-mono font-semibold text-emerald-400">
                      {formatCurrency(item.valorInventario)}
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-200">
                      {item.rotacionVeces.toFixed(1)}x
                    </td>
                    <td className="px-3 py-3 text-center font-mono text-slate-200">
                      {item.diasInventario} d
                    </td>
                    <td className="px-3.5 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] border ${badgeStyle}`}>
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compras / Aprovisionamiento Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-emerald-400" />
              Historial de Órdenes de Compra y Aprovisionamiento
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Compras de insumos, materiales y repuestos requeridos para sostener la actividad operativa
            </p>
          </div>
          <span className="text-xs text-slate-400">Total Compras: <strong className="text-slate-200">{compras.length} órdenes</strong></span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="px-3.5 py-2.5">N° Orden</th>
                <th className="px-3 py-2.5">Fecha</th>
                <th className="px-3 py-2.5">Proveedor</th>
                <th className="px-3 py-2.5">SKU / Insumo</th>
                <th className="px-3 py-2.5 text-right">Cantidad</th>
                <th className="px-3 py-2.5 text-right">Costo Unit.</th>
                <th className="px-3 py-2.5 text-right font-bold text-white">Costo Total</th>
                <th className="px-3 py-2.5 text-center">Lead Time</th>
                <th className="px-3.5 py-2.5 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
              {compras.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="px-3.5 py-2.5 font-mono text-emerald-400 font-semibold">{c.compraID}</td>
                  <td className="px-3 py-2.5 text-slate-300">{c.fecha}</td>
                  <td className="px-3 py-2.5 text-white font-medium">{c.proveedor}</td>
                  <td className="px-3 py-2.5 text-slate-300">
                    <span className="font-mono text-xs text-slate-400 mr-1">[{c.sku}]</span>
                    {c.descripcion}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono">{formatNumber(c.cantidad)}</td>
                  <td className="px-3 py-2.5 text-right font-mono">{formatCurrency(c.costoUnitario)}</td>
                  <td className="px-3 py-2.5 text-right font-mono font-bold text-white">{formatCurrency(c.costoTotal)}</td>
                  <td className="px-3 py-2.5 text-center text-slate-300">{c.tiempoEntregaDias} días</td>
                  <td className="px-3.5 py-2.5 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Purchase */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Registrar Nueva Orden de Compra</h3>
            <p className="text-xs text-slate-400 mb-4">
              Ingresa los datos para registrar la compra y actualizar el stock de inventario automáticamente.
            </p>

            <form onSubmit={handleCreatePurchase} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Insumo / SKU:</label>
                <select
                  value={newPurchase.sku}
                  onChange={(e) => {
                    const matched = inventario.find((i) => i.sku === e.target.value);
                    setNewPurchase({
                      ...newPurchase,
                      sku: e.target.value,
                      descripcion: matched?.nombre || '',
                      costoUnitario: matched?.costoUnitario || 0,
                    });
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                >
                  {inventario.map((i) => (
                    <option key={i.sku} value={i.sku}>
                      [{i.sku}] {i.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Proveedor:</label>
                <input
                  type="text"
                  required
                  value={newPurchase.proveedor}
                  onChange={(e) => setNewPurchase({ ...newPurchase, proveedor: e.target.value })}
                  placeholder="Ej: Petromil / Automundial / Proveedor S.A.S"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cantidad a Comprar:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newPurchase.cantidad}
                    onChange={(e) => setNewPurchase({ ...newPurchase, cantidad: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Costo Unitario ($):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newPurchase.costoUnitario}
                    onChange={(e) => setNewPurchase({ ...newPurchase, costoUnitario: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 flex justify-between items-center font-mono">
                <span className="text-slate-400">Total Orden de Compra:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {formatCurrency((newPurchase.cantidad || 0) * (newPurchase.costoUnitario || 0))}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPurchaseModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer"
                >
                  Confirmar y Guardar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
