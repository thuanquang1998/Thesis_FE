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
import { check_doctor_login } from '../actions/doctorActions';
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
						<Route exact path='/doctor/login' component={LoginContainer}/>
						<Route exact path='/doctor' component={DoctorDashboard}/>
						<Route exact path='/doctor/dashboard' component={DoctorDashboard}/>
						<Route exact path='/doctor/register' component={DoctorRegister}/>
						<Route exact path='/doctor/appointments' component={Appointments}/>
						<Route exact path='/doctor/my-patients' component={MyPatient}/>
						<Route exact path='/doctor/patient-profile' component={PatientProfile}/>
						<Route exact path='/doctor/schedule-timing' component={ScheduleTiming}/>
						<Route exact path='/doctor/profile-setting' component={ProfileSetting}/>
						<Route exact path='/doctor/change-passwword' component={Password}/>
					</Switch>
                </div>
            </Router>
        
        </>
					
    );
}

export default AppDoctor;

