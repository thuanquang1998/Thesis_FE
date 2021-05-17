
import React ,{useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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
const Admin =({match})=>{
    return(
        <>
            <Router>
                
                <div className="main-wrapper">
                    <Route render={(props)=> <Header {...props}/>} />
                    <Switch>
                        <Route exact path='/admin' component={Login}/>
                        <Route exact path='/admin/dang-nhap' component={Login}/>

                        <Route exact path='/admin/dashboard' component={Dashboard}/>
                        {/* <Route exact path='/admin/login' component={Login}/> */}
                        <Route exact path='/admin/chuyen-khoa' component={Specialities}/>
                        <Route exact path='/admin/cosoyte' component={HospitalPage}/>
                        <Route exact path='/admin/cosoyte/them-bv' component={HospitalCreate} />
                        
                        {/* route for admin hospital */}
                        <Route exact path='/admin/dashboard-bv' component={DashboardHospital}/>
                        <Route exact path='/admin/benhviena/thongtin' component={HospitalInfo}/>
                        <Route exact path='/admin/benhviena/dsbacsi' component={DoctorList}/>
                        <Route exact path='/admin/benhviena/nhanvien' component={Employees}/>
                        <Route exact path='/admin/benhviena/chuyenkhoa' component={SpecialitiesHospital}/>
                        <Route exact path='/admin/benhviena/dslichkham' component={ManageSchedule}/>
                        <Route exact path='/admin/benhviena/danhgia' component={Reviews}/>
                    </Switch>
                </div>
            </Router>
        
        </>
    )
}
export default Admin