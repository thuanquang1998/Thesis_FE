import {
    LOADING_LOGIN_DOCTOR, LOADING_PAGE_DOCTOR,

    LOGIN_DOCTOR_FAILED, LOGIN_DOCTOR_SUCCESS,
    LOGOUT_DOCTOR_SUCCESS, SET_DOCTORS_DATA
} from '../../redux/actions/doctorActions';

// const initialState ={
//     loading : false , 
//     doctor_login : true,
//     doctor_data  :[],
//     errors:[]
// }

const initialState={
    currentDoctor: JSON.parse(localStorage.getItem('currentDoctor'))||{},
    isDoctorLoggedIn: localStorage.getItem('currentDoctor')?true:false || false,
    loadingLogin: false,
    doctor_data  :[],

    loadingPage: false,
}

export const doctorReducer =(state = initialState , action)=>{
    switch (action.type) {
        case SET_DOCTORS_DATA : 
            return {
                ...state,
                doctor_data : [...action.payload]
            }
        case LOADING_LOGIN_DOCTOR:
            return {
                ...state,
                loadingLogin: true,
            }
        case LOGIN_DOCTOR_SUCCESS:
            return {
                ...state,
                currentDoctor: action.payload,
                loadingLogin: false,
                isDoctorLoggedIn: true,
                loadingPage: false,
            }
        case LOGIN_DOCTOR_FAILED:
            return {
                ...state,
                currentDoctor: {},
                loadingLogin: false,
                isDoctorLoggedIn: false,
                loadingPage: false,
            }

        case LOGOUT_DOCTOR_SUCCESS:
            return {
                ...state,
                currentDoctor: {},
                isDoctorLoggedIn: false,
                loadingLogout: false,
                loadingPage: false
            }
        
        // loading Page
        case LOADING_PAGE_DOCTOR:
            return {
                ...state,
                loadingPage: true
            }
        default:
            return state;
    }
}