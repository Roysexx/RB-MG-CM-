import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  Scale, 
  Target, 
  ShoppingBag, 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  BarChart,
  PieChart,
  Calendar
} from 'lucide-react';
import { 
  FinancialKPIs, 
  RegionSummary, 
  MonthlySummary, 
  ClientRankingSummary,
  FactVentaRow 
} from '../types';
import { 
  formatCurrency, 
  formatPercent, 
  formatNumber, 
  computeServiceSummaries 
} from '../utils/calculations';

interface DashboardOverviewProps {
  kpis: FinancialKPIs;
  regionSummaries: RegionSummary[];
  monthlySummaries: MonthlySummary[];
  clientRankings: ClientRankingSummary[];
  filteredVentas: FactVentaRow[];
  selectedRegion: string;
  onSelectRegion: (reg: string) => void;
  selectedServicio: string;
  onSelectServicio: (serv: string) => void;
  selectedMonth: number | 'todos';
  onSelectMonth: (m: number | 'todos') => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  kpis,
  regionSummaries,
  monthlySummaries,
  clientRankings,
  filteredVentas,
  selectedRegion,
  onSelectRegion,
  selectedServicio,
  onSelectServicio,
  selectedMonth,
  onSelectMonth,
}) => {
  const serviceSummaries = computeServiceSummaries(filteredVentas);

  return (
    <div className="space-y-6">
      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
          <Filter className="h-4 w-4 text-emerald-400" />
          <span>Filtros Dinámicos del Modelo:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Región filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-medium">Región:</span>
            <select
              value={selectedRegion}
              onChange={(e) => onSelectRegion(e.target.value)}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="todas" className="bg-slate-900 text-white">Todas las Regiones</option>
              <option value="Urabá" className="bg-slate-900 text-white">Urabá</option>
              <option value="Medellín" className="bg-slate-900 text-white">Medellín</option>
              <option value="Bogotá" className="bg-slate-900 text-white">Bogotá</option>
              <option value="Costa" className="bg-slate-900 text-white">Costa</option>
            </select>
          </div>

          {/* Servicio filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-medium">Servicio:</span>
            <select
              value={selectedServicio}
              onChange={(e) => onSelectServicio(e.target.value)}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="todos" className="bg-slate-900 text-white">Todos los Servicios</option>
              <option value="Transporte" className="bg-slate-900 text-white">Transporte</option>
              <option value="Distribución" className="bg-slate-900 text-white">Distribución</option>
              <option value="Almacenamiento" className="bg-slate-900 text-white">Almacenamiento</option>
            </select>
          </div>

          {/* Mes filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-medium">Mes:</span>
            <select
              value={selectedMonth}
              onChange={(e) => onSelectMonth(e.target.value === 'todos' ? 'todos' : Number(e.target.value))}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="todos" className="bg-slate-900 text-white">Semestre Completo (Ene-Jun)</option>
              <option value={1} className="bg-slate-900 text-white">Enero</option>
              <option value={2} className="bg-slate-900 text-white">Febrero</option>
              <option value={3} className="bg-slate-900 text-white">Marzo</option>
              <option value={4} className="bg-slate-900 text-white">Abril</option>
              <option value={5} className="bg-slate-900 text-white">Mayo</option>
              <option value={6} className="bg-slate-900 text-white">Junio</option>
            </select>
          </div>

          {(selectedRegion !== 'todas' || selectedServicio !== 'todos' || selectedMonth !== 'todos') && (
            <button
              onClick={() => {
                onSelectRegion('todas');
                onSelectServicio('todos');
                onSelectMonth('todos');
              }}
              className="text-xs text-rose-400 hover:text-rose-300 underline font-medium px-2 py-1 cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Ventas Totales */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Ventas Totales Netas</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-lg xl:text-xl font-bold text-white tracking-tight">
            {formatCurrency(kpis.ventasTotales)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="text-slate-400">Bruto:</span>
            <span className="text-slate-300 font-medium">{formatCurrency(kpis.ventasBrutas)}</span>
          </div>
          <div className="text-[11px] text-amber-400 mt-0.5">
            Desc: {formatPercent(kpis.pctDescuentoPromedio)} ({formatCurrency(kpis.totalDescuentos)})
          </div>
        </div>

        {/* KPI 2: Margen Bruto & Utilidad */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Utilidad Bruta</span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-lg xl:text-xl font-bold text-teal-400 tracking-tight">
            {formatCurrency(kpis.utilidadBruta)}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <span className="text-slate-400">Margen Bruto:</span>
            <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
              {formatPercent(kpis.margenBrutoPct)}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            COGS: {formatCurrency(kpis.costoVentasTotal)}
          </div>
        </div>

        {/* KPI 3: Punto de Equilibrio */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Punto de Equilibrio</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Scale className="h-4 w-4" />
            </div>
          </div>
          <div className="text-lg xl:text-xl font-bold text-white tracking-tight">
            {formatCurrency(kpis.puntoEquilibrioDinero)}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <span className="text-slate-400">Cobertura:</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              {kpis.coberturaPuntoEquilibrioPct.toFixed(1)}%
            </span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">
            Zona de Ganancia (+{kpis.margenSeguridadPct.toFixed(1)}% seg.)
          </div>
        </div>

        {/* KPI 4: Rotación de Inventarios */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Rotación Inventario</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="text-lg xl:text-xl font-bold text-amber-300 tracking-tight">
            {kpis.rotacionInventarioPromedio.toFixed(2)}x
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <span className="text-slate-400">Días Calle (DIO):</span>
            <span className="text-slate-200 font-bold">{Math.round(kpis.diasInventarioPromedio)} días</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Stock Val: {formatCurrency(kpis.valorInventarioTotal)}
          </div>
        </div>

        {/* KPI 5: Cumplimiento de Metas */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Cumplimiento Meta</span>
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="text-lg xl:text-xl font-bold text-sky-400 tracking-tight">
            {formatPercent(kpis.pctCumplimientoTotal)}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs">
            <span className="text-slate-400">Meta Semestral:</span>
            <span className="text-slate-200 font-medium">{formatCurrency(kpis.metaSemestralTotal)}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Diferencia: {formatCurrency(kpis.ventasTotales - kpis.metaSemestralTotal)}
          </div>
        </div>

        {/* KPI 6: Ticket Promedio & Pedidos */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Ticket Promedio</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>
          <div className="text-lg xl:text-xl font-bold text-purple-300 tracking-tight">
            {formatCurrency(kpis.ticketPromedio)}
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
            <span>Pedidos: <strong className="text-slate-200">{kpis.totalPedidos}</strong></span>
            <span>Clientes: <strong className="text-slate-200">{kpis.totalClientes}</strong></span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Precio Neto/U: {formatCurrency(kpis.precioNetoPromedio)}
          </div>
        </div>
      </div>

      {/* Charts Section: Monthly Trend & Regional Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Trend (Evolución Mensual MoM) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart className="h-4 w-4 text-emerald-400" />
                Evolución Mensual de Ventas, Costos y Variación MoM %
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Comportamiento semestral y variación porcentual mes a mes (DAX Session 4)
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Enero - Junio 2026
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-4 pt-2">
            {monthlySummaries.map((m) => {
              const maxVenta = Math.max(...monthlySummaries.map((s) => s.ventas));
              const pctWidth = maxVenta > 0 ? (m.ventas / maxVenta) * 100 : 0;
              const costWidth = maxVenta > 0 ? (m.costo / maxVenta) * 100 : 0;

              return (
                <div key={m.mes} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 w-24">{m.nombreMes}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">
                        Costo: <strong className="text-slate-300 font-mono">{formatCurrency(m.costo)}</strong>
                      </span>
                      <span className="text-emerald-400 font-bold font-mono">
                        {formatCurrency(m.ventas)}
                      </span>
                      {m.mes > 1 && (
                        <span className={`inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded ${
                          m.varMoMPct >= 0 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {m.varMoMPct >= 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                          {(m.varMoMPct * 100).toFixed(1)}% MoM
                        </span>
                      )}
                      {m.mes === 1 && (
                        <span className="text-[11px] text-slate-500 font-medium px-1.5 py-0.5">
                          Base inicial
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dual Bar (Ventas vs Costos) */}
                  <div className="h-5 w-full bg-slate-800/80 rounded-full overflow-hidden flex relative">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${pctWidth}%` }}
                      title={`Ventas: ${formatCurrency(m.ventas)}`}
                    />
                    <div
                      className="absolute top-0 bottom-0 bg-rose-500/40 border-r border-rose-400"
                      style={{ width: `${costWidth}%` }}
                      title={`Costo: ${formatCurrency(m.costo)}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                <span>Ventas Totales</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/60"></span>
                <span>Costo de Ventas (COGS)</span>
              </span>
            </div>
            <span>Total YTD Acumulado: <strong className="text-white font-mono">{formatCurrency(kpis.ventasTotales)}</strong></span>
          </div>
        </div>

        {/* Regional Goals & Fulfillment */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="h-4 w-4 text-sky-400" />
                Cumplimiento por Región
              </h3>
              <span className="text-xs text-slate-400">DimRegion</span>
            </div>

            <div className="space-y-4">
              {regionSummaries.map((reg) => {
                const isOverGoal = reg.pctCumplimiento >= 1.0;
                return (
                  <div key={reg.region} className="p-3 rounded-lg bg-slate-800/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{reg.region}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isOverGoal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {(reg.pctCumplimiento * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>Ventas: {formatCurrency(reg.ventas)}</span>
                      <span>Meta: {formatCurrency(reg.meta)}</span>
                    </div>

                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOverGoal ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${Math.min(100, reg.pctCumplimiento * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Meta Semestral Total:</span>
            <strong className="text-slate-200">{formatCurrency(kpis.metaSemestralTotal)}</strong>
          </div>
        </div>
      </div>

      {/* Secondary Grid: Service Distribution, Clients Ranking, Break-Even Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Service Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <PieChart className="h-4 w-4 text-emerald-400" />
            Participación por Línea de Servicio
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Volumen, margen y contribución a los ingresos
          </p>

          <div className="space-y-3">
            {serviceSummaries.map((s) => (
              <div key={s.servicio} className="p-3 rounded-lg bg-slate-800/40 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-white">{s.servicio}</span>
                  <span className="text-emerald-400 font-mono">{formatCurrency(s.ventas)}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>Part: <strong>{(s.participacionPct * 100).toFixed(1)}%</strong></span>
                  <span>Margen: <strong className="text-teal-300">{(s.margenPct * 100).toFixed(1)}%</strong></span>
                  <span>Unidades: <strong>{s.unidades}</strong></span>
                </div>

                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${s.participacionPct * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients Ranking & Segmentation */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-400" />
              Segmentación de Clientes (DAX)
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Oro / Plata / Bronce</span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Regla: Oro ≥ $30M, Plata ≥ $20M, Bronce &lt; $20M
          </p>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {clientRankings.map((c) => {
              const badgeColors = {
                Oro: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                Plata: 'bg-slate-300/20 text-slate-200 border-slate-400/30',
                Bronce: 'bg-amber-700/20 text-amber-400 border-amber-700/30',
              }[c.segmento];

              return (
                <div key={c.clienteId} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 hover:border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <span className="h-6 w-6 rounded-full bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center">
                      #{c.ranking}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white">{c.nombreCliente}</div>
                      <div className="text-[11px] text-slate-400">{c.clienteId} · {c.region}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400 font-mono">
                      {formatCurrency(c.ventas)}
                    </div>
                    <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded border ${badgeColors}`}>
                      {c.segmento}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Break-Even & Operational Health Diagnostic */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
              <Scale className="h-4 w-4 text-indigo-400" />
              Diagnóstico de Punto de Equilibrio
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Cobertura de costos fijos y viabilidad financiera
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/80">
                <div className="text-xs text-slate-400">Umbral Mínimo de Facturación (PE):</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  {formatCurrency(kpis.puntoEquilibrioDinero)}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Equivalente a <strong className="text-slate-200">{Math.round(kpis.puntoEquilibrioUnidades)}</strong> unidades de servicio
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Empresa en Zona de Superávit
                  </span>
                  <span className="text-emerald-300 font-bold">
                    +{kpis.margenSeguridadPct.toFixed(1)}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Las ventas netas actuales ({formatCurrency(kpis.ventasTotales)}) superan con solvencia el punto crítico, generando un margen de seguridad positivo.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-slate-800/40 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Costos Fijos:</span>
                  <strong className="text-slate-200 font-mono">{formatCurrency(kpis.gastosFijosTotal)}</strong>
                </div>
                <div className="p-2.5 rounded bg-slate-800/40 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Gastos Variables:</span>
                  <strong className="text-slate-200 font-mono">{formatCurrency(kpis.gastosVariablesTotal)}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>EBITDA Operativo:</span>
            <strong className="text-teal-400 font-mono font-bold">{formatCurrency(kpis.utilidadOperativa)}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};
