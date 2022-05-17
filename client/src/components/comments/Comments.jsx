import React, { useContext, useEffect, useRef, useState } from 'react'
import { commentApi } from '../../API/commentApi'
import { FaPencilAlt } from 'react-icons/fa'
import './comments.css'
import ContentCmt from './ContentCmt'
import { authContext } from '../../contexts/AuthContext'
import { socketContext } from '../../contexts/SocketContext'

const Comments = ({ post }) => {
  const [comments, setComments] = useState([])
  const autoFocusRef = useRef();
  const {authState} = useContext(authContext)
  const {socket} = useContext(socketContext)
  const {user} = authState

  const getComments = async () => {
    try {
      const res = await commentApi.get(post.postID)
      if (res.data.success) {
        console.log(res.data.data)
        setComments(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const submit = async (e) => {
    if (e.key == 'Enter' && e.target.value != '') {
      const req = {
        postID: post.postID,
        content: e.target.value
      }
      const res = await commentApi.add(req)
      if (res.data.success){
        socket?.emit("notification", {
          type: `${user.fullName} đã bình luận bài viết của bạn`,
          userID: post.user.userID,
          postID: post.postID
        })
        getComments()
      }
      e.target.value = ''
    }
  }

  useEffect(() => {
    getComments()
    autoFocusRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    autoFocusRef.current.focus({ preventScroll: true });
  }, [])
  return (
    <div className='comments'>
      <ul className='comments-content'>
        {comments.map(cmt => {
          return <ContentCmt key={cmt.commentID} cmt={cmt}/>
        })}
      </ul>
      <div className='form-input'>
        <FaPencilAlt className='pen' />
        <input ref={autoFocusRef} onKeyDown={(e) => submit(e)}
          placeholder='Viết bình luận...' />
      </div>
    </div>
  )
}

export default Comments