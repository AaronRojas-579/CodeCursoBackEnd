const authMiddleware = (req,res,next)=>{
    if(req.session.usuario == 'pepe' && req.session.admin){
        next()
    }
    return res.status(401).send(`<h1>No estas autorizado</h1>`)
}
module.exports = authMiddleware