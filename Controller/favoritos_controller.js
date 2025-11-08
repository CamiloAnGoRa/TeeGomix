document.addEventListener("DOMContentLoaded", () => {
    // ==================== ELEMENTOS DEL DOM ====================
    const favoritesGrid = document.getElementById("favorites-grid");
    const emptyFavorites = document.getElementById("empty-favorites");
    const favoritesCountElement = document.getElementById("favorites-count");
    const logoutBtn = document.getElementById("logout-btn");

    // ==================== AÑADIR AL CARRITO ====================
    const addToCartBtns = document.querySelectorAll(".btn-add-to-cart");

    addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const favoriteItem = btn.closest(".favorite-item");
            const productName = favoriteItem.querySelector("h3").textContent;
            const productPrice = favoriteItem.querySelector(".favorite-price").textContent;

            // Animación del botón
            btn.style.transform = "scale(0.9)";
            setTimeout(() => {
                btn.style.transform = "scale(1)";
            }, 200);

            // Guardar en carrito (simulación)
            console.log("Añadido al carrito:", {
                name: productName,
                price: productPrice,
            });

            showNotification(`✅ "${productName}" añadido al carrito`);
        });
    });

    // ==================== QUITAR DE FAVORITOS ====================
    const removeFavoriteBtns = document.querySelectorAll(".btn-remove-favorite");

    removeFavoriteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const favoriteItem = btn.closest(".favorite-item");
            const productName = favoriteItem.querySelector("h3").textContent;

            // Confirmación
            if (confirm(`¿Deseas quitar "${productName}" de tus favoritos?`)) {
                // Animación de salida
                favoriteItem.style.animation = "fadeOut 0.5s ease";

                setTimeout(() => {
                    favoriteItem.remove();
                    updateFavoritesCount();
                    checkEmptyFavorites();
                    showNotification(`💔 "${productName}" eliminado de favoritos`);
                }, 500);
            }
        });
    });

    // ==================== ACTUALIZAR CONTADOR ====================
    function updateFavoritesCount() {
        const items = document.querySelectorAll(".favorite-item");
        const count = items.length;

        if (favoritesCountElement) {
            favoritesCountElement.textContent = count;
        }
    }

    // ==================== VERIFICAR FAVORITOS VACÍOS ====================
    function checkEmptyFavorites() {
        const items = document.querySelectorAll(".favorite-item");

        if (items.length === 0) {
            favoritesGrid.style.display = "none";
            emptyFavorites.style.display = "block";
            document.querySelector(".favorites-header-text").style.display = "none";
        }
    }

    // ==================== CERRAR SESIÓN ====================
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            const confirmLogout = confirm("¿Estás seguro de que deseas cerrar sesión?");

            if (confirmLogout) {
                showNotification("👋 Cerrando sesión...");

                setTimeout(() => {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("userEmail");
                    window.location.href = "../index.html";
                }, 1000);
            }
        });
    }

    // ==================== NOTIFICACIONES ====================
    function showNotification(message) {
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

        setTimeout(() => {
            notification.style.animation = "slideOut 0.3s ease";
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ==================== ANIMACIONES CSS ====================
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

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);

    // ==================== CLICK EN TODA LA TARJETA ====================
    const favoriteItems = document.querySelectorAll(".favorite-item");

    favoriteItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            // Si no se clickeó un botón, mostrar detalles
            if (!e.target.closest("button")) {
                const productName = item.querySelector("h3").textContent;
                console.log("Ver detalles de:", productName);
                // Aquí podrías abrir un modal con más información
                // openProductModal(productName);
            }
        });
    });

    // ==================== INICIALIZACIÓN ====================
    updateFavoritesCount();
    checkEmptyFavorites();

    console.log("❤️ Favoritos cargados correctamente");
});