const productos = document.querySelectorAll('.producto');
const carrito = document.getElementById('carrito');
const total = document.getElementById('total');
let totalCompra = 0;
let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || {};

function actualizarCarrito() {
    carrito.innerHTML = '';
    totalCompra = 0;
    
    const productosArray = Array.from(productos);


    productosArray.sort((a, b) => {
        const nombreA = a.querySelector('h2').textContent;
        const nombreB = b.querySelector('h2').textContent;
        return nombreA.localeCompare(nombreB);
    });

    for (const producto of productosArray) {
        const idProducto = producto.getAttribute('id');
        const productoSeleccionado = productosSeleccionados[idProducto];

        if (productoSeleccionado && productoSeleccionado.cantidad > 0) {
            const nuevoItem = document.createElement('li');
            nuevoItem.textContent = `${productoSeleccionado.nombre} - $${(productoSeleccionado.precio * productoSeleccionado.cantidad).toFixed(2)} (x${productoSeleccionado.cantidad})`;
            carrito.appendChild(nuevoItem);
            totalCompra += productoSeleccionado.precio * productoSeleccionado.cantidad;
        }
    }
    
    total.textContent = totalCompra.toFixed(2);
    guardarLocalStorage();
}

function guardarLocalStorage() {
    localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
}

productos.forEach(producto => {
    const botonAgregar = producto.querySelector('.agregar');
    const botonQuitar = producto.querySelector('.quitar');

    botonAgregar.addEventListener('click', () => {
        const idProducto = producto.getAttribute('id');
        if (productosSeleccionados[idProducto]) {
            productosSeleccionados[idProducto].cantidad += 1;
        } else {
            productosSeleccionados[idProducto] = {
                nombre: producto.querySelector('h2').textContent,
                precio: parseFloat(producto.querySelector('p').textContent.replace('Precio: $', '')),
                cantidad: 1
            };
        }
        totalCompra += productosSeleccionados[idProducto].precio;
        total.textContent = totalCompra.toFixed(2);
        actualizarCarrito();
    });

    botonQuitar.addEventListener('click', () => {
        const idProducto = producto.getAttribute('id');
        if (productosSeleccionados[idProducto] && productosSeleccionados[idProducto].cantidad > 0) {
            productosSeleccionados[idProducto].cantidad -= 1;
            totalCompra -= productosSeleccionados[idProducto].precio;
            total.textContent = totalCompra.toFixed(2);
            actualizarCarrito();
        }
    });
});

// localStorage
window.addEventListener('load', () => {
    productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || {};
    actualizarCarrito();
});
