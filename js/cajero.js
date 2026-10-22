/**
 * Funciones del cajero automático: validar importes, calcular comisiones y desglosar billetes.
 * No muestran nada por consola: reciben datos y devuelven resultados.
 */

/** @type {number[]} Billetes que entrega el cajero, de mayor a menor valor. */
export const BILLETES = [50, 20, 10, 5];

/** @type {number} Importe máximo de una retirada, en euros. */
export const LIMITE_RETIRADA = 600;

/** @type {number} Porcentaje de comisión para quien no es cliente del banco. */
export const COMISION_NO_CLIENTE = 2;

/** @type {number} Comisión mínima para quien no es cliente, en euros. */
export const COMISION_MINIMA = 1.5;

/**
 * Convierte el importe escrito por el usuario en un número válido.
 *
 * Admite espacios alrededor y coma o punto como separador decimal.
 *
 * @param {string} texto Importe tal como lo escribe el usuario.
 * @returns {number|null} El importe como número, o `null` si está vacío, no es un número o no es positivo.
 * @example
 * validarImporte(' 100,50 '); // 100.5
 * validarImporte('cien'); // null
 */
export function validarImporte(texto) {
  const limpio = texto.trim();
  // El texto vacío se comprueba aparte: Number('') da 0 y no es un error de conversión.
  if (limpio === '') {
    return null;
  }

  // Se cambia la coma por el punto porque Number solo entiende el punto decimal.
  // No se usa parseFloat porque aceptaría textos como '50€' o '12abc' (daría 50 y 12).
  const importe = Number(limpio.replace(',', '.'));
  if (!Number.isFinite(importe) || importe <= 0) {
    return null;
  }
  return importe;
}

/**
 * Indica si el cajero puede entregar un importe con sus billetes.
 *
 * @param {number} importe Importe que se quiere retirar, en euros.
 * @returns {boolean} `true` si es un entero múltiplo de 5 y no supera LIMITE_RETIRADA.
 * @example
 * esRetirable(60); // true
 * esRetirable(72); // false
 */
export function esRetirable(importe) {
  // Que el importe sea positivo ya lo garantiza validarImporte.
  return Number.isInteger(importe) && importe % 5 === 0 && importe <= LIMITE_RETIRADA;
}

/**
 * Calcula la comisión de una retirada.
 *
 * Los clientes del banco no pagan comisión. El resto paga COMISION_NO_CLIENTE %
 * del importe, con un mínimo de COMISION_MINIMA euros.
 *
 * @param {number} importe Importe retirado, en euros.
 * @param {boolean} esCliente Si la tarjeta es del propio banco.
 * @returns {number} Comisión en euros, redondeada a céntimos.
 * @example
 * calcularComision(60, false); // 1.5
 * calcularComision(300, false); // 6
 */
export function calcularComision(importe, esCliente) {
  if (esCliente) {
    return 0;
  }

  const comision = Math.max((importe * COMISION_NO_CLIENTE) / 100, COMISION_MINIMA);
  // Se redondea a céntimos: 2 % de ciertos importes no es exacto en binario.
  return Math.round(comision * 100) / 100;
}

/**
 * Desglosa un importe en el menor número de billetes posible.
 *
 * @param {number} importe Importe retirable (ver esRetirable).
 * @returns {string} Desglose con el formato `2 x 50 € + 1 x 20 €`, o texto vacío si el importe es 0.
 * @example
 * desglosarBilletes(60); // '1 x 50 € + 1 x 10 €'
 */
export function desglosarBilletes(importe) {
  const partes = [];
  let restante = importe;

  // BILLETES va de mayor a menor: con cada uno se usan tantos como quepan (algoritmo voraz).
  // Con estos billetes (50, 20, 10 y 5) el reparto voraz da siempre el menor número de billetes.
  for (const billete of BILLETES) {
    const cantidad = Math.floor(restante / billete);
    if (cantidad > 0) {
      partes.push(`${cantidad} x ${billete} €`);
      restante -= cantidad * billete;
    }
  }

  return partes.join(' + ');
}
