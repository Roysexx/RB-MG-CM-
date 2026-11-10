import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  FileSpreadsheet, 
  FileText, 
  Code2, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Layers
} from 'lucide-react';
import { FullAppDataset } from '../utils/ticExportImport';
import { FinancialKPIs, DaxMeasureItem } from '../types';
import { 
  exportToExcel, 
  exportToCSV, 
  exportToJSON, 
  exportToDax, 
  exportToMQuery, 
  exportToSQL,
  parseUploadedFile 
} from '../utils/ticExportImport';
import { SENA_MEDIDAS_DAX } from '../data/defaultDataset';

interface TicCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: FullAppDataset;
  kpis: FinancialKPIs;
  onImportDataset: (importedData: Partial<FullAppDataset>) => void;
}

export const TicCenterModal: React.FC<TicCenterModalProps> = ({
  isOpen,
  onClose,
  dataset,
  kpis,
  onImportDataset,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [importStatus, setImportStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    setImportStatus({ loading: true });
    const result = await parseUploadedFile(file);
    if (result.success && result.dataset) {
      onImportDataset(result.dataset);
      setImportStatus({
        loading: false,
        success: true,
        message: result.message,
      });
    } else {
      setImportStatus({
        loading: false,
        success: false,
        message: result.message,
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md">
              <Layers className="h-5 w-5 text-slate-950 font-black" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Centro de Operaciones TIC: Carga y Descarga de Bases de Datos
              </h3>
              <p className="text-xs text-slate-400">
                Compatibilidad total con ecosistemas de oficina, business intelligence y motores de bases de datos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upload Zone (Drag & Drop) */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Upload className="h-4 w-4 text-emerald-400" />
            1. Cargar Archivo de Datos (.xlsx, .xls, .csv, .json)
          </h4>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              dragOver 
                ? 'border-emerald-400 bg-emerald-950/20' 
                : 'border-slate-700 bg-slate-950/50 hover:border-slate-600'
            }`}
          >
            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-200">
              Arrastra y suelta tu archivo aquí, o haz clic para seleccionarlo
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Soporta libros de Excel (.xlsx, .xls), tablas planas (.csv) y copias de seguridad estructuradas (.json)
            </p>

            <label className="inline-block mt-3 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg cursor-pointer transition-all shadow-sm">
              <span>Seleccionar Archivo</span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv,.json"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </label>

            {importStatus.message && (
              <div className={`mt-3 p-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 ${
                importStatus.success ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}>
                {importStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <span>{importStatus.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Download Grid in all TIC Extensions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Download className="h-4 w-4 text-emerald-400" />
            2. Descargar en Formatos TIC Especializados
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* 1. EXCEL XLSX */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between space-y-3 hover:border-emerald-500/50 transition-all">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Libro de Excel (.xlsx)</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Libro multihas: FactVentas, Inventario, Compras, Gastos, Regiones y KPIs
                  </p>
                </div>
              </div>
              <button
                onClick={() => exportToExcel(dataset, kpis)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Descargar .XLSX</span>
              </button>
            </div>

            {/* 2. CSV Plana */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between space-y-3 hover:border-teal-500/50 transition-all">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Valores Separados (.csv)</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Tabla plana de FactVentas con codificación UTF-8 para Excel y Power BI
                  </p>
                </div>
              </div>
              <button
                onClick={() => exportToCSV(dataset.FactVentas, 'FactVentas_SENA_CPL3410829.csv')}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Descargar .CSV</span>
              </button>
            </div>

            {/* 3. JSON Backup */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between space-y-3 hover:border-sky-500/50 transition-all">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Estructura JSON (.json)</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Respaldo completo de la base de datos compatible con API y desarrollo web
                  </p>
                </div>
              </div>
              <button
                onClick={() => exportToJSON(dataset)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Descargar .JSON</span>
              </button>
            </div>

            {/* 4. Power BI DAX */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between space-y-3 hover:border-amber-500/50 transition-all">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Modelo DAX (.dax)</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Fórmulas DAX de las sesiones SENA listas para la barra de fórmulas de Power BI
                  </p>
                </div>
              </div>
              <button
                onClick={() => exportToDax(SENA_MEDIDAS_DAX)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Descargar .DAX</span>
              </button>
            </div>

            {/* 5. Power Query M */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between space-y-3 hover:border-indigo-500/50 transition-all">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Power Query M (.pq)</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Script ETL para cargar y tipificar FactVentas en el Editor de Power Query
                  </p>
                </div>
              </div>
              <button
                onClick={() => exportToMQuery()}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Descargar .PQ</span>
              </button>
            </div>

            {/* 6. SQL DDL / DML */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between space-y-3 hover:border-purple-500/50 transition-all">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Script SQL (.sql)</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    CREATE TABLE e INSERT INTO para PostgreSQL, MySQL o SQLite
                  </p>
                </div>
              </div>
              <button
                onClick={() => exportToSQL(dataset)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Descargar .SQL</span>
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
