const users = require('../usuarios')

const sesionGet = async (req, res) => {
    try {
        req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1;
        const user = req.user.username
        //Ahora los datos del usuario estan el req.user, es esa la manera que la guarda passport con la funcion done()
        console.log(req.session)
        //y aqui se puede ver que passport guarda los usuarios port el id
        res.render('pages/index.ejs',{user})

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success: false
        })
    }
}
const sessionLogout = (req, res) => {
    const user = req.user.username
    req.session.destroy(err =>{
        if(err) return res.send(err)
        res.render('pages/logout.ejs',{user})
    })
}

//Estas funciones que viene ya no las utilizaremos ya que en su lugar utilizaremos las configuraciones que utilizamos con passport
//......................
const sessionPostLogin = (req, res) => {
    const { username , password } = req.body
    const user = users.find(e=>e.username == username)
    //El Undefined == true, por eso abajo lo niego 
    if (!user) {
      return res.send('<h1>login failed</h1>')
    }else if(user.password != password){
        //para el caso en que se ingrese correctamente el usuario, me devuelve el objeto correcto pero la contraseña es incorrecta
        return res.send('<h1>Error con la contraseña</h1>')
    }
    req.session.username = username
    req.session.admin = true
    res.redirect("./")
   }

const sessionRegister = (req,res)=>{
    const {username,password} = req.body
    if(username && password){
        const nuevoUsuario = {
            username:username,
            password:password,
            admin:true
        }
        users.push(nuevoUsuario);
        res.send(`Nuevo Usuario Registrado , Bienvenido ` + username)
    }else{
        res.send('Error al Registrarte')
    }
}
//......................

module.exports = { 
    sesionGet ,
    sessionLogout,
    sessionPostLogin,
    sessionRegister
}
