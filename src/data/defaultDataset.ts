import { 
  FactVentaRow, 
  DimRegionItem, 
  DimClienteItem, 
  InventoryItem, 
  CompraItem, 
  GastoCostoItem, 
  DaxMeasureItem, 
  EquivalenciaItem 
} from '../types';

export const INITIAL_DIM_REGIONES: DimRegionItem[] = [
  { Región: 'Urabá', Departamento: 'Antioquia', MetaSemestral: 36000000, Supervisor: 'Carlos M. Restrepo' },
  { Región: 'Medellín', Departamento: 'Antioquia', MetaSemestral: 45000000, Supervisor: 'Diana P. Henao' },
  { Región: 'Bogotá', Departamento: 'Cundinamarca', MetaSemestral: 48000000, Supervisor: 'Javier Morales' },
  { Región: 'Costa', Departamento: 'Atlántico', MetaSemestral: 96000000, Supervisor: 'Mariana Barraza' },
];

export const INITIAL_DIM_CLIENTES: DimClienteItem[] = [
  { ClienteID: 'C01', NombreCliente: 'Exportadora Alfa', Región: 'Urabá', Contacto: 'Mateo Gómez', Telefono: '+57 (4) 828-1122', CupoCredito: 20000000 },
  { ClienteID: 'C02', NombreCliente: 'Agroinsumos Beta', Región: 'Urabá', Contacto: 'Patricia Ramos', Telefono: '+57 (4) 828-3344', CupoCredito: 35000000 },
  { ClienteID: 'C03', NombreCliente: 'Comercial Gamma', Región: 'Medellín', Contacto: 'Andrés Echeverry', Telefono: '+57 (4) 444-9988', CupoCredito: 18000000 },
  { ClienteID: 'C04', NombreCliente: 'Distribuidora Delta', Región: 'Bogotá', Contacto: 'Claudia Vargas', Telefono: '+57 (1) 745-1234', CupoCredito: 40000000 },
  { ClienteID: 'C05', NombreCliente: 'Puerto Épsilon', Región: 'Costa', Contacto: 'Hernán Char', Telefono: '+57 (5) 360-5500', CupoCredito: 75000000 },
  { ClienteID: 'C06', NombreCliente: 'Mercados Zeta', Región: 'Bogotá', Contacto: 'Sandra Quintero', Telefono: '+57 (1) 612-4455', CupoCredito: 30000000 },
  { ClienteID: 'C07', NombreCliente: 'Frutas Eta', Región: 'Medellín', Contacto: 'Santiago Londoño', Telefono: '+57 (4) 311-6677', CupoCredito: 45000000 },
  { ClienteID: 'C08', NombreCliente: 'Logística Theta', Región: 'Costa', Contacto: 'Lucía Vengoechea', Telefono: '+57 (5) 385-9900', CupoCredito: 50000000 },
];

