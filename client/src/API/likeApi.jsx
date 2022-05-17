import axios from "axios";
import { port } from "../data";
export const likeApi = {
    toggleLike: (req) => {
        return axios.post(`http://localhost:${port}/like`, req)
    },
    get: (id) => {
        return axios.get(`http://localhost:${port}/like/${id}`)
    },
    deletePost: (id) => {
        return axios.delete(`http://localhost:${port}/posts/${id}`)
    }
}