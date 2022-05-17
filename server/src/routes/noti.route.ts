import express from 'express';
import authVerifyToken from '../middleware/authVerifyToken';
import notiController from '../controllers/noti.controller';

const routeNoti = express.Router();

routeNoti.use(authVerifyToken);

routeNoti.get("/", notiController.get);
routeNoti.post("/", notiController.post);
routeNoti.put("/:notiID", notiController.update);

export default routeNoti