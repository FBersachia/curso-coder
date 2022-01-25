const fs = require('fs');
const { userInfo } = require('os');
const path = require('path/posix');
const { json } = require('stream/consumers');

const pathToProduct = './producto.json';
class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    save = async producto => {
        //recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        if (!producto.title || !producto.price) return { status: "error", error: "Faltan datos" };
        try {
            if (fs.existsSync(pathToProduct)) {
                let data = await fs.promises.readFile(pathToProduct, 'utf-8');
                let products = JSON.parse(data);
                let id = 1;
                if (products[0]) id = products[products.length - 1].id + 1; //Esto evita el error de que no hay ningun producto
                producto.id = id;
                products.push(producto);
                await fs.promises.writeFile(pathToProduct, JSON.stringify(products, null, 2))
                return { status: "success", message: "Producto añadido" };

            } else { //el archivo no existe
                producto.id = 1;
                await fs.promises.writeFile(pathToProduct, JSON.stringify([producto], null, 2));
                return { status: "success", message: `Product created with id ${producto.id}` }
            }
        } catch (error) {
            return { status: "error", error: error };
        }
    }

    getById = async id => {  //Recibe un id y devuelve el objeto con ese id, o null si no está
        if (fs.existsSync(pathToProduct)) {
            let data = await fs.promises.readFile(pathToProduct, 'utf-8');
            let products = JSON.parse(data);
            let product = products.find(p => p.id === id);
            if (product) {
                return { status: "success", producto: product };
            } else {
                return { status: "error", error: "Producto no encontrado" };
            }
        }
    }

    getAll = async () => { //devuelve un array con los objetos presentes en el archivo
        if (fs.existsSync(pathToProduct)) {
            let data = await fs.promises.readFile(pathToProduct, 'utf-8');
            let products = JSON.parse(data);
            if (products[0]) {
                return { status: "success", productos: products };
            } else {
                return { status: "error", error: "No hay productos" };
            }
        }
    }

    deleteByID = async id => { //elimina del archivo el objeto con el id buscado
        if (fs.existsSync(pathToProduct)) {
            let data = await fs.promises.readFile(pathToProduct, 'utf-8');
            let products = JSON.parse(data);
            if (!id || id > products.length || id < 1) {
                return { status: "error", error: "No existe ese producto" };
            } else {
                let newProducts = products.filter(p => p.id !== id);
                await fs.promises.writeFile(pathToProduct, JSON.stringify(newProducts, null, 2))
                return { status: "success", productos: newProducts, message: `El producto con id ${id} fue eliminado` };
            }
        }
    }

    deleteAll = async () => { //Elimina todos los objetos presentes en el archivo
        if (fs.existsSync(pathToProduct)) {
            await fs.promises.writeFile(pathToProduct, JSON.stringify([], null, 2))
            return { status: "success", message: `Todos los productos fueron eliminados` };
        }
    }
}





module.exports = Contenedor;