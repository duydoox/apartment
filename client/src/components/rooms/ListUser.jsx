import React, { useState, useContext } from 'react'
import authApi from '../../API/authApi'
import { imageApi } from '../../API/imageApi'
import { roomsApi } from '../../API/roomsApi'
import { authContext } from '../../contexts/AuthContext'

const ListUser = ({ users, roomID, getRoomDetail }) => {
    const { authState } = useContext(authContext)
    const { user: userCurrent } = authState
    const [findUser, setFindUser] = useState([])
    const find = async (e) => {
        if (e.key === "Enter") {
            try {
                const res = await authApi.findUser({ key: e.target.value })
                if (res.data.success) {
                    setFindUser(res.data.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    const addUser = async (userID) => {
        try {
            const res = await roomsApi.addUser(userID, { roomID })
            if (res.data.success) {
                getRoomDetail()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteUser = async (userID) => {
        try {
            const res = await roomsApi.delUser(userID, { headers: { roomID: roomID } })
            if (res.data.success) {
                getRoomDetail()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container-lu'>
            {(userCurrent.isAdmin || ( userCurrent.room && userCurrent.room.roomID === +roomID)) &&
                <div>
                    <h4>Danh sách khách thuê:</h4>
                    <ul className='list-room_user list-u'>
                        {
                            users.map((user) => {
                                return <li key={user.userID}>
                                    <div className='card-user'>
                                        <div className="avatar">
                                            {user.avatar === "" ? <></> : <img src={imageApi.getAvata(user.avatar)} alt="" />}
                                        </div>
                                        {user.fullName}
                                    </div>
                                    {userCurrent.isAdmin && <button className='btn' onClick={() => { deleteUser(user.userID) }}>Xóa</button>}
                                </li>
                            })
                        }
                    </ul>
                </div>
            }
            {userCurrent.isAdmin &&
                <div className='add-user'>
                    <h4>Thêm khách:</h4>
                    <input type='text' onKeyDown={find} className="find-user" placeholder='Tìm kiếm' />
                    {findUser.length !== 0 &&
                        <ul className='list-room_user find-list'>
                            {findUser.map((user) => {
                                return <li key={user.userID}>
                                    <div className='card-user'>
                                        <div className="avatar">
                                            {user.avatar === "" ? <></> : <img src={imageApi.getAvata(user.avatar)} alt="" />}
                                        </div>
                                        {user.fullName}
                                    </div>
                                    <button className='btn' onClick={() => { addUser(user.userID) }}>Thêm</button>
                                </li>
                            })}
                        </ul>
                    }</div>
            }
        </div>
    )
}

export default ListUser