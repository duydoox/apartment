import React, { useState } from 'react'
import './share.css'
import { imageApi } from '../../../../API/imageApi'
import { FaImage, FaShare } from 'react-icons/fa'

const Share = ({ data }) => {
    const { createPost, scrollTop } = data
    const [attribute, setAttribute] = useState({
        content: "",
        message: "",
        range: "all",
        files: null
    })
    const { content, message, range, files } = attribute

    const closeImg = () => {
        // setFiles(null)
        setAttribute({ ...attribute, files: null })
    }

    const changeInput = (e) => {
        if (e.target.value != "")
            setAttribute({ ...attribute, content: e.target.value, message: "" })
        else
            setAttribute({ ...attribute, content: e.target.value })
    }

    const handleShareSubmmit = async (e) => {
        e.preventDefault();

        let imgCollections = "";
        if (files) {
            const formData = new FormData();
            formData.append('imgCollections', files[0]);
            imgCollections = files[0].name;
            try {
                await imageApi.setPost(formData)
            } catch (error) {
                console.log(error);
            }
        }

        if (content == "" && !files) {
            setAttribute({ ...attribute, message: "nhập nội dung hoặc ảnh" })
            // setMessage("nhập nội dung hoặc ảnh")
        }
        else {
            const newPost = {
                title: "ok",
                range: range,
                content: content,
                img: imgCollections,
            };

            createPost(newPost)

            setAttribute({ content: "", message: "", files: null, range: "all" })
            scrollTop(0)
        }
    };
    return (
        <div className='share'>
            <h3>Đăng bài viết</h3>
            {/* <select className="range" onChange={(e) => {setAttribute({...attribute, range: e.target.value})}}>
                <option value="all">tất cả</option>
                <option value="home">nhà trọ</option>
                <option value="private">chỉ mình tôi</option>
            </select><br /> */}
            <textarea type="text" className='content'
                placeholder='nhập nội dung'
                onChange={(e) => { changeInput(e) }}
                value={content} />
            {files && Object.values(files).length !== 0 ? (
                <div className='imgContainer'>
                    <img src={URL.createObjectURL(Object.values(files)[0])} alt="" className="shareImg" />
                    <button className='close' onClick={closeImg}>xóa</button>
                </div>
            ) :
                (<label htmlFor="file" className="shareBottomAction">
                    <p className="selectImg"> <FaImage className='space' /> Image</p>
                </label>
                )
            }
            {message !== "" && <><span className='message-share'>{message}</span><br/></>}
            <button className='submitShare' onClick={handleShareSubmmit}><FaShare className='space' />Submit</button>
            < input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                multiple
                onChange={(e) => setAttribute({ ...attribute, files: e.target.files })}
            />
        </div>
    )
}
export default Share