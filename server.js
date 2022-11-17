//Import con commonjs app 
const app = require("./app.js")
// Este dotenv sirve para utilizar las variales de entorno
//Requiere de instalación (npm install dotenv)
require("dotenv").config()
//process.(nombre del archivo).(nombre de la variable de entorno)
const PORT = process.env.PORT || 3000
// en el caso que no exista PORT será a 3000 (or)

app.listen(PORT,()=>{
    console.log(`Server listen on PORT ${PORT}`)
})
//Ejemplo de variable de entorno creado en el archivp .env