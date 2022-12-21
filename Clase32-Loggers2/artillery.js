//Dependencia de Node, es un test de carga a servidores

const express = require("express")
const cluster = require("cluster")
const {cpus} = require("os")

const {isPrime} =require("./functions")

const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv[3] ==  "CLUSTER"

if(modoCluster && cluster.isPrimary){
    const numCPUs = cpus().length

    console.log(`Número de procesadores ${numCPUs}`)
    console.log(`PID Master ${process.pid}`)

    for(let i = 0 ; i<numCPUs; i++){
        cluster.fork()
    }

    cluster.on("exit",worker=>{
        console.log(`Worker ${worker.process.pid} died ${new Date().toLocaleString}`)
        cluster.fork()
    })

}else{

    const app  = express()

    app.get("/",(req,res)=>{

        const primes =[];
        const max = Number(req.query.max) ||1000
        for (let i = 0; i<= max ; i++){
            isPrime(i)&&primes.push(i)
            //Esta sintaxis es como un if que retorna lo siguiente al && en caso de ser verdadero
        }

        res.send(primes)
    })

    app.listen(PORT,()=>{
        console.log(`Server listen on PORT ${PORT}`)
    })

}


