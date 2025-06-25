export function configurarNavegacion() {
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
}
