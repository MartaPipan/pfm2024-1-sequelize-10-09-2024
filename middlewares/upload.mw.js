const path = require('path');
const multer = require('multer');

const { IMAGE_PATH } = require('../constants');

const mimetype = ['image/jpeg', 'image/png'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', IMAGE_PATH));
        //    '..', IMAGE_PATH    ->>     ../public/images/
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});


// Функція `fileFilter` використовується для перевірки типу файлу, що завантажується
const fileFilter = (req, file, cb) => {
    // Перевіряємо, чи MIME-тип файлу дозволений (змінна `mimetype` повинна бути визначена раніше, наприклад, це може бути масив дозволених типів файлів)
    if (mimetype.includes(file.mimetype) === false) {
        // Якщо тип файлу недопустимий, викликаємо callback з помилкою
        return cb(new Error('Invalid file type'));
    } else {
        // Якщо тип файлу допустимий, дозволяємо завантаження, передаючи `true` у callback
        cb(null, true);
    }
};

// Конфігурація `multer` для завантаження файлів
const upload = multer({ 
    storage, // Об'єкт для налаштування місця зберігання файлів (повинен бути визначений раніше)
    fileFilter, // Фільтр для перевірки типу файлу
    limits: { fileSize: 1024 * 1024 * 5 } // Обмеження розміру файлу: 5 МБ (1024 байт * 1024 = 1 МБ, помножене на 5)
});

// Експортуємо функцію для завантаження одного файлу
module.exports.singleUpload = (fieldName) => upload.single(fieldName);
// `fieldName` - це ім'я поля у формі, яке містить файл для завантаження


// Функція fileFilter без коментарів:
/**const fileFilter = (req, file, cb) => {
    if (mimetype.includes(file.mimetype) === false) {
        return cb(new Error('Invalid file type'));
    } else {
        cb(null, true);
    }
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } }); //5Mb=(1024*1024*5); 1Kb= 1024 Bit 
module.exports.singleUpload = (fieldName) => upload.single(fieldName);
 */