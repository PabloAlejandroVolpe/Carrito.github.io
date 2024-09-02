function obtenerProductos() {
    // Simula un retardo de 1 segundo para imitar una llamada a una API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productos); // productos viene del archivo productos.js
        }, 500);
    });
}
obtenerProductos();
