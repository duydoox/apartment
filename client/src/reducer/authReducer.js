import authApi from "../API/authApi"
export const authReducer = (state, {type, payload}) => {
    switch(type){
        case 'LOGIN_FORM':
            return {...state, ...payload.authState}
        case 'LOG_OUT':
            localStorage.removeItem('authToken')
            authApi.removeHeader()
            return {}
        case 'LOADED':
            return {...state, load: false}
        default: return state
    }
}