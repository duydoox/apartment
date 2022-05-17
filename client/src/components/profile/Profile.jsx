import React, { useEffect, useState } from 'react'
import authApi from '../../API/authApi'
import './profile.css'
import Avatar from './chilProFile/Avatar'
import Information from './chilProFile/Information'
import Security from './chilProFile/Security'

const Profile = () => {
  const [user, setUser] = useState({})
  const getDetail = async () => {
    try{
      const res = await authApi.getDetailUser()
      if(res.data.success){
        console.log( res.data.data)
        setUser(res.data.data)
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getDetail()
  },[])

  const data = {
    user,
    setUser
  }
  return (
    <div className='profile'>
      <Avatar data={data}/>
      <Information data={data}/>
      <Security data={data}/>
    </div>
  )
}

export default Profile