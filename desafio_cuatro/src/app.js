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


async function appProducts(){
const producto = new ProductManager()

app.get('/index', async(req,res) =>{
    let limit = parseInt(req.query.limit)
    let productoLimit = [...await producto.getProducts()]
    if(!isNaN(limit) && limit > 0){
      productoLimit = productoLimit.splice(0,limit)
    }
    res.render('home', {
        productoLimit
    })

})


socketServer.on('connection', socket => {
    console.log("Nuevo Cliente conectado")
    socket.on('createProduct', data => {
        console.log('Producto Creado', data)
       // socketServer.emit('messageLogs', messages)
    })
})
}

appProducts()