import * as ProductService from '../services/productsService.js'

export async function getAllProducts(req, res) {
    let { limit = 10, page = 1, sort, query, msg } = req.query;
    limit = parseInt(limit)
    page = parseInt(page)
    try {
        const products = await ProductService.getAllProducts(limit, page, sort, query)
        return res.render('products', {
            products: products,
            user: req.session.user,
            msg,
            isAdmin: req.session.user.role === "admin",
            cart: req.session.user.cartId
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(req, res) {
    let { pid } = req.params
    try {
        const product = await ProductService.getProductById(pid)
        res.send({ result: "success", payload: product })
    } catch (error) {
        res.send({ status: "error", error: "Producto no encontrado" })
    }
}

export async function createProduct(req, res) {
    let { title, description, code, price, stock, category, thumbnail, status = true } = req.body
    if (!title || !description || !code || !price || !stock || !category) {
        res.send({ status: "error", error: "Ingrese todo los campos requeridos" })
    }
    const productData = { title, description, code, price, stock, category, thumbnail, status }
    try {
        let result = ProductService.createProduct(productData)
        res.send({ result: "success", payload: result })
    } catch (error) {
        res.send({ result: "error", payload: "Error en crear el producto" })
    }


}

export async function updateProduct(req, res) {
        let { pid } = req.params
        let productToReplace = req.body
        console.log("Updateando")
        console.log(pid)
        console.log(productToReplace)
        if (!productToReplace || Object.keys(productToReplace).length === 0) {
            return res.send({ status: "error", error: "Debe actualizar por lo menos un registro" })
        }
        try {
            let result = await ProductService.updateProduct(pid, productToReplace)
            return res.send({ result: "success", payload: result })
        } catch (error) {
            res.send({ result: "Error", payload: "Error al actualizar producto" })
        }

    }

export async function deleteProduct(req, res) {
    let { pid } = req.params
    try {
        let result = await ProductService.deleteProduct(pid)
        res.send({ result: "success", payload: result })
    } catch (error) {
        res.send({ result: "Error", payload: "Error al eliminar producto" })
    }
}