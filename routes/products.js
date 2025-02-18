const { Router } = require("express")
const { body, validationResult } = require("express-validator");
const products = Router()
const { getProductsInfos, createProduct, deleteProduct, editProductPage, editProduct } = require('../controllers/productsController')

products.get('/', getProductsInfos)
products.get('/create', (req, res) => {
    res.render('createproduct', {
        titleErr: "",
        imageErr: "",
        stockErr: "",
        categoryErr: ""
    })
})
products.post('/create', createProduct)
products.get('/delete/:id', deleteProduct)
products.get('/edit/:id', editProductPage)
products.post('/edit/:id', editProduct)

module.exports = products;