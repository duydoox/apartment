import axios from "axios";
import { port } from "../data";
export const billApi = {
    getBillDetail: (roomID, req) => {
        return axios.get(`http://localhost:${port}/bill/${roomID}`, {headers: req})
    },
    createBill: (roomID, req) => {
        return axios.post(`http://localhost:${port}/bill/${roomID}`, req)
    },
}