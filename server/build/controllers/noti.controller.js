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
const Notification_1 = require("../entities/Notification");
const User_1 = require("../entities/User");
const Post_1 = require("../entities/Post");
const notiController = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const noti = yield (0, typeorm_1.getRepository)(Notification_1.Notification).find({
                select: ["post", "notiID", "seen", "type", 'createAt'],
                where: {
                    user: {
                        userID: req.userID
                    }
                },
                order: { 'createAt': 'DESC' },
                relations: ['post', 'user']
            });
            if (noti) {
                return res.status(200).json({
                    success: true,
                    data: noti
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Notifications not found !!!'
            });
        }
        catch (err) {
            console.log(err);
        }
    }),
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { type, userID, postID } = req.body;
        try {
            const newNoti = new Notification_1.Notification();
            const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne(userID);
            const post = yield (0, typeorm_1.getRepository)(Post_1.Post).findOne(postID);
            if (user && post) {
                const findnoti = yield (0, typeorm_1.getRepository)(Notification_1.Notification).findOne({
                    select: ['notiID'],
                    where: {
                        user: user,
                        post: post,
                        type: type
                    }
                });
                console.log(findnoti);
                if (findnoti) {
                    const result = yield (0, typeorm_1.getRepository)(Notification_1.Notification).delete({ notiID: +findnoti.notiID });
                }
                newNoti.type = type;
                newNoti.seen = false;
                newNoti.post = post;
                newNoti.user = user;
                const noti = yield (0, typeorm_1.getRepository)(Notification_1.Notification).create(newNoti);
                const newNotiDB = yield (0, typeorm_1.getRepository)(Notification_1.Notification).save(noti);
                if (newNotiDB) {
                    return res.status(201).json({
                        success: true,
                        data: newNotiDB
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const noti = yield (0, typeorm_1.getRepository)(Notification_1.Notification).findOne({
                where: {
                    notiID: +req.params.notiID
                },
                relations: ['user', 'post']
            });
            if (noti && noti.seen === false) {
                const seenNoti = Object.assign(Object.assign({}, noti), { seen: true });
                const newNoti = yield (0, typeorm_1.getRepository)(Notification_1.Notification).save(seenNoti);
                if (newNoti) {
                    return res.status(200).json({
                        success: true,
                        message: 'update successful',
                        data: newNoti
                    });
                }
            }
            else if (noti && noti.seen === true) {
                return res.status(200).json({
                    success: true,
                    message: 'update successful'
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    })
};
exports.default = notiController;