// 51 lines of FactVentas from Dataset SENA CPL-3410829
export const INITIAL_FACT_VENTAS: FactVentaRow[] = [
  { id: 'FV-01', PedidoID: 'P001', Fecha: '2026-01-03', Región: 'Costa', Servicio: 'Transporte', ClienteID: 'C05', Cantidad: 20, PrecioUnitario: 590000, DescuentoPct: 0.10, Importe: 10620000, PrecioNeto: 531000, Bruto: 11800000, Mes: 1, CostoUnitario: 350000, CostoTotal: 7000000, MargenBruto: 3620000 },
  { id: 'FV-02', PedidoID: 'P002', Fecha: '2026-01-06', Región: 'Costa', Servicio: 'Transporte', ClienteID: 'C08', Cantidad: 5, PrecioUnitario: 530000, DescuentoPct: 0.10, Importe: 2385000, PrecioNeto: 477000, Bruto: 2650000, Mes: 1, CostoUnitario: 330000, CostoTotal: 1650000, MargenBruto: 735000 },
  { id: 'FV-03', PedidoID: 'P003', Fecha: '2026-01-08', Región: 'Bogotá', Servicio: 'Distribución', ClienteID: 'C04', Cantidad: 5, PrecioUnitario: 320000, DescuentoPct: 0.00, Importe: 1600000, PrecioNeto: 320000, Bruto: 1600000, Mes: 1, CostoUnitario: 180000, CostoTotal: 900000, MargenBruto: 700000 },
  { id: 'FV-04', PedidoID: 'P004', Fecha: '2026-01-14', Región: 'Costa', Servicio: 'Transporte', ClienteID: 'C05', Cantidad: 20, PrecioUnitario: 610000, DescuentoPct: 0.05, Importe: 11590000, PrecioNeto: 579500, Bruto: 12200000, Mes: 1, CostoUnitario: 360000, CostoTotal: 7200000, MargenBruto: 4390000 },
  { id: 'FV-05', PedidoID: 'P004', Fecha: '2026-01-14', Región: 'Costa', Servicio: 'Distribución', ClienteID: 'C05', Cantidad: 4, PrecioUnitario: 260000, DescuentoPct: 0.00, Importe: 1040000, PrecioNeto: 260000, Bruto: 1040000, Mes: 1, CostoUnitario: 140000, CostoTotal: 560000, MargenBruto: 480000 },
  { id: 'FV-06', PedidoID: 'P005', Fecha: '2026-01-15', Región: 'Costa', Servicio: 'Almacenamiento', ClienteID: 'C05', Cantidad: 6, PrecioUnitario: 160000, DescuentoPct: 0.05, Importe: 912000, PrecioNeto: 152000, Bruto: 960000, Mes: 1, CostoUnitario: 80000, CostoTotal: 480000, MargenBruto: 432000 },
  { id: 'FV-07', PedidoID: 'P006', Fecha: '2026-01-26', Región: 'Bogotá', Servicio: 'Transporte', ClienteID: 'C04', Cantidad: 8, PrecioUnitario: 520000, DescuentoPct: 0.05, Importe: 3952000, PrecioNeto: 494000, Bruto: 4160000, Mes: 1, CostoUnitario: 310000, CostoTotal: 2480000, MargenBruto: 1472000 },
  { id: 'FV-08', PedidoID: 'P007', Fecha: '2026-02-02', Región: 'Bogotá', Servicio: 'Distribución', ClienteID: 'C06', Cantidad: 11, PrecioUnitario: 320000, DescuentoPct: 0.05, Importe: 3344000, PrecioNeto: 304000, Bruto: 3520000, Mes: 2, CostoUnitario: 180000, CostoTotal: 1980000, MargenBruto: 1364000 },
  { id: 'FV-09', PedidoID: 'P008', Fecha: '2026-02-05', Región: 'Medellín', Servicio: 'Distribución', ClienteID: 'C07', Cantidad: 11, PrecioUnitario: 320000, DescuentoPct: 0.00, Importe: 3520000, PrecioNeto: 320000, Bruto: 3520000, Mes: 2, CostoUnitario: 175000, CostoTotal: 1925000, MargenBruto: 1595000 },
  { id: 'FV-10', PedidoID: 'P009', Fecha: '2026-02-09', Región: 'Costa', Servicio: 'Transporte', ClienteID: 'C05', Cantidad: 20, PrecioUnitario: 550000, DescuentoPct: 0.05, Importe: 10450000, PrecioNeto: 522500, Bruto: 11000000, Mes: 2, CostoUnitario: 340000, CostoTotal: 6800000, MargenBruto: 3650000 },
  { id: 'FV-11', PedidoID: 'P010', Fecha: '2026-02-11', Región: 'Urabá', Servicio: 'Almacenamiento', ClienteID: 'C02', Cantidad: 6, PrecioUnitario: 210000, DescuentoPct: 0.08, Importe: 1159200, PrecioNeto: 193200, Bruto: 1260000, Mes: 2, CostoUnitario: 110000, CostoTotal: 660000, MargenBruto: 499200 },
  { id: 'FV-12', PedidoID: 'P011', Fecha: '2026-02-15', Región: 'Medellín', Servicio: 'Almacenamiento', ClienteID: 'C07', Cantidad: 5, PrecioUnitario: 200000, DescuentoPct: 0.05, Importe: 950000, PrecioNeto: 190000, Bruto: 1000000, Mes: 2, CostoUnitario: 100000, CostoTotal: 500000, MargenBruto: 450000 },
  { id: 'FV-13', PedidoID: 'P012', Fecha: '2026-02-16', Región: 'Costa', Servicio: 'Transporte', ClienteID: 'C08', Cantidad: 10, PrecioUnitario: 580000, DescuentoPct: 0.00, Importe: 5800000, PrecioNeto: 580000, Bruto: 5800000, Mes: 2, CostoUnitario: 350000, CostoTotal: 3500000, MargenBruto: 2300000 },
  { id: 'FV-14', PedidoID: 'P013', Fecha: '2026-02-18', Región: 'Costa', Servicio: 'Almacenamiento', ClienteID: 'C05', Cantidad: 6, PrecioUnitario: 220000, DescuentoPct: 0.05, Importe: 1254000, PrecioNeto: 209000, Bruto: 1320000, Mes: 2, CostoUnitario: 110000, CostoTotal: 660000, MargenBruto: 594000 },
  { id: 'FV-15', PedidoID: 'P014', Fecha: '2026-03-08', Región: 'Bogotá', Servicio: 'Distribución', ClienteID: 'C04', Cantidad: 4, PrecioUnitario: 290000, DescuentoPct: 0.00, Importe: 1160000, PrecioNeto: 290000, Bruto: 1160000, Mes: 3, CostoUnitario: 160000, CostoTotal: 640000, MargenBruto: 520000 },
  { id: 'FV-16', PedidoID: 'P015', Fecha: '2026-03-10', Región: 'Medellín', Servicio: 'Distribución', ClienteID: 'C07', Cantidad: 6, PrecioUnitario: 270000, DescuentoPct: 0.08, Importe: 1490400, PrecioNeto: 248400, Bruto: 1620000, Mes: 3, CostoUnitario: 150000, CostoTotal: 900000, MargenBruto: 590400 },
  { id: 'FV-17', PedidoID: 'P016', Fecha: '2026-03-11', Región: 'Costa', Servicio: 'Distribución', ClienteID: 'C05', Cantidad: 9, PrecioUnitario: 290000, DescuentoPct: 0.05, Importe: 2479500, PrecioNeto: 275500, Bruto: 2610000, Mes: 3, CostoUnitario: 160000, CostoTotal: 1440000, MargenBruto: 1039500 },
  { id: 'FV-18', PedidoID: 'P016', Fecha: '2026-03-11', Región: 'Costa', Servicio: 'Transporte', ClienteID: 'C05', Cantidad: 18, PrecioUnitario: 450000, DescuentoPct: 0.10, Importe: 7290000, PrecioNeto: 405000, Bruto: 8100000, Mes: 3, CostoUnitario: 280000, CostoTotal: 5040000, MargenBruto: 2250000 },
  { id: 'FV-19', PedidoID: 'P017', Fecha: '2026-03-14', Región: 'Costa', Servicio: 'Transporte', ClienteID: 'C08', Cantidad: 9, PrecioUnitario: 570000, DescuentoPct: 0.00, Importe: 5130000, PrecioNeto: 570000, Bruto: 5130000, Mes: 3, CostoUnitario: 340000, CostoTotal: 3060000, MargenBruto: 2070000 },
  { id: 'FV-20', PedidoID: 'P018', Fecha: '2026-03-18', Región: 'Urabá', Servicio: 'Distribución', ClienteID: 'C02', Cantidad: 13, PrecioUnitario: 300000, DescuentoPct: 0.00, Importe: 3900000, PrecioNeto: 300000, Bruto: 3900000, Mes: 3, CostoUnitario: 170000, CostoTotal: 2210000, MargenBruto: 1690000 },
  { id: 'FV-21', PedidoID: 'P019', Fecha: '2026-03-19', Región: 'Urabá', Servicio: 'Transporte', ClienteID: 'C01', Cantidad: 10, PrecioUnitario: 490000, DescuentoPct: 0.05, Importe: 4655000, PrecioNeto: 465500, Bruto: 4900000, Mes: 3, CostoUnitario: 300000, CostoTotal: 3000000, MargenBruto: 1655000 },
  { id: 'FV-22', PedidoID: 'P020', Fecha: '2026-03-21', Región: 'Medellín', Servicio: 'Distribución', ClienteID: 'C03', Cantidad: 10, PrecioUnitario: 260000, DescuentoPct: 0.05, Importe: 2470000, PrecioNeto: 247000, Bruto: 2600000, Mes: 3, CostoUnitario: 150000, CostoTotal: 1500000, MargenBruto: 970000 },
  { id: 'FV-23', PedidoID: 'P021', Fecha: '2026-03-23', Región: 'Bogotá', Servicio: 'Transporte', ClienteID: 'C06', Cantidad: 13, PrecioUnitario: 610000, DescuentoPct: 0.00, Importe: 7930000, PrecioNeto: 610000, Bruto: 7930000, Mes: 3, CostoUnitario: 360000, CostoTotal: 4680000, MargenBruto: 3250000 },
  { id: 'FV-24', PedidoID: 'P022', Fecha: '2026-04-02', Región: 'Medellín', Servicio: 'Almacenamiento', ClienteID: 'C07', Cantidad: 4, PrecioUnitario: 180000, DescuentoPct: 0.00, Importe: 720000, PrecioNeto: 180000, Bruto: 720000, Mes: 4, CostoUnitario: 95000, CostoTotal: 380000, MargenBruto: 340000 },
  { id: 'FV-25', PedidoID: 'P022', Fecha: '2026-04-02', Región: 'Medellín', Servicio: 'Transporte', ClienteID: 'C07', Cantidad: 21, PrecioUnitario: 640000, DescuentoPct: 0.08, Importe: 12364800, PrecioNeto: 588800, Bruto: 13440000, Mes: 4, CostoUnitario: 380000, CostoTotal: 7980000, MargenBruto: 4384800 },
  { id: 'FV-26', PedidoID: 'P023', Fecha: '2026-04-03', Región: 'Medellín', Servicio: 'Transporte', ClienteID: 'C03', Cantidad: 8, PrecioUnitario: 440000, DescuentoPct: 0.00, Importe: 3520000, PrecioNeto: 440000, Bruto: 3520000, Mes: 4, CostoUnitario: 260000, CostoTotal: 2080000, MargenBruto: 1440000 },
  { id: 'FV-27', PedidoID: 'P023', Fecha: '2026-04-03', Región: 'Medellín', Servicio: 'Almacenamiento', ClienteID: 'C03', Cantidad: 8, PrecioUnitario: 180000, DescuentoPct: 0.08, Importe: 1324800, PrecioNeto: 165600, Bruto: 1440000, Mes: 4, CostoUnitario: 95000, CostoTotal: 760000, MargenBruto: 564800 },
  { id: 'FV-28', PedidoID: 'P024', Fecha: '2026-04-04', Región: 'Medellín', Servicio: 'Almacenamiento', ClienteID: 'C07', Cantidad: 10, PrecioUnitario: 180000, DescuentoPct: 0.00, Importe: 1800000, PrecioNeto: 180000, Bruto: 1800000, Mes: 4, CostoUnitario: 95000, CostoTotal: 950000, MargenBruto: 850000 },
  { id: 'FV-29', PedidoID: 'P025', Fecha: '2026-04-06', Región: 'Bogotá', Servicio: 'Transporte', ClienteID: 'C06', Cantidad: 19, PrecioUnitario: 590000, DescuentoPct: 0.08, Importe: 10313200, PrecioNeto: 542800, Bruto: 11210000, Mes: 4, CostoUnitario: 350000, CostoTotal: 6650000, MargenBruto: 3663200 },
  { id: 'FV-30', PedidoID: 'P026', Fecha: '2026-04-11', Región: 'Urabá', Servicio: 'Transporte', ClienteID: 'C02', Cantidad: 13, PrecioUnitario: 540000, DescuentoPct: 0.00, Importe: 7020000, PrecioNeto: 540000, Bruto: 7020000, Mes: 4, CostoUnitario: 320000, CostoTotal: 4160000, MargenBruto: 2860000 },
  { id: 'FV-31', PedidoID: 'P027', Fecha: '2026-04-25', Región: 'Costa', Servicio: 'Transporte', ClienteID: 'C08', Cantidad: 16, PrecioUnitario: 560000, DescuentoPct: 0.05, Importe: 8512000, PrecioNeto: 532000, Bruto: 8960000, Mes: 4, CostoUnitario: 330000, CostoTotal: 5280000, MargenBruto: 3232000 },
  { id: 'FV-32', PedidoID: 'P027', Fecha: '2026-04-25', Región: 'Costa', Servicio: 'Distribución', ClienteID: 'C08', Cantidad: 8, PrecioUnitario: 310000, DescuentoPct: 0.00, Importe: 2480000, PrecioNeto: 310000, Bruto: 2480000, Mes: 4, CostoUnitario: 170000, CostoTotal: 1360000, MargenBruto: 1120000 },
  { id: 'FV-33', PedidoID: 'P028', Fecha: '2026-05-04', Región: 'Medellín', Servicio: 'Almacenamiento', ClienteID: 'C07', Cantidad: 10, PrecioUnitario: 150000, DescuentoPct: 0.10, Importe: 1350000, PrecioNeto: 135000, Bruto: 1500000, Mes: 5, CostoUnitario: 80000, CostoTotal: 800000, MargenBruto: 550000 },
  { id: 'FV-34', PedidoID: 'P029', Fecha: '2026-05-05', Región: 'Urabá', Servicio: 'Distribución', ClienteID: 'C02', Cantidad: 10, PrecioUnitario: 280000, DescuentoPct: 0.08, Importe: 2576000, PrecioNeto: 257600, Bruto: 2800000, Mes: 5, CostoUnitario: 155000, CostoTotal: 1550000, MargenBruto: 1026000 },
  { id: 'FV-35', PedidoID: 'P030', Fecha: '2026-05-16', Región: 'Costa', Servicio: 'Distribución', ClienteID: 'C05', Cantidad: 13, PrecioUnitario: 270000, DescuentoPct: 0.00, Importe: 3510000, PrecioNeto: 270000, Bruto: 3510000, Mes: 5, CostoUnitario: 150000, CostoTotal: 1950000, MargenBruto: 1560000 },
  { id: 'FV-36', PedidoID: 'P031', Fecha: '2026-05-18', Región: 'Medellín', Servicio: 'Distribución', ClienteID: 'C07', Cantidad: 13, PrecioUnitario: 300000, DescuentoPct: 0.00, Importe: 3900000, PrecioNeto: 300000, Bruto: 3900000, Mes: 5, CostoUnitario: 165000, CostoTotal: 2145000, MargenBruto: 1755000 },
  { id: 'FV-37', PedidoID: 'P031', Fecha: '2026-05-18', Región: 'Medellín', Servicio: 'Almacenamiento', ClienteID: 'C07', Cantidad: 7, PrecioUnitario: 200000, DescuentoPct: 0.00, Importe: 1400000, PrecioNeto: 200000, Bruto: 1400000, Mes: 5, CostoUnitario: 100000, CostoTotal: 700000, MargenBruto: 700000 },
  { id: 'FV-38', PedidoID: 'P032', Fecha: '2026-05-21', Región: 'Bogotá', Servicio: 'Transporte', ClienteID: 'C04', Cantidad: 18, PrecioUnitario: 570000, DescuentoPct: 0.00, Importe: 10260000, PrecioNeto: 570000, Bruto: 10260000, Mes: 5, CostoUnitario: 340000, CostoTotal: 6120000, MargenBruto: 4140000 },
  { id: 'FV-39', PedidoID: 'P032', Fecha: '2026-05-21', Región: 'Bogotá', Servicio: 'Almacenamiento', ClienteID: 'C04', Cantidad: 8, PrecioUnitario: 150000, DescuentoPct: 0.00, Importe: 1200000, PrecioNeto: 150000, Bruto: 1200000, Mes: 5, CostoUnitario: 80000, CostoTotal: 640000, MargenBruto: 560000 },
  { id: 'FV-40', PedidoID: 'P033', Fecha: '2026-05-23', Región: 'Medellín', Servicio: 'Almacenamiento', ClienteID: 'C07', Cantidad: 9, PrecioUnitario: 210000, DescuentoPct: 0.05, Importe: 1795500, PrecioNeto: 199500, Bruto: 1890000, Mes: 5, CostoUnitario: 105000, CostoTotal: 945000, MargenBruto: 850500 },
  { id: 'FV-41', PedidoID: 'P034', Fecha: '2026-05-24', Región: 'Bogotá', Servicio: 'Transporte', ClienteID: 'C04', Cantidad: 16, PrecioUnitario: 610000, DescuentoPct: 0.00, Importe: 9760000, PrecioNeto: 610000, Bruto: 9760000, Mes: 5, CostoUnitario: 360000, CostoTotal: 5760000, MargenBruto: 4000000 },
  { id: 'FV-42', PedidoID: 'P035', Fecha: '2026-05-26', Región: 'Urabá', Servicio: 'Distribución', ClienteID: 'C02', Cantidad: 13, PrecioUnitario: 290000, DescuentoPct: 0.08, Importe: 3468400, PrecioNeto: 266800, Bruto: 3770000, Mes: 5, CostoUnitario: 160000, CostoTotal: 2080000, MargenBruto: 1388400 },
  { id: 'FV-43', PedidoID: 'P036', Fecha: '2026-06-03', Región: 'Urabá', Servicio: 'Transporte', ClienteID: 'C02', Cantidad: 10, PrecioUnitario: 590000, DescuentoPct: 0.10, Importe: 5310000, PrecioNeto: 531000, Bruto: 5900000, Mes: 6, CostoUnitario: 350000, CostoTotal: 3500000, MargenBruto: 1810000 },
  { id: 'FV-44', PedidoID: 'P036', Fecha: '2026-06-03', Región: 'Urabá', Servicio: 'Almacenamiento', ClienteID: 'C02', Cantidad: 12, PrecioUnitario: 200000, DescuentoPct: 0.10, Importe: 2160000, PrecioNeto: 180000, Bruto: 2400000, Mes: 6, CostoUnitario: 100000, CostoTotal: 1200000, MargenBruto: 960000 },
  { id: 'FV-45', PedidoID: 'P037', Fecha: '2026-06-04', Región: 'Medellín', Servicio: 'Distribución', ClienteID: 'C03', Cantidad: 12, PrecioUnitario: 280000, DescuentoPct: 0.05, Importe: 3192000, PrecioNeto: 266000, Bruto: 3360000, Mes: 6, CostoUnitario: 155000, CostoTotal: 1860000, MargenBruto: 1332000 },
  { id: 'FV-46', PedidoID: 'P038', Fecha: '2026-06-06', Región: 'Costa', Servicio: 'Distribución', ClienteID: 'C08', Cantidad: 14, PrecioUnitario: 320000, DescuentoPct: 0.10, Importe: 4032000, PrecioNeto: 288000, Bruto: 4480000, Mes: 6, CostoUnitario: 175000, CostoTotal: 2450000, MargenBruto: 1582000 },
  { id: 'FV-47', PedidoID: 'P038', Fecha: '2026-06-06', Región: 'Costa', Servicio: 'Almacenamiento', ClienteID: 'C08', Cantidad: 3, PrecioUnitario: 180000, DescuentoPct: 0.00, Importe: 540000, PrecioNeto: 180000, Bruto: 540000, Mes: 6, CostoUnitario: 95000, CostoTotal: 285000, MargenBruto: 255000 },
  { id: 'FV-48', PedidoID: 'P039', Fecha: '2026-06-12', Región: 'Costa', Servicio: 'Distribución', ClienteID: 'C05', Cantidad: 11, PrecioUnitario: 300000, DescuentoPct: 0.00, Importe: 3300000, PrecioNeto: 300000, Bruto: 3300000, Mes: 6, CostoUnitario: 165000, CostoTotal: 1815000, MargenBruto: 1485000 },
  { id: 'FV-49', PedidoID: 'P040', Fecha: '2026-06-14', Región: 'Costa', Servicio: 'Distribución', ClienteID: 'C08', Cantidad: 14, PrecioUnitario: 290000, DescuentoPct: 0.00, Importe: 4060000, PrecioNeto: 290000, Bruto: 4060000, Mes: 6, CostoUnitario: 160000, CostoTotal: 2240000, MargenBruto: 1820000 },
  { id: 'FV-50', PedidoID: 'P041', Fecha: '2026-06-19', Región: 'Medellín', Servicio: 'Almacenamiento', ClienteID: 'C07', Cantidad: 10, PrecioUnitario: 190000, DescuentoPct: 0.00, Importe: 1900000, PrecioNeto: 190000, Bruto: 1900000, Mes: 6, CostoUnitario: 95000, CostoTotal: 950000, MargenBruto: 950000 },
  { id: 'FV-51', PedidoID: 'P042', Fecha: '2026-06-20', Región: 'Urabá', Servicio: 'Transporte', ClienteID: 'C01', Cantidad: 13, PrecioUnitario: 620000, DescuentoPct: 0.00, Importe: 8060000, PrecioNeto: 620000, Bruto: 8060000, Mes: 6, CostoUnitario: 370000, CostoTotal: 4810000, MargenBruto: 3250000 },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    sku: 'LOG-TR-F1',
    nombre: 'Capacidad Flete Troncal Pesado (Vehículo 10T)',
    categoria: 'Transporte',
    stockInicial: 45,
    entradas: 240,
    salidas: 215,
    stockActual: 70,
    stockSeguridad: 25,
    puntoReorden: 35,
    costoUnitario: 345000,
    precioVentaSugerido: 575000,
    valorInventario: 24150000,
    ventasUnidadesPeriodo: 215,
    rotacionVeces: 3.74,
    diasInventario: 48,
    estado: 'Optimo'
  },
  {
    sku: 'LOG-DIS-URB',
    nombre: 'Ruta Distribución Urbana Consolidada',
    categoria: 'Distribución',
    stockInicial: 30,
    entradas: 260,
    salidas: 248,
    stockActual: 42,
    stockSeguridad: 20,
    puntoReorden: 30,
    costoUnitario: 162000,
    precioVentaSugerido: 295000,
    valorInventario: 6804000,
    ventasUnidadesPeriodo: 248,
    rotacionVeces: 6.89,
    diasInventario: 26,
    estado: 'Optimo'
  },
  {
    sku: 'LOG-ALM-PAL',
    nombre: 'Posición Estiba Seca / Almacén Semestral',
    categoria: 'Almacenamiento',
    stockInicial: 50,
    entradas: 120,
    salidas: 89,
    stockActual: 81,
    stockSeguridad: 30,
    puntoReorden: 40,
    costoUnitario: 94000,
    precioVentaSugerido: 188000,
    valorInventario: 7614000,
    ventasUnidadesPeriodo: 89,
    rotacionVeces: 1.36,
    diasInventario: 132,
    estado: 'Sobre stock'
  },
  {
    sku: 'REP-LLAN-MIC',
    nombre: 'Kit Llantas Radiales 295/80R22.5 Flota',
    categoria: 'Insumos Operativos',
    stockInicial: 16,
    entradas: 24,
    salidas: 32,
    stockActual: 8,
    stockSeguridad: 12,
    puntoReorden: 14,
    costoUnitario: 1450000,
    precioVentaSugerido: 1850000,
    valorInventario: 11600000,
    ventasUnidadesPeriodo: 32,
    rotacionVeces: 2.67,
    diasInventario: 67,
    estado: 'Alerta Reorden'
  },
  {
    sku: 'COM-DIESEL-GL',
    nombre: 'Reserva Diesel Grado B10 (Galones Operación)',
    categoria: 'Insumos Operativos',
    stockInicial: 1200,
    entradas: 18000,
    salidas: 18450,
    stockActual: 750,
    stockSeguridad: 1500,
    puntoReorden: 2000,
    costoUnitario: 10500,
    precioVentaSugerido: 14000,
    valorInventario: 7875000,
    ventasUnidadesPeriodo: 18450,
    rotacionVeces: 18.9,
    diasInventario: 9,
    estado: 'Critico Agotado'
  },
  {
    sku: 'EMB-STRETCH-RL',
    nombre: 'Rollo Película Extensible Stretch Film Calibre 60',
    categoria: 'Material Empaque',
    stockInicial: 100,
    entradas: 400,
    salidas: 380,
    stockActual: 120,
    stockSeguridad: 60,
    puntoReorden: 80,
    costoUnitario: 42000,
    precioVentaSugerido: 68000,
    valorInventario: 5040000,
    ventasUnidadesPeriodo: 380,
    rotacionVeces: 3.45,
    diasInventario: 52,
    estado: 'Optimo'
  },
  {
    sku: 'SEG-PREC-MET',
    nombre: 'Precintos de Seguridad con Código de Barras / Guaya',
    categoria: 'Seguridad',
    stockInicial: 500,
    entradas: 2500,
    salidas: 2300,
    stockActual: 700,
    stockSeguridad: 300,
    puntoReorden: 450,
    costoUnitario: 3500,
    precioVentaSugerido: 6500,
    valorInventario: 2450000,
    ventasUnidadesPeriodo: 2300,
    rotacionVeces: 3.83,
    diasInventario: 47,
    estado: 'Optimo'
  }
];

