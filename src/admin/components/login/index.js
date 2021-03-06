import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
// import { login, register } from '../../../redux/actions/doctorActions';
import { login_by_email } from '../../../redux/actions/adminActions'
import logo from '../../assets/img/bk-logo.png'
import './style.css'


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const admin = useSelector(state=>state.admin)
    const {currentAdmin, loadingLogin, isAdminLoggedIn, loadingLogout} = admin;

    const [loginError, setLoginError] = useState({
        email:"",
        password:"",
    })

    const onHandleLogin = (data) => {
        dispatch(login_by_email(data));
    }
    useEffect(()=> {
        if(!loadingLogin && isAdminLoggedIn) {
        history.push('/admin')
        }
    },[loadingLogin])

    return (
        <div className="loginPage container">
            <div className="login">
                <Card>
                    <div className="logoTittle">
                        <div className="logo">
                            <img src={logo} alt=""/>
                        </div>
                    </div>
                    {/* <LoadingTop/> */}
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
               </Card>
            </div>
        </div>
    )
}

export default Login
