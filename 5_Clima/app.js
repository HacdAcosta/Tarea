const readline = require('readline');
const axios = require('axios');

const API_KEY = '2c1fcaf276601ae4464b4b7f86c3dded';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function searchCities(cityName) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=${API_KEY}&units=metric`);
    return response.data.list;
  } catch (error) {
    console.error('Error al buscar las ciudades:', error);
    return [];
  }
}

async function getWeatherData(city, units = 'metric') {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.sys.country}&appid=${API_KEY}&units=${units}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del clima:', error);
    return null;
  }
}

function displayCityOptions(cities) {
  console.log('Selecciona la ciudad:');
  cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city.name}, ${city.sys.country} (${city.coord.lat}, ${city.coord.lon})`);
  });
}

function displayWeatherInfo(weatherData, units) {
  console.log(`Información del clima para ${weatherData.name}, ${weatherData.sys.country}:`);
  console.log(`- Coordenadas: (\[${weatherData.coord.lat}, ${weatherData.coord.lon}\])`);
  console.log(`- Temperatura: \[${weatherData.main.temp}°${units === 'metric' ? 'C' : 'F'}\]`);
  console.log(`- Humedad: \[${weatherData.main.humidity}%\]`);
  console.log(`- Presión: \[${weatherData.main.pressure} hPa\]`);
  console.log(`- Velocidad del viento: \[${weatherData.wind.speed} m/s\]`);
  console.log(`- Dirección del viento: \[${weatherData.wind.deg}°\]`);
  console.log(`- Visibilidad: \[${weatherData.visibility} m\]`);
}

function displayMenu() {
  console.log('Menú:');
  console.log('1. Buscar ciudad');
  console.log('2. Historial');
  console.log('3. Cambiar unidad de temperatura');
  console.log('4. Salir');
}

async function main() {
  let historyList = [];
  let tempUnit = 'metric';

  while (true) {
    displayMenu();
    const choice = await new Promise(resolve => rl.question('Selecciona una opción: ', resolve));

    switch (choice) {
      case '1':
        const cityName = await new Promise(resolve => rl.question('Ingresa el nombre de la ciudad: ', resolve));
        const cities = await searchCities(cityName);
        if (cities.length === 0) {
          console.log('No se encontraron ciudades con ese nombre.');
        } else if (cities.length === 1) {
          const weatherData = await getWeatherData(cities[0], tempUnit);
          if (weatherData) {
            displayWeatherInfo(weatherData, tempUnit);
            historyList.push(weatherData);
            await new Promise(resolve => rl.question('Presiona Enter para continuar...', resolve));
          }
        } else {
          displayCityOptions(cities);
          const selectedIndex = await new Promise(resolve => rl.question('Ingresa el número de la ciudad: ', resolve));
          const selectedCity = cities[selectedIndex - 1];
          const weatherData = await getWeatherData(selectedCity, tempUnit);
          if (weatherData) {
            displayWeatherInfo(weatherData, tempUnit);
            historyList.push(weatherData);
            await new Promise(resolve => rl.question('Presiona Enter para continuar...', resolve));
          }
        }
        break;
      case '2':
        if (historyList.length === 0) {
          console.log('No hay historial de búsquedas.');
        } else {
          console.log('Historial de búsquedas:');
          for (const weatherData of historyList) {
            console.log(`- ${weatherData.name}, ${weatherData.sys.country}`);
          }
          await new Promise(resolve => rl.question('Presiona Enter para continuar...', resolve));
        }
        break;
      case '3':
        tempUnit = tempUnit === 'metric' ? 'imperial' : 'metric';
        console.log(`Unidad de temperatura cambiada a ${tempUnit === 'metric' ? 'Celsius' : 'Fahrenheit'}.`);
        await new Promise(resolve => rl.question('Presiona Enter para continuar...', resolve));
        break;
      case '4':
        console.log('¡Hasta luego!');
        rl.close();
        return;
      default:
        console.log('Opción inválida. Intenta de nuevo.');
    }
  }
}

main();
