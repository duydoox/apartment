import express from 'express';
import roomController from '../controllers/room.controller';
import authRole from './../middleware/authRole';
import authVerifyToken from '../middleware/authVerifyToken';
import roomRole from '../middleware/roomRole';
import route from '.';

const routeRoom = express.Router();

routeRoom.use(authVerifyToken);
routeRoom.get('/:roomID',roomController.getRoomDetail);
routeRoom.get('/', roomController.getAllRoom);

routeRoom.use(authRole('admin'));
routeRoom.post('/', roomController.createRoom);
routeRoom.put('/:id', roomController.updateRoom);
routeRoom.put('/addUser/:userID', roomController.addUser);
routeRoom.delete('/delUser/:userID', roomController.deleteUser);
routeRoom.delete('/:id', roomController.deleteRoom);



export default routeRoom;