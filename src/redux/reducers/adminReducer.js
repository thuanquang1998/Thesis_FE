// import {  } from "../redux/actions/patientActions"

import { data } from "jquery"
import { 
    SET_SPECIALITIES_SYSTEM, 
    SET_LIST_HOSPITALS, 
    SET_HOSPITAL_BYID,

    LOADING_LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
} from '../../redux/actions/adminActions';

import Specialities from '../../admin/pages/specialities';



const initialState={
    currentAdmin: JSON.parse(localStorage.getItem('currentAdmin'))||{},
    isAdminLoggedIn: false,
    loadingLogin: false,

    loading : false,
    data :{},
    error : false,
    login:false,
    errors:[],
    loadingHospital: false,
    
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
            }
        case LOGIN_FAILED:
            return {
                ...state,
                currentAdmin: {},
                loadingLogin: false,
                isAdminLoggedIn: false,
            }
        default:

            return state
    }
}
