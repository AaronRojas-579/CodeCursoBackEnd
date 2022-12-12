const express = require('express')
const {Router} = express
const router = Router()

router.get('/',(req,res)=>{
    const pid = process.pid
    res.send(`Servidor Express - PID ${pid} ${new Date().toLocaleString()}`)
})

module.exports = {router}