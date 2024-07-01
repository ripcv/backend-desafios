import { Router } from "express";
import cartModel from "../dao/models/cart.model.js";
import { isAuthenticated } from "../middleware/auth.js";
import * as CartsController from '../controllers/cartControllers.js'

const router = Router();

router.get('/', CartsController.getAllCarts)

router.get('/:cid', isAuthenticated, CartsController.getCartByIdToRender)

router.post('/', CartsController.addProducts);

//El Put esta con problemas, se debe corregir su funcionamiento.
router.put('/:cid/products/:pid', CartsController.updateCartContent);

//Elimina el contenido del carrito seleccionado
router.delete('/:cid/', CartsController.deleteCartContent)

//Elimina producto del carrito del carrito seleccionado
router.delete('/:cid/products/:pid', CartsController.deleteCartProduct)


export default router