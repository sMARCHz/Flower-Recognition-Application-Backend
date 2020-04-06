const multer = require('multer');
const path = require('path');
const diskStorageToUploads = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public')
    },
    filename: (req, file, cb) => {
        cb(null, 'Image-'+ Date.now() + file.originalname)
    }
});

const upload = multer({
    storage: diskStorageToUploads,
    fileFilter: (req,res,cb)=>{
        const ext = path.extname(res.originalname);
        if(ext != '.jpg'){
            return cb(new Error("Error: This file is not image or JPG"))
        }
        cb(null,true)
    },
    limits:{fileSize:4500000}
});

module.exports = {
    uploadImg: upload.single('file')
}