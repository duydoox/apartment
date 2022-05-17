import { createContext, useState} from "react";
import { roomsApi } from "../API/roomsApi";
export const roomsContext = createContext()

const RoomsProvider = ({children}) => {
    const [rooms, setRooms] = useState([])

    const loadrooms = async () => {
        try {
            const response = await roomsApi.getAllRooms()
            console.log('load room')
            if (response.data.success) {
                setRooms(response.data.data)
            }
            else console.log('lỗi lấy phòng')
        } catch (err) {
            console.log(err)
        }
    }

    const data={
        rooms,
        setRooms,
        loadrooms
    }
    return <roomsContext.Provider value={data}>
        {children}
    </roomsContext.Provider>
}

export default RoomsProvider