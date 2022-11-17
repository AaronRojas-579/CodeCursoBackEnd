const express = require('express');
const app = express()
require('dotenv').config()
const routerSession = require('./rutas/rutas.js')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Session Memory semejante a las cookies, en realidad es una cookie pero estas se pueden manejar del lado del servidor, identifica la sesion 
// npm install express-session --save
//Importamos Session
const session = require('express-session')
//Configuración del Session memory
app.use(session({
    secret: process.env.SECRET_KEY_SESSION,
    //Palabra secreta
    resave:true,
    //nos deja renombrar nuestra session
    saveUninitialized:true,
    //nos deja crear nuevas sessiones
    saveUninitialized:true
}))
//Importante, el app.use de las configuraciones debe estar antes del app.use de las rutas 
app.use('/session',routerSession)
app.use(express.static('public'))
const PORT = process.env.PORT || 3300;
app.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT}`)
})