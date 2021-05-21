
import { call, put, takeEvery } from 'redux-saga/effects';
import doctorAPI from '../../api/doctorAPI';
import { 
    LOADING_PAGE_DOCTOR,
    GET_DOCTORS_DATA, SET_DOCTORS_DATA,
    LOGIN_DOCTOR,  LOGIN_DOCTOR_SUCCESS, LOGIN_DOCTOR_FAILED, LOADING_LOGIN_DOCTOR,
    LOGOUT_DOCTOR, LOGOUT_DOCTOR_LOADING, LOGOUT_DOCTOR_SUCCESS

} from '../../redux/actions/doctorActions';
import { SwalAlert } from '../../utils/alert';
import { ALL_DOCTORS, LOADING_DATA, LOADING_DATA_SUCCESS } from '../actions/loadingActions';
import adminAPI from '../../api/adminAPI';
import { useSnackbar } from 'notistack';

export default function* watchAsyncDoctorActions(){
    yield takeEvery(GET_DOCTORS_DATA , get_doctors_data)
    yield takeEvery(LOGIN_DOCTOR, loginDoctorByEmail)
    yield takeEvery(LOGOUT_DOCTOR , logoutDoctor)
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