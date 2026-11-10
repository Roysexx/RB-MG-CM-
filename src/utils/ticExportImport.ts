import * as XLSX from 'xlsx';
import { 
  FactVentaRow, 
  InventoryItem, 
  CompraItem, 
  GastoCostoItem, 
  DimRegionItem, 
  DimClienteItem, 
  DaxMeasureItem, 
  FinancialKPIs 
} from '../types';

export interface FullAppDataset {
  FactVentas: FactVentaRow[];
  Inventario: InventoryItem[];
  Compras: CompraItem[];
  GastosCostos: GastoCostoItem[];
  DimRegion: DimRegionItem[];
  DimCliente: DimClienteItem[];
}

// Download helper for text/blob
function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 1. EXCEL (.xlsx) Multi-sheet export using SheetJS
export function exportToExcel(
  dataset: FullAppDataset,
  kpis: FinancialKPIs,
  filename: string = 'SIG_FinInv_Modelo_SENA_CPL3410829.xlsx'
) {
  const wb = XLSX.utils.book_new();

  // FactVentas Sheet
  const factVentasData = dataset.FactVentas.map((row) => ({
    PedidoID: row.PedidoID,
    Fecha: row.Fecha,
    Región: row.Región,
    Servicio: row.Servicio,
    ClienteID: row.ClienteID,
    Cantidad: row.Cantidad,
    PrecioUnitario: row.PrecioUnitario,
    DescuentoPct: row.DescuentoPct,
    Importe: row.Importe,
    PrecioNeto: row.PrecioNeto,
    Bruto: row.Bruto,
    Mes: row.Mes,
    CostoUnitario: row.CostoUnitario || 0,
    CostoTotal: row.CostoTotal || 0,
    MargenBruto: row.MargenBruto || 0,
  }));
  const wsVentas = XLSX.utils.json_to_sheet(factVentasData);
  XLSX.utils.book_append_sheet(wb, wsVentas, 'FactVentas');

  // Inventarios Sheet
  const inventarioData = dataset.Inventario.map((item) => ({
    SKU: item.sku,
    Nombre: item.nombre,
    Categoría: item.categoria,
    StockInicial: item.stockInicial,
    Entradas: item.entradas,
    Salidas: item.salidas,
    StockActual: item.stockActual,
    StockSeguridad: item.stockSeguridad,
    PuntoReorden: item.puntoReorden,
    CostoUnitario: item.costoUnitario,
    PrecioVentaSugerido: item.precioVentaSugerido,
    ValorInventario: item.valorInventario,
    VentasUnidadesPeriodo: item.ventasUnidadesPeriodo,
    RotacionVeces: item.rotacionVeces,
    DiasInventario: item.diasInventario,
    Estado: item.estado,
  }));
  const wsInv = XLSX.utils.json_to_sheet(inventarioData);
  XLSX.utils.book_append_sheet(wb, wsInv, 'Inventarios');

  // Compras Sheet
  const comprasData = dataset.Compras.map((c) => ({
    CompraID: c.compraID,
    Fecha: c.fecha,
    Proveedor: c.proveedor,
    SKU: c.sku,
    Descripción: c.descripcion,
    Cantidad: c.cantidad,
    CostoUnitario: c.costoUnitario,
    CostoTotal: c.costoTotal,
    TiempoEntregaDias: c.tiempoEntregaDias,
    Estado: c.estado,
  }));
  const wsCompras = XLSX.utils.json_to_sheet(comprasData);
  XLSX.utils.book_append_sheet(wb, wsCompras, 'Compras');

  // Gastos & Costos Sheet
  const gastosData = dataset.GastosCostos.map((g) => ({
    Código: g.codigo,
    Concepto: g.concepto,
    Clasificación: g.clasificacion,
    Periodo: g.periodo,
    Monto: g.monto,
    Responsable: g.responsable,
    Descripción: g.descripcion,
  }));
  const wsGastos = XLSX.utils.json_to_sheet(gastosData);
  XLSX.utils.book_append_sheet(wb, wsGastos, 'Costos_Gastos');

  // DimRegion Sheet
  const wsRegion = XLSX.utils.json_to_sheet(dataset.DimRegion);
  XLSX.utils.book_append_sheet(wb, wsRegion, 'DimRegion');

  // DimCliente Sheet
  const wsCliente = XLSX.utils.json_to_sheet(dataset.DimCliente);
  XLSX.utils.book_append_sheet(wb, wsCliente, 'DimCliente');

  // KPIs Resumen Sheet
  const kpisSummaryData = [
    { Indicador: 'Ventas Totales Netas', Valor: kpis.ventasTotales, Unidad: 'COP $' },
    { Indicador: 'Ventas Brutas', Valor: kpis.ventasBrutas, Unidad: 'COP $' },
    { Indicador: 'Total Descuentos Concedidos', Valor: kpis.totalDescuentos, Unidad: 'COP $' },
    { Indicador: '% Descuento Promedio', Valor: `${(kpis.pctDescuentoPromedio * 100).toFixed(2)}%`, Unidad: '%' },
    { Indicador: 'Costo de Ventas (COGS)', Valor: kpis.costoVentasTotal, Unidad: 'COP $' },
    { Indicador: 'Utilidad Bruta', Valor: kpis.utilidadBruta, Unidad: 'COP $' },
    { Indicador: 'Margen Bruto %', Valor: `${(kpis.margenBrutoPct * 100).toFixed(2)}%`, Unidad: '%' },
    { Indicador: 'Costos Fijos Operativos', Valor: kpis.gastosFijosTotal, Unidad: 'COP $' },
    { Indicador: 'Gastos Variables', Valor: kpis.gastosVariablesTotal, Unidad: 'COP $' },
    { Indicador: 'Utilidad Operativa (EBITDA)', Valor: kpis.utilidadOperativa, Unidad: 'COP $' },
    { Indicador: 'Margen Operativo %', Valor: `${(kpis.margenOperativoPct * 100).toFixed(2)}%`, Unidad: '%' },
    { Indicador: 'Utilidad Neta Proyectada', Valor: kpis.utilidadNetaEstimada, Unidad: 'COP $' },
    { Indicador: 'Margen Neto %', Valor: `${(kpis.margenNetoPct * 100).toFixed(2)}%`, Unidad: '%' },
    { Indicador: 'Punto de Equilibrio Monetario', Valor: kpis.puntoEquilibrioDinero, Unidad: 'COP $' },
    { Indicador: 'Punto de Equilibrio en Unidades', Valor: Math.round(kpis.puntoEquilibrioUnidades), Unidad: 'Unidades' },
    { Indicador: 'Margen de Seguridad %', Valor: `${kpis.margenSeguridadPct.toFixed(2)}%`, Unidad: '%' },
    { Indicador: 'Valor Total Inventarios', Valor: kpis.valorInventarioTotal, Unidad: 'COP $' },
    { Indicador: 'Rotación de Inventarios (Turnover)', Valor: `${kpis.rotacionInventarioPromedio.toFixed(2)}x`, Unidad: 'Veces' },
    { Indicador: 'Días de Inventario (DIO)', Valor: `${Math.round(kpis.diasInventarioPromedio)} días`, Unidad: 'Días' },
    { Indicador: 'Meta Semestral Presupuesto', Valor: kpis.metaSemestralTotal, Unidad: 'COP $' },
    { Indicador: '% Cumplimiento Meta Semestral', Valor: `${(kpis.pctCumplimientoTotal * 100).toFixed(2)}%`, Unidad: '%' },
  ];
  const wsKpis = XLSX.utils.json_to_sheet(kpisSummaryData);
  XLSX.utils.book_append_sheet(wb, wsKpis, 'Resumen_KPIs');

  XLSX.writeFile(wb, filename);
}

