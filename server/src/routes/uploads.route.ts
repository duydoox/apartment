import express from 'express';
import multer from 'multer';

const routeUpload = express.Router();

// upload post
const storagePost = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/post');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploads = multer({ storage: storagePost });

//upload avata
const storageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/person');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploadsAvatar = multer({ storage: storageAvatar });

routeUpload.post('/', uploads.single('imgCollections'), (req, res, next) => {
    try {
        return res.status(200).json('File uploaded successfully');
    } catch (error) {
        console.log(error);
    }
});

routeUpload.post('/avatar', uploadsAvatar.single('imgCollections'), (req, res, next) => {
    try {
        return res.status(200).json('File uploaded successfully');
    } catch (error) {
        console.log(error);
    }
});

export default routeUpload;