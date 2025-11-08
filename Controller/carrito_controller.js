document.addEventListener("DOMContentLoaded", () => {
    // ==================== ELEMENTOS DEL DOM ====================
    const cartItems = document.getElementById("cart-items");
    const emptyCart = document.getElementById("empty-cart");
    const logoutBtn = document.getElementById("logout-btn");
    const checkoutBtn = document.getElementById("checkout-btn");
    const continueShoppingBtn = document.getElementById("continue-shopping");

    // ==================== CONTROL DE CANTIDAD ====================
    const minusBtns = document.querySelectorAll(".qty-btn.minus");
    const plusBtns = document.querySelectorAll(".qty-btn.plus");

    minusBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = btn.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateTotals();
            }
        });
    });

    plusBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = btn.previousElementSibling;
            let value = parseInt(input.value);
            const max = parseInt(input.max);
            if (value < max) {
                input.value = value + 1;
                updateTotals();
            }
        });
    });

    // ==================== ELIMINAR PRODUCTOS ====================
    const removeBtns = document.querySelectorAll(".btn-remove");

    removeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const cartItem = btn.closest(".cart-item");
            const productName = cartItem.querySelector("h2").textContent;

            // Confirmación
            if (confirm(`¿Deseas eliminar "${productName}" del carrito?`)) {
                // Animación de salida
                cartItem.style.animation = "slideOut 0.3s ease";

                setTimeout(() => {
                    cartItem.remove();
                    updateTotals();
                    checkEmptyCart();
                    showNotification(`"${productName}" eliminado del carrito`);
                }, 300);
            }
        });
    });

    // ==================== ACTUALIZAR TOTALES ====================
    function updateTotals() {
        const items = document.querySelectorAll(".cart-item");
        let subtotal = 0;

        items.forEach((item) => {
            const price = parseInt(
                item.querySelector(".item-price").textContent.replace(/[^0-9]/g, "")
            );
            const quantity = parseInt(item.querySelector(".qty-input").value);
            subtotal += price * quantity;
        });

        const shipping = 15000;
        const tax = Math.round(subtotal * 0.19);
        const total = subtotal + shipping + tax;

        // Actualizar en el DOM
        document.getElementById("subtotal").textContent = `$${subtotal.toLocaleString()}`;
        document.getElementById("shipping").textContent = `$${shipping.toLocaleString()}`;
        document.getElementById("tax").textContent = `$${tax.toLocaleString()}`;
        document.getElementById("total").textContent = `$${total.toLocaleString()}`;
    }

    // ==================== VERIFICAR CARRITO VACÍO ====================
    function checkEmptyCart() {
        const items = document.querySelectorAll(".cart-item");

        if (items.length === 0) {
            cartItems.style.display = "none";
            emptyCart.style.display = "block";
            document.querySelector(".cart-summary").style.display = "none";
        }
    }

    // ==================== GENERAR ORDEN ====================
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const items = document.querySelectorAll(".cart-item");

            if (items.length === 0) {
                showNotification("⚠️ Tu carrito está vacío");
                return;
            }

            // Recopilar información del pedido
            const orderItems = [];
            items.forEach((item) => {
                const name = item.querySelector("h2").textContent;
                const price = item.querySelector(".item-price").textContent;
                const quantity = item.querySelector(".qty-input").value;

                orderItems.push({
                    name,
                    price,
                    quantity,
                });
            });

            const total = document.getElementById("total").textContent;

            console.log("Orden generada:", {
                items: orderItems,
                total: total,
                fecha: new Date().toLocaleDateString(),
            });

            // Mostrar confirmación
            showNotification("✅ Orden generada exitosamente");

            // Aquí podrías redirigir a una página de pago
            setTimeout(() => {
                alert(
                    `Orden Generada\n\nTotal: ${total}\nProductos: ${orderItems.length}\n\n¡Gracias por tu compra!`
                );
                // window.location.href = "checkout.html";
            }, 1000);
        });
    }

    // ==================== CONTINUAR COMPRANDO ====================
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener("click", () => {
            window.location.href = "catalog.html";
        });
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
    `;
    document.head.appendChild(style);

    // ==================== INICIALIZACIÓN ====================
    updateTotals();
    checkEmptyCart();

    console.log("🛒 Carrito de compras cargado correctamente");
});