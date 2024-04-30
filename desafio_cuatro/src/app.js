console.log("Desafio Cuatro")

import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import ProductManager from './productManager.js'

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))

const socketServer = new Server(httpServer)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)


const producto = new ProductManager()


socketServer.on('connection', async (socket) => {
    console.log("Nuevo Cliente conectado")
    //obtenemos los productos
    const products = await producto.getProducts()
    
    socketServer.emit('startProducts', products)

    socket.on('createProduct', async (data) => {
        //agregamos el producto
         await producto.addProduct(data)
         //volvemos a recuperar los productos
         const updateProduct = await producto.getProducts()
         socketServer.emit('startProducts', updateProduct)
    })
})