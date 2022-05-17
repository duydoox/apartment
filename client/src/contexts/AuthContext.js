import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
import authApi from '../API/authApi.jsx'

export const authContext = createContext()

const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
        load: true
    })

    const loadData = async () => {
        console.log("load")
        try {
            const response = await authApi.getData()
            if (response.data.success) {
                const { data } = response.data;
                dispatch({
                    type: 'LOGIN_FORM',
                    payload: {
                        authState: {
                            isAuthenticated: true,
                            user: data,
                            load: false
                        }
                    }
                })
            }
            else{
                console.log('phiên đăng nhập hết hạn')
                dispatch({type: 'LOADED'})
            }
        }catch(err){
            console.log(err)
            dispatch({type: 'LOADED'})
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            authApi.setHeader(token)
            loadData()
        }
        else { 
            dispatch({type: 'LOADED'})
            authApi.removeHeader() 
        }
    }, [])
    return (
        <authContext.Provider value={{ authState, dispatch }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;