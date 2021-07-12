// @flow
import * as AdminActions from './adminActions'
import * as DoctorActions from './doctorActions'
import * as loadingActions from './loadingActions'
import * as patientActions from './patientActions'

const Actions = {
  ...AdminActions,
  ...DoctorActions,
  ...loadingActions,
  ...patientActions,
}

export default Actions