document.addEventListener("DOMContentLoaded", function () {
    cargarPreferencias();
    cargarHistorial();
    cargarFavoritos();
});

function agregarPreferencia() {
    let input = document.getElementById("preferenciasInput");
    let lista = document.getElementById("listaPreferencias");
    if (input.value.trim() !== "") {
        let item = document.createElement("li");
        item.textContent = input.value;
        lista.appendChild(item);
        guardarPreferencia(input.value);
        input.value = "";
    }
}

function guardarPreferencia(preferencia) {
    let preferencias = JSON.parse(localStorage.getItem("preferencias")) || [];
    preferencias.push(preferencia);
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
}

function cargarPreferencias() {
    let preferencias = JSON.parse(localStorage.getItem("preferencias")) || [];
    let lista = document.getElementById("listaPreferencias");
    lista.innerHTML = "";
    preferencias.forEach(pref => {
        let item = document.createElement("li");
        item.textContent = pref;
        lista.appendChild(item);
    });
}

function cargarFavoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || ["Yogur Natural", "Frutos Secos"];
    let lista = document.getElementById("listaFavoritos");
    favoritos.forEach(prod => {
        let item = document.createElement("li");
        item.textContent = prod;
        lista.appendChild(item);
    });
}

// Función para agregar preferencia
function agregarPreferencia() {
    const input = document.getElementById("preferenciasInput");
    const lista = document.getElementById("listaPreferencias");
    
    // Verificar si el campo no está vacío
    if (input.value.trim() !== "") {
      const li = document.createElement("li");
      li.innerHTML = `${input.value} <button onclick="eliminarElemento(this)">Eliminar</button>`;
      lista.appendChild(li);
      input.value = ""; // Limpiar el campo de entrada
    }
  }
  
  // Función para agregar producto favorito
  function agregarFavorito() {
    const input = document.getElementById("favoritosInput");
    const lista = document.getElementById("listaFavoritos");
    
    // Verificar si el campo no está vacío
    if (input.value.trim() !== "") {
      const li = document.createElement("li");
      li.innerHTML = `${input.value} <button onclick="eliminarElemento(this)">Eliminar</button>`;
      lista.appendChild(li);
      input.value = ""; // Limpiar el campo de entrada
    }
  }
  
  // Función para eliminar un producto o preferencia
  function eliminarElemento(btn) {
    const li = btn.parentElement;
    li.remove();
  }
  