import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Card, Col, DatePicker, Form, Input, Radio, Rate, Row, Select } from 'antd'
import PatientSidebar from '../../components/PatientSideBar';
import { useSelector } from 'react-redux'
function PatientInfo(props) {
    const patient = useSelector(state=>state.patient)
    const patientInfo = patient.currentUser.patientInfo;
    const defaultValue = {
        name: patientInfo.fullName,
        phone: patientInfo.fullName
    }
    
    return (
        <>
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
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
                                <h3>Thông tin tài khoản</h3>
                                <Form
                                    labelCol={{
                                        span: 24,
                                    }}
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                    layout="vertical"
                                    size="large"
                                    initialValues={defaultValue}
                                    defaultValue={defaultValue}
                                    // onFinish={handleOnFinish}
                                >   
       
                                    <Form.Item name="name" label="Tên người dùng">
                                        <Input className="input" disabled/>
                                    </Form.Item>
                                
                                    <Form.Item name="phone" label="Số điện thoại:">
                                        <Input className="input" disabled/>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default PatientInfo;