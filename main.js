const productos = document.querySelectorAll('.producto');
const carrito = document.getElementById('carrito');
const total = document.getElementById('total');
const limpiarCarritoBtn = document.querySelector('.limpiar-carrito');
const temporada = document.getElementById('temporada')
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
            const precioTexto = producto.querySelector('p').textContent;
            const precio = parseFloat(precioTexto.replace('Precio: usd $', '').replace(',', '')); 
            productosSeleccionados[idProducto] = {
                nombre: producto.querySelector('h2').textContent,
                precio: isNaN(precio) ? 0 : precio,
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

limpiarCarritoBtn.addEventListener('click', () => {
    // Muestra un SweetAlert para confirmar la limpieza del carrito
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción limpiará tu carrito. ¿Quieres continuar?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, limpiar carrito'
    }).then((result) => {
        if (result.isConfirmed) {
            // Reinicia los objetos seleccionados y actualiza el carrito
            productosSeleccionados = {};
            totalCompra = 0;
            actualizarCarrito();
            Swal.fire(
                '¡Carrito limpiado!',
                'Tu carrito ha sido limpiado exitosamente.',
                'success'
            );
        }
    });
});

// localStorage
window.addEventListener('load', () => {
    productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || {};
    actualizarCarrito();
});


const traerProductos = async () => {
    const respuesta = await fetch("temporada.json");
    const data = await respuesta.json();


    data.forEach((product) => {
        let content = document.createElement('div');
        content.className = "card"
        content.innerHTML = `
            <img src="${product.imagen}">
            <p>${product.mensaje}</p>
            `;

        temporada.append(content);
    });
};

traerProductos()