// server
const http = require ('http');
const express = require ('express');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server listening on por ${PORT}`);
});

// code
const fs = require('fs');
const Contenedor = require('./contenedor.js');

const container = new Contenedor();

//producto de pruebas


let producto = {
    "title": '',
    "price": 12.54,
    "thumbnail": "https://cdn3.iconfinder.com"
}


app.get('/productos', (req, res)=>{
    container.getNames().then(result=>res.send(result));
})

app.get('/productoRandom', (req,res)=>{
    container.getRandom().then(result=>res.send(result));
})

app.get('/getById/:id', (req,res)=>{
    container.getById(Number(req.params.id)).then(result=>res.send(result));
})

app.get('/save/:productName', (req,res) =>{
    producto.title = req.params.productName;
    container.save(producto).then(result=>res.send(result));
})

app.get('/getAll', (req,res) =>{
    container.getAll().then(result=>res.send(result));
})

app.get('/deleteById/:id', (req, res) => {
    container.deleteByID(Number(req.params.id)).then(result=>res.send(result));
})

app.get('/deleteAll', (req, res) =>{
    container.deleteAll().then(result=>res.send(result));
})
