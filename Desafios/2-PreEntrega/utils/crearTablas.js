const {option} = require("./config");
const knexMyqls = require ("knex")(option.mysql)
const knexSqlite = require("knex")(option.sqlite)

knexMyqls.schema.dropTableIfExists("articulo").then(()=>console.log("Esta tabla ya habia sido creada"))
knexMyqls.schema.createTable("articulo",(table)=>{
    table.increments("id")
    table.string("mail")
    table.string("text")
    table.string("fecha")
})
.then(()=>{console.log("Tabla Creada Articulo")})
.catch((err)=>{console.log(err)})


const hoy = new Date()
const mensajesBase = [
    {
        mail:"Aaron Rojas",
        text:"Rojas soy Aaron",
        fecha:hoy.toLocaleString()
    },
    {
        mail:"Agustina Sal",
        text:"Hola Soy Agustina",
        fecha:hoy.toLocaleString()
    },
    {
        mail:"Ivana Diaz",
        text:"Hola Soy Ivana",
        fecha:hoy.toLocaleString()
    },
    {
        mail:"Martin Galco",
        text:"Hola Soy Martin",
        fecha:hoy.toLocaleString()
    }
]

knexMyqls("articulo").insert(mensajesBase)
.then()
.catch(err=>console.log(err))
.finally(()=>knexMyqls.destroy())

knexSqlite.schema.dropTableIfExists("personas").then(()=>console.log("Esta tabla ya habia sido creada"))
knexSqlite.schema.createTable("personas",(table)=>{
    table.increments("id")
    table.string('nombre')
    table.string('apellido')
    table.integer('edad')
    table.string('sexo')
})
.then(()=>{console.log("Tabla Creada Personas")})
.catch((err)=>{console.log(err)})
.finally(()=>{knexSqlite.destroy()})
