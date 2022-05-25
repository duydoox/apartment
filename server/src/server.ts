import dotenv from 'dotenv';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import connectDB from './db/connectDB';
import route from './routes';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import {Server} from 'socket.io'
import http from 'http'

dotenv.config();
connectDB();
const app: Application = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

// socket
interface SocketUser {
    userID: number
    socketId: string
}
let onlineUsers : SocketUser[] = []
const addUser = (userID : number, socketId: string)=>{
    !onlineUsers.some((user)=>user.userID === userID) && onlineUsers.push({userID, socketId})
}

const removeUser = (socketId:string) =>{
    onlineUsers = onlineUsers.filter(user=>user.socketId !== socketId)
}

const getUser = (userID:number) => {
    return onlineUsers.find((user)=>user.userID === userID)
}

io.on("connection", (socket)=>{
    socket.on("newUser", (userID)=>{
        addUser(userID, socket.id)
        console.log(onlineUsers)
    })

    socket.on("notification", (data)=>{
        console.log(data)
        io.to(getUser(data.userID)?.socketId || "nn").emit("getNotification", data)
    })

    socket.on("disconnect", ()=>{
        removeUser(socket.id)
    })
})

route(app);

const PORT = parseInt(process.env.SERVER_PORT as string) || 6969;

server.listen(PORT, () => console.log(`server is runing in port ${PORT}`));
