// helpers/multiplicar.js

const fs = require('fs');

function multiplicar(num) {
    return new Promise((resolve, reject) => {
        if (typeof num !== 'number') {
            reject(new Error('El número ingresado debe ser de tipo numérico'));
        } else {
            let tabla = '';
            console.log('\n[Bienvenido a la Tabla de Multiplicar]');
            console.log(`[Tabla de Multiplicar del ${num}]`);
            for (let i = 1; i <= 10; i++) {
                const resultado = num * i;
                const linea = `${num} x ${i} = ${resultado}`;
                tabla += `${linea}\n`;
                console.log(linea);
            }
            resolve(tabla);
        }
    });
}

function crearArchivo(base, tabla) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`tabla_del_${base}.txt`, tabla, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(`tabla_del_${base}.txt`);
            }
        });
    });
}

module.exports = { multiplicar, crearArchivo };
