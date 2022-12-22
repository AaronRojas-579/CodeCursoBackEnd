const {createTransport} = require("nodemailer")

const TEST_MAIL = "aaron.rojaas.cardenas@gmail.com"

const transporter = createTransport({
    service:'gmail',
    //Ahora utilizaremos esta configuración para utilizar el servicio de gmail
    port:587,
    auth:{
        user:TEST_MAIL,
        pass:"eoqihfvqjkmcvbyd",
    }
    // Este es la configuración del usuario que envia el mensaje
})

const mailOptions = {
    from :"Servidor de node JS",
    to:TEST_MAIL,
    subject:"Mail de prueba desde Node JS con Nodemailer",
    html:`<h1 style="color:red">Contenido de Prueba.. Somos campeones wachoooo</h1>`,
    attachments:[
        {
            path:"https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg?w=730&crop=1"
            //Esta configuracion es por si se quiere enviar imagenes 
        }
    ]
}

;(async()=>{
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    }catch(error){
        console.log(error)
    }
})()