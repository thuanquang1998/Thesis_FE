//icon
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { logoutPatient } from "../../../redux/actions/patientActions";
// import Dropdown from "react-bootstrap/Dropdown";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logo1 from "../../assets/img/bk-logo.png";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const patient = useSelector(state=> state.patient);
  const url = window.location.pathname;
  
  const [userName, setUserName] = useState('');
  useEffect(() => {
    if(patient.isLoggedIn) {
      setUserName(patient.currentUser.patientInfo?patient.currentUser.patientInfo.fullName:'User');
    }
  }, [patient.isLoggedIn])
  const handleLogoutPatient = () => {
    dispatch(logoutPatient());
    history.push('/');
  }
  const menu = (
    <Menu>
      {/* patient dashboard */}
      <Menu.Item key="0">
        <a href="/quan-li-tai-khoan">Tổng quan tài khoản</a> 
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogoutPatient} key="3">Đăng xuất</Menu.Item>
    </Menu>
  );
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg header-nav">

        <div className="navbar-header">
          {/* mobile btn */}
          <a href="#0" id="mobile_btn">
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <Link to="/" className="navbar-brand logo">
            <img src={logo1} className="img-fluid" alt="Logo" />
          </Link>
        </div>

        <div className="main-menu-wrapper">
          <div className="menu-header">
            <Link to="/" className="menu-logo">
              <img src={logo1} className="img-fluid" alt="Logo" />
            </Link>
            <a href="#0" id="menu_close" className="menu-close">
              <i className="fas fa-times"></i>
            </a>
          </div>

          {/* main menu */}
          <ul className="main-nav">
            <li className={`has-submenu ${url === "/" ? "active" : ""}`}>
              <NavLink to="/" activeClassName="active">
                Trang chủ
              </NavLink>
            </li>
            <li className={`has-submenu ${url === "/danh-sach-bac-si" ? "active" : ""}`}>
              <NavLink to="/danh-sach-bac-si" activeClassName="active">
                Bác sĩ
              </NavLink>
            </li>
            <li className={`has-submenu ${url === "/danh-sach-benh-vien" ? "active" : ""}`}>
              <NavLink to="/danh-sach-benh-vien" activeClassName="active">
                Cơ sở y tế
              </NavLink>
            </li>
            {/* <li className={`has-submenu ${url === "/news" ? "active" : ""}`}>
              <a href="#0">
                Tin y tế<i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
            </li> */}
            <li className="login-link">
              <Link to="/">Đăng nhập</Link>
            </li>
          </ul>
        </div>

        <ul className="nav header-navbar-rht">
          <li className="nav-item contact-item">
            <div className="header-contact-img">
              <FontAwesomeIcon icon={faHospital} />
            </div>
            <div className="header-contact-detail">
              <p className="contact-header">Liên hệ</p>
              <p className="contact-info-header"> 1900 8168</p>
            </div>
          </li>
            <>
              {!patient.isLoggedIn && <li className="nav-item">
                <Link to="/dang-nhap" className="nav-link header-login">
                  Đăng nhập{" "}
                </Link>
              </li>}
              {patient.isLoggedIn &&
                <li className="nav-item">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      {userName} <DownOutlined />
                    </a>
                  </Dropdown>
                </li>
                
              }
            </>
        </ul>
      </nav>
    </header>
  )}

export default Header;
