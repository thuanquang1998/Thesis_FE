
import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_DOCTORS_DATA, EMAIL_LOGIN, SET_DOCTORS_DATA, REGISTER } from '../../redux/actions/doctorActions'
import { LOADING_DATA, LOADING_DATA_SUCCESS, LOADING_DATA_FAILED, ALL_DOCTORS, ALL_HOSPITAL, ALL_SPECIAL  } from '../actions/loadingActions';

import doctorAPI from '../../api/doctorAPI'
import patientAPI from '../../api/patientApi';

import { SwalAlert } from '../../utils/alert'

export default function* watchAsyncDoctorActions(){
    yield takeEvery(GET_DOCTORS_DATA , get_doctors_data)
    yield takeEvery(EMAIL_LOGIN, login)
    yield takeEvery(REGISTER , register)
}


function* get_doctors_data({payload}){
    yield put({type : LOADING_DATA});
    try{
        const response = yield call(doctorAPI.get_doctors, payload)
        if (response.error){
            SwalAlert('Error', 'Server disconected','error')
            localStorage.clear()
        }
        else {
            yield put({type : SET_DOCTORS_DATA, payload : response.data})
            yield put({type : LOADING_DATA_SUCCESS});
            yield put({type : ALL_DOCTORS, payload : response.data});
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