const socket = io.connect();

const mandarMensaje = (e)=>{
    let hoy = new Date();
    let hoyString = hoy.toLocaleString();
    const mail = document.getElementById('mail').value;
    const text = document.getElementById('text').value;
    socket.emit('nuevo-mensaje',{mail,text,fecha:hoyString});

    return false
}



const render = (array)=>{
    const html = array.map((elem)=>{
        return(`<div>
              <strong style='color:blue'>${elem.mail}</strong>
              <spam style='color:brown'>[${elem.fecha}]</spam>
              <i style='color:green'>${elem.text}</i>
            </div>`)
    }).join(" ")
    document.getElementById('historial').innerHTML = html;
};

socket.on('mensajeServer',(data)=>{
    console.log(data);
    render(data);
})
