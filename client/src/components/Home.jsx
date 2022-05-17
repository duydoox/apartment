import React, {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { authContext } from '../contexts/AuthContext'
import Dashboard from './dashboard/Dashboard';
import RoomsProvider from '../contexts/RoomsContext';

const Home = () => {
    const {authState} = useContext(authContext)
    const {isAuthenticated, load} = authState
    if(load) return<></>
    if(!isAuthenticated){
        return <Navigate to='./login' />
    }
    return (
    <RoomsProvider>
        <Dashboard/>
    </RoomsProvider>
    )
}

export default Home