export const INITIAL_COMPRAS: CompraItem[] = [
  { id: 'OC-101', compraID: 'OC-2026-001', fecha: '2026-01-04', proveedor: 'Petromil Combustibles S.A.S', sku: 'COM-DIESEL-GL', descripcion: 'Suministro Lote Diesel Estación Caribe', cantidad: 6000, costoUnitario: 10450, costoTotal: 62700000, tiempoEntregaDias: 2, estado: 'Recibido' },
  { id: 'OC-102', compraID: 'OC-2026-002', fecha: '2026-01-18', proveedor: 'Michelin / Automundial', sku: 'REP-LLAN-MIC', descripcion: 'Llantas Eje Tracción Tractomula', cantidad: 12, costoUnitario: 1450000, costoTotal: 17400000, tiempoEntregaDias: 5, estado: 'Recibido' },
  { id: 'OC-103', compraID: 'OC-2026-003', fecha: '2026-02-10', proveedor: 'Plásticos y Empaques de Colombia', sku: 'EMB-STRETCH-RL', descripcion: 'Película Stretch C-60 Paletizado', cantidad: 200, costoUnitario: 41800, costoTotal: 8360000, tiempoEntregaDias: 4, estado: 'Recibido' },
  { id: 'OC-104', compraID: 'OC-2026-004', fecha: '2026-03-02', proveedor: 'Seguripak de Occidente', sku: 'SEG-PREC-MET', descripcion: 'Precintos Guaya ISO 17712', cantidad: 1500, costoUnitario: 3450, costoTotal: 5175000, tiempoEntregaDias: 3, estado: 'Recibido' },
  { id: 'OC-105', compraID: 'OC-2026-005', fecha: '2026-03-25', proveedor: 'Petromil Combustibles S.A.S', sku: 'COM-DIESEL-GL', descripcion: 'Suministro Lote Diesel Medellín & Urabá', cantidad: 6000, costoUnitario: 10550, costoTotal: 63300000, tiempoEntregaDias: 2, estado: 'Recibido' },
  { id: 'OC-106', compraID: 'OC-2026-006', fecha: '2026-04-14', proveedor: 'Automundial Llantas', sku: 'REP-LLAN-MIC', descripcion: 'Kit Reemplazo Rodamiento & Llantas', cantidad: 12, costoUnitario: 1450000, costoTotal: 17400000, tiempoEntregaDias: 6, estado: 'Recibido' },
  { id: 'OC-107', compraID: 'OC-2026-007', fecha: '2026-05-12', proveedor: 'Plásticos Industriales S.A.', sku: 'EMB-STRETCH-RL', descripcion: 'Lote Rollos Envolvedora Automática', cantidad: 200, costoUnitario: 42200, costoTotal: 8440000, tiempoEntregaDias: 4, estado: 'Recibido' },
  { id: 'OC-108', compraID: 'OC-2026-008', fecha: '2026-06-01', proveedor: 'Petromil Combustibles S.A.S', sku: 'COM-DIESEL-GL', descripcion: 'Recarga Tanque Centro Distribución Bogotá', cantidad: 6000, costoUnitario: 10500, costoTotal: 63000000, tiempoEntregaDias: 2, estado: 'Recibido' }
];

