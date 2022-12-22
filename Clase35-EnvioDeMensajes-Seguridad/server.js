const {createTransport} = require("nodemailer")
const TEST_MAIL = "caleb.gleichner41@ethereal.email"

const transporter = createTransport({
    host:'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'YU7zRWjRVcPSrHwZMk'
    }
})
//Configuracion necesaria para el envio del mail, recordar que esta funcion retorna una promesa

const mailOptions = {
    from:"Servidor de Node JS",
    to : TEST_MAIL,
    subject:"Mail de prueba desde node js ",
    html:`<h1 style="color:red">Contenido de Prueba..</h1>`
}
//Este es un objeto con la información de mail que se va a enviar 

;(async ()=>{
    try{   
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    }catch(error){
        console.log(error)
    }
})()