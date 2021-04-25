import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'
import DoctorPage from './pages/doctor-page/list-doctors'
import DoctorInfo from './pages/doctor-page/doctor-profile'
import Home from './pages/home'
import HospitalPage from './pages/hospitals'
import HospitalProfile from './pages/hospitals/hospital-profile'
import LoginPatient from './pages/login'
import PatientInfo from './pages/booking'
import PatientDashboard from './pages/patient-dashboard'
import FeedBack from './pages/feedback'
const AppPatient = function (props) {
    return (
			<Router>
				<div>
			    <Route render={(props)=> <Header {...props}/>} />
				<Switch>
					<Switch>
						<Route exact path='/patient' component={Home}/>
						<Route exact path='/patient/dsbacsi' component={DoctorPage}/>
						<Route exact path='/patient/doctor-list/:doctorID' component={DoctorInfo}/>
z						<Route exact path='/patient/cosoyte' component={HospitalPage}/>
						{/* <Route exact path='/patient/doctor-profile' component={DoctorInfo}/> */}
						<Route exact path='/patient/cosoyte/profile' component={HospitalProfile}/>
						<Route exact path='/patient/login' component={LoginPatient}/>
						<Route exact path='/patient/:doctorID/datlich' component={PatientInfo}/>
						<Route exact path='/patient/quanlitaikhoan' component={PatientDashboard}/>
						<Route exact path='/patient/gopy' component={FeedBack}/>

						{/* id */}
						{/* <Route exact path='/patient/:' component={FeedBack}/> */}


					</Switch>
				</Switch>
				<Route render={(props)=><Footer {...props}/>} />
		       </div>
			
			</Router>
    );
}

export default AppPatient;

