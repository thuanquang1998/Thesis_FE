import React, { useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { logout_doctor } from "../../../redux/actions/doctorActions";
import Nav from 'react-bootstrap/Nav';
import IMG01 from '../../assets/images/doctor-thumb-02.jpg';
import LoadingTop from '../loadingTop';

const DoctorSidebar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const doctor = useSelector(state=> state.doctor);
    const {currentDoctor, loadingLogin, isDoctorLoggedIn, loadingLogout, loadingPage} = doctor;
    const url = window.location.pathname;

    const [doctorData, setDoctorsData] = useState({});
    
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogoutDoctor = () => {
        setLoading(true)
        dispatch(logout_doctor());
    }


    useEffect(()=> {
        if(!loadingPage && !isDoctorLoggedIn) {
        setTimeout(() => {
            setLoading(false);
            history.push('/quan-li/dang-nhap');
        }, 500);
        }
    },[loadingPage, isDoctorLoggedIn])
   
    return(
        <div className="profile-sidebar">
            {loading && <LoadingTop/>}
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <Link href="#" className="booking-doc-img">
                        <img src={currentDoctor?.doctor.avatar_image||IMG01} alt="User" />
                    </Link>
                    <div className="profile-det-info">
                        <h3 style={{fontWeight:"bold"}}>Bác sĩ {currentDoctor?.doctor.fullName}</h3>
                        
                        <div className="patient-details">
                            <h5 className="mb-0">Bệnh viện </h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget">
                
                    
                <Nav className="dashboard-menu">

                    <Nav.Item> 
                        <NavLink to="/bac-si"> 
                            <i className="fas fa-columns"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </Nav.Item>
                        
                    <Nav.Item> 
                        <NavLink to="/bac-si/thong-tin-tai-khoan">
                            <i className="fas fa-user-cog"></i>
                            <span>Thông tin tài khoản</span>
                        </NavLink> 
                    </Nav.Item> 

                    <Nav.Item> 
                        <NavLink to="/bac-si/lich-kham"  activeClassName="active">
                            <i className="fas fa-hourglass-start"></i>
                            <span>Lịch khám</span> 
                        </NavLink>
                    </Nav.Item> 

                    <Nav.Item> 
                        <NavLink to="/bac-si/lich-lam-viec"  activeClassName="active">
                            <i className="fas fa-calendar-check"></i>
                            <span>Lịch làm việc</span> 
                        </NavLink>
                    </Nav.Item>

                    <Nav.Item> 
                        <NavLink to="/bac-si/doi-mat-khau">
                            <i className="fas fa-lock"></i>
                            <span>Đổi mật khẩu</span>
                        </NavLink>
                    </Nav.Item>

                    <Nav.Item> 
                        <NavLink to="/bac-si/dang-xuat" activeClassName="active" onClick={handleLogoutDoctor}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Đăng xuất</span>
                        </NavLink>
                    </Nav.Item> 
                </Nav> 
            </div>
        </div>
    );
}
export default DoctorSidebar;
   
