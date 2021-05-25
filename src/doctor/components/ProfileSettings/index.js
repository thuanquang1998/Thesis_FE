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

const DoctorProfile = () =>{
    const doctor = useSelector(state=> state.doctor);
    const { isDoctorLoggedIn} = doctor;
    const [doctorData, setDoctorData, currentDoctor] = useState({});

    useEffect(()=> {
        if(isDoctorLoggedIn) {
            const formatData = {
                
            }
            setDoctorData()
        }
    },[isDoctorLoggedIn])

    return(
        <div>
            <div className="breadcrumb-bar">
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
                            <Form
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                layout="vertical"
                                size="large"
                                onFinish={()=>{}}
                                // initialValues={}
                            >   
                                <div className="info__doctor">      
                                    <Card className="info__basic">
                                        <h4 className="info__basic--title">Thông tin cơ bản</h4>  
                                        <Row gutter={[8,8]}>
                                            <Col xs={{span:24}} sm={{span:24}} md={{span:24}}>
                                                <Form.Item style={{width:"150px", height:"150px", marginBottom:"0"}}>
                                                    <img src={currentDoctor?.doctor.avatar_image||IMG01} alt="User" style={{width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover"}}/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                                <Form.Item name="name" label="Họ và tên bác sĩ:">
                                                    <Input className="input" placeholder="Họ và tên"/>
                                                </Form.Item>
                                                <Form.Item name="phone" label="Số điện thoại:">
                                                    <Input className="input" placeholder="Số điện thoại"/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                                <Form.Item name="email" label="Email:">
                                                    <Input className="input" placeholder="Email"/>
                                                </Form.Item>
                                                <Form.Item name="address" label="Địa chỉ:">
                                                    <Input className="input" placeholder=""/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card> 
                                    <Card className="info__about">
                                        <h4 className="info__about--title">Tiểu sử</h4>  
                                        <Row gutter={[8,8]}>
                                            <Form.Item className="form-trieuchung">
                                                {/* <ReactQuill 
                                                    theme="snow"
                                                    onChange={()=>{}}
                                                /> */}
                                                <ReactQuill value={"asdfasdfasdf"} readOnly={true} theme={"bubble"} />
                                                {/* <Form.Item name="medicalRecordSumanry" label="Tiền sử bệnh - Triệu chứng:" className="form-trieuchung">
                                                    <Input.TextArea />
                                                </Form.Item> */}
                                            </Form.Item>
                                        </Row>
                                    </Card>  
                                    <Card>
                                        <h4>Thông tin bệnh viện</h4>  
                                        <Row gutter={[8,8]}>
                                            <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                                <Form.Item name="name" label="Tên bệnh viện:">
                                                    <Input className="input" placeholder="Tên bệnh viện" value="Bệnh viện quận 10" disabled/>
                                                </Form.Item>
                                                <Form.Item name="phone" label="Số điện thoại:">
                                                    <Input className="input" placeholder="Số điện thoại"/>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                                <Form.Item name="email" label="Email:">
                                                    <Input className="input" placeholder="Email"/>
                                                </Form.Item>
                                                <Form.Item name="address" label="Địa chỉ:">
                                                    <Input className="input" placeholder="Địa chỉ"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Giới thiệu:" className="form-trieuchung">
                                                    <ReactQuill 
                                                        theme="snow"
                                                        onChange={()=>{}}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            
                                        </Row>
                                    </Card> 
                                    <Col span={24}>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Xác nhận đặt khám</Button>
                                                </Form.Item>
                                            </Col>             
                                </div>
                            </Form>
                            DoctorProfile

                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    )
    }


export default DoctorProfile;
     