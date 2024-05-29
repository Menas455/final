const mysql = require('mysql');


const conexion = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'contraloria',
    host: 'localhost'
});


conexion.connect((err)=>{
<<<<<<< HEAD
    if(err)console.log('Error al conectar a la bd' + err);

    console.log('Conexion a la base de datos exitosa');  
=======
    if(err){
        console.log('Error al conectar a la bd' + err);
    }else{
        console.log('Conexion a la base de datos exitosa');
    }
>>>>>>> 53ba0ea32ca82d7a7b39d9332438913acf718170
})

module.exports = conexion;