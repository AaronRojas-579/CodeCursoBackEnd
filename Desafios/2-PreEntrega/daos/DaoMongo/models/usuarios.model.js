const {Schema, model} = require("mongoose");
const mensajeSchema = new Schema({
    mail:{
        type:String,
        required:true,
        max:100,
        unique:true,
    },
    text:{
        type:String,
        required:true,
        max:100
    }
})

module.exports = model("Mensajes",mensajeSchema);