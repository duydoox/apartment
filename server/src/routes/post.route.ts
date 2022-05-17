import express from 'express';
import postController from '../controllers/post.controller';

import authVerifyToken from '../middleware/authVerifyToken';

const routePost = express.Router();

routePost.use(authVerifyToken);
routePost.post('/', postController.createPost);
routePost.get('/:postID', postController.getPostByID);
routePost.get('/', postController.getPagePost);
routePost.delete('/:id', postController.deletePost)


export default routePost;