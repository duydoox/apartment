import React, { useRef, useState } from 'react'
import './feed.css'
import Post from './Post/Post'
import Filter from './filter/Filter'

const Feed = ({data}) => {
  const {posts, loadPage, scroll, setPosts} = data
  const flag = useRef(false)

  const loadScroll = () => {
    const alpha = (posts.length > 8) ? 1 : (posts.length > 6) ? 1.5 : (posts.length > 3) ? 2 : 3
    const scrollBottom = scroll.current.scrollTop + alpha*scroll.current.scrollHeight/posts.length
    const loadHeight = 0.9*scroll.current.scrollHeight
    // console.log(scrollBottom, loadHeight)
    if(scrollBottom > loadHeight){
      if(flag.current == true){
        flag.current = false
        console.log("loadpage")
        loadPage()
      }
    }
    else{
      flag.current = true
    }
  }
  return (
    <div className='feed' ref={scroll} onScroll={()=>{loadScroll()}}>
      <div className='feed-header'>
        Tin tức
        <Filter data={data}/>
      </div>
      {posts.map((post) => (
        <Post key={post.postID} post={post} setPosts = {setPosts}/>
      ))}
    </div>
  )
}

export default Feed
