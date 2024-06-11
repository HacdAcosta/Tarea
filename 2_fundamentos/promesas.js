// Función para simular una operación asincrónica
function fetchData(id, callback) {
    setTimeout(() => {
      if (id > 0) {
        callback(null, { id, data: `Datos para el ID ${id}` });
      } else {
        callback(new Error(`Error al obtener datos para el ID ${id}`));
      }
    }, 2000);
  }
  
  // Función para procesar los datos obtenidos
  function processData(data, callback) {
    setTimeout(() => {
      if (typeof data === 'object') {
        const processedData = `Datos procesados: ${data.data}`;
        callback(null, processedData);
      } else {
        callback(new Error('Error al procesar los datos'));
      }
    }, 3000);
  }
  
  // Función para guardar los datos procesados
  function saveData(data, callback) {
    setTimeout(() => {
      if (typeof data === 'string') {
        const savedData = `Datos guardados: ${data}`;
        callback(null, savedData);
      } else {
        callback(new Error('Error al guardar los datos'));
      }
    }, 4000);
  }
  
  // Función que encadena los callbacks
  function handleData(id) {
    fetchData(id, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      processData(data, (err, processedData) => {
        if (err) {
          console.error(err);
          return;
        }
        saveData(processedData, (err, savedData) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(savedData);
        });
      });
    });
  }
  
  // Ejecutar el proceso
  handleData(10); // Devuelve "Datos guardados: Datos procesados: Datos para el ID 10"
  handleData(-1); // Devuelve "Error al obtener datos para el ID -1"
  