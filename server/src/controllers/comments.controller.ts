import { getRepository } from 'typeorm';
import { Like } from '../entities/Like';
import { Comment } from '../entities/Comment';
import { ResponseType } from './../types/ResponseType';
import { RequestType } from './../types/RequestType';
import { Request } from 'express';
import { User } from '../entities/User';
import { Post } from '../entities/Post';
import { count } from 'console';
const commentsController = {
    get: async (req: Request, res: ResponseType<Comment>) => {
        try {
            const post = await getRepository(Post).findOne(+req.params.id);
            const comments = await getRepository(Comment).find({
                select: ['user', 'commentID', 'content', 'createAt'],
                where: {
                    post: post
                },
                order: { 'createAt': 'DESC' },
                relations: ['post', 'user'],
            })
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
        } catch (err) {
            console.log(err)
        }
    },
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
    add: async (req: RequestType, res: ResponseType<Comment>) => {
        const userID = req.userID
        const { postID, content } = req.body
        try {
            const newComment = new Comment();
            const user = await getRepository(User).findOne(userID);
            const post = await getRepository(Post).findOne(postID);

            if (user && post) {
                newComment.post = post;
                newComment.user = user;
                newComment.content = content;

                const comment = await getRepository(Comment).create(newComment);
                const newCommentDB = await getRepository(Comment).save(comment);
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
        } catch (err) {
            console.log(err)
        }
    }
}

export default commentsController