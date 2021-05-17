import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//icon

import { faHospital } from "@fortawesome/free-regular-svg-icons";
import logo from "../../assets/img/bk-logo.png";
import IMG01 from "../../assets/images/doctor-thumb-02.jpg";
import Dropdown from "react-bootstrap/Dropdown";

const Header = (props) => {
  const url = window.location.pathname.split("/").slice(0, -1).join("/");

  return (
    
    <header className="header">
      <nav className="navbar navbar-expand-lg header-nav">
        <div className="navbar-header">
          <Link to="/bac-si" className="navbar-brand logo">
            <img src={logo} className="img-fluid" alt="Logo"/>
          </Link>
        </div>
        <ul className="nav header-navbar-rht">
          <li className="nav-item contact-item">
            <div className="header-contact-img">
              <FontAwesomeIcon icon={faHospital} />
            </div>
            <div className="header-contact-detail">
              <p className="contact-header">Liên hệ</p>
              <p className="contact-info-header"> +1 315 369 5943</p>
            </div>
          </li>

          {props.location.pathname === "/pages/voice-call" ||
          "/pages/video-call" ? (
            <>
              <Dropdown className="user-drop nav-item dropdown has-arrow logged-item">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <span style={{display:'inline-block',width:'100%', height:"100%"}}>
                        <i class="far fa-user-circle" style={{display:'block', fontSize:'40px', color:"#ddd"}}/>
                      </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="user-header">
                    <div className="avatar avatar-sm">
                      <span style={{display:'block',width:'100%', height:"100%"}}>
                        <i class="far fa-user-circle" style={{display:'block', fontSize:'40px', color:'#ddd'}}/>
                      </span>
                    </div>
                    <div className="user-text">
                      <h6 style={{paddingTop:'10px'}}>Darren Elder</h6>
                      {/* <p className="text-muted mb-0">Doctor</p> */}
                    </div>
                  </div>
                  <Dropdown.Item href="/bac-si/doctor-dashboard">
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item href="/bac-si/profile-setting">
                    Profile Settings
                  </Dropdown.Item>
                  <Dropdown.Item href="/login">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link header-login">
                  login / Signup{" "}
                </Link>
              </li>{" "}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
