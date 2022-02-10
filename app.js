//server config
const express = require('express');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));

//code
const ProductManager = require('./Managers/Products.js');
const productManager = new ProductManager();
const productsRouter = require('./routes/Products');
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/products', productsRouter);
app.use(express.static(__dirname+'/public'))

