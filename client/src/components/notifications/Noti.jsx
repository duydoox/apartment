import React, { useContext } from 'react'
import { socketContext } from '../../contexts/SocketContext'
import { useNavigate } from 'react-router-dom'
import { notiApi } from '../../API/notiApi'
import './noti.css'

const Noti = () => {
  const { notis, getNoti } = useContext(socketContext)
  const navigate = useNavigate()

  const clickNoti = async (postID, notiID, seen) => {
    if (seen === false) {
      try {
        const res = await notiApi.update(notiID)
        if (res.data.success) {
          getNoti()
        }
      } catch (err) {
        console.log('err', err)
      }
    }
    navigate(`/post/${postID}`)
  }

  return (
    <ul className='notis'>
      {notis.length === 0 && <li>không có thông báo</li>}
      {notis.map((noti) => {
        const time = new Date(noti.createAt)
        const formatTime = time.toISOString().slice(0, 10) + ' - ' + time.getHours() + ':' + time.getMinutes()
        return (
          <li key={noti.notiID} className={noti.seen === false ? "not_seen" : "seen"}
            onClick={() => clickNoti(noti.post.postID, noti.notiID, noti.seen)}>
            {noti.type}
            <p>{formatTime}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default Noti