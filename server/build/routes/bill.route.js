"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authVerifyToken_1 = __importDefault(require("../middleware/authVerifyToken"));
const bill_controller_1 = __importDefault(require("../controllers/bill.controller"));
const roomRole_1 = __importDefault(require("../middleware/roomRole"));
const authRole_1 = __importDefault(require("../middleware/authRole"));
const billRoute = express_1.default.Router();
billRoute.use(authVerifyToken_1.default);
billRoute.get('/:roomID', roomRole_1.default, bill_controller_1.default.getBillDetail);
billRoute.use((0, authRole_1.default)('admin'));
billRoute.post('/:roomID', bill_controller_1.default.createBill);
exports.default = billRoute;
