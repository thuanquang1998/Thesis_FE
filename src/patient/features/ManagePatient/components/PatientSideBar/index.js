import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import IMG01 from '../../../../assets/images/doctor-thumb-02.jpg';
import './style.css';



const PatientSidebar = () => {
    const location = useLocation();
    const url = location.pathname;
    const patient = useSelector(state=>state.patient)
    const patientInfo = patient.currentUser.patientInfo;
    return(
        <div className="profile-sidebar" style={{borderRadius:"20px !important"}}>
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    {/* <Link to="#" className="booking-doc-img">
                        <img src={`http://localhost:3002/images/avatar/user.png`||IMG01} alt="User" />
                    </Link> */}
                    <div className="profile-det-info">
                        <h3 style={{fontWeight:"bold"}}>{patientInfo.fullName}</h3>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget">
                
                    
                <Nav className="dashboard-menu">

                    {/* <Nav.Item> 
                        <NavLink to="/doctor/dashboard"> 
                        <i className="fas fa-columns"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </Nav.Item> */}
                    <Nav.Item className={`nav-item ${url==='/quan-li-tai-khoan'?'active-nav':''}`}> 
                        <NavLink to='/quan-li-tai-khoan'>
                            <i className="fas fa-user-cog"></i>
                                <span>Thông tin tài khoản</span>
                        </NavLink> 
                    </Nav.Item> 
                    
                    <Nav.Item className={`nav-item ${url==='/quan-li-lich-kham'?'active-nav':''}`}> 
                        <NavLink to='/quan-li-lich-kham'>
                            <i className="fas fa-calendar-check"></i>
                                <span>Quản lí lịch khám</span> 
                        </NavLink>
                    </Nav.Item> 

                    <Nav.Item> 
                        <NavLink to="/doctor" activeClassName="active">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Đăng xuất</span>
                        </NavLink>
                    </Nav.Item> 
                </Nav> 
            </div>
        </div>
    );
}
export default PatientSidebar;
   

