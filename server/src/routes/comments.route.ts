import express from 'express';
import commentsController from '../controllers/comments.controller';
import authVerifyToken from '../middleware/authVerifyToken';

const routeComments = express.Router();

routeComments.use(authVerifyToken);
routeComments.post('/', commentsController.add);
routeComments.get('/:id', commentsController.get);
// routeComments.delete('/:id', likeController.get)

export default routeComments;