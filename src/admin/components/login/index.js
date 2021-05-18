import React, {useState} from 'react'
import {Card, Form, Button, Input, Modal, Select} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import logo from '../../assets/img/bk-logo.png'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import './style.css'
// import { login, register } from '../../../redux/actions/doctorActions';
import { login_by_email } from '../../../redux/actions/adminActions'
import adminAPI from '../../../api/adminAPI';


const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const admin = useSelector(state=>state.admin)
    console.log('admin :>> ', admin);
    // get list hospital
    const [loginError, setLoginError] = useState({
        email:"",
        password:"",
    })

    const onHandleLogin = (values) => {
        console.log('values :>> ', values);
        dispatch(login_by_email(values));

        // loginByEmail(values);
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
                localStorage.setItem('currentAdmin',response.data)

                // check type Account
                // if (response.data.accountType==='doctor') {
                //     history.push('/danh-sach-bac-si');
                //     console.log("111111111111111111111");
                // } else {
                //     history.push('/admin/dashboard')
                //     console.log("22222222222222222");
                // }
            }
        } catch (error) {
            
        }
    }
   

    return (
        <div className="loginPage container">
            <div className="login">
                <Card>
                    <div className="logoTittle">
                        <div className="logo">
                            <img src={logo} alt=""/>
                        </div>
                    </div>
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
