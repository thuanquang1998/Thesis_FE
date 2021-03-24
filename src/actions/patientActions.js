export const GET_PATIENT_DATA = 'GET_PATIENT_DATA'
export const LOGIN ='LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const  GET_CURRENT_USER = 'GET_CURENT_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const MAKING_APPOINTMENT = 'MAKING_APPOINTMENT' 
export const login=(data)=>{
    return {
        type : LOGIN,
        payload : data
    }
}
export const get_curent_user =(token)=> {
    return{
        type: GET_CURRENT_USER,
        payload: token
    }
}



export const make_appointment =(data)=> {
    return{
        type: MAKING_APPOINTMENT,
        payload: data
    }
}