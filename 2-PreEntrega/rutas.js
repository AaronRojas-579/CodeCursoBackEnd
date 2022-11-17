const express = require('express')
const app = express();
const {Router} = express
const router = Router();

//Apis del DAOS
const apiProductosMongo = require('./daos/productosMongo');
const apiCarritoFirebase = require('./daos/carritoFirebase');

router.get('/',async(req,res)=>{
    const productos = await apiProductosMongo.getAll()
    const carrito = await apiCarritoFirebase.getAll()
    res.render('pages/ecommerce.ejs',{productos,carrito})
})

router.post('/',async(req,res)=>{
    await apiProductosMongo.save(req.body)
    res.redirect('/ecommerce');
})
router.delete('/',async(req,res)=>{
    await apiProductosMongo.deleteById(req.body.id)
    res.redirect('./ecommerce')
})

module.exports = router