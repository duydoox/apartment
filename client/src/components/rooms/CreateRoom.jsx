import React, { useContext, useState } from 'react'
import { roomsApi } from '../../API/roomsApi'
import { roomsContext } from '../../contexts/RoomsContext'
const CreateRoom = () => {
  const { loadrooms } = useContext(roomsContext)

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

  const [create, setCreate] = useState({
    roomName: '',
    rentPrice: 0,
    isEmpty: true,
    haveWifi: 2,
    acreage: 0,
    deposit: 0,
    desciption: ''
  })

  const createRoom = async () => {
    if (create.roomName !== '') {
      let haveWifi = false
      if (create.haveWifi == 1) haveWifi = true
      const req = { ...create, haveWifi, rentPrice: +create.rentPrice, acreage: +create.acreage, deposit: create.deposit }
      try {
        const response = await roomsApi.createRoom(req)
        if (response.data.success) {
          loadrooms()
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
    setCreate({ ...create, [name]: value })
  }

  return (
    <div className='create-room'>
      <h4>Thêm phòng mới</h4>
      <div className='input-room_update'>
        <label>Tên phòng:</label><br/>
        <input value={create.roomName} name='roomName' type='text' placeholder='name'
          onChange={change} /><br/>

        <label>Giá phòng:</label><br/>
        <input value={create.rentPrice} name='rentPrice' type='text' placeholder='price'
          onChange={change} /><br/>

        <label>Tiền cọc:</label><br/>
        <input value={create.deposit} name='deposit' type='text' placeholder='deposit'
          onChange={change} /><br/>

        <label>Diện tích:</label><br/>
        <input value={create.acreage} name='acreage' type='text' placeholder='acreage'
          onChange={change} /><br/>

        <label>Ghi chú:</label><br/>
        <input value={create.desciption} name='desciption' type='text' placeholder='description'
          onChange={change} /><br/>
      </div>

      <div className='wifi'>
        <label>Wifi:</label>
        {isWifi.map((wifi) => {
          return (
            <div key={wifi.id}>
              <input id={wifi.name}
                checked={wifi.id == create.haveWifi}
                type='radio'
                onChange={() => setCreate({ ...create, haveWifi: wifi.id })} /><label htmlFor={wifi.name}> {wifi.name}</label>
            </div>
          )
        })}
      </div>

      <button onClick={createRoom} className='btn'>Tạo</button>
    </div>
  )
}

export default CreateRoom