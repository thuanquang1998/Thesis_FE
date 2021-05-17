import React,{ Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import IMG01 from '../../assets/images/doctor-thumb-02.jpg';
class DoctorSidebar extends Component{
    render(){
        return(
            <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                        <Link href="#" className="booking-doc-img">
                            <img src={IMG01} alt="User" />
                        </Link>
                        <div className="profile-det-info">
                            <h3 style={{fontWeight:"bold"}}>Bác sĩ Tô Ngọc Bình</h3>
                            
                            <div className="patient-details">
                                <h5 className="mb-0">Bệnh viện Hùng Vương</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-widget">
                   
                        
                    <Nav className="dashboard-menu">

                        <Nav.Item> 
                             <NavLink to="/bac-si/dashboard"> 
                                <i className="fas fa-columns"></i>
                                    <span>Dashboard</span>
                             </NavLink>
                         </Nav.Item>
                         
                         <Nav.Item> 
                            <NavLink to="/bac-si/appointments"  activeClassName="active">
                             <i className="fas fa-calendar-check"></i>
                                    <span>Lịch khám</span> 
                            </NavLink>
                        </Nav.Item> 

                        <Nav.Item> 
                            <NavLink to="/bac-si/my-patients">
                            <i className="fas fa-user-injured"></i>
                                    <span>Bệnh nhân</span>
                            </NavLink>
                        </Nav.Item> 
                        <Nav.Item> 
                            <NavLink to="/bac-si/schedule-timing">
                            <i className="fas fa-hourglass-start"></i>
                                    <span>Đăng kí lịch khám</span>
                            </NavLink>
                            </Nav.Item> 
                        <Nav.Item> 
                        <NavLink to="/bac-si/profile-setting">
                            <i className="fas fa-user-cog"></i>
                                <span>Thông tin tài khoản</span>
                        </NavLink> 
                        </Nav.Item> 
                        <Nav.Item> 
                        <NavLink to="/bac-si/change-passwword">
                                <i className="fas fa-lock"></i>
                                <span>Đổi mật khẩu</span>
                        </NavLink>
                        </Nav.Item> 
                        <Nav.Item> 
                        <NavLink to="/bac-si" activeClassName="active">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Đăng xuất</span>
                        </NavLink>
                        </Nav.Item> 
                    </Nav> 
                </div>
            </div>
        );
    }
}
export default DoctorSidebar;
   

