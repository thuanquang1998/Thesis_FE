import React from 'react';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import departLogo from '../../../assets/img/depart.png'
import hospitalLogo from '../../../assets/img/hospital.png'
import location from '../../../assets/img/location.png'
import price from '../../../assets/img/price.png'
import logo_female from '../../../assets/img/female_logo.png';
import logo_male from '../../../assets/img/male_logo.png';
import './style.css'
const DoctorItem = (props) => {
    const {data} = props;
    const img = data.sex==='male'? logo_male:logo_female;
    return (
        (data && 
        <div>
                <div className="profile-widget">
                        <div className="doc-img">
                            <Link to="/patient/doctor-profile">
                                <img className="img-fluid" alt="User" src={img} />
                            </Link>
                        </div>
                        <div className="pro-content">
                            <h3 className="title">
                            <Link to="/patient/doctor-profile">
                                <p className="chucDanh">Phó Giáo sư, Tiến sĩ, Bác sĩ CKII</p>
                                <p className="tenBs">{data.name}</p>
                            </Link> 
                                {/* <i className="fas fa-check-circle verified"></i> */}
                            </h3>
                            <Rate value={3} />
                            <ul className="available-info">
                                <li>
                                    <span><img src={departLogo} alt="Nội tiết" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px"}}/></span>
                                    <span>{data.specialization.name}</span>
                                </li>
                                <li>
                                    <span><img src={hospitalLogo} alt="Nội tiết" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px"}}/></span>
                                    <span>{data.hospitalId}</span>
                                </li>
                                <li>
                                    <span><img src={location} alt="Nội tiết" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px"}}/></span>
                                    <span>273 Lý Thường Kiệt, P5, Q8, TP.HCM</span>
                                </li>
                                {/* <li>
                                    <span><img src={price} alt="Nội tiết" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px"}}/></span>
                                    <span>300.000 VNĐ</span>
                                </li> */}
                            </ul>
                            <div className="row row-sm">
                                <div className="col-6">
                                <Link to="/patient/doctor-profile" className="btn view-btn">Xem thông tin</Link>
                                </div>
                                <div className="col-6">
                                    {props.data? 
                                        // <Link to={`/patient/${props.data.id}/datlich`, {params:"aaa"}} className="btn book-btn">Đặt lịch</Link> :
                                        <Link to={{
                                            pathname:`/patient/${props.data.id}/datlich`,
                                            state:{data}
                                        }} 
                                            className="btn book-btn">Đặt lịch</Link> :
                                        <Link to={`/patient/dsbacsi`} className="btn book-btn">Đặt lịch</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>	
                </div>)
    )
}

export default DoctorItem
