// Desafio uno , ProductManager

class ProductManager {
    constructor (){
        this.productos=[]
    }
    
    getProducts(){
       return this.productos
    }

    addProducts(title,description,price,thumbnail,code,stock){
        const product_id = this.productos.length + 1
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Todos los datos son requeridos, favor verificar")
            return
        }
        const producto = {
            id : product_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const producto_encontrado = this.productos.find((p)=>p.code === code)
        if(producto_encontrado){
            console.log("El Producto ya se encuentra ingresado")
            return
        }
        this.productos.push(producto)
    }

    getProductsById(id){
        const producto_encontrado = this.productos.find((p)=>p.id === id)
        if(!producto_encontrado){
          return "Producto no encontrado"

        }
        return producto_encontrado
    }

}

const producto = new ProductManager()

//Agregando Productos
producto.addProducts("Caña de Pescar","Para Rio",15000,"img/caña.png",15,22)


//se lista productos ingresados
const productos = producto.getProducts()
console.log(productos)

//Se busca producto especifico
const productoById = producto.getProductsById(2)
console.log(productoById)