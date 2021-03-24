
import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_DOCTORS_DATA, EMAIL_LOGIN, SET_DOCTORS_DATA, REGISTER } from '../actions/doctorActions'
import doctorAPI from '../api/doctorAPI'
import patientAPI from '../api/patientApi'
import { SwalAlert } from '../utils/alert'

export default function* watchAsyncDoctorActions(){
    yield takeEvery(GET_DOCTORS_DATA , get_doctors_data)
    yield takeEvery(EMAIL_LOGIN, login)
    yield takeEvery(REGISTER , register)
}


function* get_doctors_data({payload}){
    console.log('saga')
    try{
        const response = yield call(doctorAPI.get_doctors, payload)
        if (response.error){
            SwalAlert('Error', 'Server disconected','error')
            localStorage.clear()
        }
        else {
            yield put({type : SET_DOCTORS_DATA, payload : response.data})
        }
    }
    catch(err){
        console.log(err)    
    }
}

function* login({payload}){
    try{
        const response = yield call(doctorAPI.login , payload)
        if (response.error){
            SwalAlert('Error', 'Server disconected','error')
            // localStorage.clear()
        }
        else {
            console.log(response)
            // yield put({type : SET_DOCTORS_DATA, payload : response.data})
        }
    }
    catch(err){

    }
}
function* register({payload}){
    try{
        const response = yield call(doctorAPI.register , payload)
        if (response.error){
            SwalAlert('Error', 'Server disconected','error')
            // localStorage.clear()
        }
        else {
            console.log(response)
            // yield put({type : SET_DOCTORS_DATA, payload : response.data})
        }
    }
    catch(err){

    }
}