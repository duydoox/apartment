import React, { useContext, useState } from 'react'
import { roomsApi } from '../../API/roomsApi'
import { roomsContext } from '../../contexts/RoomsContext'
const CreateRoom = () => {
  const {loadrooms} = useContext(roomsContext)

  const isWifi = [
    {
      id: 1,
      name: 'wifi'
    },
    {
      id: 2,
      name: 'no-wifi'
    }
  ]

  const [create, setCreate] = useState({
    roomName: '',
    rentPrice: 0,
    isEmpty: true,
    haveWifi: 2
  })

  const createRoom = async () => {
    let haveWifi = false
    if (create.haveWifi == 1) haveWifi = true
    const req = { ...create, haveWifi, rentPrice: +create.rentPrice }
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

  const change = (e) => {
    const name = e.target.name
    const value = e.target.value
    setCreate({ ...create, [name]: value })
  }

  return (
    <div className='create-room'>
      <p>Tạo phòng</p>
      <label>tên</label>
      <input value={create.roomName} name='roomName' type='text'
        onChange={change} />

      <label>giá</label>
      <input value={create.rentPrice} name='rentPrice' type='text'
        onChange={change} />

      <div>
        {isWifi.map((wifi) => {
          return (
            <div key={wifi.id}>
              <input id={wifi.name}
                checked={wifi.id == create.haveWifi}
                type='radio'
                onChange={() => setCreate({ ...create, haveWifi: wifi.id })} /><label htmlFor={wifi.name}>{wifi.name}</label>
            </div>
          )
        })}
      </div>

      <button onClick={createRoom}>tạo</button>
    </div>
  )
}

export default CreateRoom