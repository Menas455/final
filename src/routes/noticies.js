//Paquetes necesarios
const express = require('express');
const routes = express.Router();
const noticias = require('../controllers/noticies.js')

routes.post('/noticias', noticias.noticias )

module.exports = routes;