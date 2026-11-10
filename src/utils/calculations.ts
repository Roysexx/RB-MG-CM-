import { 
  FactVentaRow, 
  InventoryItem, 
  GastoCostoItem, 
  DimRegionItem, 
  DimClienteItem, 
  FinancialKPIs, 
  RegionSummary, 
  MonthlySummary, 
  ClientRankingSummary 
} from '../types';

export function formatCurrency(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return '$ 0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  if (isNaN(value) || !isFinite(value)) return '0.0%';
  return `${(value * 100).toFixed(2)}%`;
}

export function formatNumber(value: number, decimals: number = 0): string {
  if (isNaN(value) || !isFinite(value)) return '0';
  return new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: decimals,
  }).format(value);
}

export function computeFinancialKPIs(
  ventas: FactVentaRow[],
  inventario: InventoryItem[],
  gastosCostos: GastoCostoItem[],
  regiones: DimRegionItem[]
): FinancialKPIs {
  // Ventas & Ingresos
  let ventasTotales = 0;
  let ventasBrutas = 0;
  let totalUnidadesVendidas = 0;
  let costoVentasTotal = 0;
  const pedidosSet = new Set<string>();
  const clientesSet = new Set<string>();

  for (const row of ventas) {
    const rowBruto = row.Bruto ?? (row.Cantidad * row.PrecioUnitario);
    const rowImporte = row.Importe ?? (row.Cantidad * row.PrecioUnitario * (1 - (row.DescuentoPct || 0)));
    const rowCosto = row.CostoTotal ?? (row.Cantidad * (row.CostoUnitario || (row.PrecioUnitario * 0.6)));

    ventasTotales += rowImporte;
    ventasBrutas += rowBruto;
    totalUnidadesVendidas += (row.Cantidad || 0);
    costoVentasTotal += rowCosto;

    if (row.PedidoID) pedidosSet.add(row.PedidoID);
    if (row.ClienteID) clientesSet.add(row.ClienteID);
  }

  const totalDescuentos = Math.max(0, ventasBrutas - ventasTotales);
  const pctDescuentoPromedio = ventasBrutas > 0 ? (totalDescuentos / ventasBrutas) : 0;
  const totalPedidos = pedidosSet.size || 1;
  const totalClientes = clientesSet.size;
  const totalLineas = ventas.length;

  const ticketPromedio = totalPedidos > 0 ? (ventasTotales / totalPedidos) : 0;
  const precioNetoPromedio = totalUnidadesVendidas > 0 ? (ventasTotales / totalUnidadesVendidas) : 0;

  // Utilidad Bruta
  const utilidadBruta = ventasTotales - costoVentasTotal;
  const margenBrutoPct = ventasTotales > 0 ? (utilidadBruta / ventasTotales) : 0;

  // Gastos Fijos y Variables
  let gastosFijosTotal = 0;
  let gastosVariablesTotal = 0;
  let gastosOperativosTotal = 0;

  for (const gc of gastosCostos) {
    if (gc.clasificacion === 'Costo Fijo' || gc.clasificacion === 'Gasto Administrativo') {
      gastosFijosTotal += gc.monto;
    } else {
      gastosVariablesTotal += gc.monto;
    }
    gastosOperativosTotal += gc.monto;
  }

  // Utilidad Operativa (EBITDA)
  const utilidadOperativa = utilidadBruta - gastosOperativosTotal;
  const margenOperativoPct = ventasTotales > 0 ? (utilidadOperativa / ventasTotales) : 0;

  // Utilidad Neta (con tasa impositiva estimada del 35% si es positiva)
  const impuestoRenta = utilidadOperativa > 0 ? utilidadOperativa * 0.35 : 0;
  const utilidadNetaEstimada = utilidadOperativa - impuestoRenta;
  const margenNetoPct = ventasTotales > 0 ? (utilidadNetaEstimada / ventasTotales) : 0;

  // Punto de Equilibrio
  // Margen de Contribución = Ventas - (Costos Variables + Costo de Ventas)
  // O Margen de Contribución % = (Ventas - Costos Variables) / Ventas
  const costosVariablesTotales = costoVentasTotal + gastosVariablesTotal;
  const margenContribucionTotal = ventasTotales - costosVariablesTotales;
  const margenContribucionPct = ventasTotales > 0 ? (margenContribucionTotal / ventasTotales) : 0.40;

  // Punto de Equilibrio en $ = Costos Fijos / Margen Contribución %
  const puntoEquilibrioDinero = margenContribucionPct > 0 ? (gastosFijosTotal / margenContribucionPct) : 0;

  // Punto de Equilibrio en Unidades = Costos Fijos / Margen Contribución Unitario
  const precioPromedioUnitario = totalUnidadesVendidas > 0 ? (ventasTotales / totalUnidadesVendidas) : 1;
  const costoVarPromedioUnitario = totalUnidadesVendidas > 0 ? (costosVariablesTotales / totalUnidadesVendidas) : 0;
  const mcUnitario = Math.max(1, precioPromedioUnitario - costoVarPromedioUnitario);
  const puntoEquilibrioUnidades = gastosFijosTotal / mcUnitario;

  const coberturaPuntoEquilibrioPct = puntoEquilibrioDinero > 0 ? (ventasTotales / puntoEquilibrioDinero) * 100 : 100;
  const margenSeguridadPct = ventasTotales > 0 ? ((ventasTotales - puntoEquilibrioDinero) / ventasTotales) * 100 : 0;

  // Inventarios
  let valorInventarioTotal = 0;
  let itemsEnRiesgo = 0;

  for (const item of inventario) {
    const val = item.valorInventario ?? (item.stockActual * item.costoUnitario);
    valorInventarioTotal += val;
    if (item.estado === 'Critico Agotado' || item.estado === 'Alerta Reorden') {
      itemsEnRiesgo++;
    }
  }

  // Rotación del Inventario = Costo de Ventas / Inventario Promedio (o Valor Inventario)
  const rotacionInventarioPromedio = valorInventarioTotal > 0 ? (costoVentasTotal / valorInventarioTotal) : 0;
  // Días de Inventario (DIO) semestral = 180 / rotacion
  const diasInventarioPromedio = rotacionInventarioPromedio > 0 ? (180 / rotacionInventarioPromedio) : 0;
  // GMROI = Utilidad Bruta / Valor Inventario Promedio
  const gmroi = valorInventarioTotal > 0 ? (utilidadBruta / valorInventarioTotal) : 0;

  // Metas
  const metaSemestralTotal = regiones.reduce((acc, r) => acc + (r.MetaSemestral || 0), 0);
  const pctCumplimientoTotal = metaSemestralTotal > 0 ? (ventasTotales / metaSemestralTotal) : 0;

  return {
    ventasTotales,
    ventasBrutas,
    totalDescuentos,
    pctDescuentoPromedio,
    totalPedidos,
    totalClientes,
    totalLineas,
    totalUnidadesVendidas,
    ticketPromedio,
    precioNetoPromedio,

    costoVentasTotal,
    utilidadBruta,
    margenBrutoPct,

    gastosFijosTotal,
    gastosVariablesTotal,
    gastosOperativosTotal,
    utilidadOperativa,
    margenOperativoPct,
    utilidadNetaEstimada,
    margenNetoPct,

    puntoEquilibrioDinero,
    puntoEquilibrioUnidades,
    coberturaPuntoEquilibrioPct,
    margenSeguridadPct,

    valorInventarioTotal,
    rotacionInventarioPromedio,
    diasInventarioPromedio,
    gmroi,
    itemsEnRiesgo,

    metaSemestralTotal,
    pctCumplimientoTotal,
  };
}

