import normalizr from "normalizr";
const {normalize,denormalize,schema} = normalizr;

//Schemas 

const schemaAuthor = new schema.Entity('authors');

const postSchema = new schema.Entity("post",{
    author:schemaAuthor,
},{idAttribute:"_id"})
const chatSchema = new schema.Entity("mensajes",{
    mensajes:[postSchema]
})

//Funciones para Normalizar y Desnormalizar

 export const normalizedMensajes = (obj)=>{
     return normalize(obj,chatSchema);
}
export const denormalizedMensajes = (objNomrmalizado)=>{
    return denormalize(objNomrmalizado,chatSchema,objNomrmalizado.intities)
}
