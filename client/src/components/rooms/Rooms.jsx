import React, { useEffect, useContext } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
import { roomsContext } from '../../contexts/RoomsContext'
import CreateRoom from './CreateRoom'
import RoomDetail from './RoomDetail'
import './rooms.css'

const Rooms = () => {
    const { rooms, loadrooms } = useContext(roomsContext)
    const navigate = useNavigate()
    console.log('render rooms')

    useEffect(() => {
        loadrooms()
    }, [])

    const getDetail = (id) => {
        navigate(`${id}`)
    }

    return (
        <div className='rooms'>
            <div className='list-room'>
                <button onClick={() => navigate('create-room')}>Tạo phòng</button>
                <p>Danh sách phòng</p>
                <ul>
                    {rooms.map((room, index) => {
                        return (
                            <li key={index} onClick={() => getDetail(room.roomID)}>Phòng {room.roomName}</li>
                        )
                    })}
                </ul>
            </div>
            <div className='main-room'>
                <Routes>
                    <Route path='create-room' element={<CreateRoom />} />
                    <Route path=':roomID' element={<RoomDetail />} />
                </Routes>
            </div>
        </div>
    )
}

export default Rooms