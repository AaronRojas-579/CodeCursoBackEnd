//Libreria de para reemplazar el console.log

const winston = require('winston')

const loggerWinston = winston.createLogger({
    level:'warn',
    transports:[
        new winston.transports.Console({level:'verbose'}),
        //esto quiere decir que de verbose para abajo paraece en consola
        new winston.transports.File({filename:'info.log', leve:'error'})
        //con esta config indica que los errores se muestren en el archivo info.log
    ]
})

// loggerWinston.log(`silly`,'127.0.0.1 - log silly')
// loggerWinston.log(`debug`,'127.0.0.1 - log debug')
// loggerWinston.log(`vergbose`,'127.0.0.1 - log verbose')
// loggerWinston.log(`info`,'127.0.0.1 - log info')
// loggerWinston.log(`warn`,'127.0.0.1 - log warn')
// loggerWinston.log(`error`,'127.0.0.1 - log error')
// //Ordenado con la jerarquia de mayor a menor
// //con esta funcion recibe 2 parametros, siento el primero el level o tipo de logger

loggerWinston.info('127.0.0.1 - log info 2')
loggerWinston.warn('127.0.0.1 - log warn 2')
loggerWinston.error('127.0.0.1 - log error 2')
//esto es lo mismo que con las sintaxis de arriba con la funcion loggerWinston.log

module.exports = loggerWinston