"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const authRole = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (role ? role === 'admin' ? true : false : false) {
                const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne({ userID: req.userID });
                if (user) {
                    if (user.isAdmin) {
                        next();
                        return res.status(200);
                    }
                }
                return res.status(403).json({
                    success: false,
                    message: 'Not allowed !!!'
                });
            }
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.default = authRole;
