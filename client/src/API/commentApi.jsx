import axios from "axios";
import { port } from "../data";
export const commentApi = {
    add: (req) => {
        return axios.post(`http://localhost:${port}/comments`, req)
    },
    get: (id) => {
        return axios.get(`http://localhost:${port}/comments/${id}`)
    },
}