const { Router } = require('express')
const { body, validationResult } = require("express-validator");
const categories = Router()
const { createCategory, getCategoriesInfos, deleteCategory, editCategoryPage, editCategory, getProductsWithinCategory } = require('../controllers/categoriesController')

categories.get('/', getCategoriesInfos)
categories.get('/create', (req, res) => {
    res.render('createcategory', { errors: []})
})
categories.post('/create', createCategory)
categories.get('/delete/:id', deleteCategory)
categories.get('/edit/:id', editCategoryPage)
categories.post('/edit/:id', editCategory)
categories.get('/:id/products', getProductsWithinCategory)
module.exports = categories;