import { 
    IS_LOADING, IS_LOADED, IS_ERROR,
    GET_ALL_DOCTORS,
    SET_CURRENT_USER, CLEAR_CURRENT_USER,
    SET_CONFIRM_BOOKING
} from '../actions/patientActions';


const initialState={
    // login by phone number
    listDoctor: [],
    currentUser: JSON.parse(localStorage.getItem('currentUser'))||{},
    isLoggedIn: localStorage.getItem('userToken')?true:false || false,
    isLoading: false,
    confirmBooking: false,
    directorUrl: '',
    error: '',
}

export const patientReducer = (state = initialState , action) =>{
    switch (action.type) {
        case IS_LOADING: 
            return {
                ...state,
                isLoading: true
            }
        case IS_LOADED: 
            return {
                ...state,
                isLoading: false
            }
        case IS_ERROR: 
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_ALL_DOCTORS: 
            return {
                ...state,
                listDoctor: action.payload
            }
        case SET_CURRENT_USER:
            return {
                ...state , 
                login : true,
                data : action.payload,
                isLoggedIn: true,
                currentUser : action.payload,
            }
        case CLEAR_CURRENT_USER:
            return {
                ...state,
                isLoggedIn: false,
                currentUser : {},
                isLoading: false,
            }
        case SET_CONFIRM_BOOKING:
            return {
                ...state,
                confirmBooking: action.payload.confirmBooking,
                directorUrl: action.payload.directorUrl,
            }
    
        
        default:
            return state
    }
}
