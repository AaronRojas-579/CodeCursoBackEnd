const db = require("./DaoFirebase/serverFirebase");
const apiCarritoFirebase = new db ("carrito");

module.exports =apiCarritoFirebase;