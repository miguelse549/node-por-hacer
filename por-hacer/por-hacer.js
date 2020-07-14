const fs = require('fs');


let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer)

    fs.writeFile('db/data.json', data, (err) => {

        if (err) throw new Error('No se logro grabar', err)

    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')
        console.log(listadoPorHacer)

    } catch (error) {
        listadoPorHacer = []
    }
}

const getListado = () => {

    listadoPorHacer = require('../db/data.json')
    return listadoPorHacer
}

const actualizar = (descripcion, completado = true) => {
    cargarDB()
    let index = listadoPorHacer.findIndex(tarea => (tarea.descripcion === descripcion))

    if (index >= 0) {
        listadoPorHacer[index].completado = completado
        guardarDB()
        return true
    } else {
        return false
    }
}

// const borrar = (descripcion) => {
//     cargarDB();
//     let index = listadoPorHacer.findIndex(tarea => (tarea.descripcion === descripcion))
//     console.log(index)

//     if (index >= 0) {
//         listadoPorHacer.splice(index, 1)
//         guardarDB()
//         return true
//     } else {
//         return false
//     }

// }

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false
    } else {

        listadoPorHacer = nuevoListado
        guardarDB();
        return true;


    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}