import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { roomsApi } from '../../API/roomsApi'
import { roomsContext } from '../../contexts/RoomsContext'

const RoomDetail = () => {
    const { roomID } = useParams()
    console.log(roomID)
    const navigate = useNavigate()
    const { loadrooms } = useContext(roomsContext)
    const [detail, setDetail] = useState({
        createAt: Date.now(),
        haveWifi: false,
        isEmpty: true,
        rentPrice: '',
        roomName: '',
        updateAt: Date.now(),
        users: []
    })
    const getRoomDetail = async () => {
        try {
            const response = await roomsApi.getRoomDetail(roomID)
            console.log(response)
            if (response.data.success) {
                setDetail({ ...detail, ...response.data.data })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const changeValue = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDetail({ ...detail, [name]: value })
    }

    const deleteRoom = async () => {
        try {
            const response = await roomsApi.deleteRoom(roomID)
            if (response.data.success) {
                loadrooms()
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getRoomDetail()
    }, [roomID])

    return (
        <div className='detail-room'>
            <p>Create At: {new Date(detail.createAt).toISOString().slice(0,10)}</p>
            <p>Update At: {new Date(detail.updateAt).toISOString().slice(0,10)}</p>
            <label>Name: </label>
            <input value={detail.roomName} name='roomName'
                onChange={changeValue} /><br />
            <label>Price: </label>
            <input value={detail.rentPrice} name='rentPrice'
                onChange={changeValue} /><br />

            <input type='checkbox' checked={detail.haveWifi} id='wifidetail'
                onChange={() => setDetail({ ...detail, haveWifi: !detail.haveWifi })} />
            <label htmlFor='wifidetail'>Wifi</label>

            {/* <input type='checkbox' checked={detail.isEmpty} />
            <label>Empty</label> */}

            <p>List Users: </p>
            <ul>
                {
                    detail.users.map((user) => {
                        return <li key={user.userID}>{user.fullName || user.userID}</li>
                    })
                }
            </ul>
            <button onClick={deleteRoom}>xóa phòng</button>
        </div>
    )
}

export default RoomDetail