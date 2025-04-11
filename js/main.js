document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu__toggle');
    const sidebarMenu = document.getElementById('sidebar__menu');
    const menuOverlay = document.getElementById('menu__overlay');
    
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
    const menuLinks = document.querySelectorAll('.options .options__item');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900) {
                toggleMenu();
            }
        });
    });
    
    // Implementar debounce para el evento resize
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    }
    
    // Ajustar en caso de cambio de tamaño de ventana con debounce
    const handleResize = debounce(function() {
        if (window.innerWidth > 900 && sidebarMenu.classList.contains('open')) {
            toggleMenu();
        }
    }, 150);
    
    window.addEventListener('resize', handleResize);
    
    // Usar passive event listeners para mejorar el rendimiento del scroll
    document.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('menu-open') && window.innerWidth <= 900) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Optimización de carga de imágenes - Precarga el siguiente conjunto
    function preloadNextImages() {
        const images = document.querySelectorAll('.slider_content__slider .item img');
        const currentIndex = Array.from(images).findIndex(img => 
            img.getBoundingClientRect().left > 0 && 
            img.getBoundingClientRect().left < window.innerWidth
        );
        
        if (currentIndex !== -1 && currentIndex < images.length - 2) {
            const nextImage = images[currentIndex + 2];
            if (nextImage && nextImage.getAttribute('loading') === 'lazy') {
                nextImage.setAttribute('loading', 'eager');
            }
        }
    }
    
    // Ejecutar precarga de imágenes después de la carga inicial
    window.addEventListener('load', function() {
        setTimeout(preloadNextImages, 2000);
    });
});