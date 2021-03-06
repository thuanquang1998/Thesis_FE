import {all, call , put, takeEvery, takeLatest} from 'redux-saga/effects'
import { 
    IS_LOADING, IS_LOADED, IS_ERROR,
    GET_ALL_DOCTORS,
    GET_VERIFY_CODE, GET_VERIFY_SMS,
    LOGOUT_PATIENT, SET_CURRENT_USER, CLEAR_CURRENT_USER, 
    SET_CONFIRM_BOOKING, MAKING_APPOINTMENT,
    GET_SCHEDULE_PATIENT,
    SET_CURRENT_HOSPITAL
} from '../actions/patientActions';
import Swal from 'sweetalert2';
import {useSnackbar} from 'notistack';

import patientAPI from '../../api/patientApi';
import adminAPI from '../../api/adminAPI';
import {SwalAlert, SwalAlertBooking} from '../../utils/alert';

export default function* watchAsyncPatientActions(){
    yield takeEvery ( GET_ALL_DOCTORS, getAllDoctors )
    yield takeEvery ( GET_VERIFY_CODE, getVerifyCode )
    yield takeEvery ( GET_VERIFY_SMS, getVerifySMS )
    yield takeEvery ( LOGOUT_PATIENT, logoutPatient )
    yield takeEvery ( SET_CONFIRM_BOOKING, confirmBooking )
    yield takeEvery ( MAKING_APPOINTMENT, make_appointment )
    yield takeEvery ( GET_SCHEDULE_PATIENT, get_schedule_patient )
    yield takeEvery ( SET_CURRENT_HOSPITAL, set_current_hospital )


}
function*  getAllDoctors(){
    yield put({ type: IS_LOADING }) 
    try{
        let response = yield call(patientAPI.get_all_doctors, 'Get');
        // console.log('response :>> ', response);
        if(!response.error){
            yield put({ type: GET_ALL_DOCTORS, payload: response.data})
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
            // SwalAlert( 'Success',`M?? x??c th???c ???? ???????c g???i ?????n ${payload}` , 'success')
            yield put({ type: IS_LOADED});
            const data = {patientInfo: response.data.patientInfo, token: response.data.token};
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
    localStorage.removeItem('code');
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    yield put({type: CLEAR_CURRENT_USER});
} 

function* confirmBooking (data) {
//    yield put ({type: SET_CONFIRM_BOOKING, payload: data})
//    SwalAlert('Error', 'Server disconected','error')
//    SwalAlertBooking('Error', "TEST", 'error');
   const SwalMixin  = Swal.mixin({
        toast :true,
        position: 'top-center',
        // timer:3000,
        timerProgressBar:true,
        title: "Are you sure?",
        type: "warning",
        confirmButtonText:"Yes",
        confirmButtonColor:"#18a689",
        cancelButtonText:"No",
        showCancelButton: true,
        showLoaderOnConfirm: true
    })
    return SwalMixin.fire("TET","message",'error')
}

function* make_appointment({payload}){
    // const {enqueueSnackbar} = useSnackbar();

    try{
        const response = yield call(patientAPI.make_appointment, payload)
        if (response.error){
            SwalAlert('Error', 'Server disconected','error')
        }
        else {
            SwalAlert('?????t l???ch kh??m th??nh c??ng')
            // enqueueSnackbar("?????t l???ch kh??m th??nh c??ng", 'success')
        }
    }
    catch(err){
        console.log(err)    
    }
}
function* get_schedule_patient({payload}){
    try{
        const response = yield call(patientAPI.get_schedule, payload.id)
        if (response.error){
            SwalAlert('Error', 'Server disconected','error')
        }
        else {
            console.log('response :>> ', response);
            // SwalAlert('Success', 'get_schedule_patient','success')
            yield put({type: GET_SCHEDULE_PATIENT, payload:response.data});
        }
    }
    catch(err){
        console.log(err)    
    }
}
function* set_current_hospital({payload}){
    console.log('payload set_current_hospital:>> ', payload);
    try{
        const response = yield call(adminAPI.get_hospital_info, payload)
        if(response.error) throw new Error('error')
        
        console.log('response set_current_hospital:>> ', response);
        // SwalAlert('Success', 'get_schedule_patient','success')
        yield put({type: SET_CURRENT_HOSPITAL, payload:response.data.data[0]});
    }
    catch(err){
        console.log(err)    
    }
}

