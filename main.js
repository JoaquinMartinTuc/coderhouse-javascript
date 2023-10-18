let nombre;

while (!nombre) {
    nombre = prompt("Bienvenido a la web de Cens Sport, por favor ingrese su nombre debajo.");
}

alert(`Hola ${nombre}, a continuación podrás elegir tu prenda de ropa.`);


const productos = [
    { prenda: "remera Oversize", color: ["Negro", "Blanco", "Rojo", "Morado"], precio: 4500 },
    { prenda: "remera Clásica", color: ["Blanco", "Negro", "Azul"], precio: 3500 },
    { prenda: "remera Estampada", color: ["Azul", "Negro"], precio: 5000 },
    { prenda: "jean Recto", color: ["Azul"], precio: 7000 },
    { prenda: "jean Oversize", color: ["Blanco", "Azul"], precio: 8000 },
    { prenda: "jean Chupin", color: ["Azul", "Negro"], precio: 6000 },
    { prenda: "medias 3/4", color: ["Blanco", "Negro"], precio: 1500 },
    { prenda: "medias soquete", color: ["Blanco", "Negro"], precio: 1000 }
];


// Para agregar un producto, generar un nuevo elemento 

const nuevoProducto = { prenda: "gorra", color: ["Negro"], precio: 4000 };
productos.push(nuevoProducto);

//

let eleccionTipo;

while (true) {
    eleccionTipo = prompt("¿Desea buscar por prenda o por color?").toLowerCase();

    if (eleccionTipo === "prenda" || eleccionTipo === "color") {
        break;
    } else {
        alert("Por favor, elija 'prenda' o 'color'");
    }
}

let eleccion;

while (!eleccion) {
    eleccion = prompt("Ingrese el nombre de la prenda o el color que desea:\nPrendas: Remera, Jean, Medias, Gorra\nColor: Blanco, Negro, Azul, Rojo, Morado").toLowerCase();
}

if (eleccionTipo === "prenda") {
    const resultado = productos.filter((producto) => {
        return producto.prenda.toLowerCase().includes(eleccion) || producto.color.some(color => color.toLowerCase().includes(eleccion));
    });

    if (resultado.length > 0) {
        let mensaje = "Información de las prendas seleccionadas:\n\n";
        resultado.forEach((producto) => {
            mensaje += `Prenda: ${producto.prenda}\nColores: ${producto.color.join(', ')}\nPrecio: $${producto.precio}\n\n`;
        });
        alert(mensaje);
    } else {
        alert(`No se encontraron productos con ese nombre o color.`);
    }
} else if (eleccionTipo === "color") {
    const resultado = productos.filter((producto) => {
        return producto.color.some(color => color.toLowerCase().includes(eleccion));
    });

    if (resultado.length > 0) {
        let mensaje = "Información de las prendas con el color seleccionado:\n\n";
        resultado.forEach((producto) => {
            mensaje += `Prenda: ${producto.prenda}\nColores: ${producto.color.join(', ')}\nPrecio: $${producto.precio}\n\n`;
        });
        alert(mensaje);
    } else {
        alert(`No se encontraron productos con ese color.`);
    }
}

const carrito = [];

function mostrarProductos() {
    let mensaje = "Productos disponibles:\n";
    productos.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.prenda} - Colores: ${producto.color.join(', ')} - Precio: $${producto.precio}\n`;
    });
    return mensaje;
}

function agregarAlCarrito(productoIndex, cantidad) {
    const producto = productos[productoIndex];
    carrito.push({ producto, cantidad });
    return `${cantidad} ${producto.prenda} (${producto.color.join(', ')}) agregadas al carrito.`;
}

function mostrarCarrito() {
    let mensaje = "Contenido del carrito:\n";
    let total = 0;
    carrito.forEach((item) => {
        const { producto, cantidad } = item;
        mensaje += `${cantidad} ${producto.prenda} (${producto.color.join(', ')}) - Precio: $${producto.precio * cantidad}\n`;
        total += producto.precio * cantidad;
    });
    mensaje += `Total de la compra: $${total}`;
    return mensaje;
}

while (true) {
    const opcion = prompt(
        mostrarProductos() +
        "\nIngrese el número del producto que desea agregar al carrito (o 'terminar' para finalizar la compra):"
    );

    if (opcion.toLowerCase() === "terminar") {
        alert(mostrarCarrito());
        break;
    }

    const productoIndex = parseInt(opcion) - 1;
    if (productoIndex >= 0 && productoIndex < productos.length) {
        const cantidad = parseInt(prompt(`¿Cuántos ${productos[productoIndex].prenda} (${productos[productoIndex].color.join(', ')}) desea agregar al carrito?`));
        if (!isNaN(cantidad) && cantidad > 0) {
            alert(agregarAlCarrito(productoIndex, cantidad));
            alert(mostrarCarrito());
        } else {
            alert("Cantidad no válida. Intente de nuevo.");
        }
    } else {
        alert("Número de producto no válido. Intente de nuevo.");
    }
}

alert ("Muchas gracias por su compra, lo esperamos de vuelta")