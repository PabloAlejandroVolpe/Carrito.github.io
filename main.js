const header = document.querySelector("#header");
const contenedor = document.querySelector("#contenedor");
const body = document.querySelector("body");
window.addEventListener("scroll", function(){
    if(contenedor.getBoundingClientRect().top<10){
        header.classList.add("scroll")
    }
    else{
        header.classList.remove("scroll")
    }
})


// main.js
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor');
    const carritoItemsContainer = document.getElementById('carrito-items');
    const totalElement = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    let carrito = [];

    obtenerProductos().then(productos => {
        productos.forEach((producto, index) => {
            const productoElement = document.createElement('div');

            productoElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="informacion">
                    <p>${producto.nombre}</p>
                    <p>(limite de compra ${producto.limite})</p>
                    <p class="precio">$${producto.precio.toFixed(2).split('.')[0]}<span>.${producto.precio.toFixed(2).split('.')[1]}</span></p>
                    <button data-index="${index}">Comprar</button>
                </div>
            `;

            contenedor.appendChild(productoElement);
        });

        // Agregar eventos a los botones de "Comprar"
        contenedor.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productoIndex = e.target.getAttribute('data-index');
                agregarAlCarrito(productos[productoIndex]);
            });
        });
    });

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        const index = carrito.findIndex(p => p.nombre === producto.nombre);
        if (index > -1) {
            if (carrito[index].cantidad < 5) {
                carrito[index].cantidad += 1;
            }
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarCarrito();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Agregado al carrito",
            showConfirmButton: false,
            timer: 800
          });
    }

    // Función para actualizar el contenido del carrito en la interfaz
    function actualizarCarrito() {
        carritoItemsContainer.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            const carritoItem = document.createElement('div');
            carritoItem.classList.add('carrito-item');

            carritoItem.innerHTML = `
                <p>${producto.nombre} - $${producto.precio.toFixed(2)} x ${producto.cantidad}</p>
                <button data-index="${index}" class="aumentar-cantidad">+</button>
                <button data-index="${index}" class="disminuir-cantidad">-</button>
                <button data-index="${index}" class="eliminar-producto">Eliminar</button>
            `;

            carritoItemsContainer.appendChild(carritoItem);
            total += producto.precio * producto.cantidad;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;

        // Agregar eventos a los botones de "Aumentar", "Disminuir" y "Eliminar"
        document.querySelectorAll('.aumentar-cantidad').forEach(button => {
            button.addEventListener('click', (e) => {
                const productoIndex = e.target.getAttribute('data-index');
                aumentarCantidad(productoIndex);
            });
        });

        document.querySelectorAll('.disminuir-cantidad').forEach(button => {
            button.addEventListener('click', (e) => {
                const productoIndex = e.target.getAttribute('data-index');
                disminuirCantidad(productoIndex);
            });
        });

        document.querySelectorAll('.eliminar-producto').forEach(button => {
            button.addEventListener('click', (e) => {
                const productoIndex = e.target.getAttribute('data-index');
                eliminarDelCarrito(productoIndex);
            });
        });
    }

    // Función para aumentar la cantidad de un producto
    function aumentarCantidad(index) {
        if (carrito[index].cantidad < 5) {
            carrito[index].cantidad += 1;
        }
        actualizarCarrito();
    }

    // Función para disminuir la cantidad de un producto
    function disminuirCantidad(index) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else if (carrito[index].cantidad === 1) {
            eliminarDelCarrito(index);
        }
        actualizarCarrito();
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    // Función para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        actualizarCarrito();
    });

    // Función para finalizar la compra
    finalizarCompraBtn.addEventListener('click', () => {
        if (carrito.length > 0) {
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        } else {
            Swal.fire({
                icon: "error",
                text: "Tu carrito esta vacio!",
              });
        }
    });
});


