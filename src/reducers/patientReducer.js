import { 
    IS_LOADING, IS_LOADED, IS_ERROR,
    SET_CURRENT_USER, CLEAR_CURRENT_USER,
} from "../actions/patientActions"


const initialState={
    // login by phone number
    currentUser: JSON.parse(localStorage.getItem('currentUser'))||{},
    isLoggedIn: localStorage.getItem('userToken')?true:false || false,
    isLoading: false,
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
    
        
        default:
            return state
    }
}
