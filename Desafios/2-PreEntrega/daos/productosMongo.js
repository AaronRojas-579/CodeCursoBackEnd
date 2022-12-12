const db = require("./DaoMongo/serverMongo");
const productos = require ("./DaoMongo/models/productos.models");
const apiProductosMongo = new db(productos);

module.exports =apiProductosMongo;