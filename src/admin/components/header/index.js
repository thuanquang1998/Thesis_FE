import { faHospital } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { logoutManager } from "../../../redux/actions/adminActions";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LoadingTop from '../../components/loadingTop';
import bkLogo from '../../assets/img/bk-logo.png'
import './style.css'


const Header = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const admin = useSelector(state=> state.admin);
  const {currentAdmin, loadingLogin, isAdminLoggedIn, loadingLogout, loadingPage} = admin;
  const url = window.location.pathname;
  
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if(!loadingLogin && isAdminLoggedIn) {
      switch (currentAdmin.accountType) {
        case 'system-admin':
          setUserName('Admin System');
          break;
        case 'hospital-admin':
          setUserName('Admin Hospital');
          break;
        case 'agent':
          setUserName('Nhân viên hỗ trợ');
          break;
        default:
          setUserName('User')
          break;
      }
    }
  },[admin])

  useEffect(()=> {
    if(location.pathname.split("/")[1] === 'admin') {
      require('../../assets/css/app.css')
      require('../../assets/css/fontawesome.min.css')
    }
  },[])

  useEffect(()=> {
    if(!loadingPage && !isAdminLoggedIn) {
      setTimeout(() => {
        setLoading(false);
        history.push('/admin/dang-nhap');
      }, 500);
    }
  },[loadingPage, isAdminLoggedIn])



  const handleLogoutManager = () => {
    setLoading(true)
    dispatch(logoutManager());
  }

  const handlesidebar=()=>{
    console.log('d');
    document.body.classList.toggle('mini-sidebar');
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/quan-li-tai-khoan">Tổng quan tài khoản</a> 
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogoutManager} key="3">Đăng xuất</Menu.Item>
    </Menu>
  );
  return (
    <div>
        <div className="header__admin">
          <div className="header-left">
            <Link to="/admin" className="logo">
              <img src={bkLogo} alt="Logo" width="200" height="100%"/>
            </Link>
            <Link to="/admin" className="logo logo-small">
              <img src={bkLogo} alt="Logo" width="30" height="50" />
            </Link>
          </div>

          <a href="#0" id="toggle_bttn" onClick={handlesidebar}>
					  <i className="fe fe-text-align-left"></i>
				  </a>
          <a href="#0" className="mobile_btn" id="mobile_btn">
            <i className="fa fa-bars"></i>
          </a>

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
                {!isAdminLoggedIn && <li className="nav-item">
                  <Link to="/admin/dang-nhap" className="nav-link header-login">
                    Đăng nhập{" "}
                  </Link>
                </li>}
                {isAdminLoggedIn &&
                  <li className="nav-item">
                    <Dropdown overlay={menu} trigger={['click']}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <h4>{userName}<DownOutlined style={{marginBottom:0}}/></h4> 
                      </a>
                    </Dropdown>
                  </li>
                }
              </>
          </ul>

        </div>
      </div>
  )}

export default Header;

