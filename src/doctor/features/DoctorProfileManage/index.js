import React, { useState, useEffect } from 'react';
import DoctorSidebar from '../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import {useDispatch, useSelector} from 'react-redux';
import { Card, Form, Row, Col, Input, Button } from 'antd';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import IMG01 from '../../assets/images/doctor-thumb-02.jpg';
import './style.css';
import LoadingTop from '../../components/loadingTop';
import moment from 'moment';

const DoctorProfile = () =>{
    const doctor = useSelector(state=> state.doctor);
    const { isDoctorLoggedIn, currentDoctor} = doctor;
    const [doctorData, setDoctorData ] = useState({});
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(()=> {
        if(isDoctorLoggedIn) {
            setDoctorData({...currentDoctor.doctor});
            setTimeout(() => {
                setLoadingPage(false);
            }, 300);
        }
    },[isDoctorLoggedIn])
    return(
        <div>
            {loadingPage && <LoadingTop/>}
            <div className="breadcrumb-bar" style={{marginTop:"80px"}}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Thông tin tài khoản</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Thông tin tài khoản</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <DoctorSidebar />
                            </StickyBox>
                        </div>
                        <div className="col-md-7 col-lg-8 col-xl-9">
                            <Card>
                                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Thông tin chi tiết:</h4>
                                {doctorData && 
                                <Row gutter={[20,20]}>
                                    <Col sm={{span:24}} md={{span:10}}>
                                        <div>
                                            <img src={doctorData.avatar||IMG01} alt="doctorAvatar"></img>
                                        </div>
                                    </Col>
                                    <Col sm={{span:24}} md={{span:14}}>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Tên bác sĩ:</div>
                                            <div className="col-sm-9">{doctorData.fullName}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Chức danh:</div>
                                            <div className="col-sm-9">{doctorData.title}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Tên bệnh viện:</div>
                                            <div className="col-sm-9">{doctorData.hospital_info?.name}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Chuyên khoa:</div>
                                            <div className="col-sm-9">{doctorData.spec_detail?.name}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Địa chỉ:</div>
                                            <div className="col-sm-9">{doctorData.hospital_info?.address}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Ngày sinh:</div>
                                            <div className="col-sm-9">{moment(doctorData.birthday).format("DD/MM/YY")}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Giới tính:</div>
                                            <div className="col-sm-9">{doctorData.sex==='male'?'Nam':'Nữ'}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Email:</div>
                                            <div className="col-sm-9">{doctorData.email}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Số điện thoại:</div>
                                            <div className="col-sm-9">{doctorData.phone}</div>
                                        </div>
                                    </Col>
                                </Row>}
                            </Card>

                             <Card style={{marginTop:"30px"}}>
                                {doctorData && 
                                <>
                                    <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Giới thiệu:</h4>
                                    <div className="info_gioithieu">
                                        {doctorData.about}
                                    </div>
                                </>}
                            </Card>

                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    )
    }


export default DoctorProfile;
     