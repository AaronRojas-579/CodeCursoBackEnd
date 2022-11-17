import {Schema, model} from "mongoose";
const mensajeSchema = new Schema({
    author:{
        id:{
            type:String,
            required:true,
            max:100,
        },
        nombre:{
            type:String,
            required:true,
            max:100,
        },
        apellido:{
            type:String,
            required:true,
            max:100,
        },
        edad:{
            type:Number,
            required:true,
            max:100,
        },
        alias:{
            type:String,
            required:true,
            max:100,
        },
        date:{
            type:Date,
            required:true
        }
    },
    text:{
        type:String,
        required:true,
        max:120,
    }
})

export default model("Mensaje",mensajeSchema);