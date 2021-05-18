
import React ,{useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Specialities from './pages/specialities'
import Header from './components/header'
import HospitalPage from './pages/hospitals'
import Dashboard from './pages/dashboard'
import HospitalCreate from './pages/hospitals/hospitals-create'
import Login from './components/login'
import DashboardHospital from './pages/adminHospital/dashboardHospital'
import HospitalInfo from './pages/adminHospital/hospitalInfo'
import DoctorList from './pages/adminHospital/doctorList'
import Employees from './pages/adminHospital/employees'
import SpecialitiesHospital from './pages/adminHospital/specialitiesHospital'
import ManageSchedule from './pages/adminHospital/manageSchedule'
import Reviews from './pages/adminHospital/reviews'
import {useDispatch, useSelector} from 'react-redux'
import LoadingTop from './components/loadingTop';
import DashboardSystem from './features/AdminRoot/pages/DashboardSystem/index';

import PrivateRouteAdmin from './components/Route/PrivateRouteAdmin';


const AppAdmin =({match})=>{
    const admin = useSelector(state=>state.admin);
    const {loadingPage, isAdminLoggedIn} = admin;

    return(
        <>
            <Router>
                <div className="main-wrapper">
                    {loadingPage && <LoadingTop/>}
                    <Route render={(props)=> <Header {...props}/>} />
                    <Switch>

                        <PrivateRouteAdmin component={DashboardSystem} path="/admin" exact/>
                        <PrivateRouteAdmin component={Specialities} path="/admin/chuyen-khoa" exact/>
                        <PrivateRouteAdmin component={HospitalPage} path="/admin/cosoyte"/>
                        <PrivateRouteAdmin component={HospitalCreate} path="/admin/cosoyte/them-bv" exact/>

                        <Route exact path='/admin/dang-nhap' component={Login}/>

                        <Route exact path='/admin/dashboard' component={Dashboard}/>

                        {/* <Route exact path='/admin/chuyen-khoa' component={Specialities}/>
                        <Route exact path='/admin/cosoyte/them-bv' component={HospitalCreate} /> */}
                        
                        
                        {/* route for admin hospital */}
                        <Route exact path='/admin/dashboard-bv' component={DashboardHospital}/>
                        <Route exact path='/admin/benhviena/thongtin' component={HospitalInfo}/>
                        <Route exact path='/admin/benhviena/dsbacsi' component={DoctorList}/>
                        <Route exact path='/admin/benhviena/nhanvien' component={Employees}/>
                        <Route exact path='/admin/benhviena/chuyenkhoa' component={SpecialitiesHospital}/>
                        <Route exact path='/admin/benhviena/dslichkham' component={ManageSchedule}/>
                        <Route exact path='/admin/benhviena/danhgia' component={Reviews}/>

                        <Route exact path='/admin/dashboard-system' component={DashboardSystem}/>

                    </Switch>
                </div>
            </Router>
        
        </>
    )
}
export default AppAdmin