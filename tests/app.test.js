import { validarCalificacion, loginValido } from '../utils';

describe('Validación de calificaciones', () => {
  test('Nota válida (85)', () => {
    expect(validarCalificacion(85)).toBe(true);
  });

  test('Nota negativa', () => {
    expect(validarCalificacion(-5)).toBe(false);
  });

  test('Nota mayor a 100', () => {
    expect(validarCalificacion(150)).toBe(false);
  });

  test('Nota no numérica', () => {
    expect(validarCalificacion("abc")).toBe(false);
  });
});

describe('Validación de login', () => {
  test('Usuario y contraseña correctos', () => {
    expect(loginValido('admin', 'admin')).toBe(true);
  });

  test('Usuario incorrecto', () => {
    expect(loginValido('user', 'admin')).toBe(false);
  });

  test('Contraseña incorrecta', () => {
    expect(loginValido('admin', '123')).toBe(false);
  });
});