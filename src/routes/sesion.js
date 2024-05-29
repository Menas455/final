//Paquetes necesarios
const express = require('express');
const routes = express.Router();

//importaciones necesarias
const images = require('../controllers/images');
const verificar = require('../controllers/sesion');
const middleware = require('../middleware/verify');
const middlewareSesion = require('../middleware/sesion');


routes.get('/', images.index);

routes.get('/login', middlewareSesion.verificar, (req, res)=>{
    res.render('login');
});
routes.post('/login', verificar.login);

routes.get('/registrar', middleware.verificar,(req, res)=>{
    res.render('register');
});

routes.get('/cerrar', verificar.logout);
routes.post('/login', verificar.login);

module.exports = routes;