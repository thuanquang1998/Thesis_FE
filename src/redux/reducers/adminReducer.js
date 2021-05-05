// import {  } from "../redux/actions/patientActions"

import { data } from "jquery"
import { SET_SPECIALITIES_SYSTEM, SET_LIST_HOSPITALS, SET_HOSPITAL_BYID } from '../../redux/actions/adminActions';

import Specialities from '../../admin/pages/specialities';



const initialState={
    loading : false,
    data :{},
    error : false,
    login:false,
    errors:[],
    loadingHospital: false,
    // loadingSpe
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
        default:

            return state
    }
}
