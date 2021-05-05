import React,{ Component } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import IMG01 from '../../../../doctor/assets/images/doctor-thumb-02.jpg';
import './style.css'
const PatientSidebar = () => {
    const location = useLocation();
    console.log('location :>> ', location);
    const url = location.pathname;
    return(
        <div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <Link href="#" className="booking-doc-img">
                        <img src={IMG01} alt="User" />
                    </Link>
                    <div className="profile-det-info">
                        <h3 style={{fontWeight:"bold"}}>+0974101702</h3>
                        
                        {/* <div className="patient-details">
                            <h5 className="mb-0">Bệnh viện Hùng Vương</h5>
                        </div> */}
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
                    <Nav.Item className={`nav-item ${url==='/patient/quanlitaikhoan'?'active-nav':''}`}> 
                        <NavLink to="/patient/quanlitaikhoan">
                            <i className="fas fa-user-cog"></i>
                                <span>Thông tin tài khoản</span>
                        </NavLink> 
                    </Nav.Item> 
                        <Nav.Item> 
                        <NavLink to="/doctor/appointments"  activeClassName="active">
                            <i className="fas fa-calendar-check"></i>
                                <span>Quản lí lịch khám</span> 
                        </NavLink>
                    </Nav.Item> 

                    
                    
                    <Nav.Item> 
                        <NavLink to="/doctor/change-passwword">
                                <i className="fas fa-lock"></i>
                                <span>Đổi mật khẩu</span>
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
   

