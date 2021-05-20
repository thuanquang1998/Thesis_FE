
import React ,{ useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Header from './components/header'
import Login from './components/login'
import {useDispatch, useSelector} from 'react-redux'
import LoadingTop from './components/loadingTop';
import DashboardSystem from './features/AdminRoot/pages/DashboardSystem/index';
import PrivateRouteAdmin from './components/Route/PrivateRouteAdmin';
import HospitalsPage from './features/AdminRoot/pages/HospitalsPage';
import CreateHospital from './features/AdminRoot/pages/CreateHospital';
import SpecialitiesRoot from './features/AdminRoot/pages/SpecialitiesRoot';

import DashboardHospital from './features/AdminHospital/pages/DashboardHospital';
import Appoinments from './features/AdminHospital/pages/Appoinments';
import Specialities from './features/AdminHospital/pages/Specialities';
import Employees from './features/AdminHospital/pages/Employees';
import Reviews from './features/AdminHospital/pages/Reviews';
import HospitalInfo from './features/AdminHospital/pages/HospitalInfo';
import CreateDoctor from './features/AdminHospital/components/CreateDoctor';

import { get_specialities_system, get_list_hospitals } from '../redux/actions/adminActions';


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
                                            <SpecialitiesRoot/>
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


                    </Switch>
                </div>
            </Router>
        
        </>
    )
}
export default AppAdmin