const fs = require('fs');
const Contenedor = require('./contenedor.js');

const container = new Contenedor();


let producto = {
    "title": "Goma",
    "price": 12.54,
    "thumbnail": "https://cdn3.iconfinder.com"
}

container.save(producto).then(result=>console.log(result));
//container.getAll().then(result=>console.log(result));
//container.getById(2).then(result=>console.log(result));
//container.deleteByID(4).then(result=>console.log(result));
//container.deleteAll().then(result=>console.log(result));

