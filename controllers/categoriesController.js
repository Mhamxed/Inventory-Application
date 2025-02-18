const { body, validationResult } = require("express-validator");
const { getAllCategories, insertCatergory, deleteCate, getCate, editCate, getProdsInCategory } = require('../db/queries')

async function getCategoriesInfos(req, res) {
    try {
        const categories = await getAllCategories()
        res.render('categories', { categories })
    } catch(err) {
        console.error("Error fetching categories:", err);
        res.status(500).send("Internal server error")
    }
}

const validateCategory =  [
    body("name")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage(`Category name must be at least 1-100 charachters!`),
]

const createCategory = [
    validateCategory,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createcategory", {
                errors: errors.array(),
              });
        }
        const { name }  = req.body
        await insertCatergory(name)
        res.redirect('/categories')
    }
]

async function deleteCategory(req, res) {
    try {
        const id = req.params.id
        await deleteCate(id)
        res.redirect('/categories')

    } catch(err) {
        console.error("Error deleting category:", err);
        res.status(500).send("Internal server error")
    }
}

async function editCategoryPage(req, res) {
    try {
        const id = parseInt(req.params.id)
        const rows = await getCate(id)
        res.render("editcategory", { id: id, cate: rows[0].name, errors: [] })

    } catch(err) {
        console.error("Error editting category:", err);
        res.status(500).send("Internal server error")
    }
}

const editCategory = [
    validateCategory,
    async (req, res) => {
        try {
            const id = req.params.id
            const rows = await getCate(id)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("editcategory", {
                    id: id,
                    cate: rows[0].name,
                    errors: errors.array(),
                    });
            }
            const { name }  = req.body
            await editCate(name, id)
            res.redirect('/categories')
    
        } catch(err) {
            console.error("Error editting category:", err);
            res.status(500).send("Internal server error")
        }
    }
]

async function getProductsWithinCategory(req, res) {
    try {
        const id = req.params.id
        const category = await getCate(id)
        const products = await getProdsInCategory(id)
        res.render("displayproductsinacategory", {
            products: products,
            category: category[0].name,
        })

    } catch(err) {
        console.error("Error editting category:", err);
        res.status(500).send("Internal server error")
    }
}

JSON.stringify

module.exports = {
    getCategoriesInfos,
    createCategory,
    deleteCategory,
    editCategory,
    editCategoryPage,
    getProductsWithinCategory
}
