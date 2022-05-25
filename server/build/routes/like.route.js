"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_controller_1 = __importDefault(require("../controllers/like.controller"));
const authVerifyToken_1 = __importDefault(require("../middleware/authVerifyToken"));
const routeLike = express_1.default.Router();
routeLike.use(authVerifyToken_1.default);
routeLike.post('/', like_controller_1.default.add);
routeLike.get('/:id', like_controller_1.default.get);
routeLike.delete('/:id', like_controller_1.default.get);
exports.default = routeLike;
