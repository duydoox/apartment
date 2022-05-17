import { getRepository } from 'typeorm';
import { Like } from '../entities/Like';
import { ResponseType } from './../types/ResponseType';
import { RequestType } from './../types/RequestType';
import { Request } from 'express';
import { User } from '../entities/User';
import { Post } from '../entities/Post';
const likeController = {
    get: async (req: Request, res: ResponseType<Like>) => {
        try {
            const post = await getRepository(Post).findOne(+req.params.id);
            const likes = await getRepository(Like).find({
                select: ['user', 'likeID'],
                where: {
                    post: post
                },
                relations: ['post', 'user'],
            })
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
        } catch (err) {
            console.log(err)
        }
    },
    add: async (req: RequestType, res: ResponseType<Like>) => {
        const userID = req.userID
        const { postID } = req.body
        try {
            const newLike = new Like();
            const user = await getRepository(User).findOne(userID);
            const post = await getRepository(Post).findOne(postID);

            if (user && post) {
                const findLike = await getRepository(Like).findOne({
                    select: ['likeID', 'isLike'],
                    where: {
                        user: user,
                        post: post
                    }
                });
                console.log(findLike)
                if (findLike) {
                    const result = await getRepository(Like).delete({ likeID: +findLike.likeID });
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

                    const like = await getRepository(Like).create(newLike);
                    const newLikeDB = await getRepository(Like).save(like);
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
        } catch (err) {
            console.log(err)
        }
    }
}

export default likeController