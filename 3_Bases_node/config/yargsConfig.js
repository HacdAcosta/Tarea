// config/yargsConfig.js

const yargs = require('yargs');

const multiplicarOptions = {
    comando: 'multiplicar',
    descripcion: 'Realiza la multiplicación de un número con el número fijo 5',
    opciones: {
        numero: {
            describe: 'Número a multiplicar',
            demandOption: true,
            type: 'number',
            alias: 'n',
            demandOption: 'Por favor, ingrese un número para realizar la multiplicación.'
        }
    }
};

const options = yargs
    .command(multiplicarOptions.comando, multiplicarOptions.descripcion, multiplicarOptions.opciones)
    .help()
    .argv;

module.exports = {
    options,
    multiplicarOptions
};
