export const IS_LOADING = 'IS_LOADING';
export const IS_LOADED = 'IS_LOADED';
export const IS_ERROR = 'IS_ERROR';

export const GET_VERIFY_CODE = 'GET_VERIFY_CODE';
export const GET_VERIFY_SMS = 'GET_VERIFY_SMS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const LOGOUT_PATIENT = 'LOGOUT_PATIENT';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER'

export const MAKING_APPOINTMENT = 'MAKING_APPOINTMENT' 

export const getVerifyCode = (data) => {
    return {
        type: GET_VERIFY_CODE,
        payload: data,  
    }
}
export const getVerifySMS = (data) => {
    return {
        type: GET_VERIFY_SMS,
        payload: data,  
    }
}

export const logoutPatient = () => { 
    return {
        type : LOGOUT_PATIENT,
    }
}

export const make_appointment =(data)=> {
    return{
        type: MAKING_APPOINTMENT,
        payload: data
    }
}