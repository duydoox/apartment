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
const Post_1 = require("../entities/Post");
const Like_1 = require("../entities/Like");
const Comment_1 = require("../entities/Comment");
const User_1 = require("../entities/User");
const Notification_1 = require("../entities/Notification");
const postController = {
    getPagePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { perpage, page, filter, time } = req.headers;
        const skip = Number(perpage) * Number(page) - Number(perpage);
        const take = Number(perpage);
        const times = new Date(String(time));
        try {
            const posts = yield (0, typeorm_1.getRepository)(Post_1.Post).createQueryBuilder('post')
                .innerJoinAndSelect('post.user', 'user')
                .where('post.createAt <= :time', { time: times })
                .orderBy('post.createAt', 'DESC')
                .skip(skip)
                .take(take)
                .getMany();
            if (posts) {
                return res.status(200).json({
                    success: true,
                    data: posts
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Posts not found !!!'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    createPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { content, range, img, title } = req.body;
        const userID = req.userID;
        try {
            const newPost = new Post_1.Post();
            const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne(userID);
            if (user) {
                newPost.title = title;
                newPost.content = content;
                newPost.range = range;
                newPost.img = img;
                newPost.user = user;
                const post = yield (0, typeorm_1.getRepository)(Post_1.Post).create(newPost);
                const newPostDB = yield (0, typeorm_1.getRepository)(Post_1.Post).save(post);
                if (newPostDB) {
                    return res.status(201).json({
                        success: true,
                        data: newPostDB
                    });
                }
            }
            else {
                return res.status(403).json({
                    success: false,
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getPostByID: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield (0, typeorm_1.getRepository)(Post_1.Post).findOne({
                where: {
                    postID: +req.params.postID
                },
                relations: ['user']
            });
            if (post) {
                return res.status(200).json({
                    success: true,
                    data: post
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userID = req.userID;
        try {
            const find = yield (0, typeorm_1.getRepository)(Post_1.Post).findOne({
                select: ['user', 'postID'],
                where: {
                    postID: +req.params.id
                },
                relations: ['user']
            });
            if (find && find.user.userID === userID) {
                const like = yield (0, typeorm_1.getRepository)(Like_1.Like).delete({ post: find });
                const comment = yield (0, typeorm_1.getRepository)(Comment_1.Comment).delete({ post: find });
                const noti = yield (0, typeorm_1.getRepository)(Notification_1.Notification).delete({ post: find });
                if (like && comment && noti) {
                    const post = yield (0, typeorm_1.getRepository)(Post_1.Post).delete({ postID: +req.params.id });
                    if (post) {
                        return res.status(203).json({
                            success: true,
                            message: 'This post deleted'
                        });
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = postController;
// times.setDate(Number(time))
// const posts = await getRepository(Post).find({
//     select: ['postID', 'range', 'content', 'img', 'createAt', 'user'],
//     order: { createAt: 'DESC' },
//     skip: skip,
//     take: take,
//     relations: ['user']
// });
