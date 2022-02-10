const fs = require('fs');
const pathToProducts = './files/products.json';

class ProductManager{
    
    addProduct = async producto => {
        //recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        if (!producto.title || !producto.price) return { status: "error", error: "Faltan datos" };
        try {
            if (fs.existsSync(pathToProducts)) {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8');
                let products = JSON.parse(data);
                let id = 1;
                if (products[0]) id = products[products.length - 1].id + 1; //Esto evita el error de que no hay ningun producto
                producto.id = id;
                products.push(producto);
                await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
                return { status: "success", message: "Producto añadido" };

            } else { //el archivo no existe
                producto.id = 1;
                await fs.promises.writeFile(pathToProducts, JSON.stringify([producto], null, 2));
                return { status: "success", message: `Product created with id ${producto.id}` }
            }
        } catch (error) {
            return { status: "error", error: error };
        }
    }

    getProductNames = async () => { //Devuelve solo el nombre de los productos en un array
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8');
            let products = JSON.parse(data);
            if (products[0]) {
                let productos = [];
                for (let i = 0; i < products.length; i++) {
                    productos.push(products[i].title)
                };
                return { status: "success", productos: productos };
            }
        } else {
            return { status: "error", error: "No hay productos" };
        }
    }

    getProducts = async () => { //Devuelve los productos
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8');
            let products = JSON.parse(data);
            if (products[0]) {
                let productos = [];
                for (let i = 0; i < products.length; i++) {
                    productos.push(products[i])
                };
                return { status: "success", productos: productos };
            }
        } else {
            return { status: "error", error: "No hay productos" };
        }
    }

    getProductById = async id => {  //Recibe un id y devuelve el objeto con ese id, o null si no está
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8');
            let products = JSON.parse(data);
            let product = products.find(p => p.id === id);
            if (product) {
                return { status: "success", producto: product };
            } else {
                return { status: "error", error: "Producto no encontrado" };
            }
        }
    }

    updateProductById = async (id, product) =>{
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8');
            let products = JSON.parse(data);
        }if (!id || id > products.length || id < 1) {
            return { status: "error", error: "No existe ese producto" };
        }else{
            let editedProduct = products.filter(p => p.id === id);
            let newProducts = products.filter(p => p.id !== id);
            newProducts.push(editedProduct);
            await fs.promises.writeFile(pathToProduct, JSON.stringify(newProducts, null, 2))
            return { status: "success", productos: newProducts, message: `El producto con id ${id} fue modificado` };
        }
    }

    deleteByID = async id => { //elimina del archivo el objeto con el id buscado
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8');
            let products = JSON.parse(data);
            if (!id || id > products.length || id < 1) {
                return { status: "error", error: "No existe ese producto" };
            } else {
                let newProducts = products.filter(p => p.id !== id);
                await fs.promises.writeFile(pathToProducts, JSON.stringify(newProducts, null, 2))
                return { status: "success", productos: newProducts, message: `El producto con id ${id} fue eliminado` };
            }
        }
    }
}

module.exports = ProductManager;