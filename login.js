export function manejarLogin() {
  const loginForm = document.getElementById("form-login");
  const loginSection = document.getElementById("login");
  const registroSection = document.getElementById("registro");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensajeError = document.getElementById("mensaje-error-login");

    mensajeError.textContent = "";

    if (usuario === "admin" && password === "admin") {
      loginSection.style.display = "none";
      registroSection.style.display = "block";
      document.querySelector(".nav-menu").style.display = "flex";
    } else {
      mensajeError.textContent = "Usuario o contraseña incorrectos.";
    }
  });
}

export function esLoginValido(usuario, password) {
  return usuario === "admin" && password === "admin";
}