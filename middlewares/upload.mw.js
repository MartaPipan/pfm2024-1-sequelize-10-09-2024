const path = require('path');
const multer = require('multer');

const { IMAGE_PATH } = require('../constants');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', IMAGE_PATH));
        //    '..', IMAGE_PATH    ->>     ../public/images/
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage });

module.exports.singleUpload = (fieldName)=> upload.single(fieldName);