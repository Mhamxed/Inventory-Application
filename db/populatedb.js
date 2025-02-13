require('dotenv').config();

const drop_products = `
DROP TABLE products;
`

const drop_categories = `
DROP TABLE categories;
`

const create_categories_table = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
    );
`

const create_products_table = `
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ),
    image TEXT,
    stock INTEGER,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );
`

const add_categories = `
  INSERT INTO categories (name) VALUES 
  ('Health'),
  ('Tools & Home Improvement'),
  ('DIY'),
  ('Decore'),
  ('Baby'),
  ('Electronics'),
  ('Computers & Accessories'),
  ('Handmade Products'),
  ('Kitchen & Dining'),
  ('Sports & Outdoors'),
  ('Toys & Games'),
  ('Outdoors'),
  ('Beauty'),
  ('Auto');
`

const add_products = `
  INSERT INTO products (title, image, stock, category_id) VALUES
  ('Hand Relief Massager', '/Cordless.jpg', 7, 1),
  ('Red Mask', '/mask.jpg', 9, 2),
  ('Hydrogen Water Bottle', '/Hydrogen.jpg', 8, 1),
  ('Makeup Storage Box', '/box.jpg', 9, 13),
  ('Dash Camera', '/dash.jpg', 6, 14),
  ('Mini Camera', '/camera.jpg', 5, 2),
  ('Green Laser', '/laser.jpg', 10, 6),
  ('Wildlife Cam', '/wild_camera.jpg', 12, 12);
`

async function populateDB() {
    const { Client } = require('pg')
    const client = new Client({
        host: process.env.HOST,
        port: process.env.DB_PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });
    try {
        await client.connect();
        await client.query(add_categories);
        await client.query(add_products);
        await client.end();
    } catch (err) {
        console.log(err)
    }
}
populateDB()