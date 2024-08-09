// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = [];
    }

    // Función para agregar productos al carrito
    agregarProducto(producto) {
        this.productos.push(producto);
    }

    //// Función para eliminar productos al carrito
    eliminarProducto(nombre) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombre);
    }

    // Función para calcular el total de la compra
    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    // Función para finalizar la compra
    finalizarCompra() {
        const total = this.calcularTotal();
        this.productos = [];
        return total;
    }
}

//Constructor de productos, con su respectivo precio. En este caso crea un array de objetos de tipo producto
const productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Huevo', 2000),
    new Producto('Queso', 2100),
    new Producto('Aceite', 1800),
    new Producto('Jamón', 2000)
];

//Crea una nueva instancia de la clase Carrito y la asigna a la constante
const carrito = new Carrito();

//Función para mostrar los productos creados para la tienda con sus atributos y botones para agregar y eliminar
function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    productosDisponibles.forEach(producto => {
        const li = document.createElement('li');
        li.className = 'producto';
        li.textContent = `${producto.nombre} - $${producto.precio}`;

        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar';
        botonAgregar.onclick = () => {
            carrito.agregarProducto(producto);
            mostrarCarrito();
        };
        li.appendChild(botonAgregar);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => {
            carrito.eliminarProducto(producto.nombre);
            mostrarCarrito();
        };
        li.appendChild(botonEliminar);

        listaProductos.appendChild(li);
    });
}

//Función mostrar carrito que crea la lista de productos con su respectivo precio
function mostrarCarrito() {
    const listaCarrito = document.getElementById('carrito');
    listaCarrito.innerHTML = '';
    carrito.productos.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(li);
    });
    document.getElementById('total').textContent = carrito.calcularTotal();
}

//Finalización de la compra que genera un alert con el precio total del carrito
document.getElementById('finalizar-compra').onclick = () => {
    alert(`Total de la compra: $${carrito.finalizarCompra()}`);
    mostrarCarrito();
};

mostrarProductos();
