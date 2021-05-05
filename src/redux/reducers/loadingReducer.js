import { 
    LOADING_DATA, LOADING_DATA_SUCCESS, LOADING_DATA_FAILED,
    ALL_DOCTORS, ALL_HOSPITAL, ALL_SPECIAL
} from '../actions/loadingActions';

const initialState ={
    loadingData: 0,
    listAllDoctors: [],
    listAllHospitals:[],
    listAllSpecials: [],
}
export const loadingReducer =(state = initialState , action)=>{
    switch (action.type) {
        case LOADING_DATA : 
            return {
                ...state,
                loadingData: state.loadingData+1
            }
        case LOADING_DATA_SUCCESS : 
            return {
                ...state,
                loadingData : state.loadingData-1
            }
        case LOADING_DATA_FAILED : 
            return {
                ...state,
                loadingData : state.loadingData-1
            }
        case ALL_DOCTORS : 
            return {
                ...state,
                listAllDoctors : action.payload
            }
        case ALL_HOSPITAL : 
            return {
                ...state,
                listAllHospitals : action.payload
            }
        case ALL_SPECIAL : 
            return {
                ...state,
                listAllSpecials : action.payload
            }
        default:
            return state;
    }
}