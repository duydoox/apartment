"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const room_route_1 = __importDefault(require("./room.route"));
const bill_route_1 = __importDefault(require("./bill.route"));
const post_route_1 = __importDefault(require("./post.route"));
const like_route_1 = __importDefault(require("./like.route"));
const uploads_route_1 = __importDefault(require("./uploads.route"));
const comments_route_1 = __importDefault(require("./comments.route"));
const noti_route_1 = __importDefault(require("./noti.route"));
const route = (app) => {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use('/bill', bill_route_1.default);
    app.use('/room', room_route_1.default);
    app.use('/posts', post_route_1.default);
    app.use('/like', like_route_1.default);
    app.use('/comments', comments_route_1.default);
    app.use('/noti', noti_route_1.default);
    app.use('/api/uploads', uploads_route_1.default);
    app.use('/', user_route_1.default);
};
exports.default = route;
