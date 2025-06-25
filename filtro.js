import { actualizarLista } from './datos.js';

export function configurarFiltrosFecha() {
  document.getElementById("filtrar-fechas").addEventListener("click", actualizarLista);
}
