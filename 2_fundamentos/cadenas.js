// Función para simular una operación asincrónica
function fetchData(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id > 0) {
          resolve({ id, data: `Datos para el ID ${id}` });
        } else {
          reject(new Error(`Error al obtener datos para el ID ${id}`));
        }
      }, 2000);
    });
  }
  
  // Función para procesar los datos obtenidos
  function processData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof data === 'object') {
          const processedData = `Datos procesados: ${data.data}`;
          resolve(processedData);
        } else {
          reject(new Error('Error al procesar los datos'));
        }
      }, 3000);
    });
  }
  
  // Función para guardar los datos procesados
  function saveData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof data === 'string') {
          const savedData = `Datos guardados: ${data}`;
          resolve(savedData);
        } else {
          reject(new Error('Error al guardar los datos'));
        }
      }, 4000);
    });
  }
  
  // Función que encadena las promesas
  function handleData(id) {
    return fetchData(id)
      .then(processData)
      .then(saveData)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        // No hacer nada con el error
      });
  }
  
  // Ejecutar el proceso y manejar la promesa final
  handleData(10)
    .then(() => {
      console.log('Proceso finalizado con éxito');
    })
    .catch((error) => {
      console.error('Error en el proceso:', error);
    });
  
  // Ejecutar el proceso con un ID inválido
  handleData(-1)
    .then(() => {
      console.log('Proceso finalizado con éxito');
    })
    .catch((error) => {
      console.error('Error en el proceso:', error);
    });
  