
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { get_list_hospitals, get_specialities_system } from '../redux/actions/adminActions'
import Header from './components/header'
import LoadingTop from './components/loadingTop'
import Login from './components/login'
import PrivateRouteAdmin from './components/Route/PrivateRouteAdmin'
import CreateDoctor from './features/AdminHospital/components/CreateDoctor'
import Appoinments from './features/AdminHospital/pages/Appoinments'
import DashboardHospital from './features/AdminHospital/pages/DashboardHospital'
import Employees from './features/AdminHospital/pages/Employees'
import HospitalInfo from './features/AdminHospital/pages/HospitalInfo'
import Reviews from './features/AdminHospital/pages/Reviews'
import ScheduleDoctorPage from './features/AdminHospital/pages/ScheduleDoctorPage'
import ScheduleWork from './features/AdminHospital/pages/ScheduleWork'
import Specialities from './features/AdminHospital/pages/Specialities'
import CreateHospital from './features/AdminRoot/pages/CreateHospital'
import DashboardSystem from './features/AdminRoot/pages/DashboardSystem/index'
import HospitalsPage from './features/AdminRoot/pages/HospitalsPage'
import SpecialitiesRoot from './features/AdminRoot/pages/SpecialitiesRoot'
import AgentTest from './features/AdminHospital/pages/AgentTest'
import Agent from './features/AgentHospital'
import AgentBooking from './features/AgentHospital/page/AgentBooking';

const AppAdmin =({match})=>{
    const dispatch = useDispatch();
    const admin = useSelector(state=>state.admin);
    const {loadingPage, isAdminLoggedIn, currentAdmin} = admin;
    const accountType = currentAdmin.accountType;
    
    useEffect(()=> {
		dispatch(get_specialities_system());
        dispatch(get_list_hospitals());
	},[])
    return(
        <>
            <Router>
                <div className="main-wrapper">
                    {loadingPage && <LoadingTop/>}
                    <Route render={(props)=> <Header {...props}/>} />
                    <Switch>
                        <Route
                            exact path='/admin' render={()=>(
                                isAdminLoggedIn? 
                                    (accountType==='system-admin'? 
                                        <DashboardSystem/>:
                                        (accountType==='hospital-admin'?
                                            <DashboardHospital/>:
                                            <Agent/>
                                        )
                                    )
                                :<Redirect to='/admin/dang-nhap'/>
                            )}
                        />
                        <Route exact path='/admin/dang-nhap' component={Login}/>

                        {/* admin root */}
                        <PrivateRouteAdmin component={DashboardSystem} path="/admin/root" exact/>
                        <PrivateRouteAdmin component={HospitalsPage} path="/admin/root/benh-vien" exact/>
                        <PrivateRouteAdmin component={SpecialitiesRoot} path="/admin/root/chuyen-khoa" exact/>
                        <PrivateRouteAdmin component={CreateHospital} path="/admin/root/benh-vien/them-benh-vien" exact/>

                        {/* admin hospital */}
                        <PrivateRouteAdmin component={DashboardHospital} path="/admin/hospital" exact/>
                        <PrivateRouteAdmin component={Appoinments} path="/admin/hospital/lich-kham" exact/>
                        <PrivateRouteAdmin component={HospitalInfo} path="/admin/hospital/thong-tin" exact/>
                        <PrivateRouteAdmin component={Employees} path="/admin/hospital/nhan-vien" exact/>
                        <PrivateRouteAdmin component={Specialities} path="/admin/hospital/chuyen-khoa" exact/>
                        <PrivateRouteAdmin component={Reviews} path="/admin/hospital/danh-gia" exact/>
                        <PrivateRouteAdmin component={CreateDoctor} path="/admin/hospital/nhan-vien/them" exact/>
                        <PrivateRouteAdmin component={ScheduleDoctorPage} path="/admin/hospital/lich-lam-viec" exact/>
                        <PrivateRouteAdmin component={ScheduleDoctorPage} path="/admin/hospital/lich-lam-viec/:id" exact/>

                        {/* agent hospital */}
                        <PrivateRouteAdmin component={ScheduleDoctorPage} path="/admin/agent/lich-lam-viec" exact/>
                        <PrivateRouteAdmin component={AgentBooking} path="/admin/agent/dat-lich" exact/>

                    </Switch>
                </div>
            </Router>
        
        </>
    )
}
export default AppAdmin