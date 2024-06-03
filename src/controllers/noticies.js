const conexion = require("../server/server");
const util = require("util");

// Convierte conexion.query en una función que devuelve una promesa
const query = util.promisify(conexion.query).bind(conexion);

// Agregar y mostrar noticias
exports.noticias = (req, res)=>{

    const {tituloOne, descripOne, tituloTwe, descripTwe} =  req.body;
    // Verifica si los campos están vacíos
    if (tituloOne == "" || descripOne == "" || tituloTwe == "" || descripTwe == "") {
        console.log('Error: Algunos campos están vacíos.');
        return res.json({ status: 'vacio' });
    }
    const sql = 'INSERT INTO noticias (tituloOne, descripOne, tituloTwe, descripTwe) VALUES (?,?,?,?)';
    query(sql, [tituloOne, descripOne, tituloTwe, descripTwe], (err, result) => { 
        if (err) {
            console.error('Error al insertar la noticia:', err);
            return res.json({ status: 'err'});
        } 

        const newId = result.insertId;

        const queryData = 'SELECT * FROM noticias WHERE id = ?';
        query(queryData, [newId], (err, data) => {
            if (err) {
                console.error('Error al obtener los datos de la imagen:', err);
                return res.json({ status: 'err'});
            }
            const newNoticie = data[0];
        res.json({ status: 'success', newNoticie});
    })
})
}
//eliminar noticias
exports.eliminar = (req, res)=>{
    const id = parseInt(req.params.id);
    query( "DELETE FROM noticias WHERE id = ?", [id], (err, result) => {
            if (err) return console.log(err);
            res.json({ status: 'success'});
    })
}