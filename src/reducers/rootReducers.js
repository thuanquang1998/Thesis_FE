
import { combineReducers } from 'redux';

import {patientReducer} from './patientReducer';
import {doctorReducer} from './doctorReducer'
import { adminReducer } from './adminReducer';

// right now we have only 1 reducer, but lets use this format of combineReducers so you can add more later if you need to.
const rootReducer = combineReducers({
  patient: patientReducer,
  doctor : doctorReducer,
  admin : adminReducer
});

export default rootReducer;