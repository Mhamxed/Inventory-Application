const { body, validationResult } = require("express-validator");
const { getAllCategories, insertCatergory } = require('../db/queries')

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

module.exports = {
    getCategoriesInfos,
    createCategory
}
