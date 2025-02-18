require('dotenv').config();
const indexRoute = require('./routes/index')
const categories = require('./routes/categories')
const products = require('./routes/products')
const express = require('express')
const app = express()
const PORT = process.env.PORT


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set("view engine", "ejs");
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css')
})
app.use(express.static('img'));
app.use("/", indexRoute)
app.use("/categories", categories)
app.use("/products", products)
app.all('*', (req, res) => {
    res.render("404")
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))