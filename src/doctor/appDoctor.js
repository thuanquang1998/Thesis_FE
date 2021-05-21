import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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
import LoadingTop from './components/loadingTop'
import PrivateRouteDoctor from './components/PrivateRouteDoctor';

import LoginManager from '../patient/features/auth/pages/LoginManager';

const AppDoctor =  ({history}) => {
	
	const dispatch = useDispatch();
    const doctor= useSelector(state=> state.doctor);

    const {loadingPage, isDoctorLoggedIn, currentDoctor} = doctor;
    const accountType = currentDoctor.accountType;
    
    // useEffect(()=> {
	// 	dispatch(get_specialities_system());
    //     dispatch(get_list_hospitals());
	// },[])

    return (
		<>
            <Router>
				{loadingPage && <LoadingTop/>}
                <div className="main-wrapper">
                    <Route render={(props)=> <Header {...props}/>} />
                    <Switch>
						<Route
                            exact path='/bac-si' render={()=>(
                                isDoctorLoggedIn? 
                                    (accountType==='doctor'? 
                                        <DoctorDashboard/>:
                                        <Appointments/>
                                    )
                                :<Redirect to='/quan-li/dang-nhap'/>
                            )}
                        />
                        <Route exact path='/quan-li/dang-nhap' component={LoginManager}/>

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

