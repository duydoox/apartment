import React from 'react'
import { imageApi } from '../../API/imageApi'

const ContentCmt = ({ cmt }) => {
    const date = new Date(cmt.createAt)
    const curDate = new Date()
    let createTime = date.getDate() + '-' + (date.getMonth() - 0 + 1) + '-' + date.getFullYear()
    if (curDate.getFullYear() == date.getFullYear() &&
        curDate.getMonth() == date.getMonth() &&
        curDate.getDate() == date.getDate()) {
        const time = (curDate.getHours() - date.getHours()) * 60 + curDate.getMinutes() - date.getMinutes()
        if (time < 60) createTime = time + ' phút'
        else createTime = Math.floor(time / 60) + ' giờ'
    }
    return (
        <li key={cmt.commentID} className="li-comment">
            <div className="avatar-cmt">
                {cmt.user.avatar === "" ? <></> : <img src={imageApi.getAvata(cmt.user.avatar)} alt=""/>}
            </div>
            <div>
                <div className='li-content'>
                    <div className='li-content-name'>{cmt.user.fullName}</div>
                    <div className='li-content-content'>{cmt.content}</div>
                </div>
                <div className='createTime'>{createTime}</div>
            </div>
        </li>
    )
}

export default ContentCmt