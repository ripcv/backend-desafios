// Desafio tres, ProductManager con llamadas API

//Llamamos a express
const express = require('express')
const app = express()
const PORT = 8080

//MidleWare
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Llamamos dependencias de archivos para su manejo del desafio 2
const ProductManager = require('./productManager')

async function appProducts(){
const producto = new ProductManager()


    

//Endpoints
app.get('/products', async (req,res)=>{
  let limit = parseInt(req.query.limit)
  let productoLimit = [...await producto.getProducts()]
  if(!isNaN(limit) && limit > 0){
    productoLimit = productoLimit.splice(0,limit)
  }
  
   res.json(productoLimit)
})

app.get('/products/:id', async (req,res)=> {
    const productos = await producto.getProducts()
    const productId = parseInt(req.params.id)
    const product = productos.find((p)=> p.id === productId)    

    if(product){
        res.json(product)
    }else{
        res.status(404).json({message: "Tarea no encontrada"})
    }
})



app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})

}

appProducts()