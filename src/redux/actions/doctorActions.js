// import { LOGIN } from "./patientActions"
export const GET_DOCTORS_DATA = 'GET_DOCTORS_DATA'
export const SET_DOCTORS_DATA = 'SET_DOCTORS_DATA'
export const LOGIN_DOCTOR = 'LOGIN_DOCTOR'
export const LOGIN_DOCTOR_SUCCESS = 'LOGIN_DOCTOR_SUCCESS'
export const LOGIN_DOCTOR_FAILED = 'LOGIN_DOCTOR_FAILED'
export const LOADING_LOGIN_DOCTOR = 'LOADING_LOGIN_DOCTOR'
export const LOADING_PAGE_DOCTOR = 'LOADING_PAGE_DOCTOR'

export const LOGOUT_DOCTOR = 'LOGOUT_DOCTOR'
export const LOGOUT_DOCTOR_LOADING = 'LOGOUT_DOCTOR_LOADING'
export const LOGOUT_DOCTOR_SUCCESS = 'LOGOUT_DOCTOR_SUCCESS'

export const  get_doctors_data =(history)=>{
    return {
        type: GET_DOCTORS_DATA,
        payload : history
    }
}

export const login_doctors = (data) => {
    return {
        type: LOGIN_DOCTOR,
        payload: data
    }
}
export const logout_doctors = () => { 
    return {
        type : LOGOUT_DOCTOR,
    }
}