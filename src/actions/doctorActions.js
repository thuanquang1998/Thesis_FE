import { LOGIN } from "./patientActions"

export const GET_DOCTORS_DATA = 'GET_DOCTORS_DATA'
export const SET_DOCTORS_DATA = 'SET_DOCTORS_DATA'
export const EMAIL_LOGIN = 'EMAIL_LOGIN'
export const REGISTER ='REGISTER'
export const  get_doctors_data =(history)=>{
    return {
        type: GET_DOCTORS_DATA,
        payload : history
    }
}
export const login =(data)=>{
    return {
        type : LOGIN,
        payload: data
    }
}
export const register=(data)=>{
    return{ 
        type : REGISTER,
        payload: data
    }
}