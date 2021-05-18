
import React ,{useState} from 'react'
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

const AppAdmin =({match})=>{
    const admin = useSelector(state=>state.admin);
    console.log('admin :>> ', admin);
    const {loadingPage, isAdminLoggedIn, currentAdmin} = admin;
    const accountType = currentAdmin.accountType;

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
                                (accountType==='system-admin'? <DashboardSystem/>:<SpecialitiesRoot/>)
                                :<Redirect to='/admin/dang-nhap'/>
                            )}
                        />
                        <Route exact path='/admin/dang-nhap' component={Login}/>

                        {/* admin root */}
                        <PrivateRouteAdmin component={DashboardSystem} path="/admin/root" exact/>
                        <PrivateRouteAdmin component={HospitalsPage} path="/admin/root/benh-vien" exact/>
                        <PrivateRouteAdmin component={SpecialitiesRoot} path="/admin/root/chuyen-khoa" exact/>
                        <PrivateRouteAdmin component={CreateHospital} path="/admin/root/benh-vien/them-benh-vien" exact/>




                        {/* <PrivateRouteAdmin component={Specialities} path="/admin/chuyen-khoa" exact/>
                        <PrivateRouteAdmin component={HospitalPage} path="/admin/cosoyte"/>
                        <PrivateRouteAdmin component={HospitalCreate} path="/admin/cosoyte/them-bv" exact/> */}

                        

                        {/* <Route exact path='/admin/dashboard' component={Dashboard}/> */}

                        {/* <Route exact path='/admin/chuyen-khoa' component={Specialities}/> */}
                        
                        
                        {/* route for admin hospital */}
                        {/* <Route exact path='/admin/dashboard-bv' component={DashboardHospital}/>
                        <Route exact path='/admin/benhviena/thongtin' component={HospitalInfo}/>
                        <Route exact path='/admin/benhviena/dsbacsi' component={DoctorList}/>
                        <Route exact path='/admin/benhviena/nhanvien' component={Employees}/>
                        <Route exact path='/admin/benhviena/chuyenkhoa' component={SpecialitiesHospital}/>
                        <Route exact path='/admin/benhviena/dslichkham' component={ManageSchedule}/>
                        <Route exact path='/admin/benhviena/danhgia' component={Reviews}/>

                        <Route exact path='/admin/dashboard-system' component={DashboardSystem}/> */}

                    </Switch>
                </div>
            </Router>
        
        </>
    )
}
export default AppAdmin