// 2. CSV EXPORT
export function exportToCSV<T extends object>(data: T[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const csvContent = XLSX.utils.sheet_to_csv(ws);
  // Add UTF-8 BOM so Excel opens with proper accents
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, filename.endsWith('.csv') ? filename : `${filename}.csv`);
}

// 3. JSON EXPORT (Compatible with attached dataset structure)
export function exportToJSON(dataset: FullAppDataset, filename: string = 'Dataset_DAX_SIG_Export.json') {
  const jsonContent = JSON.stringify(dataset, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  triggerDownload(blob, filename);
}

// 4. POWER BI DAX CODE EXPORT (.dax)
export function exportToDax(medidas: DaxMeasureItem[], filename: string = 'Medidas_DAX_PowerBI.dax') {
  const header = `// ==========================================================================\n// MODELO DAX - GESTIÓN FINANCIERA, INVENTARIOS Y ACTIVIDADES\n// Instructor: Alfredo de Jesús Pérez Méndez · Ficha SENA CPL_3410829\n// Generado: ${new Date().toLocaleDateString('es-CO')}\n// ==========================================================================\n\n`;

  const body = medidas.map((m) => {
    return `// --------------------------------------------------------------------------\n// Sesión: ${m.Sesión} | Objeto: ${m.Objeto}\n// Uso: ${m.ParaQuéSirve}\n// Ubicación: ${m.DóndeSeCrea}\n// --------------------------------------------------------------------------\n${m.FórmulaDAX}\n`;
  }).join('\n');

  const additionalDax = `\n// --------------------------------------------------------------------------
// MEDIDAS ADICIONALES: INVENTARIOS, COSTOS Y PUNTO DE EQUILIBRIO
// --------------------------------------------------------------------------
Costo Ventas Total = SUM(FactVentas[CostoTotal])

Utilidad Bruta = [Ventas Totales] - [Costo Ventas Total]

Margen Bruto Pct = DIVIDE([Utilidad Bruta], [Ventas Totales])

Valor Inventario = SUMX(Inventarios, Inventarios[StockActual] * Inventarios[CostoUnitario])

Rotacion Inventario = DIVIDE([Costo Ventas Total], [Valor Inventario])

Dias Inventario = DIVIDE(180, [Rotacion Inventario])

Costos Fijos Totales = CALCULATE(SUM(CostosGastos[Monto]), CostosGastos[Clasificacion] IN {"Costo Fijo", "Gasto Administrativo"})

Margen Contribucion Pct = DIVIDE([Ventas Totales] - [Costo Ventas Total], [Ventas Totales])

Punto de Equilibrio = DIVIDE([Costos Fijos Totales], [Margen Contribucion Pct])

Margen de Seguridad Pct = DIVIDE([Ventas Totales] - [Punto de Equilibrio], [Ventas Totales])
`;

  const blob = new Blob([header + body + additionalDax], { type: 'text/plain;charset=utf-8' });
  triggerDownload(blob, filename);
}

// 5. POWER BI M-QUERY EXPORT (.pq)
export function exportToMQuery(filename: string = 'ETL_FactVentas_PowerQuery.pq') {
  const content = `// Código Power Query (M) para transformación e ingesta en Power BI Desktop
let
    Origen = Excel.Workbook(File.Contents("Dataset_DAX_CPL3410829_SENA.xlsx"), null, true),
    FactVentas_Sheet = Origen{[Item="FactVentas",Kind="Sheet"]}[Data],
    EncabezadosPromovidos = Table.PromoteHeaders(FactVentas_Sheet, [PromoteAllScalars=true]),
    TipoCambiado = Table.TransformColumnTypes(EncabezadosPromovidos,{
        {"PedidoID", type text}, 
        {"Fecha", type date}, 
        {"Región", type text}, 
        {"Servicio", type text}, 
        {"ClienteID", type text}, 
        {"Cantidad", Int64.Type}, 
        {"PrecioUnitario", Currency.Type}, 
        {"DescuentoPct", Percentage.Type}, 
        {"Importe", Currency.Type}, 
        {"PrecioNeto", Currency.Type}, 
        {"Bruto", Currency.Type}, 
        {"Mes", Int64.Type}
    }),
    ReemplazarDescuentosVacios = Table.ReplaceValue(TipoCambiado, null, 0, Replacer.ReplaceValue, {"DescuentoPct"})
in
    ReemplazarDescuentosVacios
`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  triggerDownload(blob, filename);
}

// 6. SQL SCRIPT EXPORT (.sql)
export function exportToSQL(dataset: FullAppDataset, filename: string = 'Schema_Datos_SENA_CPL3410829.sql') {
  let sql = `-- ==========================================================================\n`;
  sql += `-- SCRIPT DDL & DML: BASE DE DATOS DE GESTIÓN ADMINISTRATIVA, FINANCIERA E INVENTARIOS\n`;
  sql += `-- Generado automáticamente para PostgreSQL / MySQL / SQLite\n`;
  sql += `-- ==========================================================================\n\n`;

  // DimRegion
  sql += `-- 1. DimRegion\n`;
  sql += `CREATE TABLE IF NOT EXISTS dim_region (\n`;
  sql += `    region VARCHAR(100) PRIMARY KEY,\n`;
  sql += `    departamento VARCHAR(100) NOT NULL,\n`;
  sql += `    meta_semestral NUMERIC(15,2) NOT NULL,\n`;
  sql += `    supervisor VARCHAR(150)\n`;
  sql += `);\n\n`;

  dataset.DimRegion.forEach((r) => {
    sql += `INSERT INTO dim_region (region, departamento, meta_semestral, supervisor) VALUES ('${r.Región}', '${r.Departamento}', ${r.MetaSemestral}, '${r.Supervisor || ''}') ON CONFLICT (region) DO NOTHING;\n`;
  });
  sql += `\n`;

  // DimCliente
  sql += `-- 2. DimCliente\n`;
  sql += `CREATE TABLE IF NOT EXISTS dim_cliente (\n`;
  sql += `    cliente_id VARCHAR(50) PRIMARY KEY,\n`;
  sql += `    nombre_cliente VARCHAR(150) NOT NULL,\n`;
  sql += `    region VARCHAR(100) REFERENCES dim_region(region),\n`;
  sql += `    contacto VARCHAR(150),\n`;
  sql += `    telefono VARCHAR(50),\n`;
  sql += `    cupo_credito NUMERIC(15,2)\n`;
  sql += `);\n\n`;

  dataset.DimCliente.forEach((c) => {
    sql += `INSERT INTO dim_cliente (cliente_id, nombre_cliente, region, contacto, telefono, cupo_credito) VALUES ('${c.ClienteID}', '${c.NombreCliente}', '${c.Región}', '${c.Contacto || ''}', '${c.Telefono || ''}', ${c.CupoCredito || 0}) ON CONFLICT (cliente_id) DO NOTHING;\n`;
  });
  sql += `\n`;

  // FactVentas
  sql += `-- 3. FactVentas\n`;
  sql += `CREATE TABLE IF NOT EXISTS fact_ventas (\n`;
  sql += `    id VARCHAR(50) PRIMARY KEY,\n`;
  sql += `    pedido_id VARCHAR(50) NOT NULL,\n`;
  sql += `    fecha DATE NOT NULL,\n`;
  sql += `    region VARCHAR(100) REFERENCES dim_region(region),\n`;
  sql += `    servicio VARCHAR(100) NOT NULL,\n`;
  sql += `    cliente_id VARCHAR(50) REFERENCES dim_cliente(cliente_id),\n`;
  sql += `    cantidad NUMERIC(10,2) NOT NULL,\n`;
  sql += `    precio_unitario NUMERIC(15,2) NOT NULL,\n`;
  sql += `    descuento_pct NUMERIC(5,4) DEFAULT 0,\n`;
  sql += `    importe NUMERIC(15,2) NOT NULL,\n`;
  sql += `    precio_neto NUMERIC(15,2) NOT NULL,\n`;
  sql += `    bruto NUMERIC(15,2) NOT NULL,\n`;
  sql += `    mes INT NOT NULL,\n`;
  sql += `    costo_unitario NUMERIC(15,2),\n`;
  sql += `    costo_total NUMERIC(15,2),\n`;
  sql += `    margen_bruto NUMERIC(15,2)\n`;
  sql += `);\n\n`;

  dataset.FactVentas.forEach((v) => {
    sql += `INSERT INTO fact_ventas (id, pedido_id, fecha, region, servicio, cliente_id, cantidad, precio_unitario, descuento_pct, importe, precio_neto, bruto, mes, costo_unitario, costo_total, margen_bruto) VALUES ('${v.id}', '${v.PedidoID}', '${v.Fecha}', '${v.Región}', '${v.Servicio}', '${v.ClienteID}', ${v.Cantidad}, ${v.PrecioUnitario}, ${v.DescuentoPct || 0}, ${v.Importe}, ${v.PrecioNeto}, ${v.Bruto}, ${v.Mes}, ${v.CostoUnitario || 0}, ${v.CostoTotal || 0}, ${v.MargenBruto || 0}) ON CONFLICT (id) DO NOTHING;\n`;
  });
  sql += `\n`;

  // Inventarios
  sql += `-- 4. Inventarios\n`;
  sql += `CREATE TABLE IF NOT EXISTS inventarios (\n`;
  sql += `    sku VARCHAR(50) PRIMARY KEY,\n`;
  sql += `    nombre VARCHAR(150) NOT NULL,\n`;
  sql += `    categoria VARCHAR(100),\n`;
  sql += `    stock_inicial INT,\n`;
  sql += `    entradas INT,\n`;
  sql += `    salidas INT,\n`;
  sql += `    stock_actual INT,\n`;
  sql += `    stock_seguridad INT,\n`;
  sql += `    costo_unitario NUMERIC(15,2),\n`;
  sql += `    precio_venta NUMERIC(15,2),\n`;
  sql += `    estado VARCHAR(50)\n`;
  sql += `);\n\n`;

  dataset.Inventario.forEach((i) => {
    sql += `INSERT INTO inventarios (sku, nombre, categoria, stock_inicial, entradas, salidas, stock_actual, stock_seguridad, costo_unitario, precio_venta, estado) VALUES ('${i.sku}', '${i.nombre}', '${i.categoria}', ${i.stockInicial}, ${i.entradas}, ${i.salidas}, ${i.stockActual}, ${i.stockSeguridad}, ${i.costoUnitario}, ${i.precioVentaSugerido}, '${i.estado}') ON CONFLICT (sku) DO NOTHING;\n`;
  });

  const blob = new Blob([sql], { type: 'text/plain;charset=utf-8' });
  triggerDownload(blob, filename);
}

// 7. FILE IMPORTER (Supports .xlsx, .xls, .csv, .json)
export async function parseUploadedFile(file: File): Promise<{
  success: boolean;
  message: string;
  dataset?: Partial<FullAppDataset>;
}> {
  try {
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (extension === 'json') {
      const text = await file.text();
      const parsed = JSON.parse(text);

      // Check if it's the raw SENA JSON format
      if (parsed.FactVentas || parsed.factVentas || parsed.Factventas) {
        const rawFact = parsed.FactVentas || parsed.factVentas;
        const mappedVentas: FactVentaRow[] = rawFact.map((r: any, idx: number) => ({
          id: r.id || `IMP-${idx + 1}`,
          PedidoID: r.PedidoID || r.pedidoID || `P${idx + 1}`,
          Fecha: (r.Fecha ? String(r.Fecha).slice(0, 10) : '2026-01-01'),
          Región: r.Región || r.Region || 'Bogotá',
          Servicio: r.Servicio || 'General',
          ClienteID: r.ClienteID || 'C01',
          Cantidad: Number(r.Cantidad || 1),
          PrecioUnitario: Number(r.PrecioUnitario || 0),
          DescuentoPct: r.DescuentoPct !== null && r.DescuentoPct !== undefined ? Number(r.DescuentoPct) : 0,
          Importe: Number(r.Importe || (r.Cantidad * r.PrecioUnitario * (1 - (r.DescuentoPct || 0)))),
          PrecioNeto: Number(r.PrecioNeto || (r.Importe / (r.Cantidad || 1))),
          Bruto: Number(r.Bruto || (r.Cantidad * r.PrecioUnitario)),
          Mes: Number(r.Mes || 1),
          CostoUnitario: Number(r.CostoUnitario || (r.PrecioUnitario * 0.6)),
          CostoTotal: Number(r.CostoTotal || (r.Cantidad * (r.CostoUnitario || (r.PrecioUnitario * 0.6)))),
          MargenBruto: Number(r.MargenBruto || (r.Importe - (r.Cantidad * (r.CostoUnitario || (r.PrecioUnitario * 0.6))))),
        }));

        const result: Partial<FullAppDataset> = { FactVentas: mappedVentas };
        if (parsed.DimRegion) result.DimRegion = parsed.DimRegion;
        if (parsed.DimCliente) result.DimCliente = parsed.DimCliente;
        if (parsed.Inventario) result.Inventario = parsed.Inventario;
        if (parsed.Compras) result.Compras = parsed.Compras;
        if (parsed.GastosCostos) result.GastosCostos = parsed.GastosCostos;

        return {
          success: true,
          message: `Archivo JSON cargado exitosamente. Se importaron ${mappedVentas.length} registros de ventas.`,
          dataset: result,
        };
      }

      return {
        success: false,
        message: 'El archivo JSON no contiene la estructura requerida (FactVentas, etc.).',
      };
    }

    if (extension === 'xlsx' || extension === 'xls' || extension === 'csv') {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: 'array' });

      const datasetResult: Partial<FullAppDataset> = {};
      let totalRows = 0;

      // Detect sheets
      for (const sheetName of wb.SheetNames) {
        const lowerName = sheetName.toLowerCase();
        const sheet = wb.Sheets[sheetName];
        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        if (lowerName.includes('venta') || lowerName.includes('fact')) {
          datasetResult.FactVentas = rows.map((r, idx) => {
            const cant = Number(r.Cantidad || r.cantidad || 1);
            const pu = Number(r.PrecioUnitario || r.precio_unitario || r['Precio Unitario'] || 0);
            const desc = Number(r.DescuentoPct || r.descuento || r['% Descuento'] || 0);
            const imp = Number(r.Importe || r.importe || (cant * pu * (1 - desc)));
            return {
              id: r.id || `IMP-${idx + 1}`,
              PedidoID: String(r.PedidoID || r.pedido_id || `P${idx + 1}`),
              Fecha: String(r.Fecha || r.fecha || '2026-01-01').slice(0, 10),
              Región: String(r.Región || r.Region || r.region || 'Bogotá'),
              Servicio: String(r.Servicio || r.servicio || 'General'),
              ClienteID: String(r.ClienteID || r.cliente_id || 'C01'),
              Cantidad: cant,
              PrecioUnitario: pu,
              DescuentoPct: desc,
              Importe: imp,
              PrecioNeto: Number(r.PrecioNeto || (cant > 0 ? imp / cant : pu)),
              Bruto: Number(r.Bruto || (cant * pu)),
              Mes: Number(r.Mes || r.mes || 1),
              CostoUnitario: Number(r.CostoUnitario || (pu * 0.6)),
              CostoTotal: Number(r.CostoTotal || (cant * (r.CostoUnitario || pu * 0.6))),
              MargenBruto: Number(r.MargenBruto || (imp - (cant * (r.CostoUnitario || pu * 0.6)))),
            };
          });
          totalRows += datasetResult.FactVentas.length;
        } else if (lowerName.includes('inv')) {
          datasetResult.Inventario = rows.map((r) => ({
            sku: String(r.SKU || r.sku || `SKU-${Math.random().toString(36).substr(2, 4).toUpperCase()}`),
            nombre: String(r.Nombre || r.nombre || 'Item de Inventario'),
            categoria: String(r.Categoría || r.categoria || 'General'),
            stockInicial: Number(r.StockInicial || r.stock_inicial || 0),
            entradas: Number(r.Entradas || r.entradas || 0),
            salidas: Number(r.Salidas || r.salidas || 0),
            stockActual: Number(r.StockActual || r.stock_actual || 0),
            stockSeguridad: Number(r.StockSeguridad || r.stock_seguridad || 10),
            puntoReorden: Number(r.PuntoReorden || r.punto_reorden || 20),
            costoUnitario: Number(r.CostoUnitario || r.costo_unitario || 0),
            precioVentaSugerido: Number(r.PrecioVentaSugerido || r.precio_venta || 0),
            valorInventario: Number(r.ValorInventario || (Number(r.StockActual || 0) * Number(r.CostoUnitario || 0))),
            ventasUnidadesPeriodo: Number(r.VentasUnidadesPeriodo || 0),
            rotacionVeces: Number(r.RotacionVeces || 3),
            diasInventario: Number(r.DiasInventario || 45),
            estado: (r.Estado || 'Optimo') as any,
          }));
        } else if (lowerName.includes('compra')) {
          datasetResult.Compras = rows.map((r, idx) => ({
            id: r.id || `OC-${idx + 1}`,
            compraID: String(r.CompraID || r.compra_id || `OC-2026-${idx + 1}`),
            fecha: String(r.Fecha || r.fecha || '2026-01-01').slice(0, 10),
            proveedor: String(r.Proveedor || r.proveedor || 'Proveedor'),
            sku: String(r.SKU || r.sku || 'N/A'),
            descripcion: String(r.Descripción || r.descripcion || 'Compra de Insumos'),
            cantidad: Number(r.Cantidad || 1),
            costoUnitario: Number(r.CostoUnitario || 0),
            costoTotal: Number(r.CostoTotal || (Number(r.Cantidad || 1) * Number(r.CostoUnitario || 0))),
            tiempoEntregaDias: Number(r.TiempoEntregaDias || 3),
            estado: (r.Estado || 'Recibido') as any,
          }));
        } else if (lowerName.includes('costo') || lowerName.includes('gasto')) {
          datasetResult.GastosCostos = rows.map((r, idx) => ({
            id: r.id || `GC-${idx + 1}`,
            codigo: String(r.Código || r.codigo || `GC-${idx + 1}`),
            concepto: String(r.Concepto || r.concepto || 'Gasto'),
            clasificacion: (r.Clasificación || r.clasificacion || 'Costo Fijo') as any,
            periodo: String(r.Periodo || r.periodo || 'Mensual'),
            monto: Number(r.Monto || r.monto || 0),
            responsable: String(r.Responsable || r.responsable || 'Administración'),
            descripcion: String(r.Descripción || r.descripcion || ''),
          }));
        }
      }

      // If it was a single-sheet CSV without explicit 'FactVentas' in sheet name
      if (!datasetResult.FactVentas && wb.SheetNames.length === 1) {
        const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        datasetResult.FactVentas = rows.map((r, idx) => {
          const cant = Number(r.Cantidad || r.cantidad || 1);
          const pu = Number(r.PrecioUnitario || r.precio_unitario || r['Precio Unitario'] || 0);
          const desc = Number(r.DescuentoPct || r.descuento || 0);
          const imp = Number(r.Importe || r.importe || (cant * pu * (1 - desc)));
          return {
            id: r.id || `IMP-${idx + 1}`,
            PedidoID: String(r.PedidoID || r.pedido_id || `P${idx + 1}`),
            Fecha: String(r.Fecha || r.fecha || '2026-01-01').slice(0, 10),
            Región: String(r.Región || r.Region || 'Bogotá'),
            Servicio: String(r.Servicio || r.servicio || 'General'),
            ClienteID: String(r.ClienteID || r.cliente_id || 'C01'),
            Cantidad: cant,
            PrecioUnitario: pu,
            DescuentoPct: desc,
            Importe: imp,
            PrecioNeto: Number(r.PrecioNeto || (cant > 0 ? imp / cant : pu)),
            Bruto: Number(r.Bruto || (cant * pu)),
            Mes: Number(r.Mes || 1),
            CostoUnitario: Number(r.CostoUnitario || (pu * 0.6)),
            CostoTotal: Number(r.CostoTotal || (cant * (r.CostoUnitario || pu * 0.6))),
            MargenBruto: Number(r.MargenBruto || (imp - (cant * (r.CostoUnitario || pu * 0.6)))),
          };
        });
        totalRows = datasetResult.FactVentas.length;
      }

      return {
        success: true,
        message: `Archivo ${file.name} procesado correctamente. Hojas cargadas: ${wb.SheetNames.join(', ')}.`,
        dataset: datasetResult,
      };
    }

    return {
      success: false,
      message: `Extensión .${extension} no soportada. Use .xlsx, .xls, .csv o .json.`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error al procesar el archivo: ${error?.message || 'Error desconocido'}`,
    };
  }
}
