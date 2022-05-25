"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Room_1 = require("../entities/Room");
const User_1 = require("../entities/User");
const roomController = {
    //GET: ../room/:roomID
    getRoomDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const room = yield (0, typeorm_1.getRepository)(Room_1.Room).findOne({
                where: {
                    roomID: +req.params.roomID
                },
                relations: ['users']
            });
            if (room) {
                return res.status(200).json({
                    success: true,
                    data: room
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Room not found !!!'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //GET: .../room
    getAllRoom: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rooms = yield (0, typeorm_1.getRepository)(Room_1.Room).find({
                select: ['roomID', 'roomName']
            });
            if (rooms) {
                return res.status(200).json({
                    success: true,
                    data: rooms
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Rooms not found !!!'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //POST .../room
    createRoom: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomName, rentPrice, haveWifi, isEmpty, acreage, deposit, desciption } = req.body;
        if (roomName === undefined) {
            return res.json({
                success: false,
                message: 'roomName is required'
            });
        }
        try {
            const checkRoom = yield (0, typeorm_1.getRepository)(Room_1.Room).findOne({ roomName });
            if (checkRoom) {
                return res.json({
                    success: false,
                    message: 'This room is existed'
                });
            }
            const newRoom = new Room_1.Room();
            newRoom.roomName = roomName;
            newRoom.rentPrice = rentPrice;
            newRoom.haveWifi = haveWifi;
            newRoom.isEmpty = isEmpty;
            newRoom.acreage = acreage;
            newRoom.deposit = deposit;
            newRoom.desciption = desciption;
            const room = yield (0, typeorm_1.getRepository)(Room_1.Room).create(newRoom);
            const newRoomDB = yield (0, typeorm_1.getRepository)(Room_1.Room).save(room);
            if (newRoomDB) {
                return res.status(201).json({
                    success: true,
                    data: newRoom
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    //PUT: .../room/:id
    updateRoom: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const room = yield (0, typeorm_1.getRepository)(Room_1.Room).findOne({ roomID: +req.params.id });
            if (room) {
                yield (0, typeorm_1.getRepository)(Room_1.Room).merge(room, req.body);
                const newRoom = yield (0, typeorm_1.getRepository)(Room_1.Room).save(room);
                if (newRoom) {
                    return res.status(200).json({
                        success: true,
                        data: newRoom
                    });
                }
            }
            return res.status(404).json({
                success: false,
                message: 'Room not found !!!'
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //DELETE: .../room/:id
    deleteRoom: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const room = yield (0, typeorm_1.getRepository)(Room_1.Room).findOne({ roomID: +req.params.id });
            if (room) {
                const newRooms = Object.assign(Object.assign({}, room), { users: [] });
                const newRoom = yield (0, typeorm_1.getRepository)(Room_1.Room).save(newRooms);
                const delRoom = yield (0, typeorm_1.getRepository)(Room_1.Room).delete({ roomID: +req.params.id });
                if (delRoom) {
                    return res.status(203).json({
                        success: true,
                        message: 'This room deleted'
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    addUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, typeorm_1.getRepository)(User_1.User).createQueryBuilder('users')
                .update(User_1.User)
                .set({
                room: {
                    roomID: +req.body.roomID
                }
            })
                .where("userID = :id", { id: +req.params.userID })
                .execute();
            if (user) {
                return res.status(200).json({
                    success: true,
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const roomID = Number(req.headers.roomid);
        try {
            const room = yield (0, typeorm_1.getRepository)(Room_1.Room).findOne({
                where: { roomID: roomID },
                relations: ['users']
            });
            if (room) {
                const listRoom = room.users.filter((user) => user.userID !== +req.params.userID);
                const newRoom = Object.assign(Object.assign({}, room), { users: listRoom });
                const saveRoom = yield (0, typeorm_1.getRepository)(Room_1.Room).save(newRoom);
                if (saveRoom) {
                    return res.status(200).json({
                        success: true,
                        message: 'update successful',
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
};
exports.default = roomController;
