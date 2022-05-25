import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { roomsApi } from '../../API/roomsApi'
import { roomsContext } from '../../contexts/RoomsContext'
import { authContext } from '../../contexts/AuthContext'
import ListUser from './ListUser'
import Bill from './Bill'
import UpdateRoom from './UpdateRoom'
import './rooms.css'

const RoomDetail = () => {
    const { roomID } = useParams()
    const [btn, setBtn] = useState("")
    const navigate = useNavigate()
    const { loadrooms } = useContext(roomsContext)
    const { authState } = useContext(authContext)
    const { user: userCurrent } = authState
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
            if (response.data.success) {
                setDetail({ ...detail, ...response.data.data })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteRoom = async () => {
        try {
            const response = await roomsApi.deleteRoom(roomID)
            if (response.data.success) {
                loadrooms()
                navigate('/rooms/create-room')
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
            <div className='info-room'>
                <h3>Phòng {detail.roomName}</h3>
                <div className='date-room flex-around'>
                    <p>Ngày tạo: {new Date(detail.createAt).toISOString().slice(0, 10)}</p>
                    <p>Ngày thay đổi: {new Date(detail.updateAt).toISOString().slice(0, 10)}</p>
                </div>
                <div className='price flex-around'>
                    <p>Giá phòng: {detail.rentPrice} VND</p>
                    <p>Tiền cọc: {detail.deposit} VND</p>
                </div>
                <div className='flex-around'>
                    <p>Diện tích: {detail.acreage} m<h6>2</h6></p>
                    <p>Wifi: {detail.haveWifi ? "Có" : "Không"}</p>
                </div>
                <div className='description-room'>
                    <p>Ghi chú: {detail.desciption}</p>
                </div>
            </div>
            <div className='flex-between mb5'>
                <div className='flex'>
                    {userCurrent.isAdmin && <button className='btn' onClick={() => { setBtn("update") }}>Thay đổi</button>}
                    {(userCurrent.isAdmin || ( userCurrent.room && userCurrent.room.roomID === +roomID)) &&
                        <>
                            <button className='btn' onClick={() => { setBtn("list-user") }}>Khách thuê</button>
                            <button className='btn' onClick={() => { setBtn("bill") }}>Hóa đơn</button>
                        </>}
                </div>
                {userCurrent.isAdmin && <button className='btn' onClick={deleteRoom}>Xóa phòng</button>}
            </div>
            {btn === "list-user" && <ListUser users={detail.users} deleteRoom={deleteRoom} roomID={roomID} getRoomDetail={getRoomDetail} />}
            {btn === "update" && <UpdateRoom detail={detail} getRoomDetail={getRoomDetail}/>}
            {btn === "bill" && (userCurrent.isAdmin || ( userCurrent.room && userCurrent.room.roomID === +roomID)) && 
            <Bill detail={detail} roomID={roomID}/>}
        </div>
    )
}

export default RoomDetail