export function computeRegionSummaries(
  ventas: FactVentaRow[],
  regiones: DimRegionItem[]
): RegionSummary[] {
  const ventasTotalesGlobal = ventas.reduce((acc, r) => acc + (r.Importe || 0), 0);
  
  return regiones.map((reg) => {
    const regVentas = ventas.filter((v) => v.Región.toLowerCase().trim() === reg.Región.toLowerCase().trim());
    const totalVentas = regVentas.reduce((acc, v) => acc + (v.Importe || 0), 0);
    const pedidosSet = new Set(regVentas.map((v) => v.PedidoID));
    const totalPedidos = pedidosSet.size;
    const totalUnidades = regVentas.reduce((acc, v) => acc + (v.Cantidad || 0), 0);
    const meta = reg.MetaSemestral || 1;
    const pctCumplimiento = totalVentas / meta;
    const participacionPct = ventasTotalesGlobal > 0 ? totalVentas / ventasTotalesGlobal : 0;
    const ticketPromedio = totalPedidos > 0 ? totalVentas / totalPedidos : 0;

    return {
      region: reg.Región,
      departamento: reg.Departamento,
      ventas: totalVentas,
      meta,
      pctCumplimiento,
      participacionPct,
      pedidos: totalPedidos,
      ticketPromedio,
      unidades: totalUnidades,
    };
  });
}

