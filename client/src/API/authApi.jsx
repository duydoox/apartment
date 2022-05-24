import axios from "axios";
import { port } from "../data";
const authApi = {
    loginApi: (req) => {
        console.log(process.env.SERVER_PORT)
        return axios.post(`http://localhost:${port}/login`, req)
    },
    registerApi: (req) => {
        return axios.post(`http://localhost:${port}/register`, req)
    },
    getData: () => {
        return axios.get(`http://localhost:${port}/user`)
    },
    getDetailUser: () => {
        return axios.get(`http://localhost:${port}/detailUser`)
    },
    UpdateUser: (req) => {
        return axios.put(`http://localhost:${port}/updateUser`, req)
    },
    changePW: (req) => {
        return axios.put(`http://localhost:${port}/changePW`, req)
    },
    findUser: (req) => {
        return axios.get(`http://localhost:${port}/findUser`, {headers:req})

    },

    setHeader: (token) =>{
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`
    },
    removeHeader: () =>{
        delete axios.defaults.headers.common['authorization']
    }
}

export default authApi;