const {Schema, model} = require("mongoose");
const mensajeSchema = new Schema({
    productos:[{
        type:String,
        required:true,
        max:100,
        unique:true,
    }],
    cantidad:{
        type:Number,
        required:true,
    },
    total:{
        type:Number,
        required:true,
    }
})

module.exports = model("Carrito",mensajeSchema);