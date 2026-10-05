// ================================================================
// BASE DE DATOS SIMULADA - LA KALETA
// Con imágenes reales verificadas y sistema de respaldo automático
// ================================================================

const DB = {
    // ---------- INICIALIZACIÓN ----------
    init() {
        // Forzar actualización si la versión anterior tenía URLs rotas
        if (!localStorage.getItem('lk_v2')) {
            localStorage.removeItem('lk_initialized');
            localStorage.removeItem('lk_products');
            this.seed();
            localStorage.setItem('lk_v2', 'true');
        } else if (!localStorage.getItem('lk_initialized')) {
            this.seed();
            localStorage.setItem('lk_initialized', 'true');
        }
    },

    // ---------- SEMILLA DE DATOS ----------
    seed() {
        // Usuarios
        const users = [
            { id: 1, nombre: 'Kevin Villacorta', email: 'cliente@lakaleta.com', password: '123456', telefono: '999888777', role: 'client', direccion: 'Av. España 123, Trujillo' },
            { id: 2, nombre: 'Admin LA KALETA', email: 'admin@lakaleta.com', password: 'admin123', telefono: '999111222', role: 'admin', direccion: 'Oficina Central' }
        ];

        // Categorías
        const categories = [
            { id: 1, nombre: 'Polos', slug: 'polos' },
            { id: 2, nombre: 'Pantalones', slug: 'pantalones' },
            { id: 3, nombre: 'Casacas', slug: 'casacas' },
            { id: 4, nombre: 'Accesorios', slug: 'accesorios' },
            { id: 5, nombre: 'Calzado', slug: 'calzado' }
        ];

        // Helper para generar respaldo
        const fallback = (nombre) => `https://placehold.co/600x600/1e1e1e/ff3d00?text=${encodeURIComponent(nombre)}&font=Montserrat`;

        // Productos (15 en total) con imágenes reales de Pexels
        const products = [
            {
                id: 1, nombre: "Polo Oversize 'Urban'", categoria: 'Polos', categoriaId: 1,
                precio: 59.90, precioAnterior: 79.90,
                img: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Polo Oversize Urban"),
                desc: "Polo de algodón premium con corte oversize. Ideal para un look urbano y cómodo. Estampado minimalista en el pecho.",
                tallas: ["S", "M", "L", "XL"], colores: ["Negro", "Blanco", "Gris"],
                stock: 25, sku: "POL-001", destacado: true, nuevo: false
            },
            {
                id: 2, nombre: "Pantalón Cargo Táctico", categoria: 'Pantalones', categoriaId: 2,
                precio: 120.00, precioAnterior: 150.00,
                img: "https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Pantalon Cargo Tactico"),
                desc: "Pantalón cargo con múltiples bolsillos. Tela resistente y fresca. Perfecto para el día a día.",
                tallas: ["28", "30", "32", "34", "36"], colores: ["Beige", "Negro", "Verde Oliva"],
                stock: 15, sku: "PAN-002", destacado: true, nuevo: false
            },
            {
                id: 3, nombre: "Casaca Bomber Neón", categoria: 'Casacas', categoriaId: 3,
                precio: 180.00, precioAnterior: 220.00,
                img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Casaca Bomber Neon"),
                desc: "Casaca bomber con cierre metálico y detalles en neón. Perfecta para las noches frías.",
                tallas: ["S", "M", "L", "XL"], colores: ["Negro", "Naranja", "Azul Marino"],
                stock: 8, sku: "CAS-003", destacado: true, nuevo: true
            },
            {
                id: 4, nombre: "Gorra Snapback Roja", categoria: 'Accesorios', categoriaId: 4,
                precio: 45.00, precioAnterior: null,
                img: "https://images.pexels.com/photos/1878821/pexels-photo-1878821.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Gorra Snapback Roja"),
                desc: "Gorra snapback ajustable con bordado frontal. Accesorio imprescindible para tu outfit.",
                tallas: ["Única"], colores: ["Rojo", "Negro", "Blanco"],
                stock: 40, sku: "GOR-004", destacado: false, nuevo: true
            },
            {
                id: 5, nombre: "Hoodie Gris Melange", categoria: 'Casacas', categoriaId: 3,
                precio: 95.00, precioAnterior: 120.00,
                img: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Hoodie Gris Melange"),
                desc: "Hoodie con capucha y bolsillo canguro. Suave al tacto y muy abrigador.",
                tallas: ["M", "L", "XL"], colores: ["Gris", "Negro"],
                stock: 3, sku: "HOO-005", destacado: false, nuevo: false
            },
            {
                id: 6, nombre: "Zapatillas Streetwear", categoria: 'Calzado', categoriaId: 5,
                precio: 210.00, precioAnterior: 260.00,
                img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Zapatillas Streetwear"),
                desc: "Zapatillas de diseño urbano, cómodas y versátiles para cualquier outfit.",
                tallas: ["39", "40", "41", "42", "43"], colores: ["Blanco", "Negro", "Rojo"],
                stock: 12, sku: "ZAP-006", destacado: true, nuevo: false
            },
            {
                id: 7, nombre: "Lentes de Sol Retro", categoria: 'Accesorios', categoriaId: 4,
                precio: 55.00, precioAnterior: null,
                img: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Lentes de Sol Retro"),
                desc: "Lentes de sol con protección UV400. Estilo retro urbano que marca la diferencia.",
                tallas: ["Única"], colores: ["Negro", "Tortuga"],
                stock: 20, sku: "LEN-007", destacado: false, nuevo: true
            },
            {
                id: 8, nombre: "Mochila Táctica", categoria: 'Accesorios', categoriaId: 4,
                precio: 135.00, precioAnterior: 170.00,
                img: "https://images.pexels.com/photos/1545998/pexels-photo-1545998.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Mochila Tactica"),
                desc: "Mochila resistente al agua con compartimento para laptop. Estilo táctico y funcional.",
                tallas: ["Única"], colores: ["Negro", "Verde Militar"],
                stock: 10, sku: "MOC-008", destacado: false, nuevo: false
            },
            {
                id: 9, nombre: "Polo Gráfico 'Skate'", categoria: 'Polos', categoriaId: 1,
                precio: 65.00, precioAnterior: null,
                img: "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Polo Grafico Skate"),
                desc: "Polo con gráfico estilo skate. Algodón 100% peinado. Corte regular.",
                tallas: ["S", "M", "L"], colores: ["Negro", "Blanco"],
                stock: 18, sku: "POL-009", destacado: false, nuevo: true
            },
            {
                id: 10, nombre: "Short Deportivo Negro", categoria: 'Pantalones', categoriaId: 2,
                precio: 75.00, precioAnterior: 95.00,
                img: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Short Deportivo Negro"),
                desc: "Short deportivo con tejido transpirable. Ideal para el gym o el día a día.",
                tallas: ["S", "M", "L", "XL"], colores: ["Negro", "Gris"],
                stock: 22, sku: "SHO-010", destacado: false, nuevo: false
            },
            {
                id: 11, nombre: "Chaqueta Jean Clásica", categoria: 'Casacas', categoriaId: 3,
                precio: 195.00, precioAnterior: 240.00,
                img: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Chaqueta Jean Clasica"),
                desc: "Chaqueta de jean con corte clásico. Un básico atemporal para cualquier guardarropa urbano.",
                tallas: ["S", "M", "L", "XL"], colores: ["Azul", "Negro"],
                stock: 14, sku: "CHA-011", destacado: true, nuevo: true
            },
            {
                id: 12, nombre: "Beanie Negro Unisex", categoria: 'Accesorios', categoriaId: 4,
                precio: 35.00, precioAnterior: null,
                img: "https://images.pexels.com/photos/6046159/pexels-photo-6046159.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Beanie Negro Unisex"),
                desc: "Gorro de lana suave y abrigador. Diseño unisex con logo bordado.",
                tallas: ["Única"], colores: ["Negro", "Gris", "Rojo"],
                stock: 35, sku: "BEA-012", destacado: false, nuevo: true
            },
            {
                id: 13, nombre: "Jogger Deportivo Gris", categoria: 'Pantalones', categoriaId: 2,
                precio: 89.90, precioAnterior: 110.00,
                img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Jogger Deportivo Gris"),
                desc: "Jogger con puños elásticos y cordón ajustable. Cómodo y con estilo para el día a día.",
                tallas: ["S", "M", "L", "XL"], colores: ["Gris", "Negro"],
                stock: 20, sku: "JOG-013", destacado: false, nuevo: false
            },
            {
                id: 14, nombre: "Polera Cuello Alto", categoria: 'Polos', categoriaId: 1,
                precio: 85.00, precioAnterior: 105.00,
                img: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Polera Cuello Alto"),
                desc: "Polera de cuello alto en tejido grueso. Elegante y abrigadora para el invierno.",
                tallas: ["S", "M", "L", "XL"], colores: ["Negro", "Blanco", "Beige"],
                stock: 16, sku: "POL-014", destacado: false, nuevo: true
            },
            {
                id: 15, nombre: "Zapatillas Running Pro", categoria: 'Calzado', categoriaId: 5,
                precio: 245.00, precioAnterior: 290.00,
                img: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600",
                fallback: fallback("Zapatillas Running Pro"),
                desc: "Zapatillas deportivas con amortiguación de alto rendimiento. Diseño moderno y funcional.",
                tallas: ["39", "40", "41", "42", "43", "44"], colores: ["Negro", "Blanco", "Azul"],
                stock: 9, sku: "ZAP-015", destacado: true, nuevo: true
            }
        ];

        // Ventas simuladas para el dashboard
        const sales = [
            { id: 1001, cliente: 'Kevin Villacorta', total: 250.00, fecha: '2026-09-25', estado: 'Entregado', items: 3 },
            { id: 1002, cliente: 'María López', total: 180.00, fecha: '2026-09-26', estado: 'Enviado', items: 2 },
            { id: 1003, cliente: 'Carlos Ruiz', total: 420.00, fecha: '2026-09-27', estado: 'Entregado', items: 5 },
            { id: 1004, cliente: 'Ana Torres', total: 95.00, fecha: '2026-09-28', estado: 'Pendiente', items: 1 },
            { id: 1005, cliente: 'Luis Mendoza', total: 310.00, fecha: '2026-09-29', estado: 'Enviado', items: 4 }
        ];

        // Pedidos del cliente
        const orders = [
            { id: 'ORD-001', userId: 1, fecha: '2026-09-20', total: 179.80, estado: 'Entregado', items: [{ nombre: 'Polo Oversize', cantidad: 2, precio: 59.90 }, { nombre: 'Gorra Snapback', cantidad: 1, precio: 45.00 }] },
            { id: 'ORD-002', userId: 1, fecha: '2026-09-28', total: 210.00, estado: 'En tránsito', items: [{ nombre: 'Zapatillas Streetwear', cantidad: 1, precio: 210.00 }] }
        ];

        // Guardar en localStorage
        localStorage.setItem('lk_users', JSON.stringify(users));
        localStorage.setItem('lk_categories', JSON.stringify(categories));
        localStorage.setItem('lk_products', JSON.stringify(products));
        localStorage.setItem('lk_sales', JSON.stringify(sales));
        localStorage.setItem('lk_orders', JSON.stringify(orders));
        localStorage.setItem('lk_cart', JSON.stringify([]));
        localStorage.setItem('lk_wishlist', JSON.stringify([]));
    },

    // ---------- MÉTODOS DE ACCESO ----------
    get(key) { return JSON.parse(localStorage.getItem('lk_' + key)) || []; },
    set(key, value) { localStorage.setItem('lk_' + key, JSON.stringify(value)); },

    getProducts() { return this.get('products'); },
    setProducts(p) { this.set('products', p); },

    getUsers() { return this.get('users'); },
    setUsers(u) { this.set('users', u); },

    getSales() { return this.get('sales'); },
    getOrders() { return this.get('orders'); },
    setOrders(o) { this.set('orders', o); },

    getCart() { return this.get('cart'); },
    setCart(c) { this.set('cart', c); },

    getCurrentUser() {
        const id = localStorage.getItem('lk_current_user');
        return id ? this.getUsers().find(u => u.id == id) : null;
    },

    setCurrentUser(id) { localStorage.setItem('lk_current_user', id); },
    logout() { localStorage.removeItem('lk_current_user'); },

    // ---------- UTILIDADES ----------
    generateId() { return Date.now() + Math.floor(Math.random() * 1000); },

    formatPrice(p) { return 'S/ ' + p.toFixed(2); }
};

// Inicializar al cargar
DB.init();