import {all, call , put, takeEvery, takeLatest} from 'redux-saga/effects'
import {LOGIN, LOGIN_SUCCESS, GET_CURRENT_USER, SET_CURRENT_USER, MAKING_APPOINTMENT} from '../actions/patientActions'
import patientAPI from '../api/patientApi'
import {SwalAlert} from '../utils/alert'
export default function* watchAsyncPatientActions(){
    yield takeEvery( LOGIN , getVerifySMS)
    yield takeEvery(GET_CURRENT_USER , get_curent_user)
    yield takeEvery(MAKING_APPOINTMENT, make_appointment)
}

const  getVerifySMS=  async ({payload})=>{
    
    try{
        let response = await patientAPI.sign_in(payload)
    
        if(!response.error){
            localStorage.setItem('code',response.data.code)
            localStorage.setItem('token', response.data.token)
        }
        else{
            SwalAlert('Error', response.errors[0].message, 'error')
        }

    }
    catch(err){
        SwalAlert('Error', 'Server Errors', 'error')
    }
}
function* get_curent_user({payload}){
    try{
        const response = yield call(patientAPI.get_current_user, payload)
        if (response.error){
            SwalAlert('Error', 'Server disconected','error')
            localStorage.clear()
        }
        else {
            yield put({type : SET_CURRENT_USER, payload : response.data.user})
        }
    }
    catch(err){
        console.log(err)    
    }
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