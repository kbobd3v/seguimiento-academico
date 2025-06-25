export let datos = [
  { materia: "Matemáticas", evaluacion: "Parcial 1", calificacion: 85, fecha: "2025-05-15" },
  { materia: "Física", evaluacion: "Quiz 1", calificacion: 72, fecha: "2025-05-18" },
  { materia: "Programación", evaluacion: "Proyecto Final", calificacion: 95, fecha: "2025-06-01" }
];

let chart;

export function actualizarLista() {
  const contenedor = document.getElementById("evaluaciones");
  contenedor.innerHTML = "";

  const desde = document.getElementById("filtro-desde")?.value;
  const hasta = document.getElementById("filtro-hasta")?.value;

  let datosFiltrados = datos;

  if (desde || hasta) {
    datosFiltrados = datos.filter(d => {
      const fecha = new Date(d.fecha);
      const fDesde = desde ? new Date(desde) : null;
      const fHasta = hasta ? new Date(hasta) : null;
      return (!fDesde || fecha >= fDesde) && (!fHasta || fecha <= fHasta);
    });
  }

  if (datosFiltrados.length === 0) {
    contenedor.innerHTML = "<p>No hay evaluaciones para mostrar.</p>";
    return;
  }

  datosFiltrados.forEach((dato) => {
    const card = document.createElement("div");
    card.classList.add("card-evaluacion");

    card.innerHTML = `
      <div class="dato"><strong>📅 Fecha:</strong> ${dato.fecha}</div>
      <div class="dato"><strong>📘 Materia:</strong> ${dato.materia}</div>
      <div class="dato"><strong>✏️ Evaluación:</strong> ${dato.evaluacion}</div>
      <div class="dato"><strong>✅ Nota:</strong> ${dato.calificacion}</div>
    `;

    contenedor.appendChild(card);
  });
}

export function actualizarGrafico() {
  const graficoCanvas = document.getElementById("graficoBarras");

  const etiquetas = datos.map(d => `${d.materia} (${d.evaluacion})`);
  const calificaciones = datos.map(d => d.calificacion);

  if (chart) chart.destroy();

  chart = new Chart(graficoCanvas, {
    type: 'bar',
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Calificaciones',
        data: calificaciones,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}
