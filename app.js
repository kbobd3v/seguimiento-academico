document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-evaluacion");
  const lista = document.getElementById("evaluaciones");
  const graficoCanvas = document.getElementById("graficoBarras");
  const eliminarBtn = document.getElementById("eliminar-todo");

  let chart;

  let datos = [
    {
      materia: "Matemáticas",
      evaluacion: "Parcial 1",
      calificacion: 85,
      fecha: "2025-05-15"
    },
    {
      materia: "Física",
      evaluacion: "Quiz 1",
      calificacion: 72,
      fecha: "2025-05-18"
    },
    {
      materia: "Programación",
      evaluacion: "Proyecto Final",
      calificacion: 95,
      fecha: "2025-06-01"
    }
  ];

  actualizarLista();
  actualizarGrafico();

  eliminarBtn.addEventListener("click", function () {
    if (confirm("¿Estás seguro de eliminar todas las evaluaciones?")) {
      datos = [];
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

    const nuevoDato = {
      materia: materia.value,
      evaluacion: evaluacion.value.trim(),
      calificacion: nota,
      fecha: fecha.value
    };

    datos.push(nuevoDato);
    actualizarLista();
    actualizarGrafico();
    form.reset();
  });

  document.getElementById("filtrar-fechas").addEventListener("click", actualizarLista);


  function actualizarLista() {
    lista.innerHTML = "";
    datos.forEach((dato) => {
      const li = document.createElement("li");
      li.textContent = `${dato.fecha} - ${dato.materia} - ${dato.evaluacion}: ${dato.calificacion}`;
      lista.appendChild(li);
    });
  }

  function actualizarGrafico() {
    const etiquetas = datos.map(d => `${d.materia} (${d.evaluacion})`);
    const calificaciones = datos.map(d => d.calificacion);

    if (chart) {
      chart.destroy();
    }

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

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const seccionId = e.target.getAttribute('data-section');

      document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.style.display = 'none';
      });
      document.getElementById(seccionId).style.display = 'block';
    });
  });

  document.querySelectorAll('.seccion').forEach((seccion, i) => {
    seccion.style.display = i === 0 ? 'block' : 'none';
  });

  const toggleBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});

function actualizarLista() {
  const contenedor = document.getElementById("evaluaciones");
  contenedor.innerHTML = "";

  const desde = document.getElementById("filtro-desde").value;
  const hasta = document.getElementById("filtro-hasta").value;

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
