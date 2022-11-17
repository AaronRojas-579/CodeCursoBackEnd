const sesionGet = async (req, res) => {
    try {
        req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1;
        const user = req.session.user
        res.render('pages/index.ejs',{user})

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success: false
        })
    }
}
const sessionLogout = (req, res) => {
    const user = req.session.user
    req.session.destroy(err =>{
        if(err) return res.send(err)
        res.send(`<h1>Hasta Luego ${user} </h1>`)
    })
}

const sessionPostLogin = (req, res) => {
    const { username } = req.body
    if (!username) {
      return res.send('<h1>login failed</h1>')
    }
    req.session.user = username
    req.session.admin = true
    res.redirect("./")
   }

module.exports = { 
    sesionGet ,
    sessionLogout,
    sessionPostLogin
}
