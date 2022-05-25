"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
(0, connectDB_1.default)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.use('/images', express_1.default.static(path_1.default.join(process.cwd(), 'public/images')));
let onlineUsers = [];
const addUser = (userID, socketId) => {
    !onlineUsers.some((user) => user.userID === userID) && onlineUsers.push({ userID, socketId });
};
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};
const getUser = (userID) => {
    return onlineUsers.find((user) => user.userID === userID);
};
io.on("connection", (socket) => {
    socket.on("newUser", (userID) => {
        addUser(userID, socket.id);
        console.log(onlineUsers);
    });
    socket.on("notification", (data) => {
        var _a;
        console.log(data);
        io.to(((_a = getUser(data.userID)) === null || _a === void 0 ? void 0 : _a.socketId) || "nn").emit("getNotification", data);
    });
    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});
(0, routes_1.default)(app);
const PORT = parseInt(process.env.SERVER_PORT) || 6969;
server.listen(PORT, () => console.log(`server is runing in port ${PORT}`));
