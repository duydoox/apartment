import express from 'express';
import likeController from '../controllers/like.controller';
import authVerifyToken from '../middleware/authVerifyToken';

const routeLike = express.Router();

routeLike.use(authVerifyToken);
routeLike.post('/', likeController.add);
routeLike.get('/:id', likeController.get);
routeLike.delete('/:id', likeController.get)

export default routeLike;