export const INITIAL_GASTOS_COSTOS: GastoCostoItem[] = [
  { id: 'GC-01', codigo: 'CF-001', concepto: 'Arriendo Centros de Distribución y Bodegas (4 Regiones)', clasificacion: 'Costo Fijo', periodo: 'Semestral', monto: 18000000, responsable: 'Gerencia de Operaciones', descripcion: 'Arrendamiento de plataformas logísticas en Urabá, Medellín, Bogotá y Costa' },
  { id: 'GC-02', codigo: 'CF-002', concepto: 'Nómina Administrativa y Supervisión SENA-CTAPT', clasificacion: 'Costo Fijo', periodo: 'Semestral', monto: 24000000, responsable: 'Talento Humano', descripcion: 'Salarios equipo comercial, planificadores de tráfico y liquidadores' },
  { id: 'GC-03', codigo: 'CF-003', concepto: 'Pólizas de Seguros y Responsabilidad Civil Contractual Flota', clasificacion: 'Costo Fijo', periodo: 'Semestral', monto: 7500000, responsable: 'Dirección Jurídica', descripcion: 'Amparo de carga transportada, seguro todo riesgo vehicular' },
  { id: 'GC-04', codigo: 'CF-004', concepto: 'Software ERP, WMS, GPS y Licencias Power BI Pro', clasificacion: 'Costo Fijo', periodo: 'Semestral', monto: 4500000, responsable: 'Sistemas & TIC', descripcion: 'Monitoreo satelital 24/7 y suscripciones de business intelligence' },
  { id: 'GC-05', codigo: 'GA-001', concepto: 'Servicios Públicos, Energía Trifásica y Telecomunicaciones', clasificacion: 'Gasto Administrativo', periodo: 'Semestral', monto: 3600000, responsable: 'Servicios Generales', descripcion: 'Energía para cuartos fríos y oficinas centrales' },
  { id: 'GC-06', codigo: 'GA-002', concepto: 'Honorarios Contables, Revisoría Fiscal y Auditoría', clasificacion: 'Gasto Administrativo', periodo: 'Semestral', monto: 4800000, responsable: 'Contraloría', descripcion: 'Certificación de balances e informes tributarios DIAN' },
  { id: 'GC-07', codigo: 'GV-001', concepto: 'Comisiones a Fuerza de Ventas por Recaudo (Variable)', clasificacion: 'Gasto de Ventas', periodo: 'Semestral', monto: 6447294, responsable: 'Dirección Comercial', descripcion: '3% sobre facturación neta cobrada a clientes' },
  { id: 'GC-08', codigo: 'GV-002', concepto: 'Peajes Nacionales de Corredores Logísticos', clasificacion: 'Costo Variable', periodo: 'Semestral', monto: 9600000, responsable: 'Operaciones Transporte', descripcion: 'Peajes concesionados en rutas Urabá-Medellín y Bogotá-Costa' }
];

