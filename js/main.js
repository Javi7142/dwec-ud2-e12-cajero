// E12 · Cajero automático: simulación de una sesión
import {
  LIMITE_RETIRADA,
  validarImporte,
  esRetirable,
  calcularComision,
  desglosarBilletes,
} from './cajero.js';

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

console.log(`🏧 Bienvenida, ${titular} (${esCliente ? 'cliente' : 'no cliente'})`);

let operacionesRealizadas = 0;

for (const operacion of operaciones) {
  operacionesRealizadas++;
  const prefijo = `${operacionesRealizadas}. ${operacion.tipo}`;

  // La salida se comprueba antes del switch: un break dentro de un case solo
  // terminaría el switch, no el bucle de la sesión.
  if (operacion.tipo === 'salir') {
    console.log(`${prefijo} → 👋 Sesión terminada`);
    break;
  }

  switch (operacion.tipo) {
    case 'consultar':
      console.log(`${prefijo} → Saldo: ${saldo.toFixed(2)} €`);
      break;

    case 'ingresar': {
      const importe = validarImporte(operacion.importe);
      if (importe === null) {
        console.log(`${prefijo} → ❌ Importe no válido: "${operacion.importe}"`);
        break;
      }
      saldo += importe;
      console.log(`${prefijo} ${importe.toFixed(2)} € → ✅ Saldo: ${saldo.toFixed(2)} €`);
      break;
    }

    case 'retirar': {
      const importe = validarImporte(operacion.importe);
      // Cláusulas de guarda: cada rechazo muestra su motivo y pasa a la siguiente operación.
      if (importe === null) {
        console.log(`${prefijo} → ❌ Importe no válido: "${operacion.importe}"`);
        break;
      }
      if (!esRetirable(importe)) {
        console.log(
          `${prefijo} ${importe} € → ❌ Debe ser múltiplo de 5 y no superar ${LIMITE_RETIRADA} €`,
        );
        break;
      }

      const comision = calcularComision(importe, esCliente);
      // El saldo tiene que cubrir el importe más la comisión.
      if (saldo < importe + comision) {
        console.log(
          `${prefijo} ${importe} € → ❌ Saldo insuficiente (comisión: ${comision.toFixed(2)} €)`,
        );
        break;
      }

      saldo -= importe + comision;
      console.log(
        `${prefijo} ${importe} € → ✅ ${desglosarBilletes(importe)} · comisión: ${comision.toFixed(2)} € · saldo: ${saldo.toFixed(2)} €`,
      );
      break;
    }

    default:
      console.log(`${prefijo} → ❌ Operación desconocida`);
  }

  if (operacionesRealizadas === MAX_OPERACIONES) {
    console.log('⚠️ Máximo de operaciones alcanzado');
    break;
  }
}

console.log(
  `Operaciones realizadas: ${operacionesRealizadas} · saldo final: ${saldo.toFixed(2)} €`,
);
