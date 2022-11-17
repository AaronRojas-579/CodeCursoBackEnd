const { signedCookie } = require('cookie-parser');
const express = require('express')
//------------------ Rutas
const {Router} = express;
const router = Router();

//Ruta para leer la Cookies
router.get('/',(req,res)=>{
    const {cookies} = req;
    console.log(cookies)
    res.status(200).json({cookies})
    //{cookies} para que nos devuelva en contenido dentro de un objeto,mas legible para el formato json()
    //Cuando la cookie esta firmada no lo puede mostrar
})
//Ruta para setear un sola Cookie del tipo "Clave":Valor 
router.get('/set',(req,res)=>{
    res.cookie('clave','valor')
    res.status(200).json({
        mensaje:'Cookie Seteada corretamente'
    })
})
//Lo mismo pero a esta cookie le daremos un tiempo de vida limitada
router.get('/setEx',(req,res)=>{
    res.cookie('apellido','Rojas',{
        signed:true
    });
    //El maxAge define el tiempo de vida de la cookie setada en este caso solo vive por unos 5 segundos
    //Y el signed es la opcion que necesita para firmar las cookies en el archivo server app.use(cookieParser(PalabraSecreta))
    const {cookies} = req;
    res.status(200).json({
        mensaje:'Cookie Setada',
        succes:true
    })
    console.log(cookies)
})
//Borramos una cookie con el metodo clearCookie des res
router.get('/borrar',(req,res)=>{
    res.clearCookie('clave');
    res.status(200).json({
        mensaje:'Cookie Eliminada Correctamente',

    })
})
//Aqui las demas rutas se puede utilizar los demas verbos POST,PUT,DELETE 
router.get('/firmadas',(req,res)=>{
    const {signedCookie} = req;
    res.status(200).json({signedCookie})
})
module.exports = router

