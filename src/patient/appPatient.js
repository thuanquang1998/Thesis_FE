import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'
import DoctorPage from './pages/doctor-page'
import DoctorInfo from './pages/doctor-page/doctor-profile'
import Home from './pages/home'
import HospitalPage from './pages/hospitals'
import HospitalProfile from './pages/hospitals/hospital-profile'
import LoginPatient from './pages/login'
import BookingPage from './pages/booking'
import PatientDashboard from './pages/patient-dashboard'
import PatientInfo from './pages/patient-dashboard/patient-info';
import FeedBack from './pages/feedback'
import {useDispatch , useSelector} from 'react-redux'
import { get_list_hospitals, get_specialities_system } from '../redux/actions/adminActions';
import { get_doctors_data } from '../redux/actions/doctorActions';

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
						<Route exact path='/patient' component={Home}/>
						<Route exact path='/patient/dsbacsi' component={DoctorPage}/>

						<Route exact path='/patient/doctor-list/:doctorID' component={DoctorInfo}/>
						<Route exact path='/patient/cosoyte' component={HospitalPage}/>
						{/* <Route exact path='/patient/doctor-profile' component={DoctorInfo}/> */}
						<Route exact path='/patient/cosoyte/profile' component={HospitalProfile}/>
						<Route exact path='/patient/login' component={LoginPatient}/>
						<Route exact path='/patient/:doctorID/datlich/login' component={LoginPatient}/>

						<Route exact path='/patient/:doctorID/datlich' component={BookingPage}/>
						<Route exact path='/patient/quanlitaikhoan' component={PatientInfo}/>
						<Route exact path='/patient/gopy' component={FeedBack}/>

						{/* id */}
						{/* <Route exact path='/patient/:' component={FeedBack}/> */}
					</Switch>
				<Route render={(props)=><Footer {...props}/>} />
			</div>
		</Router>
    );
}

export default AppPatient;

