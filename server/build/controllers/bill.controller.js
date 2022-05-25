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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bill_1 = require("../entities/Bill");
const typeorm_1 = require("typeorm");
const Room_1 = require("../entities/Room");
const fomatDate_1 = __importDefault(require("../utils/fomatDate"));
const billController = {
    //GET: .../bill/:roomID
    getBillDetail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { year, month } = req.headers;
        if (year === undefined) {
            return res.json({
                success: false,
                message: 'Year is required !!!'
            });
        }
        if (month === undefined) {
            return res.json({
                success: false,
                message: 'Month is required !!!'
            });
        }
        const nyear = Number(year);
        const nmonth = Number(month);
        const currentDate = (0, fomatDate_1.default)(nmonth, nyear);
        const pastDate = nmonth === 1 ? (0, fomatDate_1.default)(11, nyear - 1) : (0, fomatDate_1.default)(nmonth - 1, nyear);
        try {
            const currentBill = yield (0, typeorm_1.getRepository)(Bill_1.Bill).findOne({
                where: {
                    createAt: (0, typeorm_1.Like)(`${currentDate}%`),
                    room: {
                        roomID: +req.params.roomID
                    }
                },
            });
            if (!currentBill) {
                return res.json({
                    success: false,
                    message: `Dont have data in ${currentDate}`
                });
            }
            const pastBill = yield (0, typeorm_1.getRepository)(Bill_1.Bill).findOne({
                where: {
                    createAt: (0, typeorm_1.Like)(`${pastDate}%`),
                    room: {
                        roomID: +req.params.roomID
                    }
                },
            });
            if (!pastBill) {
                return res.json({
                    success: false,
                    message: `Dont have data in ${pastDate}`
                });
            }
            return res.status(200).json({
                success: true,
                data: [pastBill, currentBill]
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    //POST: .../bill/:roomID
    createBill: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { electricNumber, waterBlockNumber, paid, sent, otherPrice, haveWifi, description } = req.body;
        if (electricNumber === undefined) {
            return res.json({
                success: false,
                message: 'ElectricNumber is required !!!'
            });
        }
        if (electricNumber === undefined) {
            return res.json({
                success: false,
                message: 'WaterBlockNumber is required !!!'
            });
        }
        if (electricNumber === undefined) {
            return res.json({
                success: false,
                message: 'Paid is required !!!'
            });
        }
        if (electricNumber === undefined) {
            return res.json({
                success: false,
                message: 'Sent is required !!!'
            });
        }
        try {
            const room = yield (0, typeorm_1.getRepository)(Room_1.Room).findOne({
                roomID: +req.params.roomID
            });
            if (room) {
                const date = new Date();
                const checkBillExist = yield (0, typeorm_1.getRepository)(Bill_1.Bill).findOne({
                    select: ['billID'],
                    where: {
                        room: { roomID: +req.params.roomID },
                        createAt: (0, typeorm_1.Like)(`${(0, fomatDate_1.default)(date.getMonth(), date.getFullYear())}%`)
                    },
                    relations: ['room']
                });
                if (checkBillExist) {
                    return res.json({
                        success: false,
                        message: `Had has bill in ${date.getMonth() + 1}, ${date.getFullYear()}`
                    });
                }
                const bill = new Bill_1.Bill();
                bill.electricNumber = electricNumber;
                bill.waterBlockNumber = waterBlockNumber;
                bill.paid = paid;
                bill.sent = sent;
                bill.room = room;
                bill.haveWifi = haveWifi;
                bill.otherPrice = otherPrice;
                bill.description = description;
                const newBill = yield (0, typeorm_1.getRepository)(Bill_1.Bill).create(bill);
                const newBillDB = yield (0, typeorm_1.getRepository)(Bill_1.Bill).save(newBill);
                if (newBillDB) {
                    return res.status(201).json({
                        success: true,
                        data: newBillDB
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
};
exports.default = billController;
