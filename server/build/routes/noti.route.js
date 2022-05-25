"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authVerifyToken_1 = __importDefault(require("../middleware/authVerifyToken"));
const noti_controller_1 = __importDefault(require("../controllers/noti.controller"));
const routeNoti = express_1.default.Router();
routeNoti.use(authVerifyToken_1.default);
routeNoti.get("/", noti_controller_1.default.get);
routeNoti.post("/", noti_controller_1.default.post);
routeNoti.put("/:notiID", noti_controller_1.default.update);
exports.default = routeNoti;
