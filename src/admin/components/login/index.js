import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Card, Form, Button, Input, Modal, Select} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import logo from '../../assets/img/bk-logo.png'
import './style.css'
import { login, register } from '../../../redux/actions/doctorActions';

const Login = () => {
    const dispatch = useDispatch()
    // get list hospital
    const [isModalVisible, setIsModalVisible] = useState(false)
    const onFinish = (values) => {
        dispatch(login(values))
    }
    const showModal = () => {
        setIsModalVisible(true)
    }
    const handleOk = () => {
        setIsModalVisible(true)
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }

    // handle SignUp
    const onFinishSignUp = (data) => {
             data = {...data , accountType:'doctor'}
            console.log(data)
            dispatch(register(data))
        
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
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username_login"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                    </Form.Item>
                    <Form.Item
                        name="password_login"
                        rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                        ]}
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
                <div className="admin_signup">
                    <p className="admin__signup--button" onClick={showModal}>Đăng kí tài khoản</p>
                </div>
               </Card>
                <Modal title="Đăng ký tài khoản" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishSignUp}
                        >
                        <Form.Item
                            name="fullName"
                            rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ và tên" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                            {
                                required: true,
                                type: "email",
                                message: 'Vui lòng nhập email!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            name="hospitalId"
                            rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn bệnh viện!',
                            },
                            ]}
                        >
                            <Select defaultValue="hospitalhv">
                                <Select.Option value="hospitalhv">Bệnh viện Hùng Vương</Select.Option>
                                <Select.Option value="hosptalgd">Bệnh viện Gia Định</Select.Option>
                                <Select.Option value="hospitaltd">Bệnh viện Thủ Đức</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                            />
                        </Form.Item>
                        <Form.Item className="button_login">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default Login