export const SENA_EQUIVALENCIAS: EquivalenciaItem[] = [
  { concepto: 'Ventas Totales', formulaExcel: '=SUM(Importe)', medidaDax: 'Ventas Totales = SUM(FactVentas[Importe])', resultadoExcel: 214909800, valorPresentacion: 214909800, control: 'Coincide', sesion: 1 },
  { concepto: 'Ventas Totales · Urabá', formulaExcel: '=SUMIF(Region,"Urabá",Importe)', medidaDax: '[Ventas Totales] en gráfico por Región', resultadoExcel: 38308600, valorPresentacion: 38308600, control: 'Coincide', sesion: 1 },
  { concepto: 'Ventas Totales · Medellín', formulaExcel: '=SUMIF(Region,"Medellín",Importe)', medidaDax: '[Ventas Totales] en gráfico por Región', resultadoExcel: 41697500, valorPresentacion: 41697500, control: 'Coincide', sesion: 1 },
  { concepto: 'Ventas Totales · Bogotá', formulaExcel: '=SUMIF(Region,"Bogotá",Importe)', medidaDax: '[Ventas Totales] en gráfico por Región', resultadoExcel: 49519200, valorPresentacion: 49519200, control: 'Coincide', sesion: 1 },
  { concepto: 'Ventas Totales · Costa', formulaExcel: '=SUMIF(Region,"Costa",Importe)', medidaDax: '[Ventas Totales] en gráfico por Región', resultadoExcel: 85384500, valorPresentacion: 85384500, control: 'Coincide', sesion: 1 },
  { concepto: 'Líneas', formulaExcel: '=ROWS(Pedido)', medidaDax: 'Líneas = COUNTROWS(FactVentas)', resultadoExcel: 51, valorPresentacion: 51, control: 'Coincide', sesion: 1 },
  { concepto: 'Pedidos únicos', formulaExcel: '=SUMPRODUCT(1/COUNTIF(Pedido,Pedido))', medidaDax: 'Pedidos = DISTINCTCOUNT(FactVentas[PedidoID])', resultadoExcel: 42, valorPresentacion: 42, control: 'Coincide', sesion: 1 },
  { concepto: 'Clientes únicos', formulaExcel: '=SUMPRODUCT(1/COUNTIF(Cliente,Cliente))', medidaDax: 'Clientes = DISTINCTCOUNT(FactVentas[ClienteID])', resultadoExcel: 8, valorPresentacion: 8, control: 'Coincide', sesion: 1 },
  { concepto: 'Descuentos registrados', formulaExcel: '=COUNT(Descuento)', medidaDax: 'COUNT(FactVentas[DescuentoPct])', resultadoExcel: 49, valorPresentacion: 49, control: 'Coincide', sesion: 1 },
  { concepto: 'Descuentos vacíos', formulaExcel: '=COUNTBLANK(Descuento)', medidaDax: 'COUNTBLANK(FactVentas[DescuentoPct])', resultadoExcel: 2, valorPresentacion: 2, control: 'Coincide', sesion: 1 },
  { concepto: 'Ticket Promedio', formulaExcel: '=IFERROR(SUM(Importe)/SUMPRODUCT(1/COUNTIF(Pedido,Pedido)),0)', medidaDax: 'Ticket Promedio = DIVIDE([Ventas Totales], [Pedidos])', resultadoExcel: 5116900, valorPresentacion: 5116900, control: 'Coincide', sesion: 2 },
  { concepto: 'Precio neto por unidad (correcto)', formulaExcel: '=IFERROR(SUM(Importe)/SUM(Cantidad),0)', medidaDax: 'DIVIDE(SUM(FactVentas[Importe]), SUM(FactVentas[Cantidad]))', resultadoExcel: 389329.35, valorPresentacion: 389329.35, control: 'Coincide', sesion: 2 },
  { concepto: '% Descuento concedido', formulaExcel: '=IFERROR((SUM(Bruto)-SUM(Importe))/SUM(Bruto),0)', medidaDax: 'DIVIDE([Bruto] - [Ventas Totales], [Bruto])', resultadoExcel: '4.21%', valorPresentacion: '4.21%', control: 'Coincide', sesion: 2 },
  { concepto: 'Cantidad Promedio', formulaExcel: '=AVERAGE(Cantidad)', medidaDax: 'AVERAGE(FactVentas[Cantidad])', resultadoExcel: 10.82, valorPresentacion: 10.82, control: 'Coincide', sesion: 2 },
  { concepto: 'Ventas Transporte', formulaExcel: '=SUMIF(Servicio,"Transporte",Importe)', medidaDax: 'CALCULATE([Ventas Totales], FactVentas[Servicio] = "Transporte")', resultadoExcel: 144922000, valorPresentacion: 144922000, control: 'Coincide', sesion: 3 },
  { concepto: '% Transporte', formulaExcel: '=SUMIF(Servicio,"Transporte",Importe)/SUM(Importe)', medidaDax: 'DIVIDE([Ventas Transporte], [Ventas Totales])', resultadoExcel: '67.43%', valorPresentacion: '67.43%', control: 'Coincide', sesion: 3 },
  { concepto: 'Meta Ventas Semestral', formulaExcel: '=SUM(MetaRegion)', medidaDax: 'Meta Ventas = SUM(DimRegion[MetaSemestral])', resultadoExcel: 225000000, valorPresentacion: 225000000, control: 'Coincide', sesion: 3 },
  { concepto: '% Cumplimiento total', formulaExcel: '=IFERROR(SUM(Importe)/SUM(MetaRegion),0)', medidaDax: '% Cumplimiento = DIVIDE([Ventas Totales], [Meta Ventas])', resultadoExcel: '95.52%', valorPresentacion: '95.52%', control: 'Coincide', sesion: 3 },
  { concepto: 'Ventas Pedidos Grandes (≥ 15)', formulaExcel: '=SUMIF(Cantidad,">=15",Importe)', medidaDax: 'CALCULATE([Ventas Totales], FILTER(FactVentas, FactVentas[Cantidad] >= 15))', resultadoExcel: 91160000, valorPresentacion: 91160000, control: 'Coincide', sesion: 4 },
  { concepto: 'Ventas YTD Junio', formulaExcel: '=SUM(Enero:Junio)', medidaDax: 'TOTALYTD([Ventas Totales], DimFecha[Date])', resultadoExcel: 214909800, valorPresentacion: 214909800, control: 'Coincide', sesion: 4 }
];

