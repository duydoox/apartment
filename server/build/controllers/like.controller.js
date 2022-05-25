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
const Like_1 = require("../entities/Like");
const User_1 = require("../entities/User");
const Post_1 = require("../entities/Post");
const likeController = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield (0, typeorm_1.getRepository)(Post_1.Post).findOne(+req.params.id);
            const likes = yield (0, typeorm_1.getRepository)(Like_1.Like).find({
                select: ['user', 'likeID'],
                where: {
                    post: post
                },
                relations: ['post', 'user'],
            });
            if (likes) {
                return res.status(200).json({
                    success: true,
                    data: likes
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Post not found !!!'
            });
        }
        catch (err) {
            console.log(err);
        }
    }),
    add: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userID = req.userID;
        const { postID } = req.body;
        try {
            const newLike = new Like_1.Like();
            const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne(userID);
            const post = yield (0, typeorm_1.getRepository)(Post_1.Post).findOne(postID);
            if (user && post) {
                const findLike = yield (0, typeorm_1.getRepository)(Like_1.Like).findOne({
                    select: ['likeID', 'isLike'],
                    where: {
                        user: user,
                        post: post
                    }
                });
                console.log(findLike);
                if (findLike) {
                    const result = yield (0, typeorm_1.getRepository)(Like_1.Like).delete({ likeID: +findLike.likeID });
                    if (result) {
                        return res.status(203).json({
                            success: true,
                            message: 'This like deleted'
                        });
                    }
                }
                else {
                    newLike.post = post;
                    newLike.user = user;
                    newLike.isLike = true;
                    const like = yield (0, typeorm_1.getRepository)(Like_1.Like).create(newLike);
                    const newLikeDB = yield (0, typeorm_1.getRepository)(Like_1.Like).save(like);
                    if (newLikeDB) {
                        return res.status(201).json({
                            success: true,
                            data: newLikeDB
                        });
                    }
                }
            }
            else {
                return res.status(403).json({
                    success: false,
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    })
};
exports.default = likeController;
