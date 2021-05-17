import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { getVerifyCode, getVerifySMS } from '../../../../../redux/actions/patientActions';
import loginBanner from '../../../../assets/images/login-banner.png';
import {Link} from 'react-router-dom';
import { SwalAlert } from '../../../../../utils/alert';

import './style.css';

const LoginPatient = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const patient = useSelector(state=> state.patient);

    const [statePageLogin, setStatePageLogin] = useState("status1");
    const [phone, setPhone] = useState({});
    const [loadingLogin, setLoadingLogin] = useState(false);
    
    // history.location.pathname==="/patient/login" (dang nhap lan dau), then => history.push('/patient)
    // else then => history.push({
            //     pathname: `/patient/${props.data?.id}/datlich`,
            //     state: {history.location.state.data}
            // })
    const handleInputPhoneNunber =(values)=>{
        const phone = values.phone;
        const _phone = (phone[0]==='0'?`+84${phone.slice(1,phone.length)}`:`+84${phone}`)
        const data = {phone:_phone};
        setPhone(data);
        dispatch(getVerifyCode(data));
        setStatePageLogin('status2');
        SwalAlert( 'Success',`Mã xác thực đã được gửi đến ${_phone}` , 'success')
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

    // login
    const handleVerifyCode = async (values) => {
        const data = {
            "phone": phone.phone,
            "code" : values.code
        }
        const code = localStorage.getItem("code")
        if(values.code === code){
            await dispatch(getVerifySMS(data));
        }
        else{
            SwalAlert('Error', 'Sai code, mời bạn thử lại','error')
            localStorage.clear()
        }
    };

    const reSendPhoneNumber = () => {
        dispatch(getVerifyCode(phone));
        SwalAlert( 'Success',`Mã xác thực đã được gửi đến ${phone.phone}` , 'success')
    }
    const changePhoneNumber = () => {
        setStatePageLogin('status1')
    }
    
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
                        {/* {!waittingCode &&  */}
                        {statePageLogin === 'status1' &&
                        <div className="form">
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
                                            message: 'Vui lòng nhập đầy đủ thông tin',
                                        },
                                    ]}
                                >
                                    <Input prefix={<span>+ 84</span>} placeholder="Số điện thoại" size='large'/>
                                </Form.Item>
                                <div className="text">
                                    <p>Mã xác thực sẽ được gửi đến số điện thoại này và được sử dụng ở bước tiếp theo.</p>
                                </div>
                                <Button loading={patient.isLoading} type="primary" htmlType='submit' className="login-form-button">
                                    Tiếp tục
                                </Button>
                            </Form>
                            <div className="directer_page">
                                <a href="/admin/dang-nhap" className="link_directer">Trang quản lí dành cho bác sĩ/ Phòng khám</a>
                            </div>
                        </div>}
                        {/* form nhap code */}
                        {/* { waittingCode &&  */}
                        { statePageLogin === 'status2' &&
                        <div className="form">
                            <h3 className="title">Đăng nhập</h3>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleVerifyCode}
                            >
                                <Form.Item
                                    name="code"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập đầy đủ thông tin',
                                            max: 6
                                        },
                                    ]}
                                >
                                    <Input placeholder="Mã số xác thực" size='large' className="number_confirm"/>
                                </Form.Item>
                                <div className="text">
                                    <p>Nhập 6 ký tự vừa được gửi vào số điện thoại: {phone.phone} để xác thực. Nếu bạn không nhận được mã số trong vòng 2 phút. Yêu cầu gửi lại mã (0) hoặc kiểm tra lại số điện thoại của bạn.</p>
                                </div>
                                <Button loading={patient.isLoading} type="primary" htmlType="submit" className="login-form-button" >
                                    Xác thực
                                </Button>
                                <div className="directer_page">
                                    <a href="#" onClick={reSendPhoneNumber} className="link_directer">Gửi lại</a>
                                </div>
                                
                                <div className="directer_page">
                                    <a href="#" onClick={changePhoneNumber} className="link_directer">Thay đổi số điện thoại</a>
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
