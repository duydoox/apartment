import React, { useContext, useState } from 'react'
import authApi from '../../../API/authApi'
import { authContext } from '../../../contexts/AuthContext'

const Security = () => {
  const {dispatch} = useContext(authContext)
  const [formValue, setformValue] = useState({
    password: "",
    newPassword: ""
  })
  const [message, setMessage] = useState("")

  const changeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setformValue({ ...formValue, [name]: value.replace(/\s+/g, '') })
  }

  const submit = async () => {
    try {
      const res = await authApi.changePW(formValue)
      if (res.data.success) {
        localStorage.removeItem('authToken')
        authApi.removeHeader()
        setMessage("Đổi mật khẩu thành công")
        dispatch({
          type: 'LOGIN_FORM',
          payload: {
              authState: {
                  isAuthenticated: false,
                  user: {},
                  load: false
              }
          }
      })
      }
      else{
        setMessage(res.data.message)
      }
    } catch (err) {
      console.log(err)
      setMessage("Đổi không thành công")
    }
  }
  return (
    <div className='security chung'>
      <h4>Security</h4>
      <label>Password:</label>
      <input type='password' placeholder='Enter password'
        name='password' value={formValue.password || ""}
        onChange={changeInput} />
      <label>New password:</label>
      <input type='password' placeholder='Enter new password'
        name='newPassword' value={formValue.newPassword || ""}
        onChange={changeInput} />
      <span className='message-date'>{message}</span>
      <div className='flex btn-info'>
        <button onClick={submit}>Change password</button>
      </div>
    </div>
  )
}

export default Security