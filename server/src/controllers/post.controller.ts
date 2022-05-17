import { getRepository } from 'typeorm';
import { Post } from '../entities/Post';
import { Like } from '../entities/Like';
import { Comment } from '../entities/Comment';
import { ResponseType } from './../types/ResponseType';
import { RequestType } from './../types/RequestType';
import { Request } from 'express';
import { User } from '../entities/User';
import { Notification } from '../entities/Notification';

const postController = {
    getPagePost: async (req: Request, res: ResponseType<Post>) => {
        const { perpage, page, filter, time} = req.headers;
        const skip = Number(perpage) * Number(page) - Number(perpage);
        const take = Number(perpage)
        const times = new Date(String(time))
        
        try {
            const posts = await getRepository(Post).createQueryBuilder('post')
                .innerJoinAndSelect('post.user', 'user')
                .where('post.createAt <= :time', { time: times })
                .orderBy('post.createAt', 'DESC')
                .skip(skip)
                .take(take)
                .getMany()

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
        } catch (error) {
            console.log(error);
        }
    },
    createPost: async (req: RequestType, res: ResponseType<Post>) => {
        const { content, range, img, title } = req.body;
        const userID = req.userID
        try {
            const newPost = new Post();
            const user = await getRepository(User).findOne(userID);

            if (user) {
                newPost.title = title;
                newPost.content = content;
                newPost.range = range;
                newPost.img = img;
                newPost.user = user;


                const post = await getRepository(Post).create(newPost);
                const newPostDB = await getRepository(Post).save(post);
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

        } catch (error) {
            console.log(error);
        }
    },
    getPostByID: async (req: RequestType, res: ResponseType<Post>) => {
        try{
            const post = await getRepository(Post).findOne({
                where: {
                    postID: +req.params.postID
                },
                relations: ['user']
            })
            if(post){
                return res.status(200).json({
                    success: true,
                    data: post
                });
            }
        }
        catch(err){
            console.log(err)
        }
    },
    deletePost: async (req: RequestType, res: ResponseType<Post>) => {
        const userID = req.userID
        try {
            const find = await getRepository(Post).findOne({
                select: ['user', 'postID'],
                where: {
                    postID: +req.params.id
                },
                relations: ['user']
            });
            if (find && find.user.userID === userID) {
                const like = await getRepository(Like).delete({ post: find })
                const comment = await getRepository(Comment).delete({ post: find })
                const noti = await getRepository(Notification).delete({ post: find })
                if (like && comment && noti) {
                    const post = await getRepository(Post).delete({ postID: +req.params.id });
                    if (post) {
                        return res.status(203).json({
                            success: true,
                            message: 'This post deleted'
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default postController;

// times.setDate(Number(time))
            // const posts = await getRepository(Post).find({
            //     select: ['postID', 'range', 'content', 'img', 'createAt', 'user'],
            //     order: { createAt: 'DESC' },
            //     skip: skip,
            //     take: take,
            //     relations: ['user']
            // });