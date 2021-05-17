import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

class SidebarNav extends Component {
    constructor(props){
      super(props);
      this.state={
        show: null
      }
    }

  handleShow(id){
    this.setState({
        show: id
    })
  }
  
  render() {
   
   const {  location } = this.props
   let pathname = location.pathname
console.log('pathname', pathname);
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
                <h4 style={{textAlign:"center", color:"white"}}>Admin hệ thống</h4>
                <li className={`${'/admin/dashboard' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/dashboard"><i className="fa fa-home"></i>Dashboard</Link>
                </li>
                <li className={`${'/admin/cosoyte' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/cosoyte"><i className="fa fa-hospital"></i>Cơ sở y tế</Link>
                </li>
                <li className={`${'/admin/chuyen-khoa' === pathname ? 'active' : '' }`}>
                   <Link to="/admin/chuyen-khoa"><i class="fas fa-first-aid"></i>Chuyên khoa</Link>
                </li>
                <hr style={{borderTop:"2px solid #ddd"}}/>
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
                  <Link to="/admin/benhviena/chuyenkhoa"><i class="fas fa-first-aid"></i>Chuyên khoa</Link>
                </li>
                <li className={`${'/admin/benhviena/danhgia' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/danhgia"><i class="fas fa-clipboard-list"></i>Đánh giá</Link>
                </li>
                <li className={`${'/admin/benhviena/dslichkham' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/dslichkham"><i class="far fa-calendar-alt"></i>Lịch khám</Link>
                </li>
                <hr style={{borderTop:"2px solid #ddd"}}/>
                <h4 style={{textAlign:"center", color:"white"}}>Agent</h4>
                <li className={`${'/admin/benhviena/dslichkham' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/dslichkham"><i class="far fa-calendar-alt"></i>Lịch khám</Link>
                </li>
                <li className={`${'/admin/benhviena/dslichkham' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/dslichkham"><i class="fas fa-first-aid"></i>Chuyên khoa</Link>
                </li>
                <li className={`${'/admin/benhviena/thongtin' === pathname ? 'active' : '' }`}>
                  <Link to="/admin/benhviena/thongtin"><i className="fa fa-hospital"></i>Thông tin bệnh viện</Link>
                </li>
              </ul>
            </div>
          </Scrollbars>
        </nav>
      </div>
    </div>
  );
}
}

export default withRouter(SidebarNav);
