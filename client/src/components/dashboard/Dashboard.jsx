import Nav from '../Nav.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import Rooms from '../rooms/Rooms'
import Posts from '../posts/Posts'
import Profile from '../profile/Profile.jsx'
import SocketProvider from '../../contexts/SocketContext.js'
import Noti from '../notifications/Noti.jsx'

const Dashboard = () => {
  return (
    <div>
      <SocketProvider>
        <Nav />
        <div className='body'>
          <Routes>
            <Route path='rooms/*' element={<Rooms />} />
            <Route path='/' element={<Posts />} />
            <Route path='/post/:postID' element={<Posts />} />
            <Route path='profile' element={<Profile />} />
            <Route path='notifications' element={<Noti />} />
          </Routes>
        </div>
      </SocketProvider>
    </div>
  )
}

export default Dashboard