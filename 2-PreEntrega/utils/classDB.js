const knex = require('knex');

class BaseDatos {
    constructor (tabla,config){
        this.tabla = tabla,
        this.knex = knex(config)
    }
    
    async save (nuevoObjeto){
        try{
            await this.knex(`${this.tabla}`).insert(nuevoObjeto)
        } catch(err){
            console.log(err);
        }
    }

    async getById(idABuscar){
        try{
            const data = await this.knex(`${this.tabla}`).where('id','=',`${parseInt(idABuscar)}`);
            return data;
        }catch(err){
            console.log(err);
        }
    }

    async getAll(){
        try{
            const data = await this.knex(`${this.tabla}`).select('*');
            // console.log(data)
            return data;
        }catch(err){
            console.log(err);
        }
    }

    async deleteById(idAEliminar){
        try{
            await this.knex(`${this.tabla}`).where('id','=',`${parseInt(idAEliminar)}`).del();
            console.log(`Registro del id:${idAEliminar} eliminado`)
        }catch(err){
            console.log(err)
        }
    }

    async deleteAll(){
        try{
            await this.knex(`${this.tabla}`).del();
            console.log(`Todos los registros de la tabla ${this.tabla} se han eliminado`)
        }catch(err){
            console.log(err);
        }
    }
}


module.exports = BaseDatos