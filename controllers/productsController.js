const { body, validationResult } = require("express-validator");
const { getProducts } = require('../db/queries');
const multer = require('multer')
const findError = require('../helpers/finderror')
const { insertProduct } = require('../db/queries')
const findCategoryID = require('../helpers/findCategory');
const rmSpace = require('../helpers/rmSpace')
  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './img')
    },
    filename: async function (req, file, cb) {
      cb(null, await rmSpace(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

async function getProductsInfos(req, res) {
    try {
        const products = await getProducts();
        res.render('products', { products: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
}

const validateProduct =  [
    body("title")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage(`Product title must not be empty!`),
    body("stock")
        .trim()
        .isInt({ min: 1 })
        .withMessage(`Product stock must be greater than zero`),
    body("category")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage(`Product category name must not be empty!`),
]

const createProduct = [
    upload.single('image'),
    validateProduct,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            const errorList = errors.array();
            const titleErr = await findError(errorList, "title").msg
            const stockErr = await findError(errorList, "stock").msg
            const categoryErr = await findError(errorList, "category").msg
            const imageErr = !req.file ? "Please upload an image!" : ""

            if (!errors.isEmpty()) {
                return res.status(400).render("createproduct", {
                    titleErr,
                    imageErr,
                    stockErr,
                    categoryErr
                });
            }
            const { title, stock, category } = req.body
            const image = await rmSpace("/" + req.file.originalname)
            let category_id = null
            await findCategoryID(category).then(result => category_id = result.id)
            await insertProduct(title, image, stock, category_id)
            res.redirect('/products')
        } catch (err) {
            console.error(err)
            res.status(500).send('Internal Server Error')
        }
    }
]


module.exports = {
    getProductsInfos,
    createProduct
};