const multer, { diskStorage } = require('multer');
const allowedMimeTypes = [
    'application/pdf',          // pdfs
    'image/png',                // png files
    'image/svg+xml',            // svg files
    'image/jpeg',               // jpeg files
    // 'application/x-xfig',       // figma files
    'application/xml',          // xml layout files
    'application/postscript',   // ai
    'image/gif',                // gifs
    // 'application/zip'            // for testing
]

const multerConfig = multer({
    storage: diskStorage,
    limits: { fileSize: 10 * 1024 * 1024 /* in bytes */ },
    fileFilter: (req, file, cb) => {
        console.log(file);
        if(!allowedMimeTypes.includes(file.mimetype)){
            return cb('Error: file type is not allowed', false);
        }

        cb(null, true);
    }
})

module.exports ={ 
    uploadMultipleDesigns: multerConfig.array('designs'),
}