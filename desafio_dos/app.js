// Desafio dos , ProductManager con  manejo de archivos

const fs = require('fs').promises


class ProductManager {
    constructor (){
        this.productos=[]
        this.path="productManager.js"
    }
    
    getProducts(){
       return this.productos
    }

    addProducts(producto){
  /*       if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock){
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
        } */
        const producto_encontrado = this.productos.find((p)=>p.code === producto.code)
        if(producto_encontrado){
            console.log("El Producto ya se encuentra ingresado")
            return
        }
        producto.id = this.productos.length + 1
        this.productos.push(producto)
    }

    getProductsById(id){
        const producto_encontrado = this.productos.find((p)=>p.id === id)
        if(!producto_encontrado){
          return "Producto no encontrado"

        }
        console.log("El producto encontrado es: ")
        return producto_encontrado
    }

}



const producto = new ProductManager()


//Llamada inicial
const productos = producto.getProducts()
console.log(productos)

//Agregando Productos
producto.addProducts({title:"Caña de Pescar",
description:"Para Rio",precio:15000,thumbnail:"img/caña.png",code:15,stock:22})


//Se lista productos ingresados
const productosActualizados = producto.getProducts()
console.log(productosActualizados)

//Se re-ingresa producto para probar error

producto.addProducts({title:"Caña de Pescar",
description:"Para Rio",precio:15000,thumbnail:"img/caña.png",code:15,stock:22})
 
//Se busca producto especifico
const productoById = producto.getProductsById(1)
console.log(productoById) 