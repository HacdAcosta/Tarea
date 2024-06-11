// app.js

const { multiplicar, crearArchivo } = require('./helpers/multiplicar');
const { options, multiplicarOptions } = require('./config/yargsConfig');

const { numero } = options;

multiplicar(numero)
    .then((tabla) => {
        console.log('\n[Resultado]');
        return crearArchivo(numero, tabla);
    })
    .then((nombreArchivo) => console.log(`\n${nombreArchivo} creado`))
    .catch((err) => {
        console.log(err.message);
    });
