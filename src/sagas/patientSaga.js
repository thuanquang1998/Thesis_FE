import {all, call , put, takeEvery, takeLatest} from 'redux-saga/effects'
import { 
    IS_LOADING, IS_LOADED, IS_ERROR,
    GET_VERIFY_CODE, GET_VERIFY_SMS,
    LOGOUT_PATIENT, SET_CURRENT_USER, CLEAR_CURRENT_USER, 
    MAKING_APPOINTMENT
} from '../actions/patientActions';

import patientAPI from '../api/patientApi'
import {SwalAlert} from '../utils/alert'

export default function* watchAsyncPatientActions(){
    yield takeEvery ( GET_VERIFY_CODE, getVerifyCode )
    yield takeEvery ( GET_VERIFY_SMS, getVerifySMS )
    yield takeEvery ( LOGOUT_PATIENT, logoutPatient )
    yield takeEvery ( MAKING_APPOINTMENT, make_appointment )
}
function*  getVerifyCode({payload}){
    yield put({ type: IS_LOADING }) 
    try{
        let response = yield call(patientAPI.sign_in, payload);
        if(!response.error){
            console.log('code', response.data.code);
            localStorage.setItem('code',response.data.code);
            yield put({ type: IS_LOADED}); 
        }
        else{
            yield put({ type: IS_ERROR, payload: response.errors}); 
            throw new Error(response.errors[0].message);
        }
    }
    catch(err){
        // SwalAlert('Error', 'Server Errors', 'error')
        console.log('getVerifySMS error',err.message);
    }
}
function* getVerifySMS ({payload}) {
    yield put({ type: IS_LOADING }) 
    try{
        let response = yield call(patientAPI.verifySMS, payload)
        if(!response.error){
            // SwalAlert( 'Success',`Mã xác thực đã được gửi đến ${payload}` , 'success')
            yield put({ type: IS_LOADED});
            const data = {patientInfo: response.data.patientInfo, token: response.data.token};
            console.log('data :>> ', data);
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('currentUser', JSON.stringify(data));
            yield put({ type: SET_CURRENT_USER, payload: data})
        }
        else{
            yield put({ type: IS_ERROR, payload: response.errors}); 
            throw new Error(response.error);
        }
    }
    catch(err){
        console.log('getVerifySMS error',err)
    }
}

function* logoutPatient() {
    yield put({ type: IS_LOADING }) 
    localStorage.clear();
    yield put({type: CLEAR_CURRENT_USER});
} 

function* make_appointment({payload}){
    try{
        const response = yield call(patientAPI.make_appointment, payload)
        if (response.error){
            SwalAlert('Error', 'Server disconected','error')
        }
        else {
            SwalAlert('Success', 'Making appointment success','success')
        }
    }
    catch(err){
        console.log(err)    
    }
}