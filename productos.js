const fs = require('fs');

class ManagerUsuarios {
    static id = 0;

    constructor(ruta) {
        this.ruta = ruta;
        this.products = [];
        this.usuariosObj = {};
    }


    getProductId() {
        return ManagerUsuarios.id + 1;
    }


    getProductById(id) {
        const productos = this.readFile();
        const productoEncontrado = productos.find(producto => producto.id === id);

        if (productoEncontrado) {
            return console.log('Encontrado:', productoEncontrado);
        } else {
            console.log('Producto NO encotrado');
        }
    }


    deleteProduct = (id) => {
        const productos = this.readFile();
        const productoEliminado = productos.findIndex(producto => producto.id === id);

        if(productoEliminado !== -1){
            productos.splice(productoEliminado, 1);
            const cadenaArchivo = JSON.stringify(productos);
            fs.writeFileSync(this.ruta, cadenaArchivo);
            console.log('Producto eliminado');
        
        }else{
            console.log('Error, el producto no existe');
        }
        
    }


    createFile = () => {
        const cadenaArchivo = JSON.stringify(this.products);
        fs.writeFileSync(this.ruta, cadenaArchivo);
        console.log('Archivo creado');
    }


    fillFile = (obj) => {
        this.products.push(obj);
        const cadenaArchivo = JSON.stringify(this.products);
        fs.writeFileSync(this.ruta, cadenaArchivo);
        console.log('Archivo actualizado');
    }


    readFile = () => {
        const usuarios = fs.readFileSync(this.ruta, 'utf-8');
        this.usuariosObj = JSON.parse(usuarios);
        return this.usuariosObj;
    }


    addProduct = (obj) => {
        const usuarios = fs.readFileSync(this.ruta, 'utf-8');
        this.usuariosObj = JSON.parse(usuarios);

        console.log(this.usuariosObj);

        if (this.usuariosObj.length === 0) {
            const productoNuevo = {
                id: ManagerUsuarios.id = this.getProductId(),
                title: obj.title,
                description: obj.description,
                price: obj.price,
                code: obj.code,
                stock: obj.stock
            }
            this.usuariosObj.push(productoNuevo);
            this.fillFile(productoNuevo);
            return;
        }
        
        const products = this.usuariosObj.filter((product) => product.code === obj.code);
        
        if (products && products.length > 0) {
            console.log('ERROR-CODIGO REPETIDO');
            return;
        }

        const productoNuevo = {
            id: ManagerUsuarios.id = this.getProductId(),
            title: obj.title,
            description: obj.description,
            price: obj.price,
            code: obj.code,
            stock: obj.stock
        }
        this.usuariosObj.push(productoNuevo);
        this.fillFile(productoNuevo);
    }


    get = () => {
        const productos = this.readFile();
        return productos;
    }

    getId = (id) => {
        const productos = this.readFile();
        const producto = productos.find(producto => producto.id === id);

        if(producto){
            return producto;
        }else{
            return [`ERROR`];
        }
    }

    gete = (cantidad) => {
        const productos = this.readFile();
        const productosFive = [];
        
        for(let i = 0; i < cantidad; i++){
            productosFive.push(productos[i]);
        }
        
        return productosFive;
    }

}

module.exports = ManagerUsuarios;

const manager = new ManagerUsuarios('./productos.json');
const products = [
    {
        title: 'Computadora',
        description: 'interactivos',
        price: 300,
        code: '2222',
        stock: 20
    },
    {
        title: 'Televisor',
        description: 'interactivos',
        price: 300,
        code: '1111',
        stock: 20
    },
    {
        title: 'Heladera',
        description: 'interactivos',
        price: 300,
        code: '4444',
        stock: 20
    },
    {
        title: 'Mesa',
        description: 'interactivos',
        price: 300,
        code: '3333',
        stock: 20
    },
    {
        title: 'Silla',
        description: 'interactivos',
        price: 300,
        code: '5555',
        stock: 20
    },
    {
        title: 'Aire acondicionado',
        description: 'interactivos',
        price: 300,
        code: '6666',
        stock: 20
    },
    {
        title: 'Estufa',
        description: 'interactivos',
        price: 300,
        code: '7777',
        stock: 20
    },
    {
        title: 'Ventilador',
        description: 'interactivos',
        price: 300,
        code: '8888',
        stock: 20
    },
    {
        title: 'Monitor',
        description: 'interactivos',
        price: 300,
        code: '9999',
        stock: 20
    },
    {
        title: 'Puerta',
        description: 'interactivos',
        price: 300,
        code: '1000',
        stock: 20
    }
];

manager.createFile();

products.forEach(product => {
    manager.addProduct(product);
})
