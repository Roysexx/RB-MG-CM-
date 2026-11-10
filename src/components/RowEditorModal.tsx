import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { FactVentaRow, InventoryItem, CompraItem, GastoCostoItem, DimRegionItem, DimClienteItem } from '../types';

interface RowEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: string; // 'ventas' | 'inventarios' | 'compras' | 'gastos' | 'regiones' | 'clientes'
  initialData?: any;
  onSaveRow: (table: string, data: any) => void;
}

export const RowEditorModal: React.FC<RowEditorModalProps> = ({
  isOpen,
  onClose,
  table,
  initialData,
  onSaveRow,
}) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      // Default empty values based on table
      if (table === 'ventas') {
        setFormData({
          id: `FV-${Date.now()}`,
          PedidoID: `P${Math.floor(Math.random() * 900 + 100)}`,
          Fecha: new Date().toISOString().slice(0, 10),
          Región: 'Bogotá',
          Servicio: 'Transporte',
          ClienteID: 'C01',
          Cantidad: 10,
          PrecioUnitario: 500000,
          DescuentoPct: 0.05,
          Mes: new Date().getMonth() + 1,
        });
      } else if (table === 'inventarios') {
        setFormData({
          sku: `SKU-${Math.floor(Math.random() * 900 + 100)}`,
          nombre: '',
          categoria: 'General',
          stockInicial: 20,
          entradas: 0,
          salidas: 0,
          stockActual: 20,
          stockSeguridad: 10,
          puntoReorden: 15,
          costoUnitario: 50000,
          precioVentaSugerido: 90000,
          valorInventario: 1000000,
          rotacionVeces: 3,
          diasInventario: 60,
          estado: 'Optimo',
        });
      } else if (table === 'gastos') {
        setFormData({
          id: `GC-${Date.now()}`,
          codigo: `GC-${Math.floor(Math.random() * 900 + 100)}`,
          concepto: '',
          clasificacion: 'Costo Fijo',
          periodo: 'Semestral',
          monto: 2000000,
          responsable: 'Administración',
          descripcion: '',
        });
      } else if (table === 'regiones') {
        setFormData({
          Región: '',
          Departamento: '',
          MetaSemestral: 40000000,
          Supervisor: '',
        });
      } else if (table === 'clientes') {
        setFormData({
          ClienteID: `C${Math.floor(Math.random() * 90 + 10)}`,
          NombreCliente: '',
          Región: 'Bogotá',
          Contacto: '',
          Telefono: '',
          CupoCredito: 25000000,
        });
      }
    }
  }, [table, initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Auto calculate derived fields for FactVentas
    if (table === 'ventas') {
      const cant = Number(formData.Cantidad || 1);
      const pu = Number(formData.PrecioUnitario || 0);
      const desc = Number(formData.DescuentoPct || 0);
      const imp = cant * pu * (1 - desc);
      const cu = Number(formData.CostoUnitario || (pu * 0.6));
      const ct = cant * cu;

      const prepared = {
        ...formData,
        Cantidad: cant,
        PrecioUnitario: pu,
        DescuentoPct: desc,
        Importe: imp,
        PrecioNeto: cant > 0 ? imp / cant : pu,
        Bruto: cant * pu,
        Mes: Number(formData.Mes || 1),
        CostoUnitario: cu,
        CostoTotal: ct,
        MargenBruto: imp - ct,
      };
      onSaveRow(table, prepared);
    } else if (table === 'inventarios') {
      const stockAct = Number(formData.stockInicial || 0) + Number(formData.entradas || 0) - Number(formData.salidas || 0);
      const cu = Number(formData.costoUnitario || 0);
      const prepared = {
        ...formData,
        stockActual: stockAct,
        valorInventario: stockAct * cu,
      };
      onSaveRow(table, prepared);
    } else {
      onSaveRow(table, formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white">
            {initialData ? 'Editar Registro' : 'Añadir Nuevo Registro'} - Tabla {table.toUpperCase()}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* FactVentas Form */}
          {table === 'ventas' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Pedido ID:</label>
                  <input
                    type="text"
                    required
                    value={formData.PedidoID || ''}
                    onChange={(e) => setFormData({ ...formData, PedidoID: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Fecha:</label>
                  <input
                    type="date"
                    required
                    value={formData.Fecha || ''}
                    onChange={(e) => {
                      const dt = new Date(e.target.value);
                      setFormData({ 
                        ...formData, 
                        Fecha: e.target.value,
                        Mes: isNaN(dt.getMonth()) ? 1 : dt.getMonth() + 1
                      });
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Región:</label>
                  <select
                    value={formData.Región || 'Costa'}
                    onChange={(e) => setFormData({ ...formData, Región: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  >
                    <option value="Urabá">Urabá</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Costa">Costa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Servicio / Línea:</label>
                  <select
                    value={formData.Servicio || 'Transporte'}
                    onChange={(e) => setFormData({ ...formData, Servicio: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  >
                    <option value="Transporte">Transporte</option>
                    <option value="Distribución">Distribución</option>
                    <option value="Almacenamiento">Almacenamiento</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cliente ID:</label>
                  <input
                    type="text"
                    required
                    value={formData.ClienteID || ''}
                    onChange={(e) => setFormData({ ...formData, ClienteID: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.Cantidad || 1}
                    onChange={(e) => setFormData({ ...formData, Cantidad: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Descuento (0 - 1):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.DescuentoPct ?? 0}
                    onChange={(e) => setFormData({ ...formData, DescuentoPct: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Precio Unitario ($):</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.PrecioUnitario || 0}
                  onChange={(e) => setFormData({ ...formData, PrecioUnitario: Number(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>
            </>
          )}

          {/* Inventarios Form */}
          {table === 'inventarios' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">SKU:</label>
                  <input
                    type="text"
                    required
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Categoría:</label>
                  <input
                    type="text"
                    required
                    value={formData.categoria || ''}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Nombre del Item / Insumo:</label>
                <input
                  type="text"
                  required
                  value={formData.nombre || ''}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Stock Inicial:</label>
                  <input
                    type="number"
                    value={formData.stockInicial || 0}
                    onChange={(e) => setFormData({ ...formData, stockInicial: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Costo Unitario:</label>
                  <input
                    type="number"
                    value={formData.costoUnitario || 0}
                    onChange={(e) => setFormData({ ...formData, costoUnitario: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Pto. Reorden:</label>
                  <input
                    type="number"
                    value={formData.puntoReorden || 0}
                    onChange={(e) => setFormData({ ...formData, puntoReorden: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>
            </>
          )}

          {/* Regiones Form */}
          {table === 'regiones' && (
            <>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nombre de la Región:</label>
                <input
                  type="text"
                  required
                  value={formData.Región || ''}
                  onChange={(e) => setFormData({ ...formData, Región: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Departamento:</label>
                  <input
                    type="text"
                    required
                    value={formData.Departamento || ''}
                    onChange={(e) => setFormData({ ...formData, Departamento: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Meta Semestral ($):</label>
                  <input
                    type="number"
                    required
                    value={formData.MetaSemestral || 0}
                    onChange={(e) => setFormData({ ...formData, MetaSemestral: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>
            </>
          )}

          {/* Clientes Form */}
          {table === 'clientes' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cliente ID:</label>
                  <input
                    type="text"
                    required
                    value={formData.ClienteID || ''}
                    onChange={(e) => setFormData({ ...formData, ClienteID: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Región Sede:</label>
                  <input
                    type="text"
                    required
                    value={formData.Región || ''}
                    onChange={(e) => setFormData({ ...formData, Región: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Razón Social / Nombre:</label>
                <input
                  type="text"
                  required
                  value={formData.NombreCliente || ''}
                  onChange={(e) => setFormData({ ...formData, NombreCliente: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Contacto Comercial:</label>
                  <input
                    type="text"
                    value={formData.Contacto || ''}
                    onChange={(e) => setFormData({ ...formData, Contacto: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Cupo de Crédito ($):</label>
                  <input
                    type="number"
                    value={formData.CupoCredito || 0}
                    onChange={(e) => setFormData({ ...formData, CupoCredito: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Guardar Registro</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
