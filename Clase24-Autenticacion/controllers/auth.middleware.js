const authMiddleware = (req, res, next) => {
    if (!req.session?.username || !req.session?.admin) {
        return res.status(401).send('<h1>No estas autorizado</h1>')     
    } 
    next()
}
const checkAuthentication = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        //La funcion isAuthenticated() (retorna un booleano) me ayuda a saber si esta con la sesion iniciada, osea este en session 
        return res.redirect('/')
    } else {
        next()
    }
}

module.exports = { 
    authMiddleware,
    checkAuthentication
}
