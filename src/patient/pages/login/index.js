import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { login } from '../../../actions/patientActions';
import loginBanner from '../../assets/images/login-banner.png';
import {Link} from 'react-router-dom';
import { SwalAlert } from '../../../utils/alert';

import './style.css';

const LoginPatient = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [waittingCode , setwaitingcode] = useState(false)
    const patient = useSelector(state=> state.patient)

    console.log(patient)
    const handleInputPhoneNunber =(values)=>{
        setwaitingcode(true)
        dispatch(login(values))
        SwalAlert('Success', 'Get Verify Code Success!', 'success')
    }
    const handleInputCode = (values) => {
        console.log(values)
        const code = localStorage.getItem("code")
        if(values.code === code){
            SwalAlert('Success','Redirect to dashboard','success')
            history.push('/patient')
        }
        else{
            SwalAlert('Error', 'Invalid Code!','error')
            localStorage.clear()
        }
    };
    
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
                        {/* form dang nhap */}
                        {!waittingCode && <div className="form">
                            <h3 className="title">Đăng nhập</h3>
                            <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={handleInputPhoneNunber}
                            >
                            <Form.Item
                                name="phone"
                                rules={[
                                {
                                    required: true,
                                    max:11,
                                    min : 9,
                                    pattern:/[0-9]/,
                                    message: 'Sai thông tin số điện thoại',
                                },
                                
                                
                                ]}
                            >
                                <Input prefix={<span>+ 84</span>} placeholder="Số điện thoại" size='large'/>
                                
                            </Form.Item>
                            <div className="text">
                                <p>Mã xác thực sẽ được gửi đến số điện thoại này và được sử dụng ở bước tiếp theo</p>
                            </div>
                            <div className="test_confirm">
                                <p></p>
                            </div>

                            <div className="button">
                                <Button type="primary" htmlType='submit' className="login-form-button">
                                Tiếp tục
                                </Button>
                            </div>
                            </Form>
                            <div className="directer_page">
                                <a href="/admin" className="link_directer">Trang quản lí dành cho bác sĩ/ Phòng khám</a>
                            </div>
                        </div>}
                        {/* form nhap code */}
                        { waittingCode && <div className="form">
                            <h3 className="title">Đăng nhập</h3>
                            <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={handleInputCode}
                            >
                            <Form.Item
                                name="code"
                                rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đầy đủ thông tin',
                                },
                                
                                ]}
                            >
                                <Input placeholder="Mã số xác thực" size='large' className="number_confirm"/>
                            </Form.Item>
                            <div className="text">
                                <p>Nhập 6 ký tự vừa được gửi vào số điện thoại: +843423423423 để xác thực. Nếu bạn không nhận được mã số trong vòng 2 phút. Yêu cầu gửi lại mã (0) hoặc kiểm tra lại số điện thoại của bạn.</p>
                            </div>
                            <div className="test_confirm">
                                <p></p>
                            </div>


                            <div className="button">
                                <Button type="primary" htmlType="submit" className="login-form-button" >
                                    Tiếp tục
                                </Button>
                            </div>
                            </Form>
                        </div>}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default LoginPatient
