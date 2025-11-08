document.addEventListener("DOMContentLoaded", () => {
    // ==================== VARIABLES GLOBALES ====================
    let cartCount = 0;
    let favoritesCount = 0;
    const cartItems = [];
    const favoriteItems = [];

    // Elementos del DOM
    const cartBtn = document.getElementById("cart-btn");
    const favBtn = document.getElementById("favorites-btn");
    const cartCountElement = document.getElementById("cart-count");
    const favCountElement = document.getElementById("favorites-count");
    const logoutBtn = document.getElementById("logout-btn");
    
    // Filtros
    const filterToggle = document.getElementById("filter-toggle");
    const filtersSidebar = document.getElementById("filters-sidebar");
    const closeFilters = document.getElementById("close-filters");
    const applyFiltersBtn = document.querySelector(".btn-apply-filters");
    const clearFiltersBtn = document.querySelector(".btn-clear-filters");
    
    // Menú móvil
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");

    // ==================== NAVEGACIÓN ====================
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Remover clase active de todos
            navLinks.forEach(l => l.classList.remove("active"));
            
            // Agregar clase active al clickeado
            link.classList.add("active");
            
            // Scroll suave a la sección
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    // ==================== TARJETAS DE PRODUCTOS ====================
    const addToCartBtns = document.querySelectorAll(".btn-add-cart");
    const favoriteBtns = document.querySelectorAll(".btn-favorite");
    
    addToCartBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que el click active el flip
            
            // Animación del botón
            btn.style.transform = "scale(0.9)";
            setTimeout(() => {
                btn.style.transform = "scale(1)";
            }, 200);
            
            // Incrementar contador
            cartCount++;
            updateCartCount();
            
            // Guardar item
            const productCard = btn.closest(".product-card");
            const productName = productCard.querySelector(".card-back h3").textContent;
            const productPrice = productCard.querySelector(".price-detail").textContent;
            
            cartItems.push({
                name: productName,
                price: productPrice
            });
            
            // Notificación
            showNotification(`✅ ${productName} añadido al carrito`);
            
            console.log("Carrito actual:", cartItems);
        });
    });
    
    favoriteBtns.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que el click active el flip
            
            // Toggle favorito
            btn.classList.toggle("active");
            
            if (btn.classList.contains("active")) {
                favoritesCount++;
                btn.textContent = "💖";
                
                const productCard = btn.closest(".product-card");
                const productName = productCard.querySelector(".card-back h3").textContent;
                
                favoriteItems.push({ name: productName });
                showNotification(`❤️ ${productName} añadido a favoritos`);
            } else {
                favoritesCount--;
                btn.textContent = "❤️";
                showNotification("Eliminado de favoritos");
            }
            
            updateFavoritesCount();
            console.log("Favoritos actuales:", favoriteItems);
        });
    });

    // ==================== ACTUALIZAR CONTADORES ====================
    function updateCartCount() {
        cartCountElement.textContent = cartCount;
        
        // Animación del badge
        cartCountElement.style.transform = "scale(1.5)";
        setTimeout(() => {
            cartCountElement.style.transform = "scale(1)";
        }, 300);
    }
    
    function updateFavoritesCount() {
        favCountElement.textContent = favoritesCount;
        
        // Animación del badge
        favCountElement.style.transform = "scale(1.5)";
        setTimeout(() => {
            favCountElement.style.transform = "scale(1)";
        }, 300);
    }

    // ==================== NOTIFICACIONES ====================
    function showNotification(message) {
        // Crear elemento de notificación
        const notification = document.createElement("div");
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: rgba(0, 191, 255, 0.95);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
        `;
        
        document.body.appendChild(notification);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.style.animation = "slideOut 0.3s ease";
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ==================== FILTROS LATERALES ====================
    if (filterToggle) {
        filterToggle.addEventListener("click", () => {
            filtersSidebar.classList.add("active");
        });
    }
    
    if (closeFilters) {
        closeFilters.addEventListener("click", () => {
            filtersSidebar.classList.remove("active");
        });
    }

    // Filtro de precio
    const priceMin = document.getElementById("price-min");
    const priceMax = document.getElementById("price-max");
    const priceMinLabel = document.getElementById("price-min-label");
    const priceMaxLabel = document.getElementById("price-max-label");
    
    if (priceMin && priceMax) {
        priceMin.addEventListener("input", () => {
            priceMinLabel.textContent = parseInt(priceMin.value).toLocaleString();
        });
        
        priceMax.addEventListener("input", () => {
            priceMaxLabel.textContent = parseInt(priceMax.value).toLocaleString();
        });
    }

    // Aplicar filtros
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener("click", () => {
            const selectedColors = Array.from(document.querySelectorAll(".color-option input:checked"))
                .map(input => input.value);
            
            const selectedMaterials = Array.from(document.querySelectorAll(".filter-section:nth-child(3) input:checked"))
                .map(input => input.value);
            
            const selectedSupport = Array.from(document.querySelectorAll(".filter-section:nth-child(4) input:checked"))
                .map(input => input.value);
            
            const filters = {
                priceMin: priceMin.value,
                priceMax: priceMax.value,
                colors: selectedColors,
                materials: selectedMaterials,
                support: selectedSupport
            };
            
            console.log("Filtros aplicados:", filters);
            showNotification("✅ Filtros aplicados correctamente");
            
            // Aquí aplicarías los filtros a los productos
            // filterProducts(filters);
            
            // Cerrar sidebar en móvil
            if (window.innerWidth <= 1024) {
                filtersSidebar.classList.remove("active");
            }
        });
    }

    // Limpiar filtros
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", () => {
            // Resetear rangos de precio
            if (priceMin) priceMin.value = 0;
            if (priceMax) priceMax.value = 200000;
            if (priceMinLabel) priceMinLabel.textContent = "0";
            if (priceMaxLabel) priceMaxLabel.textContent = "200000";
            
            // Desmarcar todos los checkboxes
            document.querySelectorAll(".filters-sidebar input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = false;
            });
            
            showNotification("🔄 Filtros limpiados");
            console.log("Filtros reseteados");
        });
    }

    // ==================== CARRITO Y FAVORITOS ====================
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            if (cartItems.length === 0) {
                showNotification("🛒 Tu carrito está vacío");
            } else {
                console.log("Ver carrito:", cartItems);
                showNotification(`🛒 Tienes ${cartItems.length} productos en el carrito`);
                // Aquí podrías abrir un modal con el carrito
                // openCartModal();
            }
        });
    }
    
    if (favBtn) {
        favBtn.addEventListener("click", () => {
            if (favoriteItems.length === 0) {
                showNotification("❤️ No tienes favoritos aún");
            } else {
                console.log("Ver favoritos:", favoriteItems);
                showNotification(`❤️ Tienes ${favoriteItems.length} productos favoritos`);
                // Aquí podrías abrir un modal con favoritos
                // openFavoritesModal();
            }
        });
    }

    // ==================== CERRAR SESIÓN ====================
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            const confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");
            
            if (confirmLogout) {
                showNotification("👋 Cerrando sesión...");
                
                // Limpiar datos
                localStorage.removeItem("rememberedEmail");
                
                // Redirigir al index después de 1 segundo
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 1000);
            }
        });
    }

    // ==================== MENÚ MÓVIL ====================
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            const nav = document.querySelector(".catalog-nav");
            nav.style.display = nav.style.display === "flex" ? "none" : "flex";
            nav.style.position = "absolute";
            nav.style.top = "80px";
            nav.style.left = "0";
            nav.style.right = "0";
            nav.style.background = "rgba(0, 0, 0, 0.95)";
            nav.style.flexDirection = "column";
            nav.style.padding = "1rem";
            nav.style.borderRadius = "0 0 15px 15px";
        });
    }

    // ==================== BOTÓN PERSONALIZADO ====================
    const customRequestBtn = document.querySelector(".btn-custom-request");
    
    if (customRequestBtn) {
        customRequestBtn.addEventListener("click", () => {
            showNotification("📧 Redirigiendo a formulario de personalización...");
            
            // Aquí podrías abrir un modal o redirigir
            setTimeout(() => {
                console.log("Abrir formulario de personalización");
                // window.location.href = "custom-form.html";
            }, 1000);
        });
    }

    // ==================== ANIMACIONES CSS ADICIONALES ====================
    const style = document.createElement("style");
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ==================== SCROLL EN HERO Y CATEGORÍAS ====================
    const heroBtn = document.querySelector(".btn-hero");
    
    if (heroBtn) {
        heroBtn.addEventListener("click", () => {
            const categoriesSection = document.querySelector(".hero-categories");
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    const categoryBtns = document.querySelectorAll(".btn-category");
    
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.getAttribute("data-category");
            const targetSection = document.getElementById(category);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                
                // Actualizar nav activo
                navLinks.forEach(link => {
                    if (link.getAttribute("href") === `#${category}`) {
                        navLinks.forEach(l => l.classList.remove("active"));
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    console.log("🎨 Catálogo TeeGomix cargado correctamente");
});