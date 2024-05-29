const jwt = require('jsonwebtoken');

//verificar si existe un inicio de sesion 
exports.verificar = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) return res.redirect("/");

    next();
};