const pool = require('./pool')

async function getAllCategories() {
    const data = await pool.query("SELECT * FROM categories");
    return data.rows
}

async function getProducts() {
    const data = await pool.query("SELECT * FROM products");
    return data.rows
}

async function insertCatergory(name) {
    await pool.query("INSERT INTO categories (name) VALUES ($1);", [name])
}

async function insertProduct(title, image, stock, category) {
    await pool.query(`
        INSERT INTO products (title, image, stock, category_id) VALUES
        ($1, $2, $3, $4)`, [title, image, stock, category])
}

async function deleteCate(id) {
    //delete the caterory
    await pool.query(`DELETE FROM categories WHERE id=$1`, [id])
    //delete all the prodcuts within the given category
    await pool.query(`DELETE FROM products WHERE category_id=$1`, [id])
}

async function deleteProd(id) {
    await pool.query("DELETE FROM products WHERE id=$1", [id])
}

async function getCate(id) {
    const data = await pool.query("SELECT name FROM categories WHERE id=$1;", [id])
    return data.rows
}

async function getProd(id) {
    const data = await pool.query("SELECT * FROM products WHERE id=$1;", [id])
    return data.rows
}

async function editCate(name, id) {
    await pool.query("UPDATE categories SET name=$1 WHERE id=$2;", [name, id])
}

async function updateProd(title, image, stock, category_id, id) {
    await pool.query(`UPDATE products 
        SET title=$1, image=$2, stock=$3, category_id=$4
        WHERE id=$5`, [title, image, stock, category_id, id])
}

async function getProdsInCategory(id) {
    const data = await pool.query("SELECT * FROM products WHERE category_id=$1", [id])
    return data.rows
}

module.exports = {
    getAllCategories,
    getProducts,
    insertCatergory,
    insertProduct,
    deleteCate,
    deleteProd,
    getCate,
    editCate,
    getProd,
    updateProd,
    getProdsInCategory
}