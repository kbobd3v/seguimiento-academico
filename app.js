import { manejarLogin } from './login.js';
import { configurarFormularioEvaluacion } from './evaluacion.js';
import { actualizarLista, actualizarGrafico, datos } from './datos.js';
import { configurarNavegacion } from './navegacion.js';
import { configurarToggleMenu } from './menu.js';
import { configurarFiltrosFecha } from './filtro.js';

export default function init() {
  document.addEventListener("DOMContentLoaded", () => {
    manejarLogin();
    configurarFormularioEvaluacion();
    configurarFiltrosFecha();
    configurarNavegacion();
    configurarToggleMenu();
    
    document.querySelectorAll('.seccion').forEach(seccion => {
      seccion.style.display = 'none';
    });
    document.getElementById("login").style.display = "block";
    document.querySelector(".nav-menu").style.display = "none";

    actualizarLista();
    actualizarGrafico();
  });
}

init();