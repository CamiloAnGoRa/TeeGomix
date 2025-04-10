document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarMenu = document.getElementById('slidebar_menu');
    const menuOverlay = document.getElementById('menu_overlay');
    
    // Función para abrir/cerrar el menú
    function toggleMenu() {
        menuToggle.classList.toggle('open');
        sidebarMenu.classList.toggle('open');
        menuOverlay.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    }
    
    // Evento para el botón de hamburguesa
    menuToggle.addEventListener('click', toggleMenu);
    
    // Evento para el overlay
    menuOverlay.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace en móvil
    const menuLinks = document.querySelectorAll('.options .item');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900) {
                toggleMenu();
            }
        });
    });
    
    // Ajustar en caso de cambio de tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && sidebarMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
    
    // Prevenir scroll cuando el menú está abierto en dispositivos móviles
    document.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('menu-open') && window.innerWidth <= 900) {
            e.preventDefault();
        }
    }, { passive: false });
});