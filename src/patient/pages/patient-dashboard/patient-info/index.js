import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Card, Col, DatePicker, Form, Input, Radio, Rate, Row, Select } from 'antd'
import PatientSidebar from '../patient-sidebar'
function PatientInfo(props) {
    return (
        <>
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/patient">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Quản lí tài khoản</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Quản lí tài khoản</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <Row gutter={[20,20]}>
                        <Col md={{span:10}} lg={{span:8}} xl={{span:6}}>
                            <PatientSidebar />
                        </Col>
                        <Col md={{span:14}} lg={{span:16}} xl={{span:18}}>
                            <Card>
                                
                            </Card>
                        </Col>
                    </Row>
                    {/* <div className="col-md-5 col-lg-4 col-xl-3">
                        <PatientSidebar />
                    </div>
                    <div className="col-md-7 col-lg-8 col-xl-9">
                                              
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default PatientInfo;