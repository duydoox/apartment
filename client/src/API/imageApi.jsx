import axios from "axios"
import { port } from "../data"
export const imageApi = {
    getAvata: (img)=>{
        return `http://localhost:${port}/images/user/${img}`
    },
    setAvatar: (formData)=>{
        return axios.post(`http://localhost:${port}/api/uploads/avatar`, formData)
    },
    setPost: (formData)=>{
        return axios.post(`http://localhost:${port}/api/uploads`, formData)
    },
    getPost: (img) =>{
        return `http://localhost:${port}/images/post/${img}`
    }
}