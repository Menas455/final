const conexion = require("../server/server");
const util = require("util");

// Convierte conexion.query en una función que devuelve una promesa
const query = util.promisify(conexion.query).bind(conexion);

exports.noticias = ()=>{
    
}