const express = require ("express")
const app = express()
//Requerimos Cookie-Parser
const cookieParser = require("cookie-parser")
//Middleware
require("dotenv").config()
app.use(cookieParser(process.env.SECRET_KEY_COOKIE))
// 'secreto' o SECRET_KEY_COOKIE es para incriptar las cookies
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
//Importamos las Rutas
const cookiesRoutes = require('./rutas/rutas')
//El nombre no necesariamente tiene que ser igula al nombre de la variable que exportamos con mudule.exports a diferencia del type:module
app.use('/cookies',cookiesRoutes)

//Exportamos la constante app 

module.exports = app;