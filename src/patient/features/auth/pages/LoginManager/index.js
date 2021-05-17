import { Button, Col, Form, Input, Row, Card } from 'antd';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { getVerifyCode, getVerifySMS } from '../../../../../redux/actions/patientActions';
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import loginBanner from '../../../../assets/images/login-banner.png';
import {Link} from 'react-router-dom';
import { SwalAlert } from '../../../../../utils/alert';
import adminAPI from '../../../../../api/adminAPI';

import './style.css';

const LoginManager = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const patient = useSelector(state=> state.patient);

    const [statePageLogin, setStatePageLogin] = useState("status1");
    const [phone, setPhone] = useState({});
    const [loadingLogin, setLoadingLogin] = useState(false);
    
    // get list hospital
    const [loginError, setLoginError] = useState({
        email:"",
        password:"",
    })

    const onHandleLogin = (values) => {
        console.log('values :>> ', values);
        // dispatch(login_by_email(values))
        loginByEmail(values);
    }
    const loginByEmail = async (data) => {
        try {
            const response = await adminAPI.login(data);
            if(response.error) {
                // dung sweetalert2
                console.log(`errors[0]`, response.errors[0])
                const error = response.errors[0];
                if(error.message==='User not found') {
                    setLoginError({...loginError,email:'Tên đăng nhập không đúng'})
                } else {
                    setLoginError({...loginError,password:'Mật khẩu không đúng'})
                }
            } else {
                console.log(`response`, response)
                localStorage.setItem('currentManager',response.data)
                // check type Account
                if (response.data.accountType==='doctor') {
                    history.push('/bac-si');
                    console.log("111111111111111111111");
                } else {
                    history.push('/admin')
                    console.log("22222222222222222");
                }
            }
        } catch (error) {
            
        }
    }
    useEffect(() => {
        if(patient.isLoggedIn) {
            // history.push('/patient')
            if (history.location.pathname==="/dang-nhap") {
                history.push('/')
            } else {
                history.push({
                    pathname: `/dat-kham/${history.location.state.data?.id}`,
                    state: {...history.location.state}
                })
            }
        }
    }, [patient.isLoggedIn])

  
    
    return (
        <div className="content" style={{backgroundColor:"#fff"}}>
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
