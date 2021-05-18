// import {  } from "../redux/actions/patientActions"

import { data } from "jquery"
import { 
    SET_SPECIALITIES_SYSTEM, 
    SET_LIST_HOSPITALS, 
    SET_HOSPITAL_BYID,

    LOADING_LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,

    LOGOUT_MANAGER,
    LOGOUT_SUCCESS,

    LOADING_PAGE,
} from '../../redux/actions/adminActions';

const initialState={
    currentAdmin: JSON.parse(localStorage.getItem('currentAdmin'))||{},
    isAdminLoggedIn: localStorage.getItem('currentAdmin')?true:false || false,
    loadingLogin: false,

    loadingPage: false,
}

export const adminReducer = (state = initialState , action) =>{
    switch (action.type) {
        case SET_SPECIALITIES_SYSTEM:
            return {
                ...state, 
                specialities_system : action.payload
            }
        case SET_LIST_HOSPITALS:
            return {
                ...state,
                list_hospital : action.payload
            }
        case SET_HOSPITAL_BYID:
            return {
                ...state,
                hospitalById : action.payload
            }
        case LOADING_LOGIN:
            return {
                ...state,
                loadingLogin: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                currentAdmin: action.payload,
                loadingLogin: false,
                isAdminLoggedIn: true,
                loadingPage: false,
            }
        case LOGIN_FAILED:
            return {
                ...state,
                currentAdmin: {},
                loadingLogin: false,
                isAdminLoggedIn: false,
                loadingPage: false,
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                currentAdmin: {},
                isAdminLoggedIn: false,
                loadingLogout: false,
                loadingPage: false
            }
        
        // loading Page
        case LOADING_PAGE:
            return {
                ...state,
                loadingPage: true
            }
        default:

            return state
    }
}
