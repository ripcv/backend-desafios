import express from 'express'
import ProductManager from '../productManager.js'

const router = express.Router()
const producto = new ProductManager()

router.get('/index', async(req,res) =>{
    let limit = parseInt(req.query.limit)
    let productoLimit = [...await producto.getProducts()]
    if(!isNaN(limit) && limit > 0){
      productoLimit = productoLimit.splice(0,limit)
    }
    res.render('home', {
        productoLimit
    })

})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

export default router