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