import React from 'react'
import './filter.css'

const Filter = ({ data }) => {
  const { date, page, getPage, setPosts } = data

  const send = async (e) => {
    const value = e.target.value
    const rgDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    if (rgDate.test(value.split("-").reverse().join("-"))) {
      const nowDate = new Date().toISOString()
      const newDate = new Date(value).toISOString()
      if (nowDate.slice(0, 10) <= newDate.slice(0,10)) {
        date.current = nowDate
      }
      else {
        date.current = newDate
      }
      page.current = 0
      try {
        const res = await getPage()
        if (res) {
          console.log(res.data.data)
          setPosts(res.data.data);
        }
      }catch(err){
        console.log("err", err)
      }
    }
    else {
      e.target.value = ""
    }
  }

  const changeTime = (e) => {
    if (e.key === 'Enter') {
      send(e)
    }
  }

  return (
    <div className='filter'>
      {/* <button onClick={send}>Tìm kiếm</button> */}
      <input onKeyDown={changeTime} placeholder="Nhập ngày: yyyy-mm-dd" />
    </div>
  )
}

export default Filter