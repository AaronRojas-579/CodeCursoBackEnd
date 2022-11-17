const express = require("express")
const {Router} = express;

const { sesionGet, sessionLogout, sessionPostLogin,sessionRegister} = require('../controllers/session.controllers')
const { authMiddleware } = require('../controllers/auth.middleware')




const router = Router();

router.get('/', authMiddleware, sesionGet)
router.get('/logout', sessionLogout)
router.post('/login', sessionPostLogin)
router.post('/register',sessionRegister)


module.exports = router