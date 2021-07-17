import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill'; // ES6
import '../style.css';

function UpdateProfileDoctor(props) {
    const {modalData, handleOk, handleClose, initData} = props;
    const [about, setAbout] = useState(null);
    const [fileAvatar, setFileAvatar] = useState(null);
    const fileInput = useRef(null);
    const [loadingAbout, setLoadingAbout] = useState(true);


    const handleQuillChange = (data) => {
        setAbout(data);
    }
    const onChangeAvatar = () => {
        let { current } = fileInput;
        let file = current.files;
        setFileAvatar(file[0])
    }
    const onHandleSubmit = (data) => {
        // Create a test FormData object
        const submitData = new FormData();
        submitData.append("fullName", data.fullName);
        submitData.append("phone", data.phone);
        submitData.append("email", data.email);
        submitData.append("sex", data.gender);
        submitData.append("birthday", data.birthday);
        submitData.append("title", data.title);
        submitData.append("about", about);
        submitData.append("image", fileAvatar);

        props.handleUpdateProfile(submitData);
    }
    useEffect(() => {
        if(modalData.visible) {
            setAbout(initData.about);
            setTimeout(() => {
                setLoadingAbout(false);
            }, 300);
        }
    }, [modalData])
    return (
        <div className="modalUpdateProfile">
            <Modal 
                title={
                    <p 
                        style={{
                            margin: 0,
                            fontSize: '20px !important',
                            fontWeight: '600',
                            color: "#00d0f1",
                        }}
                    >
                        Cập nhật thông tin
                    </p>}
                width={1000}
                visible={modalData.visible} 
                onOk={handleOk} 
                onCancel={handleClose}
                footer={null}
            >
                {loadingAbout? <Spin></Spin>:
                 <Form
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="vertical"
                    size="large"
                    onFinish={onHandleSubmit}
                    initialValues={initData}
                >   
                    <Row gutter={[8,8]}>
                        <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                            <Form.Item 
                                name="fullName" 
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>  
                            <Form.Item 
                                name="email" 
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                name="phone" 
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn giờ',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                           
                            <Form.Item 
                                name="gender" 
                                label="Giới tính:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn giới tính',
                                    }
                                ]}
                            >
                                <Radio.Group size="large" className="updateDoctorRadio">
                                    <Radio.Button value="male">Nam</Radio.Button>
                                    <Radio.Button value="female">Nữ</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                            <Form.Item name="avatar" label="Ảnh đại diện:" >
                                <input 
                                    type="file" 
                                    accept="image/png, image/jpeg"
                                    ref={fileInput}
                                    onChange={onChangeAvatar}
                                />
                                <a onClick={()=>setFileAvatar(null)}>Xóa</a>
                            </Form.Item>
                            <Form.Item 
                                name="birthday" 
                                label="Ngày sinh:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày sinh',
                                    }
                                ]}
                            >
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item 
                                name="title" 
                                label="Chức danh"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn giờ',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Giới thiệu:" className="about">
                        <ReactQuill 
                            theme="snow"
                            value={about}
                            onChange={handleQuillChange}
                            // value={`<p>${initData.about}</p>`}
                            // onChange={(value)=>props.onChangeAbout(value)}
                        />
                    </Form.Item>
                    <Form.Item className="submitButton" style={{textAlign: 'center'}}>
                        <Button
                            type="primary" 
                            htmlType="submit"
                            style={{
                                backgroundColor: "#00d0f1",
                                border: "none",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>}
            </Modal>
        </div>
    );
}

export default UpdateProfileDoctor;