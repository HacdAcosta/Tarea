// Función de flecha para sumar dos números
const sumar = (a, b) => a + b;

// Función de flecha para restar dos números
const restar = (a, b) => a - b;

// Función de flecha para multiplicar dos números
const multiplicar = (a, b) => a * b;

// Función de flecha para dividir dos números
const dividir = (a, b) => {
  if (b === 0) {
    return 'No se puede dividir entre cero';
  }
  return a / b;
};

// Función de flecha para calcular el cuadrado de un número
const cuadrado = a => a * a;

// Función de flecha para calcular el cubo de un número
const cubo = a => a * a * a;

// Ejemplos de uso
console.log(sumar(5, 3)); // Salida: 8
console.log(restar(10, 4)); // Salida: 6
console.log(multiplicar(6, 7)); // Salida: 42
console.log(dividir(15, 3)); // Salida: 5
console.log(dividir(10, 0)); // Salida: No se puede dividir entre cero
console.log(cuadrado(4)); // Salida: 16
console.log(cubo(3)); // Salida: 27
