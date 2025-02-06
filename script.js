document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const resultado = document.getElementById("result");

  if (video && resultado) {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: video,
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader"],
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

    // Detectar código de barras y redirigir a la página del producto
    Quagga.onDetected((data) => {
      const codigo = data.codeResult.code;
      resultado.textContent = `Código detectado: ${codigo}`;

      // Redirigir a la página del producto 📌
      redirigirProducto(codigo);

      // Evita que Quagga siga escaneando repetidamente el mismo código
      Quagga.stop();
      setTimeout(() => Quagga.start(), 3000); // Reinicia después de 3 segundos
    });
  } else {
    console.error("Error: Elementos del escáner no encontrados.");
  }

  // Acceder a la cámara manualmente (esto ya funciona correctamente)
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error("Error al acceder a la cámara:", err);
    });

  // 🔹 Nueva función para redirigir a la página del producto en Open Food Facts
  function redirigirProducto(codigo) {
    const url = `https://world.openfoodfacts.org/product/${codigo}`;
    window.location.href = url;
  }
});
