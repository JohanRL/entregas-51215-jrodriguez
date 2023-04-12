const express = require('express')
const ProductManager = require('./ProductManager')
const productManager = new ProductManager('./products.json')
const fs = require('fs')
const app = express()

app.use(express.urlencoded({extended:true}))


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

app.get('/products/:productId', (req, res) => {
    const products = productManager.getProducts()
    const productsId = parseInt(req.params.productId)
    const product = products.find(product => product.id === productsId)
    if (!product) {
        const error = {error: 'Product not found'}
        return res.status(404).send(error)
    }
    res.send(product)
})


app.listen(8080, () => {
    console.log('Server running on 8080')
})

productManager.addProduct("apple", "red", 100, "imagen.jpg", "tgyujh", 20) 
productManager.addProduct("pasta", "spaghetti", 100, "imagen.jpg", "fghfh", 22) 
productManager.addProduct("rice", "normal", 50, "imagen.jpg", "fghfgh", 23) 