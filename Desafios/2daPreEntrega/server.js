import express from "express"
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//SOCKET.IO 
import {Server as IoServer} from 'socket.io';
import {Server as HttpServer} from 'http';
const http = new HttpServer(app);
const io = new IoServer(http);

//Import las Rutas 
import routerTabla from "./rutas/rutasProductos.js"

app.use("/productos",routerTabla);

// Middleware
app.use(express.static('public'))

const PORT = 4050;
http.listen(PORT,()=>{
    console.log(`Server listen on port : ${PORT}`)
})

//Importamos el DAOS de Mongo para los mensajes 
import ServerMongoAltlas from './daos/serverMongo.js'
import mensajes from './daos/models/mensaje.model.js'

const dbMongo = new ServerMongoAltlas(mensajes)

// //Normalize
import { normalizedMensajes,denormalizedMensajes } from './utils/normalizr.js';

io.on('connection',async(cliente)=>{
    console.log('Un cliente conectado');
    const arrMensajes = await dbMongo.getAll();
    const objANormaliza = {
        id:"mensajes",
        mensajes:arrMensajes,
    }
    const normaMensajes = normalizedMensajes(objANormaliza);

    cliente.emit('mensajeServer',normaMensajes);

    cliente.on('nuevo-mensaje', async (mensaje)=>{
        await dbMongo.save(mensaje);
        const arrMensajes = await dbMongo.getAll();
        //Normalizo de vuelta
        const objANormaliza = {
            id:"mensajes",
            mensajes:arrMensajes,
        }
        const normaMensajes = normalizedMensajes(objANormaliza);
        io.sockets.emit('mensajeServer',normaMensajes);
    })
    
})