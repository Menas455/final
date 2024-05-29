//Paquetes necesarios
const express = require('express');
const routes = express.Router();

routes.get('/aac', (req, res)=>{
    res.render('ac');
})

module.exports = routes;