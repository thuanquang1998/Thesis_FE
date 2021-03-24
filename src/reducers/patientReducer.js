import { GET_PATIENT_DATA, LOGIN_SUCCESS, SET_CURRENT_USER } from "../actions/patientActions"


const initialState={
    loading : false,
    data :{},
    error : false,
    login:false,
    errors:[]
}

export const patientReducer = (state = initialState , action) =>{
    switch (action.type) {
        case GET_PATIENT_DATA:
            return state
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading :true
            }    
        case SET_CURRENT_USER:
            return {
                ...state , 
                login : true,
                data : action.payload
            }
        default:
            return state
    }
}
