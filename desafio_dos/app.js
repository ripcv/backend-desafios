// Desafio dos , ProductManager con  manejo de archivos

const fs = require('fs').promises


class ProductManager {
    constructor() {
        this.path = "./desafio_dos/productManager.js"
        this.nextId = 1
    }

    async getProducts() {
        try {
            const product = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(product)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }
    
    async addProduct(producto) {
        try {
            let products = await this.getProducts()
            producto.id = this.nextId++
            const productExist = await this.getProductsById(producto.id)
            if (productExist) {
                console.log("El Id del producto ya se encuentra creado")
                return
            }
            products.push(producto)
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log("Producto creado correctamente")
        } catch (error) {
            console.error("Error al crear el producto")
        }
    }
 
    async getProductsById(id) {
        try {
            let products = await this.getProducts()
            const producto_encontrado = await products.find((p) => p.id === id)
            if (!producto_encontrado) {
                console.log("El Producto no se encuentra creado")
                return 
            }
            return producto_encontrado

        } catch (error) {
            console.error("Error al buscar el producto", error)
            return []
        }
    }

    async updateProduct() {
        try {

        } catch (error) {

        }
    }

    async deleteProduct() {
        try {

        } catch (error) {

        }
    }
}


const producto = new ProductManager()

producto.addProduct({
    title: "Caña de pescar",
    description: "Perfecta para rios",
    price: 15000,
    thumbnail: 'img/caña.jpg',
    code: 'P001',
    stock: 30
})
/*
producto.addProduct({
    title: "Caña de pescar",
    description: "Perfecta para rios",
    price: 15000,
    thumbnail: 'img/caña.jpg',
    code: 'P001',
    stock: 30
})
producto.addProduct({
    title: "Caña de pescar",
    description: "Perfecta para rios",
    price: 15000,
    thumbnail: 'img/caña.jpg',
    code: 'P001',
    stock: 30
})

producto.getProducts()
.then(producto => console.log('Productos', producto))
.catch(error => console.error("Error al consultar usuarios", error))
 */

/*producto.getProductsById(1)
.then(producto => console.log("Producto Actualizar ", producto))
.catch(error => console.error("Error al Obtener el producto"))
*/