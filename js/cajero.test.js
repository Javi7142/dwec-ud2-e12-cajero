import { describe, it, expect } from 'vitest';
import {
  LIMITE_RETIRADA,
  COMISION_MINIMA,
  validarImporte,
  esRetirable,
  calcularComision,
  desglosarBilletes,
} from './cajero.js';

describe('validarImporte', () => {
  it('convierte un importe con espacios y coma decimal', () => {
    expect(validarImporte(' 100,50 ')).toBe(100.5);
  });

  it('acepta el punto como separador decimal', () => {
    expect(validarImporte('19.99')).toBe(19.99);
  });

  it('ignora los espacios de alrededor (caso límite)', () => {
    expect(validarImporte('  40 ')).toBe(40);
  });

  it('devuelve null con el texto vacío o solo espacios (caso límite)', () => {
    expect(validarImporte('')).toBeNull();
    expect(validarImporte('   ')).toBeNull();
  });

  it('devuelve null si no es un número', () => {
    expect(validarImporte('cien')).toBeNull();
    expect(validarImporte('50€')).toBeNull();
  });

  it('devuelve null si no es mayor que 0 (caso límite: 0 y negativos)', () => {
    expect(validarImporte('0')).toBeNull();
    expect(validarImporte('-20')).toBeNull();
  });

  it('devuelve null con valores infinitos', () => {
    expect(validarImporte('Infinity')).toBeNull();
  });
});

describe('esRetirable', () => {
  it('acepta un entero múltiplo de 5', () => {
    expect(esRetirable(60)).toBe(true);
  });

  it('rechaza un importe que no es múltiplo de 5', () => {
    expect(esRetirable(72)).toBe(false);
  });

  it('acepta justo el importe máximo (caso límite)', () => {
    expect(esRetirable(LIMITE_RETIRADA)).toBe(true);
  });

  it('rechaza un importe por encima del máximo (caso límite: 605)', () => {
    expect(esRetirable(LIMITE_RETIRADA + 5)).toBe(false);
    expect(esRetirable(700)).toBe(false);
  });

  it('rechaza un importe con decimales aunque se acerque a un múltiplo de 5', () => {
    expect(esRetirable(62.5)).toBe(false);
  });

  it('acepta el billete más pequeño (caso límite: 5)', () => {
    expect(esRetirable(5)).toBe(true);
  });
});

describe('calcularComision', () => {
  it('cobra el 2 % cuando supera el mínimo', () => {
    expect(calcularComision(300, false)).toBe(6);
  });

  it('cobra el mínimo cuando el 2 % es menor (caso límite: 60 €)', () => {
    expect(calcularComision(60, false)).toBe(COMISION_MINIMA);
  });

  it('en el punto en que el 2 % iguala al mínimo (75 €) cobra 1,5 € (caso límite)', () => {
    expect(calcularComision(75, false)).toBe(1.5);
  });

  it('no cobra nada a los clientes del banco', () => {
    expect(calcularComision(300, true)).toBe(0);
  });

  it('redondea la comisión a céntimos', () => {
    expect(calcularComision(587.5, false)).toBe(11.75);
  });

  it('cobra 12 € con la retirada máxima de 600 € (caso límite)', () => {
    expect(calcularComision(LIMITE_RETIRADA, false)).toBe(12);
  });
});

describe('desglosarBilletes', () => {
  it('usa el menor número de billetes', () => {
    expect(desglosarBilletes(60)).toBe('1 x 50 € + 1 x 10 €');
  });

  it('usa los cuatro tipos de billete cuando hace falta', () => {
    expect(desglosarBilletes(185)).toBe('3 x 50 € + 1 x 20 € + 1 x 10 € + 1 x 5 €');
  });

  it('desglosa un importe que es un solo billete (caso límite: 5)', () => {
    expect(desglosarBilletes(5)).toBe('1 x 5 €');
  });

  it('devuelve texto vacío con 0 € (caso límite)', () => {
    expect(desglosarBilletes(0)).toBe('');
  });

  it('desglosa el importe máximo solo con billetes de 50 (caso límite)', () => {
    expect(desglosarBilletes(LIMITE_RETIRADA)).toBe('12 x 50 €');
  });

  it('no usa billetes de 5 si bastan los de 10 (no hay 2 x 5 + 1 x 10)', () => {
    expect(desglosarBilletes(20)).toBe('1 x 20 €');
  });
});
