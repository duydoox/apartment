import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import authApi from '../../../API/authApi'

const Information = ({ data }) => {
  const { user, setUser } = data
  console.log(user)
  const [setting, setSettting] = useState(false)
  const [selectSex, setSelectSex] = useState(false)
  const [chaneInfo, setChaneInfo] = useState({})
  const [message, setMessage] = useState("")
  const nameRef = useRef()
  const phoneRef = useRef()
  const dateRef = useRef()

  const styleSexList = selectSex ? { visibility: 'visible' } : { visibility: 'hidden' }

  const clickSetting = () => {
    setSettting(!setting)
  }

  useEffect(() => {
    setChaneInfo({
      fullName: user.fullName || "",
      sex: user.sex || "",
      dateOfBirth: user.dateOfBirth || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      cardNumber: user.cardNumber || ""
    })
  }, [user])

  const changeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    if(name==="phoneNumber" || name === "dateOfBirth")
      setChaneInfo({ ...chaneInfo, [name]: value.replace(/\s+|[a-zA-Z]/g, '') })
    else{
      setChaneInfo({ ...chaneInfo, [name]: value })
    }
  }

  const changeSex = (name) => {
    setChaneInfo({ ...chaneInfo, sex: name })
    setSelectSex(false)
  }
  const save = async () => {
    try {
      const birth = chaneInfo.dateOfBirth.split("-").reverse().join("-")
      const rgDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      const rgPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g
      if(chaneInfo.fullName.length < 3 || chaneInfo.fullName.length>20){
        setMessage("Tên phải từ 3-20 ký tự")
        nameRef.current.focus({ preventScroll: true })
      }
      else if (chaneInfo.dateOfBirth.trim() !== "" && !rgDate.test(birth)) {
        setMessage("Sai định dạng ngày yyyy-mm-dd")
        dateRef.current.focus({ preventScroll: true })
      }
      else if(!rgPhone.test(chaneInfo.phoneNumber)){
        setMessage("Sai số điện thoại")
        phoneRef.current.focus({ preventScroll: true })
      }
      else {
        const req = { ...chaneInfo, dateOfBirth: new Date(chaneInfo.dateOfBirth) }
        const res = await authApi.UpdateUser(req)
        if (res.data.success) {
          console.log(res.data.data)
          const newUser = res.data.data
          const date = new Date(newUser.dateOfBirth)
          setUser({ ...newUser, dateOfBirth: date.toISOString().slice(0, 10) })
          setSettting(false)
          setMessage("")
        }
        else {
          setMessage(res.data.message || "sửa không thành công")
        }
      }
    } catch (err) {
      console.log("err", err)
      phoneRef.current.focus({ preventScroll: true })
      setMessage("Số điện thoại đã tồn tại")
    }
  }

  return (
    <div className='information chung'>
      {setting
        ? <div className='setting-info'>
          <h3>Profile Settings</h3>
          <div className='flex'>
            <div className='name-input'>
              <label>Full name:</label>
              <input type='text' placeholder='Enter full name'
                name='fullName' value={chaneInfo.fullName || ""}
                onChange={(e) => changeInput(e)} ref={nameRef}/>
            </div>
            <div className='sex-input'>
              <label>Sex:</label>
              <div className='drop'>
                <div className='sl'
                  onClick={() => { setSelectSex(!selectSex) }}>
                  {chaneInfo.sex === "" || chaneInfo.sex === null ? "Giới tính" : chaneInfo.sex} <FaAngleDown />
                </div>
                <div className='sl-list' style={styleSexList}>
                  <div className='sl-item' onClick={() => changeSex('Nam')}>Nam</div>
                  <div className='sl-item' onClick={() => changeSex('Nữ')}>Nữ</div>
                </div>
              </div>
            </div>
          </div>
          <label>Birth day:</label>
          <input type='text' placeholder='yyyy-mm-dd'
            name='dateOfBirth' value={chaneInfo.dateOfBirth || ""}
            onChange={(e) => changeInput(e)} ref={dateRef}/>
          <label>Phone number:</label>
          <input type='text' placeholder='Enter phone number'
            name='phoneNumber' value={chaneInfo.phoneNumber || ""}
            onChange={(e) => changeInput(e)} ref = {phoneRef}/>
          <label>Address:</label>
          <input type='text' placeholder='Enter address'
            name='address' value={chaneInfo.address || ""}
            onChange={(e) => changeInput(e)} />
          <label>Card number:</label>
          <input type='text' placeholder='Enter card number'
            name='cardNumber' value={chaneInfo.cardNumber || ""}
            onChange={(e) => changeInput(e)} />
          <span className='message-date'>{message}</span>
          <div className='flex btn-info'>
            <button onClick={clickSetting}>Cancel</button>
            <button onClick={save}>Save profile</button>
          </div>
        </div>
        : <div className='content-info'>
          <h3>Infomation</h3>
          <div className='flex'>
            <label>Full name</label>
            <div>: {user.fullName}</div>
          </div>
          <div className='flex'>
            <label>Sex</label>
            <div>: {user.sex}</div>
          </div>
          <div className='flex'>
            <label>Birth day</label>
            <div>: {user.dateOfBirth}</div>
          </div>
          <div className='flex'>
            <label>Phone Number</label>
            <div>: {user.phoneNumber}</div>
          </div>
          <div className='flex'>
            <label>Address</label>
            <div>: {user.address}</div>
          </div>
          <div className='flex'>
            <label>Card number</label>
            <div>: {user.cardNumber}</div>
          </div>
          <div className='flex btn-info'>
            <button onClick={clickSetting}>Setting</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Information