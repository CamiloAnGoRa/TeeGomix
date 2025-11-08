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

    // --- Manejo del formulario de login ---
    const loginForm = document.getElementById("login-form");
    
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const remember = document.getElementById("remember").checked;

            // Validaciones básicas
            if (!email || !password) {
                alert("Por favor completa todos los campos");
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor ingresa un correo electrónico válido");
                return;
            }

            if (password.length < 6) {
                alert("La contraseña debe tener al menos 6 caracteres");
                return;
            }

            // Si todo está bien, procesar el login
            console.log("Login válido:", { email, remember });
            
            // Guardar en localStorage si marca "Recordarme"
            if (remember) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            // Guardar sesión activa
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email);

            alert("¡Inicio de sesión exitoso!");
            
            // Redirigir al catálogo
            window.location.href = "../Views/catalogo.html";
        });
    }

    // --- Cargar email recordado al iniciar ---
    const emailInput = document.getElementById("email");
    const rememberCheckbox = document.getElementById("remember");
    const rememberedEmail = localStorage.getItem("rememberedEmail");

    if (rememberedEmail && emailInput && rememberCheckbox) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }

    // --- Botones sociales ---
    const googleBtn = document.querySelector(".social-btn.google");
    const appleBtn = document.querySelector(".social-btn.apple");

    if (googleBtn) {
        googleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Login con Google");
            alert("Función de Google en desarrollo");
            // Aquí integrarías con Google OAuth
        });
    }

    if (appleBtn) {
        appleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Login con Apple");
            alert("Función de Apple en desarrollo");
            // Aquí integrarías con Apple Sign In
        });
    }

    // --- Link de "Olvidaste tu contraseña" ---
    const forgotLink = document.querySelector(".forgot-link");
    
    if (forgotLink) {
        forgotLink.addEventListener("click", (e) => {
            e.preventDefault();
            
            const email = document.getElementById("email").value;
            
            if (!email) {
                alert("Por favor ingresa tu correo electrónico primero");
                document.getElementById("email").focus();
                return;
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor ingresa un correo electrónico válido");
                return;
            }

            console.log("Recuperar contraseña para:", email);
            alert(`Se enviará un enlace de recuperación a: ${email}`);
            
            // Aquí podrías redirigir a una página de recuperación
            // window.location.href = "forgot-password.html?email=" + encodeURIComponent(email);
        });
    }
});