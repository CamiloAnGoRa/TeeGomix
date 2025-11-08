document.addEventListener("DOMContentLoaded", () => {
    // --- Navegación suave entre secciones internas ---
    const navLinks = document.querySelectorAll('nav a[href^="#"], a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            const targetId = link.getAttribute("href");

            // Si es el botón de inicio (#hero), recarga la página
            if (targetId === "#main-id") {
                e.preventDefault();
                window.location.reload();
                return;
            }

            // Para otras secciones, navegación suave normal
            e.preventDefault();
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: "smooth",
                        block: "start" // Asegura que empiece desde el inicio de la sección
                    });
                }
            }
        });
    });

    // --- Scroll con rueda del ratón para transiciones tipo pantalla completa ---
    // OPCIONAL: Descomenta este bloque si quieres scroll automático por sección
    
    let isScrolling = false;
    const sections = document.querySelectorAll('.hero-section, .about-section');
    let currentSection = 0;

    // Detectar en qué sección estamos al hacer scroll manual
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -100 && rect.top <= 100) {
                currentSection = index;
            }
        });
    });

    // Scroll automático con la rueda del ratón
    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            // Scroll hacia abajo
            e.preventDefault();
            currentSection++;
            isScrolling = true;
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 1000);
        } else if (e.deltaY < 0 && currentSection > 0) {
            // Scroll hacia arriba
            e.preventDefault();
            currentSection--;
            isScrolling = true;
            sections[currentSection].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 1000);
        }
    }, { passive: false });
    

    // --- Navegación a otras páginas ---
    const routes = {
        "btn-register": "views/register.html",
        "btn-login": "views/login.html"
    };

    // Asigna dinámicamente los eventos según los IDs definidos arriba
    Object.entries(routes).forEach(([btnId, path]) => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener("click", () => {
                window.location.href = path;
            });
        }
    });

    // --- Opcional: Agregar ID a la sección hero para navegación ---
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && !heroSection.id) {
        heroSection.id = 'hero';
    }
});