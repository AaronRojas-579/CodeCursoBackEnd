const express = require('express');
const app = express()
const rutas = require('./rutas/rutas')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require('dotenv').config()
//Esta require que express-session este instalada
const session = require('express-session')
//Session- File-Store
// npm install session-file-store --save 
//Hace estas cookies persistentes en el sevidor, esta app nos ayudará a guardar estos datos en archivos que creeará el servidor 
const FileStore = require('session-file-store')(session)

app.use(session({
    //Configuración del SessionFile
    store:new FileStore({
        path:'./src/sessions',
        //Direccion donde se guardara el FileSession (en el caso de que no exista lo crea)
        ttl:60*60*24*7, //1 semana
        //Tiempo de vida esta en segundos(60segundos*60 = 1 hora)
        retries:0
        //Numero de Reintentos
    }),
    //La misma configuracion que las de SessionMemory
    secret:process.env.SECRET_KEY_SESSION,
    resave:true,
    saveUninitialized:true
}))

app.use('/session',rutas)
app.use(express.static('public'))

//Ayuda a que sean persistentes y tambien 

module.exports = app;