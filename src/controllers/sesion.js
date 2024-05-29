const jwt = require("jsonwebtoken");
const conexion = require("../server/server");
const util = require("util");

// Convierte conexion.query en una función que devuelve una promesa
const query = util.promisify(conexion.query).bind(conexion);

//validar inicio de sesión
exports.login = async (req, res) => {
    try {
      const usuario = req.body.nombre;
      const pass = req.body.pass;
      if (usuario == "" || pass == "") {
        res.send('vacio');
      } else {
      query("SELECT * FROM admin WHERE cedula = ?",[usuario],(error, results) => {
            if (results.length > 0) {
              if (pass == results[0].passw) {
                //Datos correctos
                const id = results[0].id;
                const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                  expiresIn: process.env.JWT_TIEMPO_EXPIRA,
                });
                const cookiesOpciones = {
                  httpOnly: true,
                };
                res.cookie("jwt", token, cookiesOpciones);
                res.send('success');
              } else {
                //contraseña incorrecta
                res.send('err');
                
              }
            } else {
              //usuario incorrecto
              res.send('err');
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
};

//Eliminar cookie para cerrar sesión
exports.logout = async (req, res) => {
    res.clearCookie("jwt");
    return res.redirect("/");
};

//registrarse
exports.register = (req, res)=>{
  const { nombre, apellido, cedula, pass1, pass2 } = req.body;

 console.log(nombre);
 console.log(apellido);
 console.log(cedula);
 console.log(pass1);
 console.log(pass2);

//    if(nombre == '' || apellido == '' || cedula == '' || pass1 == '' || pass2 == '' ){
//     res.render('login', {
//         alert: true,
//         icon: 'info',
//         text: '¡Llene todos los campos!',
//         title: 'ADVERTENCIA'
//       })
// }else if(pass1 !== pass2){
//     res.render('login', {
//         alert: true,
//         icon: 'error',
//         text: '¡Las contraseñas no son iguales!',
//         title: 'ADVERTENCIA'
//       })
// }
// // Ejecutar la consulta SQL para insertar los datos del formulario en la base de datos
// const sql = 'INSERT INTO admin (nombre, apellido, cedula, passw) VALUES (?, ?, ?, ?)';
// conexion.query(sql, [nombre, apellido, cedula, pass1], (err, result) => {
//     if (err) {
//         console.error('Error al insertar los datos en la base de datos:', err);
//         return res.status(500).send('Error al registrar el usuario');
//     }
//     console.log('Usuario registrado correctamente.');
//     // Redirigir o enviar una respuesta de éxito
//     res.redirect('/login.html'); // Redirige a la página de inicio de sesión después de registrar el usuario
// });
}