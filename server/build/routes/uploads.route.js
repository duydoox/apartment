"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const routeUpload = express_1.default.Router();
// upload post
const storagePost = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/post');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploads = (0, multer_1.default)({ storage: storagePost });
//upload avata
const storageAvatar = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/person');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploadsAvatar = (0, multer_1.default)({ storage: storageAvatar });
routeUpload.post('/', uploads.single('imgCollections'), (req, res, next) => {
    try {
        return res.status(200).json('File uploaded successfully');
    }
    catch (error) {
        console.log(error);
    }
});
routeUpload.post('/avatar', uploadsAvatar.single('imgCollections'), (req, res, next) => {
    try {
        return res.status(200).json('File uploaded successfully');
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = routeUpload;
