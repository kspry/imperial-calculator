/* global beforeEach, describe, test, expect  */

import CalculatorService from '../src/services/CalculatorService.js';

let calc;

beforeEach(() => {
  calc = new CalculatorService();
});

describe('running jest in codesandbox', () => {
  test('should run tests', () => {
    expect(true).toEqual(true);
  });
});

describe('CalculatorService', () => {
  test('should exist', () => {
    expect(calc).toBeDefined();
  });

  test('should have default inc set to 32', () => {
    expect(calc.options.inc).toEqual(32);
  });

  test('should have default max_inches set to 1200', () => {
    expect(calc.options.max_inches).toEqual(1200);
  });

  test('should handle single inch values', () => {
    let expr = `1"`;
    let expected = `1"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle single inch values (without inch quotes)', () => {
    let expr = `1`;
    let expected = `1"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle single inch fraction values', () => {
    let expr = `1/2"`;
    let expected = `0 1/2"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle single inch fraction values (without inch quotes)', () => {
    let expr = `1/2`;
    let expected = `0 1/2"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert single feet values to inches', () => {
    let expr = `1'`;
    let expected = `12"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert large, single feet values to inches', () => {
    let expr = `53'`;
    let expected = `636"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert mixed feet and inch values to inches', () => {
    let expr = `3' 4"`;
    let expected = `40"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert mixed feet and inch values (without inch quotes) to inches', () => {
    let expr = `3' 4`;
    let expected = `40"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert mixed feet and inch fraction values to inches', () => {
    let expr = `3' 4 1/2"`;
    let expected = `40 1/2"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert mixed feet and inch fraction values (without inch quotes) to inches', () => {
    let expr = `3' 4 1/2`;
    let expected = `40 1/2"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert mixed large feet and inch fraction values to inches', () => {
    let expr = `30' 14 9/32"`;
    let expected = `374 9/32"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert mixed large feet and inch fraction values (without inch quotes) to inches', () => {
    let expr = `30' 14 9/32`;
    let expected = `374 9/32"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic addition expressions with inches', () => {
    let expr = `2" + 4"`;
    let expected = `6"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic addition expressions with inches (without inch quotes)', () => {
    let expr = `2 + 4`;
    let expected = `6"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic addition expressions with inch fractions', () => {
    let expr = `1/2" + 1/4"`;
    let expected = `0 3/4"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic addition expressions with inch fractions (without inch quotes)', () => {
    let expr = `1/2 + 1/4`;
    let expected = `0 3/4"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic subtraction expressions with inches', () => {
    let expr = `8" - 4"`;
    let expected = `4"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic subtraction expressions with inches (without inch quotes)', () => {
    let expr = `8 - 4`;
    let expected = `4"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic subtraction expressions with inch fractions', () => {
    let expr = `9/16" - 3/8"`;
    let expected = `0 3/16"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic subtraction expressions with inch fractions (without inch quotes)', () => {
    let expr = `9/16 - 3/8`;
    let expected = `0 3/16"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic division expressions with inches', () => {
    let expr = `12" / 2`;
    let expected = `6"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic division expressions with inches (without inch quotes)', () => {
    let expr = `12 / 2`;
    let expected = `6"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic division expressions with inch fractions', () => {
    let expr = `1/8" / 2`;
    let expected = `0 1/16"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle basic division expressions with inch fractions (without inch quotes)', () => {
    let expr = `1/8 / 2`;
    let expected = `0 1/16"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle division expressions with inches divisor', () => {
    let expr = `1/4" / 1/16"`;
    let expected = `4"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle division expressions with inches divisor (without inch quotes)', () => {
    let expr = `1/4 / 1/16`;
    let expected = `4"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle long expressions', () => {
    let expr = `(3' 4" + 9' + 4 1/2" + 6" + 1' 6 3/4") / 2`;
    let expected = `88 5/8"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle long expressions (without inch quotes)', () => {
    let expr = `(3' 4 + 9' + 4 1/2 + 6 + 1' 6 3/4) / 2`;
    let expected = `88 5/8"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle long complex expressions', () => {
    let expr = `((3' 4" + 9' + 4 1/2" + 6" + 1' 6 3/4") / 2) - 2 1/2"`;
    let expected = `86 1/8"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should handle long complex expressions (without inch quotes)', () => {
    let expr = `((3' 4 + 9' + 4 1/2 + 6 + 1' 6 3/4) / 2) - 2 1/2`;
    let expected = `86 1/8"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert decimal values to inches', () => {
    let expr = `0.0625"`;
    let expected = `0 1/16"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should convert decimal values to inches (without inch quotes)', () => {
    let expr = `0.0625`;
    let expected = `0 1/16"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should NOT convert feet fraction values to inches', () => {
    let expr = `1 1/2'`;
    let expected = `18"`;
    let actual = calc.calculate(expr).str();
    expect(actual).not.toEqual(expected);
  });

  test('should NOT convert feet decimal values to inches', () => {
    let expr = `1.5'`;
    let expected = `18"`;
    let actual = calc.calculate(expr).str();
    expect(actual).not.toEqual(expected);
  });

  test('should accept traditional division symbol', () => {
    let expr = `8 ÷ 4`;
    let expected = `2"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });

  test('should accept traditional multiplication symbol', () => {
    let expr = `8 × 4`;
    let expected = `32"`;
    let actual = calc.calculate(expr).str();
    expect(actual).toEqual(expected);
  });
});
