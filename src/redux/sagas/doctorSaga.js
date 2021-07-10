
import { call, put, takeEvery } from 'redux-saga/effects';
import adminAPI from '../../api/adminAPI';
import {
    LOADING_LOGIN_DOCTOR, LOADING_PAGE_DOCTOR,

    LOGIN_DOCTOR, LOGIN_DOCTOR_FAILED, LOGIN_DOCTOR_SUCCESS,
    LOGOUT_DOCTOR, LOGOUT_DOCTOR_SUCCESS
} from '../../redux/actions/doctorActions';
import { SwalAlert } from '../../utils/alert';

export default function* watchAsyncDoctorActions(){
    yield takeEvery(LOGIN_DOCTOR, loginDoctorByEmail)
    yield takeEvery(LOGOUT_DOCTOR , logoutDoctor)
}

function* loginDoctorByEmail({payload}){

    console.log("loginDoctorByEmail")
    yield put({type : LOADING_PAGE_DOCTOR});
    yield put({type : LOADING_LOGIN_DOCTOR});
    try{
        const response = yield call( adminAPI.login , payload)
        if (response.error){
            SwalAlert('Error', 'Tên đăng nhập không đúng', 'error')
            console.log("Error");
            yield put({type : LOGIN_DOCTOR_FAILED});
        }
        else {
            if(response.data.accountType!=='doctor') {
                SwalAlert('Error', 'Tài khoản không tồn tại', 'error');
                throw new Error("Tài khoản không tồn tại")
            } else {
                const data = {
                    accountType: response.data.accountType,
                    doctorToken: response.data.token,
                    doctor: response.data.doctor_info,
                }
                localStorage.setItem('currentDoctor', JSON.stringify(data));
                yield put({type : LOGIN_DOCTOR_SUCCESS, payload : data});
            }
        }
    }
    catch(err){
        console.log(err)    
    }
}

function* logoutDoctor() {
    yield put({type : LOADING_PAGE_DOCTOR})
    localStorage.removeItem('currentDoctor');
    yield put({type: LOGOUT_DOCTOR_SUCCESS});
} 