const db = require("./DaoFirebase/serverFirebase")
const apiProductosFirebase = new db("productos");

module.exports = apiProductosFirebase;