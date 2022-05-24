import React, { useState, useEffect, useRef } from 'react'
import Feed from './feed/Feed'
import RightBar from './rightBar/RightBar'
import { useParams } from 'react-router-dom'
import './posts.css'
import { postsApi } from '../../API/postsApi'
import {FaAngleDoubleUp} from 'react-icons/fa'

const Posts = () => {
    const { postID } = useParams()
    const [posts, setPosts] = useState([]);
    const page = useRef(0);
    const scroll = useRef();
    const date = useRef(new Date().toISOString())
    // console.log(date.current)

    const scrollTop = (h) => {
        // scroll.current.scrollHeight
        scroll.current.scrollTop = h
    }

    const getPage = async (filter = "all") => {
        page.current = page.current + 1;
        const req = {
            page: page.current,
            perpage: 8,
            filter: filter,
            time: date.current,
        }
        try {
            const res = await postsApi.getPagePosts(req);
            // console.log([...posts, ...res.data.data])
            return res
        } catch (err) {
            console.log(err)
        }
        return null
    }

    const loadPage = async (filter = "all") => {
        try {
            const res = await getPage(filter)
            if (res) {
                console.log(res.data.data)
                setPosts([...posts, ...res.data.data]);
            }
        }catch(err){
            console.log(err) 
        }
    }

    const createPost = async (newPost) => {
        const res = await postsApi.createPost(newPost)
        if (res.data.success) {
            console.log(res.data.data)
            date.current = new Date().toISOString()
            page.current = 0
            const response = await getPage()
            setPosts([...response.data.data]);
        }
    }

    useEffect(() => {
        if(postID){
            (async () => {
                const res = await postsApi.getPostByID(postID)
                if(res.data.success) {
                    setPosts([res.data.data])
                }
            })() 
        }
        else{
            // scroll.current.scrollTop = 0
            (async () => {
                try {
                    page.current = 0
                    const res = await getPage()
                    if (res) {
                        // console.log(res.data.data)
                        setPosts([...res.data.data]);
                    }
                }catch(err){
                    console.log(err) 
                }
            })()
        }
    }, [postID]);

    const data = {
        posts,
        getPage,
        loadPage,
        scroll,
        setPosts,
        scrollTop,
        createPost,
        date,
        page
    }

    return (
        <div className='container'>
            <div className="cMiddle">
                <Feed data={data} />
                <button className='btn-scroll_top' onClick={()=>{scroll.current.scrollTop = 0}}>
                    <FaAngleDoubleUp/>
                </button>
            </div>
            <div className="cRight">
                <RightBar data={data} />
            </div>
        </div>
    )
}

export default Posts