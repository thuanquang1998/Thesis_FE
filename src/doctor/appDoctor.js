import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header'
import LoadingTop from './components/loadingTop'
import PrivateRouteDoctor from './components/PrivateRouteDoctor';

import LoginManager from '../patient/features/auth/pages/LoginManager';
import DoctorDashboard from './features/DashBoardDoctor';
import DoctorProfile from './features/DoctorProfileManage';
import DoctorAppointment from './features/DoctorAppointment';
import DoctorSchedule from './features/DoctorScheduleManage';
import ChangePassword from './features/ChangePassword';
import ViewSchedule from './features/DoctorAppointment/components/ViewShedule';
import Footer from './components/footer';

const AppDoctor =  ({history}) => {
	const dispatch = useDispatch();
    const doctor= useSelector(state=> state.doctor);

    const {loadingPage, isDoctorLoggedIn, currentDoctor} = doctor;
    const accountType = currentDoctor.accountType;
   

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
                                        <DoctorDashboard/>
                                    )
                                :<Redirect to='/quan-li/dang-nhap'/>
                            )}
                        />
                        <Route exact path='/quan-li/dang-nhap' component={LoginManager}/>

                        <PrivateRouteDoctor component={DoctorDashboard} path="/bac-si/dashboard" exact/>
                        <PrivateRouteDoctor component={DoctorProfile} path="/bac-si/thong-tin-tai-khoan" exact/>
                        <PrivateRouteDoctor component={DoctorAppointment} path="/bac-si/lich-kham" exact/>
                        <PrivateRouteDoctor component={DoctorSchedule} path="/bac-si/lich-lam-viec" exact/>
                        <PrivateRouteDoctor component={ChangePassword} path="/bac-si/doi-mat-khau" exact/>
                        <PrivateRouteDoctor component={ViewSchedule} path="/bac-si/lich-lam-viec/:id" exact/>
					</Switch>
                    <Route render={(props)=> <Footer {...props}/>} />
                </div>
            </Router>
        
        </>
					
    );
}

export default AppDoctor;

