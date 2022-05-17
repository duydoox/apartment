import axios from "axios";
import { port } from "../data";
export const notiApi = {
    post: (req) => {
        return axios.post(`http://localhost:${port}/noti`, req)
    },
    get: () => {
        return axios.get(`http://localhost:${port}/noti`)
    },
    update: (param) => {
        return axios.put(`http://localhost:${port}/noti/${param}`)
    }
}