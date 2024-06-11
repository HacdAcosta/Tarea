// Función que simula una consulta a una base de datos
function consultarBaseDeDatos(query, callback) {
    // Simular la consulta a la base de datos
    setTimeout(function() {
      const resultados = [
        { id: 1, nombre: "Producto 1", precio: 10.99 },
        { id: 2, nombre: "Producto 2", precio: 15.50 },
        { id: 3, nombre: "Producto 3", precio: 8.75 }
      ];
  
      // Llamar a la función de callback con los resultados
      callback(null, resultados);
    }, 1500);
  }
  
  // Función que simula una operación de procesamiento de datos
  function procesarDatos(datos, callback) {
    // Simular el procesamiento de datos
    setTimeout(function() {
      const datosProcessados = datos.map(function(item) {
        return {
          id: item.id,
          nombre: item.nombre.toUpperCase(),
          precioConIva: item.precio * 1.21
        };
      });
  
      // Llamar a la función de callback con los datos procesados
      callback(null, datosProcessados);
    }, 1000);
  }
  
  // Función que simula una operación de generación de reporte
  function generarReporte(datos, callback) {
    // Simular la generación del reporte
    setTimeout(function() {
      let reporte = "Reporte de productos:\n\n";
      datos.forEach(function(item) {
        reporte += `ID: ${item.id}, Nombre: ${item.nombre}, Precio (con IVA): \[${item.precioConIva.toFixed(2)}\] euros\n`;
      });
  
      // Llamar a la función de callback con el reporte generado
      callback(null, reporte);
    }, 2000);
  }
  
  // Función principal que coordina las operaciones
  function main() {
    // Consultar la base de datos
    consultarBaseDeDatos("SELECT * FROM productos", function(error, resultados) {
      if (error) {
        console.error("Error al consultar la base de datos:", error);
        return;
      }
  
      // Procesar los datos
      procesarDatos(resultados, function(error, datosProcessados) {
        if (error) {
          console.error("Error al procesar los datos:", error);
          return;
        }
  
        // Generar el reporte
        generarReporte(datosProcessados, function(error, reporte) {
          if (error) {
            console.error("Error al generar el reporte:", error);
            return;
          }
  
          // Imprimir el reporte
          console.log(reporte);
        });
      });
    });
  }
  
  // Llamar a la función principal
  main();
  