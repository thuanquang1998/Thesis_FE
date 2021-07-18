import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginManager from '../patient/features/auth/pages/LoginManager';
import Footer from './components/footer';
import Header from './components/header';
import LoadingTop from './components/loadingTop';
import PrivateRouteDoctor from './components/PrivateRouteDoctor';
import ChangePassword from './features/ChangePassword';
import DoctorDashboard from './features/DashBoardDoctor';
import DoctorAppointment from './features/DoctorAppointment';
import ViewSchedule from './features/DoctorAppointment/components/ViewShedule';
import DoctorProfile from './features/DoctorProfileManage';
import DoctorSchedule from './features/DoctorScheduleManage';
import ReviewDoctor from './features/ReviewDoctor';

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
                                        <DoctorDashboard doctorData={doctor}/>:
                                        <DoctorDashboard/>
                                    )
                                :<Redirect to='/quan-li/dang-nhap'/>
                            )}
                        />
                        <Route exact path='/quan-li/dang-nhap' component={LoginManager}/>

                        <PrivateRouteDoctor component={DoctorDashboard} path="/bac-si" exact/>
                        <PrivateRouteDoctor component={DoctorProfile} path="/bac-si/thong-tin-tai-khoan" exact/>
                        <PrivateRouteDoctor component={DoctorAppointment} path="/bac-si/lich-kham" exact/>
                        <PrivateRouteDoctor component={DoctorSchedule} path="/bac-si/lich-lam-viec" exact/>
                        <PrivateRouteDoctor component={ChangePassword} path="/bac-si/doi-mat-khau" exact/>
                        <PrivateRouteDoctor component={ViewSchedule} path="/bac-si/lich-kham/:id" exact/>
                        <PrivateRouteDoctor component={ReviewDoctor} path="/bac-si/danh-gia" exact/>
					</Switch>
                    <Route render={(props)=> <Footer {...props}/>} />
                </div>
            </Router>
        
        </>
					
    );
}

export default AppDoctor;

