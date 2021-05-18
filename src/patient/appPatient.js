import React, { useEffect } from 'react'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { get_list_hospitals, get_specialities_system } from '../redux/actions/adminActions'
import { get_doctors_data } from '../redux/actions/doctorActions'
import FeedBack from './components/feedback'
import Footer from './components/footer'
import Header from './components/header'
import LoginPatient from './features/auth/pages/Login'
import BookingPage from './features/BookSchedule/pages/BookingPage'
import DetailDoctorPage from './features/doctor/pages/DetailDoctorPage'
import ListDoctorPage from './features/doctor/pages/ListDoctorPage'
import Home from './features/home'
import DetailHospitalPage from './features/hospital/pages/DetailHospitalPage'
import ListHospitalPage from './features/hospital/pages/ListHospitalPage'
import ManagePatient from './features/ManagePatient';
import LoginManager from './features/auth/pages/LoginManager';

import AppDoctor from '../doctor/appDoctor';
const AppPatient = function (props) {
	console.log('getAllData');
    const dispatch = useDispatch()
	useEffect(()=> {
		dispatch(get_specialities_system());
        dispatch(get_list_hospitals());
        dispatch(get_doctors_data());
	},[])
    return (
		<Router>
			<div>
				<Route render={(props)=> <Header {...props}/>} />
					<Switch>
						<Route exact path="(/|/trang-chu)" component={Home}/>
						
						<Route exact path='/danh-sach-bac-si' component={ListDoctorPage}/>
						<Route exact path='/danh-sach-bac-si/:doctorID' component={DetailDoctorPage}/>
						<Route exact path='/danh-sach-benh-vien' component={ListHospitalPage}/>
						<Route exact path='/chi-tiet-benh-vien/:hospitalId' component={DetailHospitalPage}/>



						{/* <Route exact path='/danh-sach-bac-si' component={DoctorPage}/> */}
						{/* <Route exact path='/danh-sach-bac-si/:doctorID' component={DoctorInfo}/> */}

						{/* <Route exact path='/danh-sach-benh-vien' component={HospitalPage}/> */}
						{/* <Route exact path='/chi-tiet-benh-vien/:hospitalId' component={HospitalProfile}/> */}

						<Route exact path='/dang-nhap' component={LoginPatient}/>
						<Route exact path='/dat-kham/:doctorID/dang-nhap' component={LoginPatient}/>
						<Route exact path='/dat-kham/:doctorID' component={BookingPage}/>
						<Route exact path='/quan-li-tai-khoan' component={ManagePatient}/>
						

						{/* <Route exact path='/quan-li-tai-khoan/thong-tin' component={PatientInfo}/>
						<Route exact path='/quan-li-tai-khoan/lich-kham' component={PatientSchedule}/> */}
						<Route exact path='/patient/gopy' component={FeedBack}/>

						{/* id */}
						{/* <Route exact path='/patient/:' component={FeedBack}/> */}


						<Route exact path='/bac-si/quan-li' component={FeedBack}/>
						<Route exact path='/quan-li/dang-nhap' component={LoginManager}/>

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

