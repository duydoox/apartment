import { Application, NextFunction, Request, Response } from 'express';
import routeUser from './user.route';
import routeRoom from './room.route';
import routeBill from './bill.route';
import routePost from './post.route';
import routeLike from './like.route';
import routeUpload from './uploads.route';
import routeComments from './comments.route';
import routeNoti from './noti.route';

const route = (app: Application) => {
    app.use(function(req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use('/bill', routeBill);
    app.use('/room', routeRoom);
    app.use('/posts', routePost);
    app.use('/like', routeLike);
    app.use('/comments', routeComments);
    app.use('/noti', routeNoti);
    app.use('/api/uploads', routeUpload);
    app.use('/', routeUser);
};

export default route;