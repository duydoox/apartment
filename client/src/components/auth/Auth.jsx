import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const Auth = () => {
    const [form, setForm] = useState('login')
  return (
    <div className='background-login'>
      <div>
        <h1>Welcome to our house</h1>
        {form === 'login' ? <Login setForm={setForm}/> : form === 'register' ? <Register setForm={setForm}/> : <></>}
        </div>
    </div>
  )
}

export default Auth