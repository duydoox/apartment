import { RequestType } from '../types/RequestType';
import { ResponseType } from '../types/ResponseType';
import { getRepository } from 'typeorm';
import { Notification } from '../entities/Notification';
import { User } from '../entities/User';
import { Post } from '../entities/Post';


const notiController = {
    get: async (req: RequestType, res: ResponseType<Notification>) => {
        try {
            const noti = await getRepository(Notification).find({
                select: ["post", "notiID", "seen", "type", 'createAt'],
                where: {
                    user: {
                        userID: req.userID
                    }
                },
                order: { 'createAt': 'DESC' },
                relations: ['post', 'user']
            })
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
        } catch (err) {
            console.log(err)
        }
    },
    post: async (req: RequestType, res: ResponseType<Notification>) => {
        const { type, userID, postID } = req.body
        try {
            const newNoti = new Notification()
            const user = await getRepository(User).findOne(userID);
            const post = await getRepository(Post).findOne(postID);
            if (user && post) {
                const findnoti = await getRepository(Notification).findOne({
                    select: ['notiID'],
                    where: {
                        user: user,
                        post: post,
                        type: type
                    }
                });
                console.log(findnoti)
                if (findnoti) {
                    const result = await getRepository(Notification).delete({ notiID: +findnoti.notiID });
                }

                newNoti.type = type
                newNoti.seen = false
                newNoti.post = post
                newNoti.user = user
                const noti = await getRepository(Notification).create(newNoti)
                const newNotiDB = await getRepository(Notification).save(noti)
                if (newNotiDB) {
                    return res.status(201).json({
                        success: true,
                        data: newNotiDB
                    });
                }
            }
        } catch (err) {
            console.log(err)
        }
    },
    update: async (req: RequestType, res: ResponseType<Notification>) => {
        try{
            const noti = await getRepository(Notification).findOne({
                where: {
                    notiID: +req.params.notiID
                },
                relations: ['user', 'post']
            })
            if(noti && noti.seen === false){
                const seenNoti: Notification = {...noti, seen: true}
                const newNoti = await getRepository(Notification).save(seenNoti)
                if(newNoti){
                    return res.status(200).json({
                        success: true,
                        message: 'update successful',
                        data: newNoti
                    });
                }
            }
            else if(noti && noti.seen === true){
                return res.status(200).json({
                    success: true,
                    message: 'update successful'
                });
            }
        }
        catch(err){
            console.log(err)
        }
    }
};

export default notiController;