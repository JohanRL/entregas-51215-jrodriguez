const express = require('express')
const ProductManager = require('./ProductManager')
const productManager = new ProductManager('./products.json')
const fs = require('fs')
const app = express()

app.use(express.urlencoded({extended:true}))

// Ruta a filtrado de productos por ID con un limite, si no hay limite entonces da el array completo
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit)
    let products = productManager.getProducts()
    if (!limit) {
        return res.send(products)
    } else {
        products = products.slice(0, limit)
        return res.send(products)
    }
})


// Ruta a filtrado de productos por querys
app.get('/products/:productId', (req, res) => {
    const products = productManager.getProducts()
    const productsId = parseInt(req.params.productId)
    const product = products.find(product => product.id === productsId)
    if (!product) {
        const error = {error: 'Producto no encontrado'}
        return res.status(404).send(error)
    }
    res.send(product)
})


// Iniciar el servidor en puerto 8080
app.listen(8080, () => {
    console.log('Server corriendo en puerto 8080')
})

// Zona Testing

// Recibir en consola el array vacio
console.log(productManager.getProducts())

//Sumar nuevo producto al array
productManager.addProduct("manzana", "este es un producto prueba", 200, "sin imagen", "fruta1", 25) 
productManager.addProduct("banana", "este es un segundo producto prueba", 200, "sin imagen", "fruta2", 25) 
productManager.addProduct("pera", "este es un tercer producto prueba", 200, "sin imagen", "fruta3", 25) 


// Recibir en consola el array vacio
console.log(productManager.getProducts())