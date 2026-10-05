// ================================================================
// UTILIDADES GLOBALES
// ================================================================

// ---------- TOAST NOTIFICATIONS ----------
function showToast(message, type = 'info') {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.className = `toast ${type}`;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---------- HEADER DINÁMICO ----------
function renderHeader(activePage = '') {
    const user = DB.getCurrentUser();
    const cart = DB.getCart();
    const cartCount = cart.reduce((s, i) => s + i.cantidad, 0);

    const header = document.querySelector('header');
    if (!header) return;

    header.innerHTML = `
        <a href="${user && user.role === 'admin' ? 'admin.html' : 'catalog.html'}" class="logo">LA KALETA</a>
        <div class="nav-actions">
            ${user && user.role === 'client' ? `
                <a href="catalog.html" class="btn-icon" title="Catálogo">🛍️</a>
                <a href="cart.html" class="btn-icon" title="Carrito">
                    🛒 ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ''}
                </a>
                <a href="profile.html" class="btn-icon" title="Mi Perfil">👤</a>
            ` : ''}
            ${user && user.role === 'admin' ? `
                <a href="admin.html" class="btn-icon" title="Dashboard">📊</a>
            ` : ''}
            ${user ? `<button class="btn-icon" onclick="logout()" title="Salir">🚪</button>` : ''}
        </div>
    `;
}

// ---------- CERRAR SESIÓN ----------
function logout() {
    if (confirm('¿Cerrar sesión?')) {
        DB.logout();
        window.location.href = 'index.html';
    }
}

// ---------- VERIFICAR AUTENTICACIÓN ----------
function requireAuth(role = null) {
    const user = DB.getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    if (role && user.role !== role) {
        showToast('Acceso denegado', 'error');
        setTimeout(() => window.location.href = user.role === 'admin' ? 'admin.html' : 'catalog.html', 1000);
        return null;
    }
    return user;
}

// ---------- CARRITO ----------
const Cart = {
    add(product, talla, color, cantidad = 1) {
        const cart = DB.getCart();
        const existing = cart.find(i => i.id === product.id && i.talla === talla && i.color === color);
        if (existing) {
            existing.cantidad += cantidad;
        } else {
            cart.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                img: product.img,
                talla,
                color,
                cantidad
            });
        }
        DB.setCart(cart);
        showToast(`✅ ${product.nombre} agregado al carrito`, 'success');
    },

    remove(index) {
        const cart = DB.getCart();
        cart.splice(index, 1);
        DB.setCart(cart);
    },

    updateQty(index, delta) {
        const cart = DB.getCart();
        if (!cart[index]) return;
        cart[index].cantidad += delta;
        if (cart[index].cantidad <= 0) cart.splice(index, 1);
        DB.setCart(cart);
    },

    getTotal() {
        return DB.getCart().reduce((s, i) => s + i.precio * i.cantidad, 0);
    },

    getCount() {
        return DB.getCart().reduce((s, i) => s + i.cantidad, 0);
    },

    clear() { DB.setCart([]); }
};

// ---------- RENDERIZAR CARRITO (página cart.html) ----------
function renderCartPage() {
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('cart-summary');
    if (!container) return;

    const cart = DB.getCart();

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 3rem 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                <h3 style="margin-bottom: 1rem;">Tu carrito está vacío</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Agrega productos para continuar</p>
                <a href="catalog.html" class="btn-primary" style="max-width: 250px; display:inline-block;">Ir al Catálogo</a>
            </div>
        `;
        if (summary) summary.style.display = 'none';
        return;
    }

    container.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <img src="${item.img}" alt="${item.nombre}" onerror="this.src='https://placehold.co/100x100/222/fff?text=Img'">
                <div>
                    <h4>${item.nombre}</h4>
                    <div class="meta">Talla: ${item.talla} | Color: ${item.color}</div>
                    <div class="price">S/ ${(item.precio * item.cantidad).toFixed(2)}</div>
                </div>
            </div>
            <div style="display:flex; align-items:center; gap:1rem;">
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateCartQty(${i}, -1)">−</button>
                    <span style="min-width: 24px; text-align:center; font-weight:700;">${item.cantidad}</span>
                    <button class="qty-btn" onclick="updateCartQty(${i}, 1)">+</button>
                </div>
                <button class="btn-danger" onclick="removeCartItem(${i})">✕</button>
            </div>
        </div>
    `).join('');

    // Resumen
    const subtotal = Cart.getTotal();
    const envio = subtotal > 150 ? 0 : 15;
    const total = subtotal + envio;

    summary.style.display = 'block';
    summary.innerHTML = `
        <h3 style="margin-bottom: 1rem; text-transform:uppercase; letter-spacing:1px;">Resumen del Pedido</h3>
        <div class="summary-row"><span>Subtotal</span><span>S/ ${subtotal.toFixed(2)}</span></div>
        <div class="summary-row"><span>Envío</span><span>${envio === 0 ? 'GRATIS' : 'S/ ' + envio.toFixed(2)}</span></div>
        <div class="summary-row total"><span>Total</span><span>S/ ${total.toFixed(2)}</span></div>
        <a href="checkout.html" class="btn-primary" style="margin-top: 1.5rem; display:block;">Proceder al Pago →</a>
        <a href="catalog.html" class="btn-secondary" style="margin-top: 0.8rem; display:block;">Seguir Comprando</a>
    `;
}

function updateCartQty(index, delta) {
    Cart.updateQty(index, delta);
    renderCartPage();
}

function removeCartItem(index) {
    Cart.remove(index);
    renderCartPage();
    showToast('Producto eliminado', 'info');
}

// ---------- INICIALIZACIÓN GLOBAL ----------
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
    renderHeader();
});