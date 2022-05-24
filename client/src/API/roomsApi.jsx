import axios from "axios";
import { port } from "../data";
export const roomsApi = {
    createRoom: (req) => {
        return axios.post(`http://localhost:${port}/room`, req)
    },
    getAllRooms: () => {
        return axios.get(`http://localhost:${port}/room`)
    },
    getRoomDetail: (id) => {
        return axios.get(`http://localhost:${port}/room/${id}`)
    },
    updateRoom: (id, req) => {
        return axios.put(`http://localhost:${port}/room/${id}`, req)
    },
    addUser: (id, req) => {
        return axios.put(`http://localhost:${port}/room/addUser/${id}`, req)
    },
    delUser: (id, req) => {
        return axios.delete(`http://localhost:${port}/room/delUser/${id}`, req)
    },
    deleteRoom: (id) => {
        return axios.delete(`http://localhost:${port}/room/${id}`)
    }
}