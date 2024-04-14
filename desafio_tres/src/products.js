// Desafio tres, ProductManager con llamadas API

//Llamamos a express
const express = require('express')
const app = express()
const PORT = 8080

//MileWare
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Llamamos dependencias de archivos
const ProductManager = require('../../desafio_dos/productManager')

async function appProducts(){
const producto = new ProductManager()

const productos = await producto.getProducts()
/* await producto.addProduct({
    title: "Caña de pescar",
    description: "Perfecta para ríos",
    price: 15000,
    thumbnail: 'img/caña.jpg',
    code: 'P001',
    stock: 15
  });
  
  await producto.addProduct({
    title: "Caña de pescar con carrete",
    description: "Ideal para pescadores principiantes",
    price: 20000,
    thumbnail: 'img/caña_carrete.jpg',
    code: 'P002',
    stock: 10
  });
  
  await producto.addProduct({
    title: "Caña de pescar de alta gama",
    description: "Fabricada con materiales de calidad",
    price: 35000,
    thumbnail: 'img/caña_alta_gama.jpg',
    code: 'P003',
    stock: 5
  });
  
  await producto.addProduct({
    title: "Caña de pescar telescópica",
    description: "Fácil de transportar y almacenar",
    price: 18000,
    thumbnail: 'img/caña_telescopica.jpg',
    code: 'P004',
    stock: 20
  });
  
  await producto.addProduct({
    title: "Caña de pescar para pesca en alta mar",
    description: "Resistente a las condiciones marinas",
    price: 25000,
    thumbnail: 'img/caña_alta_mar.jpg',
    code: 'P005',
    stock: 8
  });
  
  await producto.addProduct({
    title: "Caña de pescar ultraligera",
    description: "Para pescadores que buscan sensibilidad",
    price: 22000,
    thumbnail: 'img/caña_ultraligera.jpg',
    code: 'P006',
    stock: 12
  });
  
  await producto.addProduct({
    title: "Caña de pescar para niños",
    description: "Diseñada especialmente para pequeñas manos",
    price: 12000,
    thumbnail: 'img/caña_niños.jpg',
    code: 'P007',
    stock: 15
  });
  
  await producto.addProduct({
    title: "Caña de pescar de acción rápida",
    description: "Para capturas ágiles y precisas",
    price: 28000,
    thumbnail: 'img/caña_accion_rapida.jpg',
    code: 'P008',
    stock: 7
  });
  
  await producto.addProduct({
    title: "Caña de pescar para pesca en hielo",
    description: "Adaptada para condiciones extremas",
    price: 30000,
    thumbnail: 'img/caña_hielo.jpg',
    code: 'P009',
    stock: 3
  });
  
  await producto.addProduct({
    title: "Caña de pescar de viaje",
    description: "Compacta y fácil de llevar en tus aventuras",
    price: 24000,
    thumbnail: 'img/caña_viaje.jpg',
    code: 'P010',
    stock: 18
  });
   */
//Endpoints

app.get('/products', (req,res)=>{
    res.json(productos)
})

app.get('/products/:id', (req,res)=> {
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