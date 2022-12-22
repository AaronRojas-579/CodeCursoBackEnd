const AccountSID = "ACa561d4d8f9a494fd9f033aa6c5fb862c"
const authToken = "cb3bcd21aae6e9a740c7a581dc2352e4";
const numeroTEL = "+19787170678"
//
require("dotenv").config()
//
const twilio = require("twilio")

const client = twilio(AccountSID,authToken)


;(async()=>{
    try{
        const message=await client.messages.create({
            body:"Hola desde de volkswagen te queremos comunicar que hubo un error con la transferencia del dinero que enviamos a ",
            from:numeroTEL,
            to : "+5491158364284"
        })
        console.log(message)
    }catch(error){
        console.log(error)
    }
})()

//Con esto llega un mensaje a mi numero de telefono, este solo puede enviar mensaje de texto a numeros verificador, osea en este caso solo puedo enviar mensajes de texto a mi mismo numero de telefono y no a otros 