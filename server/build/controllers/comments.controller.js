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
const Comment_1 = require("../entities/Comment");
const User_1 = require("../entities/User");
const Post_1 = require("../entities/Post");
const commentsController = {
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield (0, typeorm_1.getRepository)(Post_1.Post).findOne(+req.params.id);
            const comments = yield (0, typeorm_1.getRepository)(Comment_1.Comment).find({
                select: ['user', 'commentID', 'content', 'createAt'],
                where: {
                    post: post
                },
                order: { 'createAt': 'DESC' },
                relations: ['post', 'user'],
            });
            if (comments) {
                return res.status(200).json({
                    success: true,
                    data: comments
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
    // getcount: async (req: RequestType, res: ResponseType<Comment>) => {
    //     const comments = await getRepository(Comment).find({
    //         select: ["commentID"],
    //         where: {
    //             post: {
    //                 postID: +req.params.id
    //             }
    //         },
    //         order: { 'createAt': 'DESC' },
    //         relations: ['post', 'user'],
    //     })
    // },
    add: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userID = req.userID;
        const { postID, content } = req.body;
        try {
            const newComment = new Comment_1.Comment();
            const user = yield (0, typeorm_1.getRepository)(User_1.User).findOne(userID);
            const post = yield (0, typeorm_1.getRepository)(Post_1.Post).findOne(postID);
            if (user && post) {
                newComment.post = post;
                newComment.user = user;
                newComment.content = content;
                const comment = yield (0, typeorm_1.getRepository)(Comment_1.Comment).create(newComment);
                const newCommentDB = yield (0, typeorm_1.getRepository)(Comment_1.Comment).save(comment);
                if (newCommentDB) {
                    return res.status(201).json({
                        success: true,
                        data: newCommentDB
                    });
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
exports.default = commentsController;
