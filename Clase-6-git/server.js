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


app.get('/productos', (req, res)=>{
    container.getNames().then(result=>res.send(result));
})

app.get('/productoRandom', (req,res)=>{
    container.getRandom().then(result=>res.send(result));
})