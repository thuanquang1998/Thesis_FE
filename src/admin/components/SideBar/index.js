import React, { Component } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from 'react-redux';

const SidebarNav = (props) => {
  const location = useLocation();
  let pathname = location.pathname
  const admin = useSelector(state=>state.admin)
  const {currentAdmin, isAdminLoggedIn} = admin; 
  const { accountType } = currentAdmin;


  return (
    <div className="sidebar" id="sidebar">
      <div className="primary-nav">
        <nav role="navigation" className="menu">
          <Scrollbars
            style={{
              width: 250,
              height: "100%",
              backgroundColor: "rgb(121 145 165)",
            }}
            className="menu"
          >
            <Link to="/admin" className="logotype">
              LOGO<span>TYPE</span>
            </Link>
            <div className="overflow-container">
              <ul className="menu-dropdown">
                <li className="menu-title"><span></span></li>
                
                { accountType === 'system-admin' && (
                  <>
                    <h4 style={{textAlign:"center", color:"white"}}>Quản lí hệ thống</h4>
                    <li className={`${'/admin' === pathname ? 'active' : '' }`}>
                      <Link to="/admin"><i className="fa fa-home"></i>Dashboard</Link>
                    </li>
                    <li className={`${'/admin/root/benh-vien' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/root/benh-vien"><i className="fa fa-hospital"></i>Cơ sở y tế</Link>
                    </li>
                    <li className={`${'/admin/root/chuyen-khoa' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/root/chuyen-khoa"><i className="fas fa-first-aid"></i>Chuyên khoa</Link>
                    </li>
                  </>
                )}
               
                { accountType === 'hospital-admin' && (
                  <>
                    <h4 style={{textAlign:"center", color:"white"}}>Quản lí bệnh viện</h4>
                    <li className={`${'/admin' === pathname ? 'active' : '' }`}>
                      <Link to="/admin"><i className="fa fa-home"></i>Thống kê</Link> 
                    </li>
                    <li className={`${'/admin/hospital/thong-tin' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/hospital/thong-tin"><i className="fa fa-hospital"></i>Thông tin bệnh viện</Link>
                    </li>
                    <li className={`${'/admin/hospital/ds-bac-si' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/hospital/ds-bac-si"><i className="fa fa-user"></i>Danh sách bác sĩ</Link>
                    </li>
                    <li className={`${'/admin/hospital/ds-nhan-vien' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/hospital/ds-nhan-vien"><i className="fa fa-user"></i>Danh sách nhân viên</Link>
                    </li>
                    <li className={`${'/admin/hospital/chuyen-khoa' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/hospital/chuyen-khoa"><i className="fas fa-first-aid"></i>Chuyên khoa</Link>
                    </li>
                    <li className={`${'/admin/hospital/danh-gia' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/hospital/danh-gia"><i className="fas fa-clipboard-list"></i>Đánh giá</Link>
                    </li>
                    <li className={`${'/admin/hospital/lich-kham' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/hospital/lich-kham"><i className="far fa-calendar-alt"></i>Lịch khám</Link>
                    </li>

                    <li className={`${'/admin/hospital/lich-lam-viec' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/hospital/lich-lam-viec"><i className="far fa-calendar-alt"></i>Lịch làm việc</Link>
                    </li>
                  </>
                )}
                
                { accountType === 'agent' && (
                  <>
                    <h4 style={{textAlign:"center", color:"white"}}>Nhân viên hỗ trợ</h4>
                    <li className={`${'/admin' === pathname ? 'active' : '' }`}>
                      <Link to="/admin"><i className="far fa-calendar-alt"></i>Lịch làm việc</Link>
                    </li>
                    <li className={`${'/admin/agent/dat-lich-offline' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/agent/dat-lich-offline"><i className="far fa-calendar-alt"></i>Đặt lịch trực tiếp</Link>
                    </li>
                    <li className={`${'/admin/agent/dat-lich-online' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/agent/dat-lich-online"><i className="far fa-calendar-alt"></i>Đặt lịch hộ</Link>
                    </li>
                    <li className={`${'/admin/agent/tu-van' === pathname ? 'active' : '' }`}>
                      <Link to="/admin/agent/tu-van"><i className="far fa-calendar-alt"></i>Danh sách tư vấn</Link>
                    </li>
                   
                  </>
                )}


                {/* <hr style={{borderTop:"2px solid #ddd"}}/>
                <h4 style={{textAlign:"center", color:"white"}}>Admin bệnh viện</h4>
                <li className={`${'/admin/dashboard-bv' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/dashboard-bv"><i className="fa fa-home"></i>Dashboard Bệnh viện</Link>
                </li>
                <li className={`${'/admin/benhviena/thongtin' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/thongtin"><i className="fa fa-hospital"></i>Thông tin bệnh viện</Link>
                </li>
                <li className={`${'/admin/benhviena/nhanvien' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/nhanvien"><i className="fa fa-user"></i>Nhân viên</Link>
                </li>
                <li className={`${'/admin/benhviena/chuyenkhoa' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/chuyenkhoa"><i className="fas fa-first-aid"></i>Chuyên khoa</Link>
                </li>
                <li className={`${'/admin/benhviena/danhgia' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/danhgia"><i className="fas fa-clipboard-list"></i>Đánh giá</Link>
                </li>
                <li className={`${'/admin/benhviena/dslichkham' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/dslichkham"><i className="far fa-calendar-alt"></i>Lịch khám</Link>
                </li>
                <hr style={{borderTop:"2px solid #ddd"}}/>
                <h4 style={{textAlign:"center", color:"white"}}>Agent</h4>
                <li className={`${'/admin/benhviena/dslichkham' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/dslichkham"><i className="far fa-calendar-alt"></i>Lịch khám</Link>
                </li>
                <li className={`${'/admin/benhviena/dslichkham' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/dslichkham"><i className="fas fa-first-aid"></i>Chuyên khoa</Link>
                </li>
                <li className={`${'/admin/benhviena/thongtin' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/thongtin"><i className="fa fa-hospital"></i>Thông tin bệnh viện</Link>
                </li> */}
              </ul>
            </div>
          </Scrollbars>
        </nav>
      </div>
    </div>
  )
}

export default SidebarNav