const log4js = require("log4js")
require('dotenv').config()


log4js.configure({
    appenders:{
        miLoggerConsole : {type:'console'},
        miLoggerFile : {type : 'file',filename:'info.log'},
        miLoggerFile2 : {type:'file',filename:'info2.log'}
        //estos apendices podrian considerarse que es la manera en que deseamos mostrar los disntintos loggers
    },
    categories:{
        default:{appenders:['miLoggerConsole'],level:'trace'},
        console : {appenders:['miLoggerConsole'],level:'debug'},
        archivo2 :{appenders:['miLoggerFile2'],level:'info'},
        archivo:{appenders:['miLoggerFile'],level:'warn'},
        todos :{appenders:['miLoggerConsole','miLoggerFile'],level:'error'},
        custom:{appenders:['miLoggerConsole','miLoggerFile','miLoggerFile2'],level:'all'},
        produccion:{appenders:['miLoggerFile','miLoggerFile2'],level:'all'}
        //aqui damos un nombre a lo qué queremos mostrar y cómo 
        //Estos levels mostrados estan en un orden jerarquico de mayor a menor
        //El level all nos llega a mostrar todos

        //Appenders (cómo se quiere mostarar)
        //Levels (qué se quiere mostrar) estos tiene un orden jerarquico
    }
})


let logger = null;

if (process.env.NODE_ENV == 'produccion'){
    logger = log4js.getLogger('produccion')
}else{
    logger = log4js.getLogger()
}


// const logger = log4js.getLogger('custom');


// //En el metodo getLogger puede ir como parametro la categoria que se quiere mostrar, segun el level de la categoria colocada se mostrará las categorias de menor level que el del escogido
// logger.trace(`Hola soy el logger default`),
// logger.debug(`Hola soy el logger console`),
// logger.info(`Hola soy el logger archivo`),
// logger.warn(`Hola soy el logger archivo 2`),
// logger.error(`Hola soy el logger de todos `)
// logger.fatal(`Hola soy el logger de fatal `)
// //Lo que se coloca aqui son los niveles o levels de la categoria que queremos mostrar
// //Una vez que ejecutemos este archivo, a los logger que se muestran por archivos estos NO pisan a los anteriores loggers



module.exports = logger