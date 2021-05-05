import {all, call , put, takeEvery, takeLatest} from 'redux-saga/effects'
import {GET_HOSPITAL_BYID, GET_LIST_HOSPITALS, GET_SPECIALITIES_SYSTEM, SET_HOSPITAL_BYID, SET_LIST_HOSPITALS, SET_SPECIALITIES_SYSTEM } from '../actions/adminActions'
// import {LOGIN, LOGIN_SUCCESS} from '../redux/actions/patientActions'
import { LOADING_DATA, LOADING_DATA_SUCCESS, LOADING_DATA_FAILED, ALL_DOCTORS, ALL_HOSPITAL, ALL_SPECIAL  } from '../actions/loadingActions';

import adminAPI from '../../api/adminAPI';
import {SwalAlert} from '../../utils/alert'


export default function* watchAsyncAdminActions(){
    yield takeEvery( GET_SPECIALITIES_SYSTEM , get_specialities_system)
    yield takeEvery( GET_LIST_HOSPITALS , get_list_hospitals)
    yield takeEvery( GET_HOSPITAL_BYID , get_hospital_byId )
}

//get specialities system
function* get_specialities_system(){
    yield put({type : LOADING_DATA});
    try{
       
        const response = yield call( adminAPI.get_speacialities , 'Get')
        if (response.error){
            console.log("Error");
        }
        else {
            yield put({type : SET_SPECIALITIES_SYSTEM, payload : response.data});
            yield put({type : LOADING_DATA_SUCCESS});
            yield put({type : ALL_SPECIAL, payload : response.data});
        }
    }
    catch(err){
        console.log(err)    
    }
}

//get list hospital
function* get_list_hospitals(){
    yield put({type : LOADING_DATA});
    try{
        const response = yield call( adminAPI.get_list_hospitals , 'Get')
        if (response.error){
            console.log("Error");
        }
        else {
            yield put({type : SET_LIST_HOSPITALS, payload : response.data})
            yield put({type : LOADING_DATA_SUCCESS});
            yield put({type : ALL_HOSPITAL, payload : response.data});
        }
    }
    catch(err){
        console.log(err)    
    }
}

//get hospital by id
function* get_hospital_byId({payload}){
    try{
        const response = yield call( adminAPI.get_hospital_info , payload)
        if (response.error){
            console.log("Error");
        }
        else {
            yield put({type : SET_HOSPITAL_BYID, payload : response.data})
        }
    }
    catch(err){
        console.log(err)    
    }
}