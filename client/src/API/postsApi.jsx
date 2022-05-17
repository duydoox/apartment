import axios from "axios";
import { port } from "../data";
export const postsApi = {
    createPost: (req) => {
        return axios.post(`http://localhost:${port}/posts`, req)
    },
    getPagePosts: (req) => {
        return axios.get(`http://localhost:${port}/posts`, {
            headers: req
        })
    },
    getPostByID: (param) => {
        return axios.get(`http://localhost:${port}/posts/${param}`)
    },
    deletePost: (id) => {
        return axios.delete(`http://localhost:${port}/posts/${id}`)
    }
}