const MONTH_NAMES = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export function computeMonthlySummaries(ventas: FactVentaRow[]): MonthlySummary[] {
  // Sort and group by month 1..6 or dynamic
  const monthsFound = Array.from(new Set(ventas.map((v) => v.Mes || (v.Fecha ? new Date(v.Fecha).getMonth() + 1 : 1)))).sort((a, b) => a - b);
  
  if (monthsFound.length === 0) {
    monthsFound.push(1, 2, 3, 4, 5, 6);
  }

  let acumuladoYTD = 0;
  let previousVentas = 0;

  return monthsFound.map((mesNum) => {
    const monthRows = ventas.filter((v) => (v.Mes === mesNum) || (v.Fecha && (new Date(v.Fecha).getMonth() + 1) === mesNum));
    const mesVentas = monthRows.reduce((acc, v) => acc + (v.Importe || 0), 0);
    const mesCosto = monthRows.reduce((acc, v) => acc + (v.CostoTotal || (v.Cantidad * (v.CostoUnitario || v.PrecioUnitario * 0.6))), 0);
    const pedidos = new Set(monthRows.map((v) => v.PedidoID)).size;
    
    acumuladoYTD += mesVentas;
    const varMoMPct = previousVentas > 0 ? ((mesVentas - previousVentas) / previousVentas) : 0;
    previousVentas = mesVentas;

    return {
      mes: mesNum,
      nombreMes: MONTH_NAMES[mesNum] || `Mes ${mesNum}`,
      ventas: mesVentas,
      ventasAnterior: previousVentas,
      varMoMPct,
      acumuladoYTD,
      costo: mesCosto,
      utilidadBruta: mesVentas - mesCosto,
      pedidos,
    };
  });
}

export function computeClientRankings(
  ventas: FactVentaRow[],
  clientes: DimClienteItem[]
): ClientRankingSummary[] {
  const ventasTotalesGlobal = ventas.reduce((acc, r) => acc + (r.Importe || 0), 0);

  const clientMap = new Map<string, { ventas: number; pedidos: Set<string>; region: string; nombre: string }>();

  // Initialize from DimClientes
  for (const c of clientes) {
    clientMap.set(c.ClienteID, {
      ventas: 0,
      pedidos: new Set(),
      region: c.Región,
      nombre: c.NombreCliente,
    });
  }

  for (const v of ventas) {
    const existing = clientMap.get(v.ClienteID);
    if (existing) {
      existing.ventas += (v.Importe || 0);
      existing.pedidos.add(v.PedidoID);
    } else {
      clientMap.set(v.ClienteID, {
        ventas: v.Importe || 0,
        pedidos: new Set([v.PedidoID]),
        region: v.Región || 'N/A',
        nombre: `Cliente ${v.ClienteID}`,
      });
    }
  }

  // Convert to array and sort descending by ventas
  const sorted = Array.from(clientMap.entries())
    .map(([clienteId, data]) => ({
      clienteId,
      nombreCliente: data.nombre,
      region: data.region,
      ventas: data.ventas,
      pedidos: data.pedidos.size,
      participacionPct: ventasTotalesGlobal > 0 ? data.ventas / ventasTotalesGlobal : 0,
      ranking: 1,
      // DAX Session 4 rule: >= 30,000,000 => Oro, >= 20,000,000 => Plata, else Bronce
      segmento: (data.ventas >= 30000000 ? 'Oro' : data.ventas >= 20000000 ? 'Plata' : 'Bronce') as 'Oro' | 'Plata' | 'Bronce',
    }))
    .sort((a, b) => b.ventas - a.ventas);

  // Assign rankings
  sorted.forEach((item, index) => {
    item.ranking = index + 1;
  });

  return sorted;
}

export function computeServiceSummaries(ventas: FactVentaRow[]) {
  const serviceMap = new Map<string, { ventas: number; unidades: number; pedidos: Set<string>; costo: number }>();

  for (const v of ventas) {
    const serv = v.Servicio || 'Otros';
    const existing = serviceMap.get(serv) || { ventas: 0, unidades: 0, pedidos: new Set(), costo: 0 };
    existing.ventas += (v.Importe || 0);
    existing.unidades += (v.Cantidad || 0);
    existing.pedidos.add(v.PedidoID);
    existing.costo += (v.CostoTotal || (v.Cantidad * (v.CostoUnitario || v.PrecioUnitario * 0.6)));
    serviceMap.set(serv, existing);
  }

  const ventasTotales = ventas.reduce((acc, v) => acc + (v.Importe || 0), 0);

  return Array.from(serviceMap.entries()).map(([servicio, data]) => ({
    servicio,
    ventas: data.ventas,
    unidades: data.unidades,
    pedidos: data.pedidos.size,
    costo: data.costo,
    utilidad: data.ventas - data.costo,
    margenPct: data.ventas > 0 ? (data.ventas - data.costo) / data.ventas : 0,
    participacionPct: ventasTotales > 0 ? data.ventas / ventasTotales : 0,
  })).sort((a, b) => b.ventas - a.ventas);
}
