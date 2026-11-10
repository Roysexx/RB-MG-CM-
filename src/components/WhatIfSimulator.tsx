import React, { useState } from 'react';
import { 
  Sliders, 
  TrendingUp, 
  RotateCcw, 
  Scale, 
  DollarSign, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { FinancialKPIs } from '../types';
import { formatCurrency, formatPercent, formatNumber } from '../utils/calculations';

interface WhatIfSimulatorProps {
  baseKpis: FinancialKPIs;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ baseKpis }) => {
  // Simulator sliders
  const [priceDelta, setPriceDelta] = useState<number>(0); // -20% to +30%
  const [volumeDelta, setVolumeDelta] = useState<number>(0); // -40% to +50%
  const [fixedCostDelta, setFixedCostDelta] = useState<number>(0); // -30% to +30%
  const [variableCostDelta, setVariableCostDelta] = useState<number>(0); // -30% to +30%

  // Simulation calculations
  const priceMultiplier = 1 + priceDelta / 100;
  const volumeMultiplier = 1 + volumeDelta / 100;
  const fixedCostMultiplier = 1 + fixedCostDelta / 100;
  const variableCostMultiplier = 1 + variableCostDelta / 100;

  // Simulated metrics
  const simVentas = baseKpis.ventasTotales * priceMultiplier * volumeMultiplier;
  const simCostoVentas = baseKpis.costoVentasTotal * volumeMultiplier * variableCostMultiplier;
  const simUtilidadBruta = simVentas - simCostoVentas;
  const simMargenBrutoPct = simVentas > 0 ? (simUtilidadBruta / simVentas) : 0;

  const simCostosFijos = baseKpis.gastosFijosTotal * fixedCostMultiplier;
  const simCostosVariables = baseKpis.gastosVariablesTotal * volumeMultiplier * variableCostMultiplier;
  const simGastosOperativos = simCostosFijos + simCostosVariables;

  const simEbitda = simUtilidadBruta - simGastosOperativos;
  const simMargenOperativoPct = simVentas > 0 ? (simEbitda / simVentas) : 0;

  const simImpuestos = simEbitda > 0 ? simEbitda * 0.35 : 0;
  const simUtilidadNeta = simEbitda - simImpuestos;

  // Simulated Break-Even
  const simCostosVariablesTotales = simCostoVentas + simCostosVariables;
  const simMargenContribucionTotal = simVentas - simCostosVariablesTotales;
  const simMargenContribucionPct = simVentas > 0 ? (simMargenContribucionTotal / simVentas) : 0.35;
  const simPuntoEquilibrio = simMargenContribucionPct > 0 ? (simCostosFijos / simMargenContribucionPct) : 0;
  const simMargenSeguridadPct = simVentas > 0 ? ((simVentas - simPuntoEquilibrio) / simVentas) * 100 : 0;

  const deltaUtilidad = simUtilidadNeta - baseKpis.utilidadNetaEstimada;

  const handleReset = () => {
    setPriceDelta(0);
    setVolumeDelta(0);
    setFixedCostDelta(0);
    setVariableCostDelta(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="h-5 w-5 text-emerald-400" />
            Simulador de Escenarios Financieros y Sensibilidad ("What-If")
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Mueve las variables macroeconómicas u operativas para predecir el impacto en utilidades y punto de equilibrio en tiempo real.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Restablecer Escenario Base</span>
        </button>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Slider 1: Precios */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Precio Promedio de Venta:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded ${
              priceDelta > 0 ? 'bg-emerald-500/20 text-emerald-400' : priceDelta < 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
            }`}>
              {priceDelta > 0 ? `+${priceDelta}%` : `${priceDelta}%`}
            </span>
          </div>
          <input
            type="range"
            min="-20"
            max="30"
            step="1"
            value={priceDelta}
            onChange={(e) => setPriceDelta(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>-20% (Descuento)</span>
            <span>Base (0%)</span>
            <span>+30% (Alza)</span>
          </div>
        </div>

        {/* Slider 2: Volumen / Demanda */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Volumen / Actividad Vendida:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded ${
              volumeDelta > 0 ? 'bg-emerald-500/20 text-emerald-400' : volumeDelta < 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
            }`}>
              {volumeDelta > 0 ? `+${volumeDelta}%` : `${volumeDelta}%`}
            </span>
          </div>
          <input
            type="range"
            min="-40"
            max="50"
            step="1"
            value={volumeDelta}
            onChange={(e) => setVolumeDelta(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>-40% (Recesión)</span>
            <span>Base (0%)</span>
            <span>+50% (Expansión)</span>
          </div>
        </div>

        {/* Slider 3: Costos Fijos */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Costos Fijos Operativos:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded ${
              fixedCostDelta < 0 ? 'bg-emerald-500/20 text-emerald-400' : fixedCostDelta > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
            }`}>
              {fixedCostDelta > 0 ? `+${fixedCostDelta}%` : `${fixedCostDelta}%`}
            </span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            value={fixedCostDelta}
            onChange={(e) => setFixedCostDelta(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>-30% (Optimización)</span>
            <span>Base (0%)</span>
            <span>+30% (Inflación)</span>
          </div>
        </div>

        {/* Slider 4: Costos Variables */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Costos Variables / Insumos:</span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded ${
              variableCostDelta < 0 ? 'bg-emerald-500/20 text-emerald-400' : variableCostDelta > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
            }`}>
              {variableCostDelta > 0 ? `+${variableCostDelta}%` : `${variableCostDelta}%`}
            </span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            step="1"
            value={variableCostDelta}
            onChange={(e) => setVariableCostDelta(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>-30% (Ahorro)</span>
            <span>Base (0%)</span>
            <span>+30% (Sobrecosto)</span>
          </div>
        </div>
      </div>

      {/* Results Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Result 1: Ventas y Utilidad Bruta */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase">Ventas Netas Simuladas</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>

          <div className="text-2xl font-black text-white font-mono">
            {formatCurrency(simVentas)}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Escenario Base:</span>
              <span className="text-slate-300 font-mono">{formatCurrency(baseKpis.ventasTotales)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Variación Ingresos:</span>
              <span className={`font-mono font-bold ${
                simVentas >= baseKpis.ventasTotales ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {simVentas >= baseKpis.ventasTotales ? '+' : ''}{formatCurrency(simVentas - baseKpis.ventasTotales)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Margen Bruto Simulado:</span>
              <span className="font-mono text-teal-300 font-semibold">{formatPercent(simMargenBrutoPct)}</span>
            </div>
          </div>
        </div>

        {/* Result 2: Utilidad Neta y EBITDA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase">Utilidad Neta Proyectada</span>
            <TrendingUp className="h-4 w-4 text-teal-400" />
          </div>

          <div className={`text-2xl font-black font-mono ${
            simUtilidadNeta >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {formatCurrency(simUtilidadNeta)}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">EBITDA Simulado:</span>
              <span className="text-slate-200 font-mono font-bold">{formatCurrency(simEbitda)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Delta vs Base:</span>
              <span className={`font-mono font-bold ${
                deltaUtilidad >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {deltaUtilidad >= 0 ? '+' : ''}{formatCurrency(deltaUtilidad)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rentabilidad Neta:</span>
              <span className="font-mono text-slate-300 font-semibold">{formatPercent(simVentas > 0 ? simUtilidadNeta / simVentas : 0)}</span>
            </div>
          </div>
        </div>

        {/* Result 3: Nuevo Punto de Equilibrio */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase">Nuevo Punto de Equilibrio</span>
            <Scale className="h-4 w-4 text-indigo-400" />
          </div>

          <div className="text-2xl font-black text-white font-mono">
            {formatCurrency(simPuntoEquilibrio)}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Punto Equilibrio Base:</span>
              <span className="text-slate-300 font-mono">{formatCurrency(baseKpis.puntoEquilibrioDinero)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Margen de Seguridad:</span>
              <span className={`font-mono font-bold ${
                simMargenSeguridadPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {simMargenSeguridadPct.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estado Financiero:</span>
              <span className={`font-bold ${
                simVentas >= simPuntoEquilibrio ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {simVentas >= simPuntoEquilibrio ? 'Zona de Ganancia' : 'Zona de Pérdida'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Strategic Insight Box */}
      <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3 text-xs text-slate-300">
        <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-white mb-1">Diagnóstico Estratégico del Escenario:</div>
          <p>
            {simVentas >= simPuntoEquilibrio ? (
              <span>
                El modelo es resiliente. Con una facturación de <strong>{formatCurrency(simVentas)}</strong> y costos fijos de <strong>{formatCurrency(simCostosFijos)}</strong>, la operación cubre sus compromisos y genera un excedente neto de <strong>{formatCurrency(simUtilidadNeta)}</strong>. La elasticidad precio-volumen demuestra que un ajuste favorable en márgenes incrementa el beneficio en {formatCurrency(deltaUtilidad)}.
              </span>
            ) : (
              <span className="text-rose-300">
                Alerta de insolvencia operativa en este escenario: las ventas netas ({formatCurrency(simVentas)}) caen por debajo del punto de equilibrio ({formatCurrency(simPuntoEquilibrio)}). Se requiere reducir costos fijos o renegociar costos variables para restablecer el umbral de rentabilidad.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
