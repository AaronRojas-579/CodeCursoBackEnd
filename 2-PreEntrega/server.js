const express = require('express');
const {Server:HttpServer} = require ('http');
const {Server:IoServer} = require ('socket.io');
const app = express();
const {Router} = require('express');
const router = Router();
const http = new HttpServer(app);
const io = new IoServer(http);

//Clase de las Bases de Datos
const {option} =require("./utils/config")
const BaseDatos = require("./utils/classDB");
const mensajes = new BaseDatos("articulo",option.mysql);
const personas = new BaseDatos("personas",option.sqlite);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Ruta para usar el DOAS

const routerProdutosCarrito = require('./rutas')
app.use('/ecommerce',routerProdutosCarrito)


// EJS

app.set('views','./views');
app.set('view engine','ejs');


router.get('/',async(req,res)=>{
    const dataPersonas = await personas.getAll();
    const dataMensajes = await mensajes.getAll();
    res.render('pages/index.ejs',{dataPersonas,dataMensajes})
})

app.use('/tabla',router);

app.post('/personas',async(req,res)=>{
    console.log(req.body)
    await personas.save(req.body)
    res.redirect('/tabla')
})

//

// Socket.IO

app.use(express.static('public'))

const PORT = 4200;
http.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT}`);
})

io.on('connection',async(cliente)=>{
    console.log('Un cliente conectado');
    const dataMensajes = await mensajes.getAll();
    cliente.emit('mensajeServer',dataMensajes);

    cliente.on('nuevo-mensaje',async(mensaje)=>{
        await mensajes.save(mensaje);
        const dataMensajes = await mensajes.getAll();
        io.sockets.emit('mensajeServer',dataMensajes);
    })
})