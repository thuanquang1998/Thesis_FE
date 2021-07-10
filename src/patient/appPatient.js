import React, { useEffect } from 'react'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppDoctor from '../doctor/appDoctor'
import { get_list_hospitals, get_specialities_system, get_doctors_system } from '../redux/actions/adminActions'
import { get_doctors_data } from '../redux/actions/doctorActions'
import Footer from './components/footer'
import Header from './components/header'
import PrivateRoute from './components/Route/PrivateRoute'
import LoginPatient from './features/auth/pages/Login'
import LoginManager from './features/auth/pages/LoginManager'
import BookingPage from './features/BookSchedule/pages/BookingPage'
import DetailDoctorPage from './features/doctor/pages/DetailDoctorPage'
import ListDoctorPage from './features/doctor/pages/ListDoctorPage'
import Home from './features/home'
import DetailHospitalPage from './features/hospital/pages/DetailHospitalPage'
import ListHospitalPage from './features/hospital/pages/ListHospitalPage'
import PatientInfo from './features/ManagePatient/pages/PatientInfo'
import PatientSchedule from './features/ManagePatient/pages/PatientSchedule'


const AppPatient = function (props) {
	console.log('getAllData');
    const dispatch = useDispatch()
	useEffect(()=> {
		dispatch(get_specialities_system());
        dispatch(get_list_hospitals());
        // dispatch(get_doctors_data());
		dispatch(get_doctors_system());
	},[])
    return (
		<Router>
			<div>
				<Route render={(props)=> <Header {...props}/>} />
					<Switch>
						{/* public route */}
						<Route exact path="(/|/trang-chu)" component={Home}/>
						<Route exact path='/danh-sach-bac-si' component={ListDoctorPage}/>
						<Route exact path='/danh-sach-bac-si/:doctorID' component={DetailDoctorPage}/>
						<Route exact path='/danh-sach-benh-vien' component={ListHospitalPage}/>
						<Route exact path='/chi-tiet-benh-vien/:hospitalId' component={DetailHospitalPage}/>
						<Route exact path='/dang-nhap' component={LoginPatient}/>
						<Route exact path='/dat-kham/:doctorID/dang-nhap' component={LoginPatient}/>

						{/* private route */}
						<Route exact path='/dat-kham/:doctorID' component={BookingPage}/>

						<PrivateRoute component={PatientInfo} path="/quan-li-tai-khoan" exact/>
						<PrivateRoute component={PatientSchedule} path="/quan-li-lich-kham" exact/>

						{/* <Route exact path='/quan-li-tai-khoan' component={ManagePatient}/> */}
						<Route exact path='/quan-li/dang-nhap' component={LoginManager}/>
						<Route exact path='/bac-si' component={AppDoctor}/>
						
						<Route path="*">
							<div>404 Not Found</div>
						</Route>
					</Switch>
					<MessengerCustomerChat
						pageId="105374011705694"
						appId="1164522647358198"
						// htmlRef="<REF_STRING>"
					/>
				<Route render={(props)=><Footer {...props}/>} />
			</div>
		</Router>
    );
}

export default AppPatient;

