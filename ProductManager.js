const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
        this.products = [];
    };

    async getProducts() {
        console.log(await fs.promises.readFile(this.path, 'utf-8'))
    };

    async addProduct(title, description, price, thumbnail, code, stock) {

        
        const productAdded = {
            id: this.products.length +1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('All fields are necessary')
        }

        if (productAdded.code.includes(code)){
            console.log(`${code} is already in the system`);
        }
        
        this.products.push(productAdded)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        
        console.log(`Product ${title} has been added successfully!`)
    };

    async getProductById(productId){
        
        await fs.promises.readFile(this.path, 'utf-8')

        const searchProduct = this.products.find(e => e.id === productId)

        if (searchProduct) {
            return console.log(searchProduct);
        } else {
            console.log(`Product Id #${productId} not found`)
        }        
    }

    async updateProduct(id, property, value) {

        const productIndex = this.products.findIndex(product => product.id === id)

        if (productIndex === -1) {
            throw new Error (`Unable to find product with id ${id}`)
        }
        this.products[productIndex][property] = value

        const productsJSON = JSON.stringify(this.products)

        await fs.promises.writeFile(this.path, productsJSON, (err) => {

            if (err) {
                throw new Error(`Unable to write document ${err}`)
            } else {
                console.log(`Product with id ${id} has been updated successfully`)
            }
        })
    }

    deleteProduct(id) {

        const index = this.products.findIndex(product => product.id === id)

        if (index === -1) {
            console.log(`Product with id ${id} doesn't exist`)
            return
        }

        this.products.splice(index, 1)

        console.log(`Product with id ${id} has been eliminaed`)

        this.exportProductsToJSON(this.path)
    }

    async exportProductsToJSON(fileName) {
        const productsJSON = JSON.stringify(this.products)
        const filePath = this.path
        await fs.promises.truncate(filePath, 0, () => {
            fs.writeFile(filePath, productsJSON, (err) => {
                if (err) {
                    throw new Error (`Unable to write document ${err}`)
                } else {
                    console.log(`Products have been added successfully to ${fileName}`)
                }
            })
        })
    }
}

// Ejemplo de uso

const productManager = new ProductManager('../entregable1/products.json')

productManager.addProduct("apple","red","100","image.jpg","sdfs54",25)
productManager.addProduct("cabagge","red","80","image.jpg","sdfs52",20)
productManager.addProduct("cherry","red","200","image.jpg","sdfs56",10)
productManager.getProducts()
productManager.getProductById(1)
productManager.updateProduct(2,'manzana', 'translation')
productManager.deleteProduct(1)