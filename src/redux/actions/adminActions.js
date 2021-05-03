export const GET_SPECIALITIES_SYSTEM = 'GET_SPECIALITIES_SYSTEM'
export const SET_SPECIALITIES_SYSTEM = 'SET_SPECIALITIES_SYSTEM'

export const GET_LIST_HOSPITALS = 'GET_LIST_HOSPITALS'
export const SET_LIST_HOSPITALS = 'SET_LIST_HOSPITALS'

export const GET_HOSPITAL_BYID = 'GET_HOSPITAL_BYID'
export const SET_HOSPITAL_BYID = 'SET_HOSPITAL_BYID'


export const  get_specialities_system =()=>{
    return {
        type: GET_SPECIALITIES_SYSTEM
    }
}
export const get_list_hospitals = () => {
    return {
        type: GET_LIST_HOSPITALS
    }
}

export const get_hospital_byId = (id) => {
    return {
        type: GET_HOSPITAL_BYID,
        payload: id
    }
}

export const put_specialities_hospital = () => {
    return {
        // type: GET_SPECIALITIES_HOSPITAL
    }
}