console.log("Inicio del programa");

setTimeout(() => {
  console.log("Mensaje después de 2 segundos");
}, 2000);

console.log("Mensaje después de la función setTimeout");

setTimeout(() => {
  console.log("Mensaje después de 4 segundos");
}, 4000);

setTimeout(() => {
  console.log("Mensaje después de 6 segundos");
}, 6000);

console.log("Final del programa");