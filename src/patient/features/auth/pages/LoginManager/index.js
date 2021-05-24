import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login_doctors } from '../../../../../redux/actions/doctorActions';
import loginBanner from '../../../../assets/images/login-banner.png';
import './style.css';
import LoadingTop from '../../../../components/loadingTop';




const LoginManager = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const doctor = useSelector(state=>state.doctor)
    const {currentDoctor, loadingLogin, isDoctorLoggedIn, loadingLogout} = doctor;

    const [loginError, setLoginError] = useState({
        email:"",
        password:"",
    })

    const onHandleLogin = (data) => {
        dispatch(login_doctors(data));
    }
    useEffect(()=> {
        if(!loadingLogin && isDoctorLoggedIn) {
            history.push('/bac-si')
        }
    },[loadingLogin])
  
    
    return (
        <div className="content" style={{backgroundColor:"#fff"}}>
            {loadingLogin && <LoadingTop/>}
            <div className="container">
                <Row gutter={[16,16]}>
                    <Col sm={{span:0}} xs={{span:0}} md={{span:12}}>
                        <div className="login-barner">
                            <img src={loginBanner} alt=""/>
                        </div>
                    </Col>
                    <Col sm={{span:24}} xs={{span:24}} md={{span:12}}>
                        <div className="form">
                            <h3 className="title">Đăng nhập</h3>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onHandleLogin}
                                >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên đăng nhập!',
                                        },
                                    ]}
                                    validateStatus={loginError===""?"error":""}
                                    help={loginError!==""?loginError.email:""}
                                >
                                    <Input id="error" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                    ]}
                                    validateStatus={loginError===""?"error":""}
                                    help={loginError!==""?loginError.password:""}
                                >
                                    <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Mật khẩu"
                                    />
                                </Form.Item>
                                <Form.Item className="button_login">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                    Đăng nhập
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default LoginManager
