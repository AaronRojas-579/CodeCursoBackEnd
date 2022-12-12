
const { query } = require("express");
var admin = require("firebase-admin");

var serviceAccount = require("./backend-5dd0b-firebase-adminsdk-c3kkz-dce5294e18.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

class ServerFirebase {
    constructor(collection){
        this.collection = this.connection(collection);
    }
    connection(col){
        const db = admin.firestore();
        const query = db.collection(col);
        console.log("Base de datos conectada a la colección "+ col);
        return query;
    }
    async save(nuevoObjeto){
        try{
            const doc = this.collection.doc();
            await doc.create(nuevoObjeto)
            console.log("Nuevo documento creado")
        }catch(err){
            console.log(err);
        }
    }
    async getAll(){
        try{
            const queryDocuments = await this.collection.get();
            let docs = queryDocuments.docs;
            const res = docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            return res;
        }catch(err){
            console.log(err);
        }
    }
    async getById (idABuscar){
        try{
            const doc = await this.collection.doc(idABuscar).get();
            const res = {id:doc.id ,...doc.data()}
            console.log(res);

        }catch(err){
            console.log(err);
        }
    }
    async updateById(idAModificar,info){
        try{            
            const doc = this.collection.doc(idAModificar);
            await doc.update(info);
            console.log(`El documento fue modificado`)
        }catch(err){
            console.log(err);
        }
    }
    async deleteById (idAEliminar){
        try{
            const doc = this.collection.doc(idAEliminar);
            await doc.delete();
            console.log(`El documento ha sido eliminado correctamente`)

        }catch(err){
            console.log(err)
        }
    }
    async deleteAll(){
        try{
            const queryDocuments = await this.collection.get();
            let docs = queryDocuments.docs;
            let ids = docs.map(d => d.id);
            ids.forEach(async(elem)=>{
                const doc = this.collection.doc(elem);
                await doc.delete();
            })
            console.log(`Todos los documentos de las colección`)

        }catch(err){
            console.log(err);
        }
    }
}

module.exports = ServerFirebase;