//Paquetes necesarios
const express = require('express');
const routes = express.Router();
const fs = require('fs');
const util = require('util');
const path = require('path');

//importaciones necesarias
const conexion = require('../server/server')
const images = require('../controllers/images');
const upload = require('../middleware/upload');
const middleware = require('../middleware/verify');
const query = util.promisify(conexion.query).bind(conexion);

routes.get('/images', middleware.verificar ,(req, res) => {
    res.render('imgAdd', { admin: true })
});
routes.get('/users',  middleware.verificar, (req, res) => {
    res.render('users', { admin: true })
});
routes.post('/users', upload.single('imagenUser'), (req, res) => {
    // Verifica si alguno de los campos está vacío
    if (req.file == '' || req.body.nombre == '' || req.body.descrip == '') {
        return res.json({ status: 'vacio'});
    }

    const imagenPath = req.file.path;
    const nombre = req.body.nombre;
    const descrip = req.body.descrip;

    const binaryImage = fs.readFileSync(imagenPath); // Lee la imagen desde el archivo
    const imagenBase64 = binaryImage.toString("base64"); // Convierte la imagen a base64

    // Inserta la imagen en la base de datos
    const sql = 'INSERT INTO cumple (images_blob, nombre, descripcion) VALUES (?,?,?)';
    query(sql, [binaryImage, nombre, descrip], (err, result) => {
        if (err) {
            console.error('Error al insertar la imagen:', err);
            return res.json({ status: 'err'});
        }
        console.log('Imagen guardada correctamente en la base de datos');

        // Obtener el ID del nuevo registro insertado
        const newId = result.insertId;

        // Consultar la base de datos para obtener los datos del nuevo cumpleañero
        const queryData = 'SELECT * FROM cumple WHERE id = ?';
        query(queryData, [newId], (err, data) => {
            if (err) {
                console.error('Error al obtener los datos del nuevo cumpleañero:', err);
                return res.json({ status: 'err'});
            }

            // Devolver los datos del nuevo cumpleañero, incluyendo la imagen en base64, como parte de la respuesta
            const newCumpleanero = data[0];
            newCumpleanero.imagen_base64 = imagenBase64;
            res.json({ status: 'success', newCumpleanero });
        });
    });
});
routes.post('/images', upload.single('images'), (req, res) => {
    // Verifica si alguno de los campos está vacío
    if (!req.file) {
        return res.json({ status: 'vacio'});
    }

    const imagenPath = req.file.path;
    const nombre = req.body.nombre;
    const descrip = req.body.descrip;
    const binaryImage = fs.readFileSync(imagenPath); // Lee la imagen desde el archivo
    const imagenBase64 = binaryImage.toString("base64"); // Convierte la imagen a base64

    // Inserta la imagen en la base de datos
    const sql = 'INSERT INTO images (imagen_blob) VALUES (?)';
    query(sql, [binaryImage, nombre, descrip], (err, result) => {
        if (err) {
            console.error('Error al insertar la imagen:', err);
            return res.json({ status: 'err'});
        }
        console.log('Imagen guardada correctamente en la base de datos');

        // Obtener el ID del nuevo registro insertado
        const newId = result.insertId;

        // Consultar la base de datos para obtener los datos del nuevo cumpleañero
        const queryData = 'SELECT * FROM images WHERE id = ?';
        query(queryData, [newId], (err, data) => {
            if (err) {
                console.error('Error al obtener los datos de la imagen:', err);
                return res.json({ status: 'err'});
            }

            // Devolver los datos del nuevo cumpleañero, incluyendo la imagen en base64, como parte de la respuesta
            const newImage = data[0];
            newImage.imagen_base64 = imagenBase64;
            res.json({ status: 'success', newImage });
        });
    });
    
});

routes.get('/galery', images.galery,);
routes.get('/galerys', images.galeryUser,);
routes.post('/eliminar', images.eliminarHomeImg);
routes.post('/eliminar/images', images.eliminarImages);
routes.post('/eliminar/card/galery', images.eliminarCard);
routes.post('/eliminar/card', images.eliminarHomeCard);

routes.get('/p', (req, res)=>{
    res.render('prueba.hbs');
})

module.exports = routes;