export const SENA_MEDIDAS_DAX: DaxMeasureItem[] = [
  { Sesión: 1, Objeto: 'Columna Importe', FórmulaDAX: 'Importe = FactVentas[Cantidad] * FactVentas[PrecioUnitario] * (1 - FactVentas[DescuentoPct])', ParaQuéSirve: 'Valor neto de cada línea (contexto de fila)', DóndeSeCrea: 'Herramientas de tabla › Nueva columna' },
  { Sesión: 1, Objeto: 'Medida Ventas Totales', FórmulaDAX: 'Ventas Totales = SUM(FactVentas[Importe])', ParaQuéSirve: 'Total que responde dinámicamente a todos los filtros', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 1, Objeto: 'Medida Líneas', FórmulaDAX: 'Líneas = COUNTROWS(FactVentas)', ParaQuéSirve: 'Número de filas de operaciones', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 1, Objeto: 'Medida Pedidos', FórmulaDAX: 'Pedidos = DISTINCTCOUNT(FactVentas[PedidoID])', ParaQuéSirve: 'Total pedidos únicos sin duplicar', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 1, Objeto: 'Medida Clientes', FórmulaDAX: 'Clientes = DISTINCTCOUNT(FactVentas[ClienteID])', ParaQuéSirve: 'Clientes únicos atendidos en el periodo', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 2, Objeto: 'Columna Precio Neto', FórmulaDAX: 'Precio Neto = DIVIDE([Importe], [Cantidad])', ParaQuéSirve: 'Precio unitario neto con descuento aplicado por línea', DóndeSeCrea: 'Herramientas de tabla › Nueva columna' },
  { Sesión: 2, Objeto: 'Medida Ticket Promedio', FórmulaDAX: 'Ticket Promedio = DIVIDE([Ventas Totales], [Pedidos])', ParaQuéSirve: 'Valor medio facturado por cada pedido comercial', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 2, Objeto: 'Medida Bruto', FórmulaDAX: 'Bruto = SUMX(FactVentas, FactVentas[Cantidad] * FactVentas[PrecioUnitario])', ParaQuéSirve: 'Ventas totales antes de aplicar cualquier descuento', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 2, Objeto: 'Medida % Descuento', FórmulaDAX: '% Descuento = DIVIDE([Bruto] - [Ventas Totales], [Bruto])', ParaQuéSirve: 'Tasa efectiva de descuento comercial concedido', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 3, Objeto: 'Medida Ventas Transporte', FórmulaDAX: 'Ventas Transporte = CALCULATE([Ventas Totales], FactVentas[Servicio] = "Transporte")', ParaQuéSirve: 'Filtra únicamente las ventas de la línea de transporte', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 3, Objeto: 'Medida % Participación Región', FórmulaDAX: '% Participación Región = DIVIDE([Ventas Totales], CALCULATE([Ventas Totales], REMOVEFILTERS(FactVentas[Región])))', ParaQuéSirve: 'Peso porcentual de la región sobre las ventas nacionales', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 3, Objeto: 'Medida Meta Ventas', FórmulaDAX: 'Meta Ventas = SUM(DimRegion[MetaSemestral])', ParaQuéSirve: 'Presupuesto comercial fijado para el semestre', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 3, Objeto: 'Medida % Cumplimiento', FórmulaDAX: '% Cumplimiento = DIVIDE([Ventas Totales], [Meta Ventas])', ParaQuéSirve: 'Indicador KPI de cumplimiento presupuestal', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 4, Objeto: 'Medida Ventas Pedidos Grandes', FórmulaDAX: 'Ventas Pedidos Grandes = CALCULATE([Ventas Totales], FILTER(FactVentas, FactVentas[Cantidad] >= 15))', ParaQuéSirve: 'Filtro de tabla para transacciones de alto volumen', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 4, Objeto: 'Medida Ventas YTD', FórmulaDAX: 'Ventas YTD = TOTALYTD([Ventas Totales], DimFecha[Date])', ParaQuéSirve: 'Ingresos acumulados año corrido (Year To Date)', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 4, Objeto: 'Medida Var % MoM', FórmulaDAX: 'Var % MoM = DIVIDE([Ventas Totales] - [Ventas Mes Anterior], [Ventas Mes Anterior])', ParaQuéSirve: 'Variación relativa frente al mes inmediatamente anterior', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 4, Objeto: 'Medida Ranking Cliente', FórmulaDAX: 'Ranking Cliente = RANKX(ALL(DimCliente[NombreCliente]), [Ventas Totales], , DESC)', ParaQuéSirve: 'Posición jerárquica de cada cliente según ventas', DóndeSeCrea: 'Inicio › Nueva medida' },
  { Sesión: 4, Objeto: 'Medida Segmento ABC', FórmulaDAX: 'Segmento = SWITCH(TRUE(), [Ventas Totales] >= 30000000, "Oro", [Ventas Totales] >= 20000000, "Plata", "Bronce")', ParaQuéSirve: 'Clasificación de valor estratégico comercial', DóndeSeCrea: 'Inicio › Nueva medida' }
];

