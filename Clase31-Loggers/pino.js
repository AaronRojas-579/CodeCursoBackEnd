//Libreria Pino (la mas simple)
const pino = require("pino")

// const loggerPino = pino()
const loggerPino = pino('info.log')
//En el caso de que se quiera guardar los mensajes de salida en un archivo, deberá recibir como parametro la direccion del archivo en la que se mostarará sino por predeterminado se mostrará en consola

loggerPino.level = 'info';

loggerPino.info(`Pino Info`)
loggerPino.error(`Pino Error`)
loggerPino.info({a:`en el primer parametro puede recibir objetos y pino los pasa a formato json`},`Pino Info`)
loggerPino.info(`La respuesta es %d`,11)
// el %d lo que hace es copiar el dato que esta como el siguiente parametro

const child = loggerPino.child({a:`mensaje hijo`})
child.info(`este mensaje esta anidado con su hijo`)
//al usar child todos los loggers  creado estarán anidados a el
