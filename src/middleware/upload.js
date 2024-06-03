const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img');
    },
    filename: function (req, file, cb) {
        // Utiliza la extensión original del archivo
        const extension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;