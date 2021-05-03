
import {all, call, fork} from 'redux-saga/effects'
import patientSaga from './patientSaga'
import doctorSaga from './doctorSaga'

import adminSaga from './adminSaga'

export default function* rootSaga(){
    yield all([patientSaga() , adminSaga(), doctorSaga()])
}







