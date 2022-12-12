


const socket = io.connect();
//Importo funciones para desnormalizar 

//Schemas 

const schemaAuthor = new normalizr.schema.Entity('authors');

const postSchema = new normalizr.schema.Entity("post",{
    author:schemaAuthor,
},{idAttribute:"_id"})
const chatSchema = new normalizr.schema.Entity("mensajes",{
    mensajes:[postSchema]
})

//Funciones para Normalizar y Desnormalizar

const normalizedMensajes = (obj)=>{
     return normalizr.normalize(obj,chatSchema);
}
const denormalizedMensajes = (objNomrmalizado)=>{
    return normalizr.denormalize(objNomrmalizado,chatSchema,objNomrmalizado.intities)
}


const mensajesForm = document.querySelector('#mensajesForm');

const mandarMensaje = (e)=>{
    e.preventDefault()
    let hoy = new Date();
    let hoyString = hoy.toLocaleString();
    const mail = document.getElementById('id').value;
    const text = document.getElementById('text').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const alias = document.getElementById('alias').value;

    socket.emit('nuevo-mensaje',{
        author:{
            id:mail,
            nombre:nombre,
            apellido:apellido,
            edad:edad,
            alias:alias,
            date:hoyString,
        },
        text:text
    });
}
mensajesForm.addEventListener("submit", mandarMensaje);

const render = (array)=>{
    const html = array.map((elem)=>{
        return(`<div>
              <strong style='color:blue'>${elem.author.id}</strong>
              <spam style='color:brown'>[${elem.author.date}]</spam>
              <i style='color:green'>${elem.text}</i>
            </div>`)
    }).join(" ")
    document.getElementById('historial').innerHTML = html;
};


const renderCompresion = (compresion)=>{
    const html = `<h3>Compresion:${compresion}%</h3>`;
    document.querySelector('#mostrarCompresion').innerHTML=html;
}

socket.on('mensajeServer',(data)=>{
    //Recibe el obj ya normalizado
    console.log(data);
    //aqui yo deberia desnormalizar el objeto que el back me manda
    const dataDesn = normalizr.denormalize(data.result,chatSchema,data.entities);
    //ME LO DESNORMALIZA PARA LA MIERCOELS 
    const arrMensajes = dataDesn.mensajes.map(e=>e._doc)
    console.log(arrMensajes)
    //Tambien debo hacer el calculo de la compresion que hice al desnormalizar
    let longitudNormalize =JSON.stringify(data).length ;
    let longitudDesnormalize = JSON.stringify(dataDesn).length ;
    console.log(longitudNormalize)
    console.log(longitudDesnormalize)
    let compresion = Math.ceil(((longitudNormalize-longitudDesnormalize)/longitudNormalize)*100);
    renderCompresion(compresion)
    render(arrMensajes);
})
