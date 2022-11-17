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

// //npm install connect-mongo 
// const MongoStore = require("connect-mongo")
// //Configuraciones avanzadas para usar Mongo Atlas
// const advancedOptions = {useNewUrlParser:true,useUnifiedTopology:true}


// app.use(session({
//     store:MongoStore.create({
//         mongoUrl:process.env.MONGOURL,
//         //Aqui agregamos las configuraciones avanzadas de Mongo Atlas
//         mongoOptions:advancedOptions,
//         //Configuracion para que se desloguee a los 10min
//         ttl:60*10,
//     }),
//     //Esta configuracion siempre debe estar
//     secret:process.env.PALABRASECRETA,
//     resave:true,
//     saveUninitialized:true,
// }))

//Passport Local
//npm install passport passport-local 
//npm install bcrypt

const passport = require('passport')
const LocalStrategy = require('passport-local')
const bCrypt = require('bcrypt')

//Traigo los usuarios de memorio
const users = require('./usuarios')

//--Funcion de Encriptacion

//Esta funcion agarra el password incriptado y compara
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}
function createHash(password) {
    return bCrypt.hashSync(
              password,
              bCrypt.genSaltSync(10),//10 niveles de inscriptacion 
              null);
}
//-------------
//---Config LocalStrategy del Login

passport.use('login', new LocalStrategy((username, password, done) => {
    //1er parametro "login" es como llamaremos a esta estrategia
    //2do parametro callback (estas espera por parametro las credenciales del usario tal como estan en el obj/formulario , de lo contrario no los encontrará)
    let user = users.find(e=>e.username == username);
    if(!user){
        console.log(`User Not Found with username ${username}`)
        return done(null,false)
    }
    return done(null,user)
    })
);

passport.use('singup',new LocalStrategy({
    passReqToCallback:true
},
(req,username,password)=>{
    let user = users.find(e=>e.username == username)
    if(user){
        console.log(`User already exist`);
        return done(null,false,{message:`User already exists`})
    }

    const {admin} = req.body
    const newUSer = {
        id:users.length +1,
        username,
        password:createHash(password),//Incripta el password
        admin
    }
    users.push(newUSer)
    return done(null,newUSer)
}
))

//Cuando estas funciones retornen el usuario ingresado o nuevo usuario van a parar a las siguientes funciones

//Serializacion y Deserialización
//Guarda el id en las sessiones para luego buscarlas en la base de datos verificando si existe determinado usuario

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
passport.deserializeUser((id, done) => {
    let user = users.find(e=>e.id == id);
    done(null,user)
  });

//Iniciamos Passport

app.use(session({
 secret: 'keyboard cat',
 cookie: {
   httpOnly: false,
   secure: false,
   maxAge: config.TIEMPO_EXPIRACION
 },
 rolling: true,
 resave: true,
 saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Views 
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

app.use(express.static(__dirname+"/public"))

app.use('/session',router)



module.exports = app;