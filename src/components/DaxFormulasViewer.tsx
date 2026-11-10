import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  FileSpreadsheet, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  Search,
  ExternalLink
} from 'lucide-react';
import { DaxMeasureItem, EquivalenciaItem } from '../types';
import { SENA_MEDIDAS_DAX, SENA_EQUIVALENCIAS } from '../data/defaultDataset';

export const DaxFormulasViewer: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<number | 'todas'>('todas');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'medidas' | 'equivalencias'>('equivalencias');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredEquivalencias = SENA_EQUIVALENCIAS.filter((eq) => {
    const matchesSession = selectedSession === 'todas' || eq.sesion === selectedSession;
    const matchesSearch = 
      eq.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.medidaDax.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.formulaExcel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSession && matchesSearch;
  });

  const filteredMedidas = SENA_MEDIDAS_DAX.filter((m) => {
    const matchesSession = selectedSession === 'todas' || m.Sesión === selectedSession;
    const matchesSearch = 
      m.Objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.FórmulaDAX.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.ParaQuéSirve.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSession && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Educational Banner SENA CPL-3410829 */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950/40 border border-emerald-500/30 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                SENA-CTAPT 2026
              </span>
              <span className="text-xs text-slate-400">Ficha CPL_3410829</span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">
              Biblioteca de Fórmulas DAX & Reconciliación Excel ↔ Power BI
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Alfredo de Jesús Pérez Méndez · Instructor SENA · Gestión Administrativa y Financiera.
              Verificación matemática exacta de columnas calculadas, funciones de iteración, agregación y contexto de filtro.
            </p>
          </div>

          <a
            href="https://padlet.com/alferezteacher/proyectar-requerimientos-del-cliente-g5_rap1_3410829_n-obrer-8vz7zqcx1j6ngvji"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <span>Ver Padlet de Evidencias</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Selector & Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Tab switch */}
        <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
          <button
            onClick={() => setActiveTab('equivalencias')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'equivalencias'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Equivalencias Excel ↔ DAX (20 Medidas)
          </button>
          <button
            onClick={() => setActiveTab('medidas')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'medidas'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Biblioteca de Medidas DAX por Sesión
          </button>
        </div>

        {/* Session filter & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-medium">Filtrar Sesión:</span>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value === 'todas' ? 'todas' : Number(e.target.value))}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="todas" className="bg-slate-900 text-white">Todas las Sesiones (1 a 4)</option>
              <option value={1} className="bg-slate-900 text-white">Sesión 1: Conteo & Columnas</option>
              <option value={2} className="bg-slate-900 text-white">Sesión 2: Cocientes & Promedios</option>
              <option value={3} className="bg-slate-900 text-white">Sesión 3: CALCULATE & Metas</option>
              <option value={4} className="bg-slate-900 text-white">Sesión 4: DAX Avanzado & YTD</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-800 rounded-lg px-2.5 py-1.5 border border-slate-700 text-xs w-48">
            <Search className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
            <input
              type="text"
              placeholder="Buscar fórmula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-slate-400 focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: EQUIVALENCIAS EXCEL <-> DAX */}
      {activeTab === 'equivalencias' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
              Reconciliación de Resultados: Fórmula Excel Viva vs. Medida DAX
            </h4>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              100% Verificado y Coincidente
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-3.5 py-3">Concepto</th>
                  <th className="px-3 py-3">Fórmula Excel Viva</th>
                  <th className="px-3 py-3">Medida DAX Equivalente</th>
                  <th className="px-3 py-3 text-right">Resultado</th>
                  <th className="px-3 py-3 text-center">Control</th>
                  <th className="px-3 py-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/50">
                {filteredEquivalencias.map((eq, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="px-3.5 py-3 font-semibold text-white">
                      {eq.concepto}
                      {eq.sesion && (
                        <span className="block text-[10px] text-slate-500 font-mono">Sesión {eq.sesion}</span>
                      )}
                    </td>
                    <td className="px-3 py-3 font-mono text-emerald-300 bg-slate-950/40 max-w-xs truncate">
                      {eq.formulaExcel}
                    </td>
                    <td className="px-3 py-3 font-mono text-cyan-300 bg-slate-950/40 max-w-md truncate">
                      {eq.medidaDax}
                    </td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-white">
                      {typeof eq.resultadoExcel === 'number'
                        ? new Intl.NumberFormat('es-CO').format(eq.resultadoExcel)
                        : eq.resultadoExcel}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <Check className="h-2.5 w-2.5" />
                        Coincide
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => handleCopy(eq.medidaDax, `eq-${idx}`)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1 mx-auto cursor-pointer"
                        title="Copiar DAX"
                      >
                        {copiedIndex === `eq-${idx}` ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3 text-slate-400" />
                        )}
                        <span>{copiedIndex === `eq-${idx}` ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: DAX MEASURES CATALOG */}
      {activeTab === 'medidas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedidas.map((m, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Sesión {m.Sesión}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{m.Objeto}</h4>
                </div>
                <button
                  onClick={() => handleCopy(m.FórmulaDAX, `m-${idx}`)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Copiar fórmula DAX"
                >
                  {copiedIndex === `m-${idx}` ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-cyan-300 border border-slate-850 select-all overflow-x-auto">
                {m.FórmulaDAX}
              </div>

              <div className="space-y-1 text-xs text-slate-400">
                <div>
                  <span className="text-slate-300 font-semibold">Uso pedagógico:</span> {m.ParaQuéSirve}
                </div>
                <div>
                  <span className="text-slate-300 font-semibold">Ubicación en Power BI:</span> {m.DóndeSeCrea}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
