function obtenerDatosUsuario(userId, callback) {
    console.log("Obteniendo datos del usuario...");
    setTimeout(function() {
      const usuario = {
        id: userId,
        nombre: "Nombre del Usuario",
        email: "usuario@ejemplo.com"
      };
      callback(null, usuario);
    }, 2000);
  }
  
  function obtenerOrdenesUsuario(usuario, callback) {
    console.log("Obteniendo órdenes del usuario...");
    setTimeout(function() {
      const ordenes = [
        { id: 1, producto: "Producto 1", precio: 10.99 },
        { id: 2, producto: "Producto 2", precio: 15.50 },
        { id: 3, producto: "Producto 3", precio: 8.75 }
      ];
      callback(null, ordenes);
    }, 1500);
  }
  
  function calcularTotalOrdenes(ordenes, callback) {
    console.log("Calculando total de órdenes...");
    setTimeout(function() {
      let total = 0;
      ordenes.forEach(function(orden) {
        total += orden.precio;
      });
      callback(null, total);
    }, 1000);
  }
  
  function main() {
    obtenerDatosUsuario(123, function(error, usuario) {
      if (error) {
        console.error("Error al obtener datos del usuario:", error);
        return;
      }
  
      obtenerOrdenesUsuario(usuario, function(error, ordenes) {
        if (error) {
          console.error("Error al obtener órdenes del usuario:", error);
          return;
        }
  
        calcularTotalOrdenes(ordenes, function(error, total) {
          if (error) {
            console.error("Error al calcular el total de órdenes:", error);
            return;
          }
  
          console.log("Datos del usuario:", usuario);
          console.log("Órdenes del usuario:", ordenes);
          console.log("Total de órdenes:", total.toFixed(2), "euros");
        });
      });
    });
  }
  
  main();
  