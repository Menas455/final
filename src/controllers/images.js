const conexion = require("../server/server");
const util = require("util");

// Convierte conexion.query en una función que devuelve una promesa
const query = util.promisify(conexion.query).bind(conexion);

//mostrar imagenes en la galeria
exports.galery = async(req, res) => {
  
  try {
     // Consulta las imágenes de la base de datos
     const images = await query("SELECT * FROM images");

     // Convierte las imágenes a base64
     images.forEach((image) => {
       image.imagen_base64 = image.imagen_blob.toString("base64");
     });

    const token = req.cookies.jwt;
   
    // Renderiza la plantilla con los datos recuperados de la base de datos
    res.render("galerys", { admin: token, images: images });

  } catch (error) {
    console.error("Error al recuperar imágenes de la base de datos:", error);
    res.status(500).send("Error interno del servidor");
  }
}; 
//mostrar informacion de los usuarios
exports.galeryUser = async(req, res) => {
  
  try {
    // Consulta las imágenes de la base de datos
    const users = await query("SELECT * FROM cumple");
    
     // Convierte las imágenes a base64
     users.forEach((image) => {
      image.imagen_base64 = image.images_blob.toString("base64");
    });

    const token = req.cookies.jwt; 
  
    // Renderiza la plantilla con los datos recuperados de la base de datos
    res.render("usuarios", { admin: token, imagen: users });

  } catch (error) {
    console.error("Error al recuperar imágenes de la base de datos:", error);
    res.status(500).send("Error interno del servidor");
  }

};
//mostrar informacion en el index
exports.index = async (req, res) => {
  try {
    // Consulta las imágenes de la base de datos
    const images = await query("SELECT * FROM images ORDER BY id DESC LIMIT 4");

    // Convierte las imágenes a base64
    images.forEach((image) => {
      image.imagen_base64 = image.imagen_blob.toString("base64");
    });

    const users = await query("SELECT * FROM cumple ORDER BY id DESC LIMIT 6");

    users.forEach((image) => {
      image.imagen_base64 = image.images_blob.toString("base64");
    });

    const noticias = await query("SELECT * FROM noticias ORDER BY id DESC");
    const token = req.cookies.jwt;

    // Renderiza la plantilla con los datos recuperados de la base de datos
    res.render("index", { admin: token, imagenes: images, users, noticias });

  } catch (error) {
    console.error("Error al recuperar imágenes de la base de datos:", error);
    res.status(500).send("Error interno del servidor");
  }
};
//eliminar imagen del index
exports.eliminarHomeImg = (req, res) => {
  const id = req.params.id;
  query( "DELETE FROM images WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar la imagen:", err);
      return res
        .status(500)
        .send("Error al eliminar la imagen de la base de datos");
    }
    console.log("Imagen eliminada correctamente");
    res.json({ status: 'success' });
  });
};
//eliminar imagen de la galeria
exports.eliminarImages = (req, res) => {
  const id = req.body.id;
  query("DELETE FROM images WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar la imagen:", err);
      return res
        .status(500)
        .send("Error al eliminar la imagen de la base de datos");
    }
    console.log("Imagen eliminada correctamente");
    res.json({ status: 'success' });
  });
};
//eliminar usuario de la galeria
exports.eliminarCard = (req, res) => {
  const id = req.body.id;
    query("DELETE FROM cumple WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error("Error al eliminar la imagen:", err);
        return res
          .status(500)
          .send("Error al eliminar la imagen de la base de datos");
      }
      console.log("Imagen eliminada correctamente");
      res.json({ status : 'success' });
    });
};
//eliminar usuario del index
exports.eliminarHomeCard = (req, res) => {
  const id = req.body.id;
  query("DELETE FROM cumple WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar la imagen:", err);
      return res
        .status(500)
        .send("Error al eliminar la imagen de la base de datos");
    }
    console.log("Imagen eliminada correctamente");

    res.json({ status: 'success' });
  });
};
