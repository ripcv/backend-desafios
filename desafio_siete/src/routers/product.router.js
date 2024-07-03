import { Router } from "express";
import productModel from "../dao/models/product.model.js";
import { isAuthenticated } from "../middleware/auth.js";
import * as ProductController from '../controllers/productsControllers.js'

const router = Router();

router.get('/', isAuthenticated, ProductController.getAllProducts)

router.get('/:pid', ProductController.getProductById)

router.post('/', ProductController.createProduct)

router.put('/:pid', ProductController.updateProduct)

router.delete('/:pid', ProductController.deleteProduct)


export default router