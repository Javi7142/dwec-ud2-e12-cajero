// E12 · Cajero automático: simulación de una sesión
import { validarImporte, esRetirable, calcularComision, desglosarBilletes } from './cajero.js';

const MAX_OPERACIONES = 10;

const titular = 'Lucía';
const esCliente = false;
let saldo = 250;

// Operaciones tal como las teclea el usuario: los importes llegan como texto.
const operaciones = [
  { tipo: 'consultar' },
  { tipo: 'retirar', importe: '60' },
  { tipo: 'retirar', importe: '72' },
  { tipo: 'ingresar', importe: ' 100,50 ' },
  { tipo: 'retirar', importe: 'cien' },
  { tipo: 'retirar', importe: '300' },
  { tipo: 'transferir', importe: '20' },
  { tipo: 'retirar', importe: '700' },
  { tipo: 'salir' },
  { tipo: 'consultar' },
];

// TODO: muestra el saludo, procesa las operaciones con un bucle y una decisión según el tipo,
// y termina con el resumen. El formato exacto de cada línea está en el enunciado.
