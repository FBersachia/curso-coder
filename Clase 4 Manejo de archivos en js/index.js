const fs = require('fs');
const contenedor = require('./contenedor.js');

const container = new Contenedor();


let producto = {
    "title": "Lapiz",
    "price": 12.34,
    "thumbnail": "https://cdn3.iconfinder.com/4"
}

container.save(producto).then(result=>console.log(result));



