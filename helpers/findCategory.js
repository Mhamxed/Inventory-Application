const { getAllCategories } = require('../db/queries')

async function findCategoryID(category) {
    let allCategories = await getAllCategories()
    return allCategories.find(cate => cate.name == category) || false
}

module.exports = findCategoryID;