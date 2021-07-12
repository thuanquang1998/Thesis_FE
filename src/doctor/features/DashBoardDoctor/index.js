import React, { useState, useEffect } from 'react';
import DoctorSidebar from '../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import {Row, Col, Card} from 'antd';
import ListScheduleDashboard from './ListScheduleDashboard';
import doctorAPI from '../../../api/doctorAPI';

const DoctorDashboard = (props) => {
    console.log('props DoctorDashboard:>> ', props);
    const { isDoctorLoggedIn, currentDoctor} = props.doctorData;

    const {doctor} = props.doctorData.currentDoctor;
    const [dataDashboard, setDataDashboard] = useState({});
    useEffect(()=> {
        const id = currentDoctor.doctor._id;
        getDashboard(id);
    },[])
    const getDashboard = async (id) => {
        try {
            const response = await doctorAPI.get_dashboard_doctors(id);
            console.log('response DoctorDashboard:>> ', response);
        } catch (error) {
            console.log('error getDashboard DoctorDashboard:>> ', error);
        }
    }
    return(
        <div>
            <div className="breadcrumb-bar" style={{marginTop:"80px"}}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Dashboard</h2>
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
                            <Row gutter={[36,36]} style={{width:"100%"}}>
                                <Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dash-widget-header">
                                                <span className="dash-widget-icon text-primary border-primary">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                                <div className="dash-count">
                                                    <h3>168</h3>
                                                </div>
                                            </div>
                                            <div className="dash-widget-info">
                                                <h4 className="text-muted">Lượt đặt khám</h4>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-primary w-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dash-widget-header">
                                                <span className="dash-widget-icon text-success">
                                                    <i className="fa fa-credit-card"></i>
                                                </span>
                                                <div className="dash-count">
                                                    <h3>10</h3>
                                                </div>
                                            </div>
                                            <div className="dash-widget-info">
                                                
                                                <h4 className="text-muted">Số bệnh nhân đã khám </h4>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-success w-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dash-widget-header">
                                                <span className="dash-widget-icon text-danger border-danger">
                                                    <i className="fa fa-money"></i>
                                                </span>
                                                <div className="dash-count">
                                                    <h3>485</h3>
                                                </div>
                                            </div>
                                            <div className="dash-widget-info">
                                                <h4 className="text-muted">Số lịch chưa khám</h4>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-danger w-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
                                <div className="card">
                                        <div className="card-body">
                                            <div className="dash-widget-header">
                                                <span className="dash-widget-icon text-warning border-warning">
                                                    <i className="fa fa-folder"></i>
                                                </span>
                                                <div className="dash-count">
                                                    <h3>$62523</h3>
                                                </div>
                                            </div>
                                            <div className="dash-widget-info">
                                                <h4 className="text-muted">Số lượt đánh giá</h4>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-warning w-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            {/* <ListScheduleDashboard/> */}
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    )
}


export default DoctorDashboard;
     