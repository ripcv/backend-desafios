const ProductManager = require('./productManager')

//Se crea una funcion asincrona para no tener problema al crear multiples productos
async function app(){
const producto = new ProductManager()

//se llama el arreglo 
console.log(await producto.getProducts())

//Generamos productos
await producto.addProduct({  title: "Caña de pescar",
description: "Perfecta para rios",
price: 15000,
thumbnail: 'img/caña.jpg',
code: 'P001', 
stock: 15
}) 
  
await producto.addProduct({
    title: "Morral",
    description: "Lleva todos tus anzuelos",
    price: 10000,
    thumbnail: 'img/morral.jpg',
    code: 'P002',
    stock: 30
})

// Se muestra productos agregados
console.log(await producto.getProducts())
 
//Se llama producto especifico
await producto.getProductsById(2)

 /* Tanto el actualizar como eliminar se crea
 con un id que no existe, cambiar para su funcionamiento */

//Se Actualiza producto
const updateProduct = {
    title:"Morral",
    description: "",
    price: "",
    thumbnail:"",
    code:"",
    stock: "2000"
};
await producto.updateProduct(3,updateProduct)

//Eliminamos productos
await producto.deleteProduct(3)

// se vuelve a mostrar listado de productos
console.log(await producto.getProducts())
}
app()