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
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const argon2_1 = require("argon2");
const Room_1 = require("../entities/Room");
// import { v4 as uuidv4 } from 'uuid';
const userController = {
    //POST: .../login
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { phoneNumber, password } = req.body;
        if (phoneNumber.trim() === "" || password.trim() === "")
            return res.json({
                success: false,
                message: 'phoneNumber or password is empty'
            });
        try {
            const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne({
                select: ['userID', 'isAdmin', 'fullName', 'phoneNumber', 'password', 'avatar'],
                where: {
                    phoneNumber
                },
                relations: ['room'],
            });
            if (!user) {
                return res.json({
                    success: false,
                    message: 'phoneNumber or password is incorrect'
                });
            }
            const checkPassword = yield (0, argon2_1.verify)(user.password, password);
            if (!checkPassword) {
                return res.json({
                    success: false,
                    message: 'phoneNumber or password is incorrect'
                });
            }
            const token = yield (0, jsonwebtoken_1.sign)({ id: user.userID }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '5h'
            });
            return res.status(200).json({
                success: true,
                data: user,
                token
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //POST: .../register
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { phoneNumber, password, isAdmin, roomID } = req.body;
        if (phoneNumber.trim() === "" || password.trim() === "")
            return res.json({
                success: false,
                message: 'phoneNumber or password is empty'
            });
        else if (password.length < 3)
            return res.json({
                success: false,
                message: 'Password must not be less than 3 characters'
            });
        try {
            const checkUser = yield (0, typeorm_1.getRepository)(User_1.User).findOne({ phoneNumber });
            if (checkUser) {
                return res.json({
                    success: false,
                    message: 'PhoneNumber already exists'
                });
            }
            const hashPassword = yield (0, argon2_1.hash)(password);
            const room = yield (0, typeorm_1.getRepository)(Room_1.Room).findOne(roomID);
            if (room) {
                const newUser = new User_1.User();
                newUser.phoneNumber = phoneNumber;
                newUser.isAdmin = isAdmin;
                newUser.password = hashPassword;
                newUser.fullName = phoneNumber;
                // newUser.room = room;
                const user = yield (0, typeorm_1.getRepository)(User_1.User).create(newUser);
                const newUserDb = yield (0, typeorm_1.getRepository)(User_1.User).save(user);
                if (newUserDb) {
                    const newRoom = Object.assign(Object.assign({}, room), { isEmpty: false });
                    if (room.isEmpty) {
                        yield (0, typeorm_1.getRepository)(Room_1.Room).save(newRoom);
                    }
                    return res.status(201).json({
                        success: true,
                        message: `phoneNumber: ${newUser.phoneNumber} registered successfully !!!`
                    });
                }
            }
            return res.status(404).json({
                success: false,
                message: 'Room not found !!!'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //GET: .../user
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne({
                select: ['userID', 'isAdmin', 'fullName', 'phoneNumber', 'avatar'],
                where: {
                    userID: req.userID
                },
                relations: ['room']
            });
            if (user) {
                return res.status(200).json({
                    success: true,
                    data: user
                });
            }
            return res.status(404).json({
                success: false,
                message: 'User not found !!!'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //GET: .../detailUser
    getDetailUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, typeorm_1.getRepository)(User_1.User).createQueryBuilder('user')
                .select(['userID', 'fullName', 'phoneNumber', 'sex', 'cardNumber', 'address', 'haveMotorbike', 'avatar'])
                .addSelect('DATE_FORMAT(dateOfBirth,\'%Y-%m-%d\')', 'dateOfBirth')
                .where('user.userID = :id', { id: req.userID })
                .getRawOne();
            if (user) {
                console.log(user);
                return res.status(200).json({
                    success: true,
                    data: user
                });
            }
            return res.status(404).json({
                success: false,
                message: 'User not found !!!'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //PUT .../updateUser
    updateDetailUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne({ userID: req.userID });
            if (user) {
                const detailUser = Object.assign(Object.assign({}, user), req.body);
                const newUser = yield (0, typeorm_1.getRepository)(User_1.User).save(detailUser);
                if (newUser) {
                    return res.status(200).json({
                        success: true,
                        message: 'update successful',
                        data: newUser
                    });
                }
            }
            return res.status(404).json({
                success: false,
                message: 'User not found !!!'
            });
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: 'Số điện thoại đã tồn tại'
            });
        }
    }),
    //PUT .../changePW
    changePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { password, newPassword } = req.body;
        if (password.length < 3 || newPassword.length < 3) {
            return res.json({
                success: false,
                message: 'Password must not be less than 3 characters',
            });
        }
        try {
            const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne({
                where: {
                    userID: req.userID
                }
            });
            if (user) {
                const checkPassword = yield (0, argon2_1.verify)(user.password, password);
                const newPasswordHash = yield (0, argon2_1.hash)(newPassword);
                if (checkPassword) {
                    const newUser = Object.assign(Object.assign({}, user), { password: newPasswordHash });
                    const newUserDB = yield (0, typeorm_1.getRepository)(User_1.User).save(newUser);
                    if (newUserDB) {
                        return res.status(200).json({
                            success: true,
                            message: 'Change password successfully!!!'
                        });
                    }
                }
                return res.json({
                    success: false,
                    message: 'Password is incorrected !!!',
                });
            }
            return res.status(404).json({
                success: false,
                message: 'User not found !!!'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //GET: .../allUser
    getAllUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, typeorm_1.getRepository)(User_1.User).find({
                select: ['userID', 'fullName', 'avatar']
            });
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found !!!'
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    findUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, typeorm_1.getRepository)(User_1.User).find({
                select: ['userID', 'fullName', 'avatar'],
                where: { fullName: (0, typeorm_1.Like)(`${req.headers.key}%`) }
            });
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User not found !!!'
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = userController;
