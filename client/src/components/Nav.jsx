import React, { useRef, useContext, useEffect, useState } from 'react';
import { links } from '../data';
import { Link } from 'react-router-dom';
import { FaArrowRight as IconArrow } from 'react-icons/fa';
import { authContext } from '../contexts/AuthContext';
import { imageApi } from '../API/imageApi';
import { socketContext } from '../contexts/SocketContext';

const Nav = () => {
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const { socket , newNoti} = useContext(socketContext)
  // const [noti, setNoti] = useState([])
  const notiNew = newNoti().length

  const { authState, dispatch } = useContext(authContext)
  const { user } = authState
  const logOut = () => {
    dispatch({
      type: 'LOG_OUT',
      payload: null
    })
  }
  // console.log('a', user)
  return (
    <nav>
      <div className='nav-center'>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            <li className='li-top'>
              <div className="avatar">
                {user.avatar === "" ? <></> : <img src={imageApi.getAvata(user.avatar)} alt="" />}
              </div>
              <div className='li-name'>{user.fullName}</div>
              <span></span>
            </li>
            <li>
              <Link to="">Home</Link>
            </li>
            <li>
              <Link to="">About</Link>
            </li>
            <li>
              <Link to="rooms">Rooms</Link>
            </li>
            <li className='notifi'>
              <Link to="notifications">Notification</Link>
              {notiNew > 0 && 
                <div className='number-noti'>
                  {notiNew}
                </div>}
            </li>
            <li>
              <Link to="profile">Profile</Link>
            </li>
          </ul>
          <input className='nav-search' type='text' placeholder='Search'></input>
        </div>
        <button className='logout-container' onClick={logOut}>
          <p>Log out</p>
          <IconArrow className='logout-icon' />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
