const express = require('express');
const {Router} = express;
const router = Router();
//Agregamos un middleWare de autenticacion, lo que va a requerir que primero se inicie la sesión para ingresar a cierta ruta
const middleAuth = require('../middleware/authMiddleware.js')

//Guardar Datos en Session
router.get('/',middleAuth,(req,res)=>{
    //middleAuth es el middleware
    req.session.visitas = req.session.visitas ? req.session.visitas +1 : 1;
    // La funcion del ternario es crear visitas en session en el caso de que no exista, pero si existe le suma 1
    //Esto funciona gracias a las configuraciones que le dimos 
    res.send(`<h1>Bienvenido ${req.session.usuario}</h1><h2>Visitas : ${req.session.visitas}</h2>`)
})
//Elimina los datos de session
router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        //session destroy() para borrar los datos almacenado en la session
        if(err) return res.send(err)
        res.send(`<h1>Sesion cerrada</h1>`)
    })
})
//Login con Session
router.post('/login',(req,res)=>{
    const {username , password} = req.body;
    // destructuramos el req.body (cuando usamos formularios)
    // Nota : req.query = datos de las url // req.params = parametors
    if(username != 'pepe'|| password !='admin'){
        console.log(username,password)
        return res.send('Login Failed')
    }else{
        req.session.usuario = username;
        req.session.admin = true;
        console.log(username,password)
        res.send('Usuario iniciado')
    }
})

//Cada una de estas rutas con callbacks de (req,res) y middlewares y estas las podemos importar de otros archivos para modularizar, para que quede asi:
//router.get('/ejemplo',middlewareAuth,sessionLogin)

module.exports = router