import { SET_DOCTORS_DATA } from "../actions/doctorActions";

const initialState ={
    loading : false , 
    doctor_login : true,
    doctor_data  :[],
    errors:[]
}
export const doctorReducer =(state = initialState , action)=>{
    switch (action.type) {
        case SET_DOCTORS_DATA : 
            return {
                ...state,
                doctor_data : [...action.payload]
            }
        default:
            return state;
    }
}