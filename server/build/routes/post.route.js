"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const authVerifyToken_1 = __importDefault(require("../middleware/authVerifyToken"));
const routePost = express_1.default.Router();
routePost.use(authVerifyToken_1.default);
routePost.post('/', post_controller_1.default.createPost);
routePost.get('/:postID', post_controller_1.default.getPostByID);
routePost.get('/', post_controller_1.default.getPagePost);
routePost.delete('/:id', post_controller_1.default.deletePost);
exports.default = routePost;
