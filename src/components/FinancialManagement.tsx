import React, { useState } from 'react';
import { 
  DollarSign, 
  Scale, 
  TrendingUp, 
  PieChart, 
  Plus, 
  FileSpreadsheet, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { FinancialKPIs, GastoCostoItem } from '../types';
import { formatCurrency, formatPercent, formatNumber } from '../utils/calculations';

interface FinancialManagementProps {
  kpis: FinancialKPIs;
  gastosCostos: GastoCostoItem[];
  onAddGasto: (gasto: GastoCostoItem) => void;
  onDeleteGasto: (id: string) => void;
}

export const FinancialManagement: React.FC<FinancialManagementProps> = ({
  kpis,
  gastosCostos,
  onAddGasto,
  onDeleteGasto,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGasto, setNewGasto] = useState<Partial<GastoCostoItem>>({
    concepto: '',
    clasificacion: 'Costo Fijo',
    periodo: 'Semestral',
    monto: 1000000,
    responsable: 'Administración',
    descripcion: '',
  });

  const handleCreateGasto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGasto.concepto || !newGasto.monto) return;

    const item: GastoCostoItem = {
      id: `GC-${Date.now()}`,
      codigo: `GC-${String(gastosCostos.length + 1).padStart(3, '0')}`,
      concepto: newGasto.concepto,
      clasificacion: newGasto.clasificacion as any || 'Costo Fijo',
      periodo: newGasto.periodo || 'Semestral',
      monto: Number(newGasto.monto),
      responsable: newGasto.responsable || 'Administración',
      descripcion: newGasto.descripcion || '',
    };

    onAddGasto(item);
    setShowAddModal(false);
  };

  // Coordinates for the interactive Break-Even Chart
  const maxAxis = Math.max(kpis.ventasTotales * 1.3, kpis.puntoEquilibrioDinero * 1.5, 300000000);
  const fixedCostY = 180 - (kpis.gastosFijosTotal / maxAxis) * 160;
  const breakEvenX = Math.min(360, Math.max(60, (kpis.puntoEquilibrioDinero / maxAxis) * 360));
  const breakEvenY = 180 - (kpis.puntoEquilibrioDinero / maxAxis) * 160;
  const currentSalesX = Math.min(360, Math.max(60, (kpis.ventasTotales / maxAxis) * 360));
  const currentSalesY = 180 - (kpis.ventasTotales / maxAxis) * 160;

  return (
    <div className="space-y-6">
      {/* Financial Statement (Estado de Resultados Integral) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* P&L Statement */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
                Estado de Resultados Integral (P&L Semestral)
              </h3>
              <p className="text-xs text-slate-400">
                Estructura contable analítica de Ingresos, Costos, Gastos y Utilidades
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
              Vigencia 2026
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Ingresos Brutos */}
            <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-800/40">
              <span className="text-slate-300">(+) Ingresos Brutos Operacionales</span>
              <span className="font-mono font-semibold text-white">{formatCurrency(kpis.ventasBrutas)}</span>
            </div>

            {/* Descuentos */}
            <div className="flex items-center justify-between py-1 px-2 text-amber-400">
              <span>(-) Descuentos Comerciales Otorgados ({formatPercent(kpis.pctDescuentoPromedio)})</span>
              <span className="font-mono">-{formatCurrency(kpis.totalDescuentos)}</span>
            </div>

            {/* Ventas Netas */}
            <div className="flex items-center justify-between py-2 px-2.5 rounded bg-emerald-950/40 border border-emerald-800/60 font-bold text-sm">
              <span className="text-emerald-300">(=) Ingresos Operacionales Netos</span>
              <span className="font-mono text-emerald-400">{formatCurrency(kpis.ventasTotales)}</span>
            </div>

            {/* Costo de Ventas */}
            <div className="flex items-center justify-between py-1 px-2 text-rose-400">
              <span>(-) Costo de Ventas y Servicios (COGS)</span>
              <span className="font-mono">-{formatCurrency(kpis.costoVentasTotal)}</span>
            </div>

            {/* Utilidad Bruta */}
            <div className="flex items-center justify-between py-2 px-2.5 rounded bg-teal-950/30 border border-teal-800/50 font-bold text-xs">
              <span className="text-teal-300">(=) Utilidad Bruta ({formatPercent(kpis.margenBrutoPct)} margen)</span>
              <span className="font-mono text-teal-400">{formatCurrency(kpis.utilidadBruta)}</span>
            </div>

            {/* Costos Fijos */}
            <div className="flex items-center justify-between py-1 px-2 text-slate-400">
              <span>(-) Costos Fijos (Arriendos, Seguros, Nómina, Licencias)</span>
              <span className="font-mono text-slate-300">-{formatCurrency(kpis.gastosFijosTotal)}</span>
            </div>

            {/* Costos Variables */}
            <div className="flex items-center justify-between py-1 px-2 text-slate-400">
              <span>(-) Gastos y Costos Variables (Comisiones, Peajes)</span>
              <span className="font-mono text-slate-300">-{formatCurrency(kpis.gastosVariablesTotal)}</span>
            </div>

            {/* Utilidad Operativa / EBITDA */}
            <div className="flex items-center justify-between py-2 px-2.5 rounded bg-indigo-950/40 border border-indigo-800/50 font-bold text-xs">
              <span className="text-indigo-300">(=) Utilidad Operativa / EBITDA ({formatPercent(kpis.margenOperativoPct)})</span>
              <span className="font-mono text-indigo-400">{formatCurrency(kpis.utilidadOperativa)}</span>
            </div>

            {/* Impuestos Proyectados */}
            <div className="flex items-center justify-between py-1 px-2 text-slate-400">
              <span>(-) Provisión Impuesto sobre la Renta (35%)</span>
              <span className="font-mono text-slate-300">
                -{formatCurrency(kpis.utilidadOperativa > 0 ? kpis.utilidadOperativa * 0.35 : 0)}
              </span>
            </div>

            {/* Utilidad Neta */}
            <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/40 font-black text-sm">
              <span className="text-white">(=) UTILIDAD NETA ESTIMADA ({formatPercent(kpis.margenNetoPct)})</span>
              <span className="font-mono text-emerald-300 text-base">{formatCurrency(kpis.utilidadNetaEstimada)}</span>
            </div>
          </div>
        </div>

        {/* Break-Even Visual Graph & Diagnostics */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="h-4 w-4 text-indigo-400" />
                  Gráfico de Umbral de Rentabilidad (Punto de Equilibrio)
                </h3>
                <p className="text-xs text-slate-400">
                  Línea de Ingresos vs. Costos Totales e Intersección Crítica
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                Superávit +{kpis.margenSeguridadPct.toFixed(1)}%
              </span>
            </div>

            {/* SVG Graph */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 my-3">
              <svg viewBox="0 0 400 200" className="w-full h-44">
                {/* Grid lines */}
                <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" strokeWidth="1.5" />
                <line x1="40" y1="180" x2="380" y2="180" stroke="#334155" strokeWidth="1.5" />

                <line x1="40" y1="100" x2="380" y2="100" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="200" y1="20" x2="200" y2="180" stroke="#1e293b" strokeDasharray="3 3" />

                {/* Fixed Costs line */}
                <line 
                  x1="40" 
                  y1={fixedCostY} 
                  x2="380" 
                  y2={fixedCostY} 
                  stroke="#64748b" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                />
                <text x="45" y={fixedCostY - 5} fill="#94a3b8" fontSize="9" fontWeight="bold">
                  Costos Fijos: {formatCurrency(kpis.gastosFijosTotal)}
                </text>

                {/* Total Costs Line (Starts at Fixed Costs, slopes up with variable costs) */}
                <line 
                  x1="40" 
                  y1={fixedCostY} 
                  x2="380" 
                  y2="30" 
                  stroke="#f43f5e" 
                  strokeWidth="2.5" 
                />
                <text x="310" y="25" fill="#f43f5e" fontSize="9" fontWeight="bold">
                  Costos Totales
                </text>

                {/* Total Revenues Line (Starts at origin 40,180, slopes up steeper) */}
                <line 
                  x1="40" 
                  y1="180" 
                  x2="380" 
                  y2="15" 
                  stroke="#10b981" 
                  strokeWidth="2.5" 
                />
                <text x="300" y="10" fill="#10b981" fontSize="9" fontWeight="bold">
                  Ingresos Totales
                </text>

                {/* Intersection Point (Punto de Equilibrio) */}
                <circle cx={breakEvenX} cy={breakEvenY} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <text x={breakEvenX - 45} y={breakEvenY - 10} fill="#f59e0b" fontSize="9" fontWeight="bold">
                  PE: {formatCurrency(kpis.puntoEquilibrioDinero)}
                </text>

                {/* Current Sales Position */}
                <circle cx={currentSalesX} cy={currentSalesY} r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                <text x={currentSalesX - 40} y={currentSalesY - 10} fill="#60a5fa" fontSize="9" fontWeight="bold">
                  Venta Actual: {formatCurrency(kpis.ventasTotales)}
                </text>

                {/* Axes labels */}
                <text x="180" y="195" fill="#64748b" fontSize="9" textAnchor="middle">
                  Volumen / Actividad (Unidades)
                </text>
                <text x="10" y="100" fill="#64748b" fontSize="9" transform="rotate(-90 10 100)" textAnchor="middle">
                  Monto ($ COP)
                </text>
              </svg>
            </div>

            {/* Mathematical Formulas Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-medium">Punto de Equilibrio Monetario:</div>
                <div className="font-mono text-emerald-400 font-bold text-sm">
                  {formatCurrency(kpis.puntoEquilibrioDinero)}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  PE ($) = CF / Margen Contribución %
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-medium">Punto de Equilibrio en Unidades:</div>
                <div className="font-mono text-teal-400 font-bold text-sm">
                  {Math.round(kpis.puntoEquilibrioUnidades)} unidades
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  PE (U) = CF / (Precio Prom. - CV Unit.)
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Nivel de Cobertura de Costos Fijos:</span>
            </span>
            <strong className="text-emerald-400 font-mono">{kpis.coberturaPuntoEquilibrioPct.toFixed(1)}%</strong>
          </div>
        </div>

      </div>

      {/* Expenses & Costs Detail Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Catálogo de Costos y Gastos Fijos y Variables
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Gastos administrativos, operativos, arriendos, talento humano e insumos de soporte
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Agregar Concepto de Costo/Gasto</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="px-3.5 py-3">Código</th>
                <th className="px-3 py-3">Concepto</th>
                <th className="px-3 py-3">Clasificación</th>
                <th className="px-3 py-3">Periodo</th>
                <th className="px-3 py-3 text-right font-bold text-white">Monto</th>
                <th className="px-3 py-3">Responsable</th>
                <th className="px-3 py-3">Descripción</th>
                <th className="px-3 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
              {gastosCostos.map((gc) => {
                const typeStyle = {
                  'Costo Fijo': 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
                  'Costo Variable': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
                  'Gasto Administrativo': 'bg-teal-500/15 text-teal-300 border-teal-500/30',
                  'Gasto de Ventas': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
                  'Gasto Financiero': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
                }[gc.clasificacion] || 'bg-slate-700 text-slate-300';

                return (
                  <tr key={gc.id} className="hover:bg-slate-800/40">
                    <td className="px-3.5 py-3 font-mono font-semibold text-emerald-400">{gc.codigo}</td>
                    <td className="px-3 py-3 font-semibold text-white">{gc.concepto}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${typeStyle}`}>
                        {gc.clasificacion}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-400">{gc.periodo}</td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-white">
                      {formatCurrency(gc.monto)}
                    </td>
                    <td className="px-3 py-3 text-slate-300">{gc.responsable}</td>
                    <td className="px-3 py-3 text-slate-400 max-w-xs truncate">{gc.descripcion}</td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => onDeleteGasto(gc.id)}
                        className="text-slate-500 hover:text-rose-400 text-xs font-semibold px-2 py-1 rounded transition-colors cursor-pointer"
                        title="Eliminar gasto"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Cost/Expense */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Registrar Concepto de Costo o Gasto</h3>
            <p className="text-xs text-slate-400 mb-4">
              Añade un rubro operativo para recalcular el punto de equilibrio y el estado de resultados.
            </p>

            <form onSubmit={handleCreateGasto} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Concepto / Nombre del Rubro:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Mantenimiento Preventivo de Montacargas"
                  value={newGasto.concepto}
                  onChange={(e) => setNewGasto({ ...newGasto, concepto: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Clasificación:</label>
                  <select
                    value={newGasto.clasificacion}
                    onChange={(e) => setNewGasto({ ...newGasto, clasificacion: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  >
                    <option value="Costo Fijo">Costo Fijo</option>
                    <option value="Costo Variable">Costo Variable</option>
                    <option value="Gasto Administrativo">Gasto Administrativo</option>
                    <option value="Gasto de Ventas">Gasto de Ventas</option>
                    <option value="Gasto Financiero">Gasto Financiero</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Monto ($ COP):</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newGasto.monto}
                    onChange={(e) => setNewGasto({ ...newGasto, monto: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Responsable / Área:</label>
                <input
                  type="text"
                  placeholder="Ej: Operaciones / Logística / RRHH"
                  value={newGasto.responsable}
                  onChange={(e) => setNewGasto({ ...newGasto, responsable: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Descripción / Observación:</label>
                <textarea
                  rows={2}
                  placeholder="Detalles del contrato, periodicidad o justificación contable..."
                  value={newGasto.descripcion}
                  onChange={(e) => setNewGasto({ ...newGasto, descripcion: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer"
                >
                  Guardar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
