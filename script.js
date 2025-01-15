document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const resultado = document.getElementById("resultado");
  
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: video,
          constraints: {
            facingMode: "environment", // Cámara trasera
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader"], // Escanea códigos EAN y UPC
        },
      },
      (err) => {
        if (err) {
          console.error("Error al inicializar Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );
  
    Quagga.onDetected((data) => {
      const codigo = data.codeResult.code;
      resultado.textContent = `Código detectado: ${codigo}`;
      consultarProducto(codigo);
      Quagga.stop(); // Detenemos el escáner después de detectar
    });
  
    function consultarProducto(codigo) {
      const url = `https://world.openfoodfacts.org/api/v0/product/${codigo}.json`;
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 1) {
            const producto = data.product;
            resultado.innerHTML = `
              <strong>Producto:</strong> ${producto.product_name}<br>
              <strong>Marca:</strong> ${producto.brands}<br>
              <strong>Ingredientes:</strong> ${producto.ingredients_text || "No disponibles"}<br>
              <strong>Nutrición:</strong> ${producto.nutrition_grade_fr || "No clasificado"}<br>
            `;
          } else {
            resultado.textContent = "Producto no encontrado en la base de datos.";
          }
        })
        .catch((error) => {
          console.error("Error al consultar la API:", error);
          resultado.textContent = "Error al buscar el producto.";
        });
    }
  });
  