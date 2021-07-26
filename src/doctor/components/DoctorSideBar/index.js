import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { Link,NavLink, useHistory } from 'react-router-dom';
import { logout_doctor } from "../../../redux/actions/doctorActions";
import LoadingTop from '../loadingTop';


const DoctorSidebar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const doctor = useSelector(state=> state.doctor);
    const {isDoctorLoggedIn, loadingPage} = doctor;
    const url = window.location.pathname;
    console.log(`url`, url)
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
        <div className="profile-sidebar" style={{borderRadius:"10px"}}>
            {loading && <LoadingTop/>}
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <h3 style={{fontWeight:"bold", margin:"0"}}>Trang quản lí bác sĩ</h3>

                </div>
            </div>
            <div className="dashboard-widget" >
                <Nav className="dashboard-menu">
                    <Link to="/bac-si" className={`nav-item ${url==='/bac-si'?'active':''}`}>
                        <i className="fas fa-columns"></i>
                        <span>Thống kê</span> 
                    </Link>
                    <Nav.Item > 
                        <NavLink to="/bac-si/thong-tin-tai-khoan" activeClassName="active">
                            <i className="fas fa-user-cog"></i>
                            <span>Thông tin tài khoản</span>
                        </NavLink> 
                    </Nav.Item> 
                    <Nav.Item > 
                        <NavLink to="/bac-si/lich-kham" activeClassName="active">
                            <i className="fas fa-hourglass-start"></i>
                            <span>Quản lí lịch khám</span> 
                        </NavLink>
                    </Nav.Item> 
                    <Nav.Item> 
                        <NavLink to="/bac-si/lich-lam-viec"  activeClassName="active">
                            <i className="fas fa-calendar-check"></i>
                            <span>Quản lí lịch làm việc</span> 
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item> 
                        <NavLink to="/bac-si/danh-gia" activeClassName="active">
                            <i className="fas fa-lock"></i>
                            <span>Danh sách đánh giá.</span>
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item> 
                        <NavLink to="/bac-si/dang-xuat"  onClick={handleLogoutDoctor}>
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
   

