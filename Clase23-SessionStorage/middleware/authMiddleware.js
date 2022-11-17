const authMiddleware = (req,res,next)=>{
    if(req.session.usuario != 'pepe' || !req.session.admin){
        return res.status(401).send(`<h1>No estas autorizado</h1>`)
    }
    next()
}
//Corregido
module.exports = authMiddleware