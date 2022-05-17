import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import { authContext } from '../../../../contexts/AuthContext'
import { postsApi } from '../../../../API/postsApi'
import { likeApi } from '../../../../API/likeApi'
import { imageApi } from '../../../../API/imageApi'
import Comments from '../../../comments/Comments'
import { BiLike } from 'react-icons/bi'
import { GoComment } from 'react-icons/go'
import { TiDelete } from 'react-icons/ti'
import { FaClock } from 'react-icons/fa'
import { socketContext } from '../../../../contexts/SocketContext'

const Post = ({ post, setPosts }) => {
  const { authState } = useContext(authContext)
  const { socket } = useContext(socketContext)
  const { user } = authState
  const [likes, setLikes] = useState([])
  const [clickComment, setClickComment] = useState(false)
  const [style, setStyle] = useState({})

  const date = new Date(post.createAt)
  const curDate = new Date()
  let createTime = date.getDate() + '-' + (date.getMonth() - 0 + 1) + '-' + date.getFullYear()
  if (curDate.getFullYear() == date.getFullYear() &&
    curDate.getMonth() == date.getMonth() &&
    curDate.getDate() == date.getDate()) {
    const time = (curDate.getHours() - date.getHours()) * 60 + curDate.getMinutes() - date.getMinutes()
    if (time < 60) createTime = time + ' phút'
    else createTime = Math.floor(time / 60) + ' giờ'
  }

  const delPost = async () => {
    try {
      const res = await postsApi.deletePost(post.postID)
      if (res.data.success) {
        setPosts((posts) => {
          const newPosts = posts.filter((prevPost) => {
            return prevPost.postID !== post.postID
          })
          return newPosts
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getLike = async () => {
    try {
      const res = await likeApi.get(post.postID)
      if (res.data.success) {
        setLikes(res.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const toggleLike = async () => {
    try {
      const res = await likeApi.toggleLike({ postID: post.postID })
      if (res.data.success) {
        await getLike()
        if (style.color!=="aqua") {
          socket?.emit("notification", {
            type: `${user.fullName} đã like bài viết của bạn`,
            userID: post.user.userID,
            postID: post.postID
          })
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getLike()
  }, [])

  useEffect(() => {
    const check = likes.filter(like => {
      return like.user.userID == user.userID
    })
    if (check.length == 1) {
      setStyle({ color: 'aqua' })
    }
    else setStyle({})
  }, [likes])
  return (
    <div className='post'>
      <div className='post-header'>
        <div className="post-user">
          <div className="avatar">
            {post.user.avatar === "" ? <img /> : <img src={imageApi.getAvata(post.user.avatar)} alt="" />}
          </div>
          <div className='userName'>{post.user.fullName}
            <h5>{createTime} <FaClock className='icon-time' /></h5>
          </div>
        </div>
        <div className='more'>
          {
            user.userID === post.user.userID ? <TiDelete className='more-x' onClick={delPost}></TiDelete> : <></>
          }
        </div>
      </div>
      <div className="post-body">
        {
          post.img == "" ? (
            <div className='text-content'>
              {post.content}
            </div>
          ) : (
            <>
              <div className='text-content'>
                {post.content}
              </div>
              <div className="img-content">
                <img className='br5' src={imageApi.getPost(post.img)} />
              </div></>
          )
        }
      </div>
      <div className="post-bottom">
        <div className="post-data">
          {likes.length} like
        </div>
        <div className='separation'></div>
        <div className="post-action">
          <div className="like btn-action" onClick={toggleLike} style={style}>
            <BiLike />
            <div>thích</div>
          </div>
          <div className="comment btn-action" onClick={() => { setClickComment(!clickComment) }}>
            <GoComment />
            <div>bình luận</div>
          </div>
        </div>
        {clickComment &&
          <>
            <div className='separation'></div>
            <Comments post={post} />
          </>}
      </div>
    </div>
  )
}

export default Post