//RENDIMIENTO EN PRODUCCIÓN
//Cosas para hacer en el código para optimizarla

// Compresión (middleware de compresion que disminuye significativamente la velocidad de respuesta, pero no resulta la mejor opción para aplicaiones de trafico elevado)
//npm install compression

const express =require("express")
const compression = require("compression")
const app = express ()

const logger = require("./log4js")

const PORT = process.argv.slice(2)[0] || 8080;

app.get("/sumar",(req,res)=>{
    const {num1,num2} = req.query;
    if(!num1){
        res.send(`No esta definido numero 1`)
        logger.error(`numero 1 no esta definido`)
    }else if (!num2){
        res.send(`No esta definido numero 2`)
        logger.error(`numero 2 no esta definido`)
    }else{
        let nu1 = parseInt(num1)
        let nu2 = parseInt(num2)
        res.send("la suma de ambos parametro es  " + (nu1+nu2))
    }
})

app.listen(PORT,(()=>{
    console.log(`Server listen on PORT ${PORT}`)
}))
