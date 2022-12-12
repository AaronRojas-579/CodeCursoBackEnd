const express = require("express")
const app = express()
const router = require("./rutas/rutas")
//Siempre para ustilizar sessions
const session = require("express-session")
const cookieParser = require("cookie-parser")

require("dotenv").config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//npm install connect-mongo 
const MongoStore = require("connect-mongo")
//Configuraciones avanzadas para usar Mongo Atlas
const advancedOptions = {useNewUrlParser:true,useUnifiedTopology:true}


app.use(session({
    store:MongoStore.create({
        mongoUrl:process.env.MONGOURL,
        //Aqui agregamos las configuraciones avanzadas de Mongo Atlas
        mongoOptions:advancedOptions,
        //Configuracion para que se desloguee a los 10min
        ttl:60*10,
    }),
    //Esta configuracion siempre debe estar
    secret:process.env.PALABRASECRETA,
    resave:true,
    saveUninitialized:true,
}))

//Views 
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

app.use(express.static(__dirname+"/public"))

app.use('/session',router)



module.exports = app;