//icon
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { get_curent_user } from "../../../../actions/patientActions";
import Dropdown from "react-bootstrap/Dropdown";
import avatar from '../../../assets/images/avatar-01.jpg'
import logo1 from "../../../assets/img/bk-logo.png";
// import logo1 from "../../../assets/img/logo.jpg";

const Header = (props) => {
  const dispatch =useDispatch()
  const patient = useSelector(state=> state.patient)
  // const url = window.location.pathname.split("/").slice(0, -1).join("/");
  const url = window.location.pathname;
  useEffect(()=>{
      const token = localStorage.getItem('token')

      console.log(token)
      if(token){
        dispatch(get_curent_user(token))
      }
  },[patient.data.phone])
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
          <Link to="/patient" className="navbar-brand logo">
            <img src={logo1} className="img-fluid" alt="Logo" />
          </Link>
        </div>

        <div className="main-menu-wrapper">
          <div className="menu-header">
            <Link to="/patient" className="menu-logo">
              <img src={logo1} className="img-fluid" alt="Logo" />
            </Link>
            <a href="#0" id="menu_close" className="menu-close">
              <i className="fas fa-times"></i>
            </a>
          </div>

          {/* main menu */}
          <ul className="main-nav">
            <li className={`has-submenu ${url === "/patient" ? "active" : ""}`}>
              <NavLink to="/patient" activeClassName="active">
                Trang chủ
              </NavLink>
            </li>
            <li className={`has-submenu ${url === "/patient/dsbacsi" ? "active" : ""}`}>
              <NavLink to="/patient/dsbacsi" activeClassName="active">
                Bác sĩ
              </NavLink>
            </li>
            <li className={`has-submenu ${url === "/patient/cosoyte" ? "active" : ""}`}>
              <NavLink to="/patient/cosoyte" activeClassName="active">
                Cơ sở y tế
              </NavLink>
            </li>
            <li className={`has-submenu ${url === "/news" ? "active" : ""}`}>
              <a href="#0">
                Tin y tế<i className="fa fa-angle-down" aria-hidden="true"></i>
              </a>
            </li>
            <li className="login-link">
              <Link to="/">Login / Signup</Link>
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

            {/* <>
              <Dropdown className="user-drop nav-item dropdown has-arrow logged-item">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <img
                    className="rounded-circle"
                    src={IMG01}
                    width="31"
                    alt="Darren Elder"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="user-header">
                    <div className="avatar avatar-sm">
                      <img
                        src={IMG01}
                        alt="User"
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="user-text">
                      <h6>Darren Elder</h6>
                      <p className="text-muted mb-0">Doctor</p>
                    </div>
                  </div>
                  <Dropdown.Item href="/doctor/doctor-dashboard">
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item href="/doctor/profile-setting">
                    Profile Settings
                  </Dropdown.Item>
                  <Dropdown.Item href="/login">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </> */}
            <>
              {!patient.login && <li className="nav-item">
                <Link to="/patient/login" className="nav-link header-login">
                  Đăng nhập{" "}
                </Link>
              </li>}
              {patient.login && <li className="nav-item dropdown has-arrow">
              <Dropdown className="user-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <span className="user-img">
                    <img
                      className="rounded-circle"
                      src={avatar}
                      width="31"
                      alt="Ryan Taylor"
                    />
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" className="no-padding">
                    <div className="user-header">
                      <div className="avatar avatar-sm">
                        <img
                          src={avatar}
                          alt="User"
                          className="avatar-img rounded-circle"
                        />
                      </div>
                      <div className="user-text">
                        <h6>Ryan Taylor</h6>
                        <p className="text-muted mb-0">Administrator</p>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="/admin/profile"> My Profile</Dropdown.Item>
                  <Dropdown.Item href="/admin/settings">Settings</Dropdown.Item>
                  <Dropdown.Item href="/admin">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>}
              
            </>
          
        </ul>
      </nav>
    </header>
  )}

export default Header;