// Presets for other industries to show true multi-sector capability!
export const SECTOR_PRESETS: Record<string, {
  name: string;
  description: string;
  badge: string;
  defaultServices: string[];
  sampleInventory: Partial<InventoryItem>[];
}> = {
  logistica: {
    name: 'Logística, Carga & Servicios Portuarios (SENA Oficial)',
    description: 'Dataset CPL_3410829 con servicios de Transporte, Distribución y Almacenamiento.',
    badge: 'Dataset Activo (SENA)',
    defaultServices: ['Transporte', 'Distribución', 'Almacenamiento'],
    sampleInventory: []
  },
  retail: {
    name: 'Comercio Minorista / Retail & Mayorista',
    description: 'Gestión de productos de consumo, electrónica, vestuario, cálculo de margen y rotación en góndola.',
    badge: 'Modo Comercio',
    defaultServices: ['Electrónica', 'Hogar y Decoración', 'Moda y Textil'],
    sampleInventory: []
  },
  manufactura: {
    name: 'Industria Manufacturera & Transformación',
    description: 'Materias primas, ensamble, cálculo de costos directos, indirectos de fabricación y punto de equilibrio fabril.',
    badge: 'Modo Industrial',
    defaultServices: ['Línea Metalmecánica', 'Línea Ensamble', 'Línea Terminados'],
    sampleInventory: []
  },
  alimentos: {
    name: 'Agroindustria, Alimentos & Consumo Masivo',
    description: 'Productos perecederos, rotación rápida de stock, mermas, frío y cadena de abastecimiento.',
    badge: 'Modo Agroalimentario',
    defaultServices: ['Frutas y Verduras', 'Cárnicos y Frío', 'Procesados'],
    sampleInventory: []
  },
  salud: {
    name: 'Salud, Farmacéutica & Dispositivos Médicos',
    description: 'Insumos hospitalarios, medicamentos esenciales, control estricto de lote, stock de seguridad y punto de reorden.',
    badge: 'Modo Farmacéutico',
    defaultServices: ['Medicamentos Especiales', 'Dispositivos Quirúrgicos', 'Material de Curación'],
    sampleInventory: []
  }
};
