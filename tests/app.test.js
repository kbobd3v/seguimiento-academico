import { esCalificacionValida } from '../evaluacion.js';
import { esLoginValido } from '../login.js';

describe('Validación de calificaciones', () => {
  test('Nota válida (85)', () => {
    expect(esCalificacionValida(85)).toBe(true);
  });

  test('Nota negativa', () => {
    expect(esCalificacionValida(-5)).toBe(false);
  });

  test('Nota mayor a 100', () => {
    expect(esCalificacionValida(150)).toBe(false);
  });

  test('Nota no numérica', () => {
    expect(esCalificacionValida("abc")).toBe(false);
  });
});

describe('Validación de login', () => {
  test('Usuario y contraseña correctos', () => {
    expect(esLoginValido('admin', 'admin')).toBe(true);
  });

  test('Usuario incorrecto', () => {
    expect(esLoginValido('user', 'admin')).toBe(false);
  });

  test('Contraseña incorrecta', () => {
    expect(esLoginValido('admin', '123')).toBe(false);
  });
});
