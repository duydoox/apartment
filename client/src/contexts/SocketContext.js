import { createContext, useContext, useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { port } from "../data";
import { authContext } from "./AuthContext";
import { notiApi } from "../API/notiApi";

export const socketContext = createContext()

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const { authState } = useContext(authContext)
    const [notis, setNotis] = useState([])
    const { user } = authState
    console.log(notis)

    useEffect(() => {
        setSocket(io(`http://localhost:${port}`))
    }, [])

    useEffect(() => {
        if (user)
            socket?.emit("newUser", user.userID);
    }, [socket, user])

    useEffect(() => {
        getNoti()
    }, [])

    useEffect(() => {
        socket?.on("getNotification", (data) => {
            postNoti(data)
        })
    }, [socket])

    const getNoti = async () => {
        const res = await notiApi.get()
        if (res.data.success) {
            setNotis(res.data.data)
        }
    }
    const postNoti = async (req) => {
        const res = await notiApi.post(req)
        if (res.data.success) {
            setNotis((prev) => {
                return [res.data.data, ...prev]
            })
        }
    }

    const newNoti = () => {
        const fil = notis.filter((noti) => { return noti.seen === false })
        return fil
    }

    const data = {
        socket,
        notis,
        getNoti,
        setNotis,
        newNoti
    }
    return <socketContext.Provider value={data}>
        {children}
    </socketContext.Provider>
}

export default SocketProvider