const express=require('express');
const router=express.Router();

const path = require('path');
const multer = require('multer');
const { route } = require('.');
const fs=require('fs');

router.use('/', express.static(path.join(__dirname, '/public/')));

const storage = multer.diskStorage({

 

    destination: (req, file, cb) => {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    
        cb(null, true);
   
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports=router;