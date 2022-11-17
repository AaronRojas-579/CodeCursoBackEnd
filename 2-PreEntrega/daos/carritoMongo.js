const db =require("./DaoMongo/serverMongo")
const carrito = require("./DaoMongo/models/carrito.model")
const apiCarritoMongo = new db(carrito);

module.exports = apiCarritoMongo;
