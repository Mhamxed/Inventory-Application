const { Router } = require("express");
const indexRoute = Router()

indexRoute.get('/', (req, res) => {
    res.render("index")
})

module.exports = indexRoute