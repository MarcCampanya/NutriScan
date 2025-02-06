document.addEventListener("DOMContentLoaded", () => {
    const listaHistorial = document.getElementById("listaHistorial");

    // Función para cargar el historial de productos desde el localStorage
    function cargarHistorial() {
        // Obtener el historial almacenado en el localStorage
        const historial = JSON.parse(localStorage.getItem("historial")) || [];

        // Limpiar la lista antes de añadir los elementos
        listaHistorial.innerHTML = "";

        if (historial.length > 0) {
            historial.forEach(producto => {
                const li = document.createElement("li");
                li.textContent = producto.nombre; // Usamos 'nombre' para mostrar el producto
                listaHistorial.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No hay productos en el historial.";
            listaHistorial.appendChild(li);
        }
    }

    // Llamar a la función para cargar el historial al cargar la página
    cargarHistorial();
});
