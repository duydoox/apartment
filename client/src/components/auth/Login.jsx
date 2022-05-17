import React, { useState, useContext, useEffect } from 'react'
import '../auth/login.scss'
import { authContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import authApi from '../../API/authApi';

const Login = ({ setForm }) => {
  const [message, setMessage] = useState('')
  const [user, setUser] = useState({
    phoneNumber: '',
    password: ''
  })
  const { authState, dispatch } = useContext(authContext)
  const { isAuthenticated } = authState
  const navigate = useNavigate()

  const change = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === "phoneNumber"){
      setUser({ ...user, [name]: value.replace(/\s+|\D/g, '') })
    }
    else{
      setUser({ ...user, [name]: value.replace(/\s+/g, '') })
    }
    setMessage('')
  }
  const submit = async (e) => {
    const { loginApi } = authApi
    e.preventDefault()
    try {
      const rgPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g
      if (!rgPhone.test(user.phoneNumber)) {
        setMessage('số điện thoại không chính xác')
      }
      const response = await loginApi(user)
      if (response.data.success) {
        const { token, data } = response.data;
        localStorage.setItem("authToken", token)
        authApi.setHeader(token)
        console.log(data)
        dispatch({
          type: 'LOGIN_FORM',
          payload: {
            authState: {
              isAuthenticated: true,
              user: data,
              load: false
            }
          }
        })
      }
      else {
        setMessage(response.data.message)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  })

  return (
    <form className='form' onSubmit={submit} method='POST'>
      <h2>Log in</h2>
      <h4>To your account</h4>
      <input type="text"
        name="phoneNumber" value={user.phoneNumber || ''}
        onChange={change}
        placeholder='phone number' />

      <input type="password"
        name="password" value={user.password || ''}
        onChange={change}
        placeholder='password' />
      <span className='message'>{message}</span>
      <input id='submit' type='submit' value='Log in' />
      <div className='about'>
        <h4>Forgot password?</h4>
        <h4 onClick={() => setForm('register')}>Register</h4>
      </div>
    </form>
  )
}

export default Login