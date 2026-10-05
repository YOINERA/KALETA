// ================================================================
// BASE DE DATOS SIMULADA - LA KALETA v3
// Con inventario real por variante (talla + color)
// ================================================================

const DB = {
    init() {
        if (!localStorage.getItem('lk_v3')) {
            localStorage.removeItem('lk_initialized');
            localStorage.removeItem('lk_products');
            this.seed();
            localStorage.setItem('lk_v3', 'true');
        }
    },

    // Helper para generar inventario por variante
    // Retorna un objeto: { "S-Negro": 5, "M-Negro": 3, ... }
    buildInventory(tallas, colores, stockBase = 5) {
        const inv = {};
        tallas.forEach(t => {
            colores.forEach(c => {
                // Stock aleatorio entre 0 y stockBase para simular realidad
                inv[`${t}__${c}`] = Math.floor(Math.random() * (stockBase + 1));
            });
        });
        return inv;
    },

    seed() {
        const users = [
            { id: 1, nombre: 'Kevin Villacorta', email: 'cliente@lakaleta.com', password: '123456', telefono: '999888777', role: 'client', direccion: 'Av. España 123, Trujillo' },
            { id: 2, nombre: 'Admin LA KALETA', email: 'admin@lakaleta.com', password: 'admin123', telefono: '999111222', role: 'admin', direccion: 'Oficina Central' }
        ];

        const categories = [
            { id: 1, nombre: 'Polos', slug: 'polos' },
            { id: 2, nombre: 'Pantalones', slug: 'pantalones' },
            { id: 3, nombre: 'Casacas', slug: 'casacas' },
            { id: 4, nombre: 'Accesorios', slug: 'accesorios' },
            { id: 5, nombre: 'Calzado', slug: 'calzado' }
        ];

        const fallback = (nombre) => `https://placehold.co/600x600/1e1e1e/ff3d00?text=${encodeURIComponent(nombre)}&font=Montserrat`;

        // Helper para calcular stock total desde inventario
        const totalStock = (inv) => Object.values(inv).reduce((s, v) => s + v, 0);

        // ---- PRODUCTOS CON INVENTARIO DETALLADO ----
        const rawProducts = [
            {
                id: 1, nombre: "Polo Oversize 'Urban'", categoria: 'Polos', categoriaId: 1,
                precio: 59.90, precioAnterior: 79.90,
                img: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Polo de algodón premium con corte oversize. Ideal para un look urbano y cómodo. Estampado minimalista en el pecho.",
                descLarga: "Confeccionado en algodón peinado de 180 g/m², este polo oversize ofrece una caída perfecta y máxima comodidad. Su corte relajado y el estampado minimalista lo convierten en la pieza ideal para un look urbano sin esfuerzo.",
                composicion: "100% Algodón peinado",
                cuidados: "Lavar a máquina en frío. No usar secadora. Planchar a temperatura media.",
                origen: "Confeccionado en Perú",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["XS", "S", "M", "L", "XL", "XXL"],
                colores: ["Negro", "Blanco", "Gris", "Azul Marino", "Beige"],
                sku: "POL-001", destacado: true, nuevo: false
            },
            {
                id: 2, nombre: "Pantalón Cargo Táctico", categoria: 'Pantalones', categoriaId: 2,
                precio: 120.00, precioAnterior: 150.00,
                img: "https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Pantalón cargo con múltiples bolsillos. Tela resistente y fresca. Perfecto para el día a día.",
                descLarga: "Diseñado para resistir el uso diario, este pantalón cargo combina funcionalidad y estilo. Sus 6 bolsillos ofrecen espacio para todo lo que necesitas, mientras que su tejido de sarga garantiza durabilidad.",
                composicion: "98% Algodón, 2% Elastano",
                cuidados: "Lavado a mano o máquina en ciclo suave. No usar blanqueador.",
                origen: "Importado",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["28", "30", "32", "34", "36", "38", "40"],
                colores: ["Beige", "Negro", "Verde Oliva", "Gris", "Azul"],
                sku: "PAN-002", destacado: true, nuevo: false
            },
            {
                id: 3, nombre: "Casaca Bomber Neón", categoria: 'Casacas', categoriaId: 3,
                precio: 180.00, precioAnterior: 220.00,
                img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Casaca bomber con cierre metálico y detalles en neón. Perfecta para las noches frías.",
                descLarga: "Esta casaca bomber redefine el estilo urbano nocturno. Su forro interior térmico y los detalles reflectantes en neón te mantienen abrigado y visible. Cierre metálico YKK de alta durabilidad.",
                composicion: "Exterior: 100% Poliéster | Forro: 100% Poliéster",
                cuidados: "Limpieza en seco recomendada. No planchar directamente sobre el estampado.",
                origen: "Confeccionado en Perú",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["XS", "S", "M", "L", "XL", "XXL"],
                colores: ["Negro", "Naranja", "Azul Marino", "Verde Militar"],
                sku: "CAS-003", destacado: true, nuevo: true
            },
            {
                id: 4, nombre: "Gorra Snapback Roja", categoria: 'Accesorios', categoriaId: 4,
                precio: 45.00, precioAnterior: null,
                img: "https://images.pexels.com/photos/1878821/pexels-photo-1878821.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Gorra snapback ajustable con bordado frontal. Accesorio imprescindible para tu outfit.",
                descLarga: "Gorra snapback de 6 paneles con cierre ajustable. Bordado frontal de alta definición y visera plana. Interior con cinta absorbente para mayor comodidad.",
                composicion: "100% Algodón",
                cuidados: "Limpieza con paño húmedo. No sumergir en agua.",
                origen: "Importado",
                garantia: "15 días para cambios",
                tallas: ["Única"],
                colores: ["Rojo", "Negro", "Blanco", "Azul", "Verde"],
                sku: "GOR-004", destacado: false, nuevo: true
            },
            {
                id: 5, nombre: "Hoodie Gris Melange", categoria: 'Casacas', categoriaId: 3,
                precio: 95.00, precioAnterior: 120.00,
                img: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Hoodie con capucha y bolsillo canguro. Suave al tacto y muy abrigador.",
                descLarga: "Hoodie de felpa perchada con interior suave. Capucha doble y cordones ajustables. Bolsillo canguro con refuerzo en las costuras. Puños y cintura elásticos.",
                composicion: "80% Algodón, 20% Poliéster",
                cuidados: "Lavar del revés en frío. Secar a la sombra.",
                origen: "Confeccionado en Perú",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["S", "M", "L", "XL", "XXL"],
                colores: ["Gris", "Negro", "Blanco", "Azul Marino", "Rojo"],
                sku: "HOO-005", destacado: false, nuevo: false
            },
            {
                id: 6, nombre: "Zapatillas Streetwear", categoria: 'Calzado', categoriaId: 5,
                precio: 210.00, precioAnterior: 260.00,
                img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Zapatillas de diseño urbano, cómodas y versátiles para cualquier outfit.",
                descLarga: "Zapatillas con suela de goma antideslizante y plantilla acolchada para máxima comodidad. Diseño versátil que combina con cualquier outfit urbano. Cordones resistentes.",
                composicion: "Exterior: Cuero sintético | Suela: Goma",
                cuidados: "Limpiar con paño húmedo. No lavar en máquina.",
                origen: "Importado",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["38", "39", "40", "41", "42", "43", "44"],
                colores: ["Blanco", "Negro", "Rojo", "Azul", "Gris"],
                sku: "ZAP-006", destacado: true, nuevo: false
            },
            {
                id: 7, nombre: "Lentes de Sol Retro", categoria: 'Accesorios', categoriaId: 4,
                precio: 55.00, precioAnterior: null,
                img: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Lentes de sol con protección UV400. Estilo retro urbano que marca la diferencia.",
                descLarga: "Lentes de sol con lentes polarizadas y protección UV400. Montura resistente de acetato. Incluye estuche rígido y paño de limpieza.",
                composicion: "Montura: Acetato | Lentes: Policarbonato",
                cuidados: "Limpiar con el paño incluido. Guardar en su estuche.",
                origen: "Importado",
                garantia: "15 días para cambios",
                tallas: ["Única"],
                colores: ["Negro", "Tortuga", "Dorado", "Plateado"],
                sku: "LEN-007", destacado: false, nuevo: true
            },
            {
                id: 8, nombre: "Mochila Táctica", categoria: 'Accesorios', categoriaId: 4,
                precio: 135.00, precioAnterior: 170.00,
                img: "https://images.pexels.com/photos/1545998/pexels-photo-1545998.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Mochila resistente al agua con compartimento para laptop. Estilo táctico y funcional.",
                descLarga: "Mochila táctica de 25L con múltiples compartimentos. Compartimento acolchado para laptop de hasta 15.6\". Tejido resistente al agua. Espaldar acolchado y correas ajustables.",
                composicion: "100% Poliéster 600D resistente al agua",
                cuidados: "Limpiar con paño húmedo. No lavar en máquina.",
                origen: "Importado",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["Única"],
                colores: ["Negro", "Verde Militar", "Gris", "Azul"],
                sku: "MOC-008", destacado: false, nuevo: false
            },
            {
                id: 9, nombre: "Polo Gráfico 'Skate'", categoria: 'Polos', categoriaId: 1,
                precio: 65.00, precioAnterior: null,
                img: "https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Polo con gráfico estilo skate. Algodón 100% peinado. Corte regular.",
                descLarga: "Polo con gráfico serigrafiado estilo skate. Confeccionado en algodón peinado de alta calidad. Corte regular que se adapta a cualquier silueta.",
                composicion: "100% Algodón peinado",
                cuidados: "Lavar a máquina en frío. No usar secadora.",
                origen: "Confeccionado en Perú",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["XS", "S", "M", "L", "XL", "XXL"],
                colores: ["Negro", "Blanco", "Gris", "Azul", "Rojo"],
                sku: "POL-009", destacado: false, nuevo: true
            },
            {
                id: 10, nombre: "Short Deportivo Negro", categoria: 'Pantalones', categoriaId: 2,
                precio: 75.00, precioAnterior: 95.00,
                img: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Short deportivo con tejido transpirable. Ideal para el gym o el día a día.",
                descLarga: "Short deportivo con tejido transpirable y elástico en la cintura. Bolsillos laterales con cierre. Ideal para entrenar o para el día a día.",
                composicion: "90% Poliéster, 10% Elastano",
                cuidados: "Lavar a máquina en frío. Secar al aire.",
                origen: "Importado",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["S", "M", "L", "XL", "XXL"],
                colores: ["Negro", "Gris", "Azul", "Rojo"],
                sku: "SHO-010", destacado: false, nuevo: false
            },
            {
                id: 11, nombre: "Chaqueta Jean Clásica", categoria: 'Casacas', categoriaId: 3,
                precio: 195.00, precioAnterior: 240.00,
                img: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Chaqueta de jean con corte clásico. Un básico atemporal para cualquier guardarropa urbano.",
                descLarga: "Chaqueta de jean con corte clásico y lavado medio. Botones metálicos y costuras reforzadas. Cuatro bolsillos frontales. Un básico atemporal que nunca pasa de moda.",
                composicion: "100% Algodón denim",
                cuidados: "Lavar del revés en frío. No usar secadora.",
                origen: "Importado",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["XS", "S", "M", "L", "XL", "XXL"],
                colores: ["Azul Claro", "Azul Oscuro", "Negro", "Blanco"],
                sku: "CHA-011", destacado: true, nuevo: true
            },
            {
                id: 12, nombre: "Beanie Negro Unisex", categoria: 'Accesorios', categoriaId: 4,
                precio: 35.00, precioAnterior: null,
                img: "https://images.pexels.com/photos/6046159/pexels-photo-6046159.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Gorro de lana suave y abrigador. Diseño unisex con logo bordado.",
                descLarga: "Beanie de tejido acanalado con doble capa para mayor abrigo. Logo bordado en la parte frontal. Diseño unisex que se adapta a cualquier estilo.",
                composicion: "100% Acrílico",
                cuidados: "Lavar a mano en agua fría. Secar en plano.",
                origen: "Importado",
                garantia: "15 días para cambios",
                tallas: ["Única"],
                colores: ["Negro", "Gris", "Rojo", "Verde", "Azul Marino"],
                sku: "BEA-012", destacado: false, nuevo: true
            },
            {
                id: 13, nombre: "Jogger Deportivo Gris", categoria: 'Pantalones', categoriaId: 2,
                precio: 89.90, precioAnterior: 110.00,
                img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Jogger con puños elásticos y cordón ajustable. Cómodo y con estilo para el día a día.",
                descLarga: "Jogger de felpa perchada con puños elásticos y cordón ajustable. Dos bolsillos laterales y uno trasero. Corte tapered que estiliza la silueta.",
                composicion: "70% Algodón, 30% Poliéster",
                cuidados: "Lavar a máquina en frío. Secar a la sombra.",
                origen: "Confeccionado en Perú",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["XS", "S", "M", "L", "XL", "XXL"],
                colores: ["Gris", "Negro", "Azul Marino", "Beige"],
                sku: "JOG-013", destacado: false, nuevo: false
            },
            {
                id: 14, nombre: "Polera Cuello Alto", categoria: 'Polos', categoriaId: 1,
                precio: 85.00, precioAnterior: 105.00,
                img: "https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Polera de cuello alto en tejido grueso. Elegante y abrigadora para el invierno.",
                descLarga: "Polera de cuello alto en tejido grueso de punto acanalado. Suave al tacto y muy abrigadora. Perfecta para combinar con jeans o pantalones de vestir.",
                composicion: "60% Algodón, 40% Acrílico",
                cuidados: "Lavar a mano en agua fría. No usar secadora.",
                origen: "Importado",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["XS", "S", "M", "L", "XL"],
                colores: ["Negro", "Blanco", "Beige", "Vino", "Verde Militar"],
                sku: "POL-014", destacado: false, nuevo: true
            },
            {
                id: 15, nombre: "Zapatillas Running Pro", categoria: 'Calzado', categoriaId: 5,
                precio: 245.00, precioAnterior: 290.00,
                img: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600",
                desc: "Zapatillas deportivas con amortiguación de alto rendimiento. Diseño moderno y funcional.",
                descLarga: "Zapatillas de running con tecnología de amortiguación de alto impacto. Malla transpirable en la parte superior. Suela de goma con tracción multidireccional.",
                composicion: "Upper: Malla técnica | Suela: Goma EVA",
                cuidados: "Limpiar con paño húmedo. No lavar en máquina.",
                origen: "Importado",
                garantia: "30 días para cambios y devoluciones",
                tallas: ["38", "39", "40", "41", "42", "43", "44", "45"],
                colores: ["Negro", "Blanco", "Azul", "Rojo", "Verde Neón"],
                sku: "ZAP-015", destacado: true, nuevo: true
            }
        ];

        // Generar inventario y calcular stock total
        const products = rawProducts.map(p => {
            const inv = this.buildInventory(p.tallas, p.colores, 8);
            return {
                ...p,
                fallback: fallback(p.nombre),
                inventario: inv,
                stock: totalStock(inv)
            };
        });

        const sales = [
            { id: 1001, cliente: 'Kevin Villacorta', total: 250.00, fecha: '2026-09-25', estado: 'Entregado', items: 3 },
            { id: 1002, cliente: 'María López', total: 180.00, fecha: '2026-09-26', estado: 'Enviado', items: 2 },
            { id: 1003, cliente: 'Carlos Ruiz', total: 420.00, fecha: '2026-09-27', estado: 'Entregado', items: 5 },
            { id: 1004, cliente: 'Ana Torres', total: 95.00, fecha: '2026-09-28', estado: 'Pendiente', items: 1 },
            { id: 1005, cliente: 'Luis Mendoza', total: 310.00, fecha: '2026-09-29', estado: 'Enviado', items: 4 }
        ];

        const orders = [
            { id: 'ORD-001', userId: 1, fecha: '2026-09-20', total: 179.80, estado: 'Entregado', items: [{ nombre: 'Polo Oversize', cantidad: 2, precio: 59.90 }] },
            { id: 'ORD-002', userId: 1, fecha: '2026-09-28', total: 210.00, estado: 'En tránsito', items: [{ nombre: 'Zapatillas Streetwear', cantidad: 1, precio: 210.00 }] }
        ];

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

    // ---------- HELPERS DE INVENTARIO ----------
    getStockByVariant(product, talla, color) {
        if (!product.inventario) return 0;
        return product.inventario[`${talla}__${color}`] || 0;
    },

    getStockByTalla(product, talla) {
        if (!product.inventario) return 0;
        return Object.entries(product.inventario)
            .filter(([k]) => k.startsWith(`${talla}__`))
            .reduce((s, [, v]) => s + v, 0);
    },

    getStockByColor(product, color) {
        if (!product.inventario) return 0;
        return Object.entries(product.inventario)
            .filter(([k]) => k.endsWith(`__${color}`))
            .reduce((s, [, v]) => s + v, 0);
    },

    generateId() { return Date.now() + Math.floor(Math.random() * 1000); },
    formatPrice(p) { return 'S/ ' + p.toFixed(2); }
};

DB.init();