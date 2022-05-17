import React, { useState } from 'react'
import authApi from '../../API/authApi'

const Register = ({ setForm }) => {
    const [user, setUser] = useState({
        phoneNumber: '',
        password: '',
        isAdmin: false,
        roomID: '1'
    })
    // console.log(user)
    const [message, setMessage] = useState({
        text: '',
        style: {}
    })

    const change = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === "phoneNumber") {
            setUser({ ...user, [name]: value.replace(/\s+|\D/g, '') })
        }
        else {
            setUser({ ...user, [name]: value.replace(/\s+/g, '') })
        }
        setMessage({ ...message, text: '' })
    }

    const postAPI = async () => {
        const { registerApi } = authApi
        const roomID = Number(user.roomID)
        try {
            const rgPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g
            if (!rgPhone.test(user.phoneNumber)) {
                setMessage({
                    text: 'số điện thoại không chính xác',
                    style: {
                        color: 'red'
                    }
                })
            }
            else {
                const response = await registerApi({ ...user, roomID })
                console.log(response)
                if (response.data.success) {
                    setMessage({
                        text: 'tạo tài khoản thành công',
                        style: {
                            color: 'aqua'
                        }
                    })
                    setUser({})
                }
                else {
                    setMessage({
                        text: response.data.message || 'sai thông tin',
                        style: {
                            color: 'red'
                        }
                    })
                }
            }
        } catch (err) {
            console.log('err', err.code)
            setMessage({
                text: 'tạo tài khoản không thành công',
                style: {
                    color: 'red'
                }
            })
        }
    }

    const submit = (e) => {
        e.preventDefault()
        if (user.roomID === '') setMessage({
            text: 'vui lòng chọn phòng',
            style: {
                color: 'red'
            }
        })
        else
            postAPI()
    }

    return (
        <form className="form" onSubmit={submit} method='POST'>
            <h2>Register</h2>
            <h4>Create new account</h4>
            <input type="text"
                name="phoneNumber" value={user.phoneNumber || ''}
                onChange={change}
                placeholder='phone number' />

            <input type="password"
                name="password" value={user.password || ''}
                onChange={change}
                placeholder='password' />
            <br />

            <span className='message' style={message.style}>{message.text}</span>

            <input id='submit' type='submit' value='Register' />
            <div className='about'>
                <h4 onClick={() => setForm('login')}>Log in</h4>
                <></>
            </div>
        </form>
    )
}

export default Register