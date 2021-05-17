import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Appointments from './pages/appointments';
import DoctorDashboard from './pages/dashboard';
import LoginContainer from './pages/login/login';
import MyPatient from './pages/mypatient';
import Password from './pages/password';
import ProfileSetting from './pages/profilesetting';
import DoctorRegister from './pages/register';
import ScheduleTiming from './pages/scheduletimings';
// import { check_doctor_login } from '../redux/actions/doctorActions';
import PatientProfile from './pages/patientprofile';
import Header from './components/header'


const AppDoctor =  ({history}) => {
	const doctor= useSelector(state=> state.doctor)
	const dispatch = useDispatch()
	// useEffect(()=>{
	// 	dispatch(check_doctor_login(history))
	// },[doctor.doctor_login])

    return (
		<>
            <Router>
                
                <div className="main-wrapper">
                    <Route render={(props)=> <Header {...props}/>} />
                    <Switch>
						<Route exact path='/bac-si' component={DoctorDashboard}/>
						<Route exact path='/bac-si/login' component={LoginContainer}/>
						{/* <Route exact path='/bac-si' component={DoctorDashboard}/> */}
						<Route exact path='/bac-si/dashboard' component={DoctorDashboard}/>
						<Route exact path='/bac-si/register' component={DoctorRegister}/>
						<Route exact path='/bac-si/appointments' component={Appointments}/>
						<Route exact path='/bac-si/my-patients' component={MyPatient}/>
						<Route exact path='/bac-si/patient-profile' component={PatientProfile}/>
						<Route exact path='/bac-si/schedule-timing' component={ScheduleTiming}/>
						<Route exact path='/bac-si/profile-setting' component={ProfileSetting}/>
						<Route exact path='/bac-si/change-passwword' component={Password}/>
					</Switch>
                </div>
            </Router>
        
        </>
					
    );
}

export default AppDoctor;

