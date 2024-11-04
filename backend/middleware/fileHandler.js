const multer = require('multer');
const path = require('path');


module.exports.handleFile = (destAddr, file) => {
    
    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, path.join(__dirname , destAddr));
        },
        filename : (req, file, cb) => {
            const name = Date.now() + "_" + file.originalname
            cb(null, name);
        }
    });

    const upload = multer({storage});
    return upload.single(file);
}