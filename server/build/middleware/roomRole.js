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
const roomRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne({
            select: ['userID', 'isAdmin'],
            where: {
                userID: req.userID
            },
            relations: ['room']
        });
        if ((user === null || user === void 0 ? void 0 : user.isAdmin) || ((_a = user === null || user === void 0 ? void 0 : user.room) === null || _a === void 0 ? void 0 : _a.roomID) === +req.params.roomID) {
            next();
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'Not allowed !!!'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = roomRole;
