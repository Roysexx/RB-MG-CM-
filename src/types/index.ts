export type SectorType = 
  | 'logistica' 
  | 'retail' 
  | 'manufactura' 
  | 'alimentos' 
  | 'salud' 
  | 'personalizado';

export interface FactVentaRow {
  id: string;
  PedidoID: string;
  Fecha: string; // YYYY-MM-DD
  Región: string;
  Servicio: string;
  ClienteID: string;
  Cantidad: number;
  PrecioUnitario: number;
  DescuentoPct: number; // e.g. 0.05
  Importe: number; // Cantidad * PrecioUnitario * (1 - DescuentoPct)
  PrecioNeto: number; // Importe / Cantidad
  Bruto: number; // Cantidad * PrecioUnitario
  Mes: number; // 1 to 12
  CostoUnitario?: number; // Cost of service / product
  CostoTotal?: number; // Cantidad * CostoUnitario
  MargenBruto?: number; // Importe - CostoTotal
}

export interface InventoryItem {
  sku: string;
  nombre: string;
  categoria: string;
  stockInicial: number;
  entradas: number; // compras acumuladas
  salidas: number; // ventas acumuladas
  stockActual: number; // stockInicial + entradas - salidas
  stockSeguridad: number;
  puntoReorden: number;
  costoUnitario: number;
  precioVentaSugerido: number;
  valorInventario: number; // stockActual * costoUnitario
  ventasUnidadesPeriodo: number;
  rotacionVeces: number; // Costo Ventas / Inv Promedio
  diasInventario: number; // 180 / rotacion
  estado: 'Optimo' | 'Alerta Reorden' | 'Critico Agotado' | 'Sobre stock';
}

export interface CompraItem {
  id: string;
  compraID: string;
  fecha: string;
  proveedor: string;
  sku: string;
  descripcion: string;
  cantidad: number;
  costoUnitario: number;
  costoTotal: number;
  tiempoEntregaDias: number;
  estado: 'Recibido' | 'En Tránsito' | 'Pendiente' | 'Cancelado';
}

export interface GastoCostoItem {
  id: string;
  codigo: string;
  concepto: string;
  clasificacion: 'Costo Fijo' | 'Costo Variable' | 'Gasto Administrativo' | 'Gasto de Ventas' | 'Gasto Financiero';
  periodo: string; // e.g. "2026-01" o "Mensual"
  monto: number;
  responsable: string;
  descripcion: string;
}

export interface DimRegionItem {
  Región: string;
  Departamento: string;
  MetaSemestral: number;
  Supervisor?: string;
}

export interface DimClienteItem {
  ClienteID: string;
  NombreCliente: string;
  Región: string;
  Contacto?: string;
  Telefono?: string;
  CupoCredito?: number;
}

export interface DaxMeasureItem {
  Sesión: number | string;
  Objeto: string;
  FórmulaDAX: string;
  ParaQuéSirve: string;
  DóndeSeCrea: string;
  ResultadoEsperado?: string | number;
}

export interface EquivalenciaItem {
  concepto: string;
  formulaExcel: string;
  medidaDax: string;
  resultadoExcel: number | string;
  valorPresentacion: number | string;
  control: string;
  sesion?: number;
}

export interface FinancialKPIs {
  // Ventas & Ingresos
  ventasTotales: number;
  ventasBrutas: number;
  totalDescuentos: number;
  pctDescuentoPromedio: number;
  totalPedidos: number;
  totalClientes: number;
  totalLineas: number;
  totalUnidadesVendidas: number;
  ticketPromedio: number;
  precioNetoPromedio: number;

  // Costos & Utilidad
  costoVentasTotal: number;
  utilidadBruta: number;
  margenBrutoPct: number;

  // Gastos & Operación
  gastosFijosTotal: number;
  gastosVariablesTotal: number;
  gastosOperativosTotal: number;
  utilidadOperativa: number; // EBITDA approx
  margenOperativoPct: number;
  utilidadNetaEstimada: number;
  margenNetoPct: number;

  // Punto de Equilibrio
  puntoEquilibrioDinero: number;
  puntoEquilibrioUnidades: number;
  coberturaPuntoEquilibrioPct: number; // Ventas / PuntoEquilibrioDinero * 100
  margenSeguridadPct: number; // (Ventas - PE) / Ventas * 100

  // Inventarios
  valorInventarioTotal: number;
  rotacionInventarioPromedio: number;
  diasInventarioPromedio: number;
  gmroi: number; // Retorno de Margen Bruto sobre la Inversión en Inventario
  itemsEnRiesgo: number;

  // Metas
  metaSemestralTotal: number;
  pctCumplimientoTotal: number;
}

export interface RegionSummary {
  region: string;
  departamento: string;
  ventas: number;
  meta: number;
  pctCumplimiento: number;
  participacionPct: number;
  pedidos: number;
  ticketPromedio: number;
  unidades: number;
}

export interface MonthlySummary {
  mes: number;
  nombreMes: string;
  ventas: number;
  ventasAnterior: number;
  varMoMPct: number;
  acumuladoYTD: number;
  costo: number;
  utilidadBruta: number;
  pedidos: number;
}

export interface ClientRankingSummary {
  clienteId: string;
  nombreCliente: string;
  region: string;
  ventas: number;
  pedidos: number;
  participacionPct: number;
  ranking: number;
  segmento: 'Oro' | 'Plata' | 'Bronce';
  cumplimientoMetaEstimada?: number;
}
