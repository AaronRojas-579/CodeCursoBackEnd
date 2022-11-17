import express from "express";
const app  = express();
const {Router} = express;
const routerTabla = Router();
import apiProductos from "../utils/apirFaker.js"

app.set('views','../views');
app.set('view engine','ejs');


routerTabla.get("/",(req,res)=>{
    const productosFaker  = apiProductos()
    res.render('pages/index.ejs',{productosFaker})
})

export default routerTabla;