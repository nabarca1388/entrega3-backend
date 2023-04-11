// npm init -y
// npm install express
// node + nombre archivo

const express = require('express');
const productos = require('./productos');

const PUERTO = 8080;

const servidor = express();
servidor.use(express.urlencoded({ extended: true }));

const product = new productos('productos.json');

servidor.get('/', (req, res) => {
    res.send('Servidor Express');
});



servidor.get('/producto/:id?', (req, res) => {
    let id = parseInt(req.params.id);
    res.json(product.getId(id));
});

/*
servidor.get('/products', (req, res) => {
    res.json(product.get())
})

servidor.get('/products?limit=5', (req, res) => {
    res.json(product.get())
})
*/
servidor.listen(PUERTO, () => {
    console.log(`Servidor Express activo en puerto ${PUERTO}`);
});

