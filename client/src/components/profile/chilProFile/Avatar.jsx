import React, { useState } from 'react'
import authApi from '../../../API/authApi'
import { imageApi } from '../../../API/imageApi'

const Avatar = ({ data }) => {
    const { user, setUser } = data
    const [files, setFiles] = useState(null)

    const cancel = () => {
        setFiles(null)
    }

    const save = async() => {
        let imgCollections = "";
        if (files) {
            const formData = new FormData();
            formData.append('imgCollections', files[0]);
            imgCollections = files[0].name;
            try {
                await imageApi.setAvatar(formData)
                const avt = {
                    avatar: imgCollections
                }
                const res = await authApi.UpdateUser(avt)
                if(res.data.success){
                    console.log(res.data.data)
                    setUser(res.data.data)
                    setFiles(null)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='avatar-profile chung'>
            <label htmlFor="file">
                <div className='avatar-img hover'>
                    {files && Object.values(files).length !== 0
                        ? <img src={URL.createObjectURL(Object.values(files)[0])} alt="" />
                        : user.avatar === "" ? <></> : <img src={imageApi.getAvata(user.avatar)} alt=""/>}
                </div>
            </label>
            
            <h3>{user.fullName}</h3>
            <p>{user.phoneNumber}</p>


            {files &&
                <div className='button-select'>
                    <button className='btn-save btn-select' onClick={save}>save</button>
                    <button className='btn-cancel btn-select' onClick={cancel}>cancel</button>
                </div>}

            < input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                multiple
                onChange={(e) => setFiles(e.target.files)}
            />
        </div>
    )
}

export default Avatar