//Cluster (nativo de Node) no ayuda a crear procesos hijos segun la cantidad de hilos que nuestro procesador puede trabajar sin sobrecargar al hilo de ejecución principal

//MODULO CLUSTER (la requerimos, esta es nativa de Node)
const cluster = require('cluster')
const numCpus = require('os').cpus().length
// para saber la cantidad de CPUs que tiene nuestra computadora, tanto 'cluster' como 'os' son nativas de Node
console.log(numCpus)
// El proceso principal o el proceso master se dedica a gestionar los trabajadores y los trabajadores o workers hacen el trabajo
const PORT = process.argv[2] || 8080;
const express = require('express')
const app = express();

// if(cluster.isPrimary){
//cluster.isPrimary es un metodo de cluster que retorno un booleano indicando si el proceso acutal es el primario

//     console.log(`Master ${process.pid}`);

//     for(let i = 0; i < numCpus;i++){
//         cluster.fork()
//     }
//     //Esto queda en la escucha de una salida por si ocurrer algun error 
//     cluster.on('exit',(worker,coder,signal)=>{
//         console.log(`Worker ${worker.pid} died`)
//     })
// }else{
//     try{
//         app.listen(PORT,()=>{
//             console.log(`Server listen on port ${PORT}`)
//         })
//         console.log(`Worker ${process.pid} started`)

//     }catch(error){
//         console.log(error)
//     }
// }

    app.listen(PORT,()=>{
        console.log(`Server listen on port ${PORT}`)
    })
    console.log(`Worker ${process.pid} started`)

// Los workers una vez creados es como si ejecutasen nuevamente este archivo osea el server.js, al entrar al if pasa directamente al else ya que no son el proceso primario o principal

// para windows desde el powershell existen los siguientes comandos para visualizar los procesos hijos

// tasklist /fi 'imagename eq node.exe' (Muestras los procesos hijos creados)

// taskkill /pid (pid del worker a eliminar)/f (Mata al worker selecionado lo cual se activa la escucha del 'exit') 

const {router} = require('./rutas')
app.use('/',router)

//----------------------------------------------------
// MODULO FOREVER
//Este no detiene el proceso en caso de un fallo, y es utilizado en producción 
//npm install forever
// forever start <filename> [args]: inicia un nuevo proceso
// forever list: lista todos los procesos activos
// forever stop <PID>: detiene un proceso según su id de proceso
// forever stopall: detiene todos los procesos activos
// forever --help: muestra la ayuda completa

//--------------------------------------------------
// MODULO PM2 (Process Manager)
//Simplifica las aplicaciones de Node para ejecutarlas como Cluster con este modulos podemos crear los cluster de manera de remota, levantando solo lo que necesitariamos 
// npm install pm2 -g
// pm2 start server.js 
// pm2 list
// pm2 monit
// pm2 delet (nombe del proceso)
// pm2 stop (nombre del proceso)

// MODO FORK
// pm2 start server.js --name="Server1" --watch -- PORT
// pm2 start server.js --name="Server2" --watch -- 8081
// pm2 start server.js --name="Server3" --watch -- 8082
// MODO CLUSTER
// pm2 start server.js --name="Server4" --watch -i max -- PORT
// pm2 start server.js --name="Server5" --watch -i max -- 8083
// el -i max (Indicamos cree la maxima cantidad de Cluster segun la cantidad de hilos que tenemos)
