import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  Scale, 
  Package, 
  Building2 
} from 'lucide-react';
import { FinancialKPIs, RegionSummary, ClientRankingSummary } from '../types';
import { formatCurrency, formatPercent, formatNumber } from '../utils/calculations';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpis: FinancialKPIs;
  regionSummaries: RegionSummary[];
  clientRankings: ClientRankingSummary[];
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen,
  onClose,
  kpis,
  regionSummaries,
  clientRankings,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" />
            <span className="text-base font-bold text-white">
              Informe Formal de Gestión Gerencial y Financiera
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer shadow-sm transition-all"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Imprimir / Guardar en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div 
          ref={reportRef} 
          className="bg-white text-slate-900 rounded-xl p-8 sm:p-10 shadow-lg space-y-6 print:p-0 print:shadow-none print:m-0"
        >
          {/* Institutional Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-emerald-700">
                SENA · CTAPT 2026 · GESTIÓN ADMINISTRATIVA Y FINANCIERA
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                INFORME DE GESTIÓN INTEGRAL: FINANZAS E INVENTARIOS
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Ficha CPL_3410829 · Evaluación de Actividades, Rotación de Stock, Rentabilidad y Punto de Equilibrio
              </p>
            </div>

            <div className="text-right text-xs text-slate-600 border-l sm:border-l-0 pl-3 sm:pl-0 border-slate-200">
              <div><strong>Vigencia:</strong> Semestre I (2026)</div>
              <div><strong>Fecha de Emisión:</strong> {new Date().toLocaleDateString('es-CO')}</div>
              <div><strong>Estado:</strong> Dictamen Favorable</div>
            </div>
          </div>

          {/* 1. Resumen Ejecutivo */}
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-slate-900 border-b border-slate-200 pb-1">
              1. Resumen Ejecutivo de la Operación
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Durante el primer semestre del ejercicio 2026, la organización consolidó unos ingresos brutos de <strong>{formatCurrency(kpis.ventasBrutas)}</strong>, otorgando descuentos comerciales por <strong>{formatCurrency(kpis.totalDescuentos)}</strong> ({formatPercent(kpis.pctDescuentoPromedio)}), logrando ventas netas efectivas de <strong>{formatCurrency(kpis.ventasTotales)}</strong>. Con respecto a la meta presupuestal de <strong>{formatCurrency(kpis.metaSemestralTotal)}</strong>, la compañía alcanzó un cumplimiento global del <strong>{formatPercent(kpis.pctCumplimientoTotal)}</strong>, destacando un desempeño sobresaliente en las plazas de Urabá (106.4%) y Bogotá (103.2%).
            </p>
          </div>

          {/* 2. Cuadro Maestro de KPIs */}
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-slate-900 border-b border-slate-200 pb-1">
              2. Indicadores Clave de Desempeño (KPIs Financieros y Administrativos)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Ventas Netas</span>
                <strong className="text-slate-900 font-mono text-sm">{formatCurrency(kpis.ventasTotales)}</strong>
                <span className="block text-[10px] text-emerald-700 mt-0.5">{formatPercent(kpis.pctCumplimientoTotal)} de Meta</span>
              </div>

              <div className="p-3 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Utilidad Bruta</span>
                <strong className="text-slate-900 font-mono text-sm">{formatCurrency(kpis.utilidadBruta)}</strong>
                <span className="block text-[10px] text-teal-700 mt-0.5">Margen: {formatPercent(kpis.margenBrutoPct)}</span>
              </div>

              <div className="p-3 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">EBITDA Operativo</span>
                <strong className="text-slate-900 font-mono text-sm">{formatCurrency(kpis.utilidadOperativa)}</strong>
                <span className="block text-[10px] text-indigo-700 mt-0.5">Margen Op: {formatPercent(kpis.margenOperativoPct)}</span>
              </div>

              <div className="p-3 rounded border border-slate-200 bg-slate-50">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Punto de Equilibrio</span>
                <strong className="text-slate-900 font-mono text-sm">{formatCurrency(kpis.puntoEquilibrioDinero)}</strong>
                <span className="block text-[10px] text-emerald-700 mt-0.5">Seguridad: +{kpis.margenSeguridadPct.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* 3. Diagnóstico de Inventarios y Rotación */}
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-slate-900 border-b border-slate-200 pb-1">
              3. Gestión de Inventarios, Rotación y Aprovisionamiento
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Valor del Inventario</span>
                <strong className="text-slate-900 font-mono text-sm">{formatCurrency(kpis.valorInventarioTotal)}</strong>
                <p className="text-[10px] text-slate-600 mt-1">Existencias valoradas a Costo Promedio Ponderado.</p>
              </div>

              <div className="p-3 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Rotación de Inventarios</span>
                <strong className="text-slate-900 font-mono text-sm">{kpis.rotacionInventarioPromedio.toFixed(2)} veces</strong>
                <p className="text-[10px] text-slate-600 mt-1">Velocidad de reposición del stock en el semestre.</p>
              </div>

              <div className="p-3 rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Días de Inventario (DIO)</span>
                <strong className="text-slate-900 font-mono text-sm">{Math.round(kpis.diasInventarioPromedio)} días</strong>
                <p className="text-[10px] text-slate-600 mt-1">Periodo medio de permanencia antes de la salida.</p>
              </div>
            </div>
          </div>

          {/* 4. Comportamiento por Región y Clientes */}
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-slate-900 border-b border-slate-200 pb-1">
              4. Desempeño Regional y Concentración de Clientes
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Región</th>
                    <th className="p-2 text-right">Ventas Netas ($)</th>
                    <th className="p-2 text-right">Meta Semestral ($)</th>
                    <th className="p-2 text-center">% Cumplimiento</th>
                    <th className="p-2 text-center">% Participación</th>
                    <th className="p-2 text-right">Ticket Promedio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {regionSummaries.map((r) => (
                    <tr key={r.region}>
                      <td className="p-2 font-sans font-semibold text-slate-900">{r.region}</td>
                      <td className="p-2 text-right">{formatCurrency(r.ventas)}</td>
                      <td className="p-2 text-right text-slate-600">{formatCurrency(r.meta)}</td>
                      <td className="p-2 text-center font-bold text-slate-900">{formatPercent(r.pctCumplimiento)}</td>
                      <td className="p-2 text-center">{formatPercent(r.participacionPct)}</td>
                      <td className="p-2 text-right">{formatCurrency(r.ticketPromedio)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Hallazgos y Recomendaciones Estratégicas */}
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-slate-900 border-b border-slate-200 pb-1">
              5. Hallazgos Gerenciales y Recomendaciones Estratégicas
            </h2>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 leading-relaxed">
              <li>
                <strong>Solvencia sobre el Punto de Equilibrio:</strong> Con un umbral mínimo de facturación fijado en {formatCurrency(kpis.puntoEquilibrioDinero)}, la organización opera con un margen de seguridad del {kpis.margenSeguridadPct.toFixed(1)}%, garantizando solvencia para cubrir compromisos fijos de nómina, arriendos y seguros.
              </li>
              <li>
                <strong>Liderazgo de Líneas de Servicio:</strong> El servicio de Transporte representa el 67.4% de los ingresos totales ({formatCurrency(144922000)}), siendo el núcleo de generación de flujo de caja, mientras que Almacenamiento presenta oportunidad de optimización de capacidad instalada.
              </li>
              <li>
                <strong>Plan de Choque para la Región Costa:</strong> A pesar de concentrar el mayor volumen ({formatCurrency(85384500)}), el cumplimiento de meta fue del 88.9%. Se recomienda focalizar la fuerza comercial en el cliente Logística Theta y Puerto Épsilon para cerrar la brecha en el siguiente periodo.
              </li>
              <li>
                <strong>Eficiencia en Gestión de Abastecimiento:</strong> El stock crítico detectado en insumos como combustible diésel y repuestos automotrices requiere contratos de suministro continuos con entrega en 48 horas para prevenir paradas operativas no programadas.
              </li>
            </ol>
          </div>

          {/* 6. Bloque de Firmas y Responsables */}
          <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-3 gap-6 text-center text-xs text-slate-800">
            <div>
              <div className="h-10 border-b border-slate-400 mb-1"></div>
              <strong className="block text-slate-900">Alfredo de Jesús Pérez Méndez</strong>
              <span className="text-[10px] text-slate-500">Instructor Líder SENA · CPL_3410829</span>
            </div>

            <div>
              <div className="h-10 border-b border-slate-400 mb-1"></div>
              <strong className="block text-slate-900">Dirección General y Operaciones</strong>
              <span className="text-[10px] text-slate-500">Gerencia de Operaciones y Logística</span>
            </div>

            <div>
              <div className="h-10 border-b border-slate-400 mb-1"></div>
              <strong className="block text-slate-900">Revisoría Fiscal & Contraloría</strong>
              <span className="text-[10px] text-slate-500">Certificación Financiera y Tributaria</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
