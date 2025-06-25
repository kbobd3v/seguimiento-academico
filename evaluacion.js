import { datos, actualizarLista, actualizarGrafico } from './datos.js';

export function configurarFormularioEvaluacion() {
  const form = document.getElementById("form-evaluacion");
  const eliminarBtn = document.getElementById("eliminar-todo");

  eliminarBtn.addEventListener("click", function () {
    if (confirm("¿Estás seguro de eliminar todas las evaluaciones?")) {
      datos.length = 0;
      actualizarLista();
      actualizarGrafico();
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('error-input'));

    const materia = document.getElementById("materia");
    const evaluacion = document.getElementById("evaluacion");
    const calificacion = document.getElementById("calificacion");
    const fecha = document.getElementById("fecha");

    let valid = true;

    if (!materia.value) {
      document.getElementById("error-materia").textContent = "Debe tener un valor";
      materia.classList.add("error-input");
      valid = false;
    }

    if (!evaluacion.value.trim()) {
      document.getElementById("error-evaluacion").textContent = "Debe tener un valor";
      evaluacion.classList.add("error-input");
      valid = false;
    }

    const nota = parseFloat(calificacion.value);
    if (isNaN(nota) || nota < 0 || nota > 100) {
      document.getElementById("error-calificacion").textContent = "Debe ser un número entre 0 y 100";
      calificacion.classList.add("error-input");
      valid = false;
    }

    if (!fecha.value) {
      document.getElementById("error-fecha").textContent = "Debe tener un valor";
      fecha.classList.add("error-input");
      valid = false;
    }

    if (!valid) return;

    datos.push({
      materia: materia.value,
      evaluacion: evaluacion.value.trim(),
      calificacion: nota,
      fecha: fecha.value
    });

    actualizarLista();
    actualizarGrafico();
    form.reset();
  });
}
export function esCalificacionValida(valor) {
  const nota = parseFloat(valor);
  return !isNaN(nota) && nota >= 0 && nota <= 100;
}