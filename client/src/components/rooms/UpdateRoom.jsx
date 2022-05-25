import React, { useEffect, useState } from 'react'
import { roomsApi } from '../../API/roomsApi'

const UpdateRoom = ({ detail, getRoomDetail }) => {
    const [updateRoom, setUpdateRoom] = useState({})
    useEffect(()=>{
        setUpdateRoom({...detail})
    },[detail])

    const isWifi = [
        {
            id: 1,
            name: 'Yes'
        },
        {
            id: 2,
            name: 'No'
        }
    ]

    const update= async () => {
        if (updateRoom.roomName !== '') {
            let haveWifi = false
            if (updateRoom.haveWifi == 1) haveWifi = true
            const req = { ...updateRoom, haveWifi, rentPrice: +updateRoom.rentPrice, acreage: +updateRoom.acreage, deposit: updateRoom.deposit }
            try {
                const response = await roomsApi.updateRoom(detail.roomID, req)
                if (response.data.success) {
                    getRoomDetail()
                }
                else {
                    console.log(response.data.message)
                }
            } catch (err) {
                console.log(err)
            }
        }
        else {
            console.log("tên phòng trống")
        }
    }

    const change = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUpdateRoom({ ...updateRoom, [name]: value })
    }

    return (
        <div className='updateRoom-room'>
            <h4>Thay đổi</h4>
            <div className='input-room_update'>
                <label>Tên phòng:</label><br />
                <input value={updateRoom.roomName} name='roomName' type='text' placeholder='name'
                    onChange={change} /><br />

                <label>Giá phòng:</label><br />
                <input value={updateRoom.rentPrice} name='rentPrice' type='text' placeholder='price'
                    onChange={change} /><br />

                <label>Tiền cọc:</label><br />
                <input value={updateRoom.deposit} name='deposit' type='text' placeholder='deposit'
                    onChange={change} /><br />

                <label>Diện tích:</label><br />
                <input value={updateRoom.acreage} name='acreage' type='text' placeholder='acreage'
                    onChange={change} /><br />

                <label>Ghi chú:</label><br />
                <input value={updateRoom.desciption} name='desciption' type='text' placeholder='description'
                    onChange={change} /><br />
            </div>

            <div className='wifi'>
                <label>Wifi:</label>
                {isWifi.map((wifi) => {
                    return (
                        <div key={wifi.id}>
                            <input id={wifi.name}
                                checked={wifi.id == updateRoom.haveWifi}
                                type='radio'
                                onChange={() => setUpdateRoom({ ...updateRoom, haveWifi: wifi.id })} /><label htmlFor={wifi.name}> {wifi.name}</label>
                        </div>
                    )
                })}
            </div>

            <button onClick={update} className='btn'>Sửa</button>
        </div>
    )
}

export default UpdateRoom