document.addEventListener("DOMContentLoaded", () => {
    // --- Toggle para mostrar/ocultar contraseña ---
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    // Rutas de las imágenes (ajusta según tu estructura de carpetas)
    const eyeClosedImg = "../Assets/Images/Ocultar.png"; // Ojo cerrado (ocultar)
    const eyeOpenImg = "../Assets/Images/Mostrar.png";     // Ojo abierto (mostrar)

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            // Cambiar el tipo de input
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.src = eyeOpenImg;
                togglePassword.alt = "Ocultar contraseña";
            } else {
                passwordInput.type = "password";
                togglePassword.src = eyeClosedImg;
                togglePassword.alt = "Mostrar contraseña";
            }
        });
    }

    // --- Validación del formulario (opcional) ---
    const form = document.querySelector(".register-form");
    
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const termsAccepted = document.getElementById("terms").checked;

            // Validaciones básicas
            if (!nombre || !email || !password) {
                alert("Por favor completa todos los campos");
                return;
            }

            if (!termsAccepted) {
                alert("Debes aceptar los términos y condiciones");
                return;
            }

            if (password.length < 8) {
                alert("La contraseña debe tener al menos 8 caracteres");
                return;
            }

            // Si todo está bien, puedes procesar el registro
            console.log("Formulario válido:", { nombre, email, password });
            alert("¡Registro exitoso! (Esto es una demo)");
            
            // Aquí irías a tu backend o página principal
            // window.location.href = "../index.html";
        });
    }

    // --- Botones sociales (opcional) ---
    const googleBtn = document.querySelector(".social-btn.google");
    const appleBtn = document.querySelector(".social-btn.apple");

    if (googleBtn) {
        googleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Registro con Google");
            alert("Función de Google en desarrollo");
        });
    }

    if (appleBtn) {
        appleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Registro con Apple");
            alert("Función de Apple en desarrollo");
        });
    }
});