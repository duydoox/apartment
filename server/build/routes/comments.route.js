"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controller_1 = __importDefault(require("../controllers/comments.controller"));
const authVerifyToken_1 = __importDefault(require("../middleware/authVerifyToken"));
const routeComments = express_1.default.Router();
routeComments.use(authVerifyToken_1.default);
routeComments.post('/', comments_controller_1.default.add);
routeComments.get('/:id', comments_controller_1.default.get);
// routeComments.delete('/:id', likeController.get)
exports.default = routeComments;
