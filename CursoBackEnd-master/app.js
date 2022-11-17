const express = require ("express")
const app = express()
//Requerimos Cookie-Parser
const cookieParser = require("cookie-parser")
//Middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


app.get("/prueba",(req,res)=>{
    res.send("Hola al Mundo")
})

//Exportamos la constante app 

module.exports = app;