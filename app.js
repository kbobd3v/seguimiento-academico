document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-evaluacion");
  const lista = document.getElementById("evaluaciones");
  const graficoCanvas = document.getElementById("graficoBarras");

  let datos = [];
  let chart;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const materia = document.getElementById("materia").value.trim();
    const evaluacion = document.getElementById("evaluacion").value.trim();
    const calificacion = parseInt(document.getElementById("calificacion").value);

    if (!materia || !evaluacion || isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
      alert("Por favor complete correctamente todos los campos.");
      return;
    }

    const nuevoDato = { materia, evaluacion, calificacion };
    datos.push(nuevoDato);

    actualizarLista();
    actualizarGrafico();
    form.reset();
  });

  function actualizarLista() {
    lista.innerHTML = "";
    datos.forEach((dato) => {
      const li = document.createElement("li");
      li.textContent = `${dato.materia} - ${dato.evaluacion}: ${dato.calificacion}`;
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


});

  // Navegación entre secciones
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const seccionId = e.target.getAttribute('data-section');

    // Oculta todas las secciones
    document.querySelectorAll('.seccion').forEach(seccion => {
      seccion.style.display = 'none';
    });
    // Muestra la seleccionada
    document.getElementById(seccionId).style.display = 'block';
  });
});

// Mostrar solo la primera sección al cargar
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.seccion').forEach((seccion, i) => {
    seccion.style.display = i === 0 ? 'block' : 'none';
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
});