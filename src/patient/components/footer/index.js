import React from 'react';
import { Link } from 'react-router-dom';
import {Col, Row} from 'antd';
import logo from '../../assets/img/bk-logo.png'
import './style.css'
const Footer = (props) => {
 	const exclusionArray = [
		'/pages/doctor-grid',
		'/pages/doctor-list',
		'/pages/video-call',
		'/pages/voice-call',
		'/pages/chat-doctor',
		'/patient/doctor-list',
		'/patient/doctor-grid'
	]
	if (exclusionArray.indexOf(props.location.pathname) >= 0) {
		return '';
	}
	return (
        <footer className="patient__footer">
            <Row>
                <Col>
                    <div className="footer-logo">
                        <img src={logo} alt="logo" />
                    </div>
                </Col>
                <Col>
                    <div className="footer-content">

                    </div>
                </Col>
            </Row>
            
            
        </footer>
        // <footer className="footer">
        //     <div className="footer-top">
        //         <div className="container-fluid">
        //             <div className="row">
        //                 <div className="col-lg-3 col-md-6">
        //                     <div className="footer-widget footer-about">
        //                         <div className="footer-logo">
        //                             <img src={logo} alt="logo" />
        //                         </div>
        //                         <div className="footer-about-content">
        //                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                   
        //                         </div>
        //                     </div>
        //                 </div>
                        
        //                 <div className="col-lg-3 col-md-6">
        //                     <div className="footer-widget footer-menu">
        //                         <h2 className="footer-title">For Patients</h2>
        //                         <ul>
        //                             <li><Link to="/patient/search-doctor">Search for Doctors</Link></li>
        //                             <li><Link to="/login">Login</Link></li>
        //                             <li><Link to="/register">Register</Link></li>
        //                             <li><Link to="/patient/booking">Booking</Link></li>
        //                             <li><Link to="/patient/dashboard">Patient Dashboard</Link></li>
        //                         </ul>
        //                     </div>
        //                 </div>
                        
        //                 <div className="col-lg-3 col-md-6">
        //                     <div className="footer-widget footer-menu">
        //                         <h2 className="footer-title">For Doctors</h2>
        //                         <ul>
        //                             <li><Link to="/doctor/appointments">Appointments</Link></li>
        //                             <li><Link to="/doctor/chat-doctor">Chat</Link></li>
        //                             <li><Link to="/login">Login</Link></li>
        //                             <li><Link to="/doctor/doctor-register">Register</Link></li>
        //                             <li><Link to="/doctor/doctor-dashboard">Doctor Dashboard</Link></li>
        //                         </ul>
        //                     </div>
        //                 </div>
                        
        //                 <div className="col-lg-3 col-md-6">
        //                     <div className="footer-widget footer-contact">
        //                         <h2 className="footer-title">Liên hệ</h2>
        //                         <div className="footer-contact-info">
        //                             <div className="footer-address">
        //                                 <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
        //                                 <p> 268 Lý Thường Kiệt, phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</p>
        //                             </div>
        //                             <p>
        //                             <i className="fa fa-phone" aria-hidden="true"></i>
        //                                 +1 315 369 5943
        //                             </p>
        //                             <p className="mb-0">
        //                             <i className="fa fa-envelope" aria-hidden="true"></i>
        //                                 bkcare@gmail.com
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        
        //     <div className="footer-bottom">
        //         <div className="container-fluid">
        //             <div className="copyright">
        //                 <div className="row">
        //                     <div className="col-md-6 col-lg-6">
        //                         <div className="copyright-text">
        //                             <p className="mb-0">&copy; 2020 BKCare</p>
        //                         </div>
        //                     </div>
        //                     <div className="col-md-6 col-lg-6" style={{display:"float-right"}}>
        //                         <div className="copyright-menu">
        //                             <div className="social-icon">
        //                                 <ul>
        //                                     <li>
        //                                         <a href="#0"><i className="fab fa-facebook-f"></i></a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#0"><i className="fab fa-twitter"></i> </a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#0"><i className="fab fa-linkedin-in"></i></a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#0"><i className="fab fa-instagram"></i></a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#0"><i className="fab fa-dribbble"></i> </a>
        //                                     </li>
        //                                 </ul>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
	);
};

export default Footer;