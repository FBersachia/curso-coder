const fs = require('fs');
const { userInfo } = require('os');
const path = require('path/posix');

const pathToProduct = './producto.json';
class Contenedor{
    constructor (archivo){
        this.archivo = archivo;
    }

    save = async producto => {
        //recibe un objeto, lo guarda en el archivo, devuelve el id asignado
        if(!producto.title || !producto.price || !producto.id) return {status:"error", error:"Faltan datos"};
        try{
            if(fs.existsSync(pathToProduct)){
                
            }else{ //el archivo no existe
                producto.id = 1;
                await fs.promises.writeFile(pathToProduct, JSON.stringify(producto, null, 2));
                return {status: "success", message: `Product created with id ${producto.id}`}
            }
        }catch(error){
            return {status:"error", error: error};
        }
    }

    getById = number =>{
        //Recibe un id y devuelve el objeto con ese id, o null si no está
    }

    getAll  = () =>{
        //devuelve un array con los objetos presentes en el archivo
    }

    deleteByID = number =>{
        //elimina del archivo el objeto con el id buscado
    }

    deleteAll = () =>{
        //Elimina todos los objetos presentes en el archivo
    }
}

module.exports = Contenedor;